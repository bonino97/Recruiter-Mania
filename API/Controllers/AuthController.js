const passport = require('passport');
const User = require('../Models/User');
const crypto = require('crypto');
const sendEmail = require('../Helpers/Email');
require('dotenv').config()

exports.AuthenticateUser = async (req,res,next) => { 

    passport.authenticate('local', (error, user, info) => {
        if(error) return res.status(400).json({"success" : false, "message" : error});
        if(!user) return res.status(400).json({"success" : false, "message" : info});
        req.login(user, function(error) {
            if (error) return res.status(400).json({"success" : false, "message" : error});
            return res.status(200).json({
                success: true,
                lemonCookie: res.req.headers.cookie.split('=')[1],
                msg: 'Redirecting...'
            });
        });
    })(req, res, next);

}

//Revisar si el usuario esta autenticado
exports.VerifyUser = async (req,res,next) => {
    
    //Revisar el usuario
    if(req.isAuthenticated()) return next(); //Estan autenticados
    
    return res.status(401).json({
        success:false,
        msg: 'You need to be logged...'
    });

}

exports.Logout = async(req,res) => {
    try{
        req.logout();
        return res.status(200).json({success: true, msg: 'Session finished.'});
    } catch(e){
        console.error(e);
        return res.status(404).json({
            success: false,
            msg: 'Something wrong...'
        });
    }
}

//Genera el token en el modelo del usuario
exports.ForgotPassword = async (req,res) => {
    try {
        const user = await User.findOne({
            Email: req.body.email
        });
    
        if(!user){
            return res.status(200).json({
                success: true,
                msg: 'If your email exists, you will receive a password recovery link in few seconds.'
            });
        }
        
        //El usuario genera el token 
    
        user.Token = crypto.randomBytes(20).toString('hex');
        user.Expires = Date.now()+3600000;
    
        await user.save();
        const resetUrl = `${process.env.FRONT_DEV}reset-password/${user.Token}`; //Aca habria q modificar por el https en caso de subir a produccion y tener SSL
    
        await sendEmail.send({
            user,
            subject: 'Reset Password',
            html: `
                <div style="border: 0.2rem solid #e14eca; border-radius: 15px;">
                    <h1 style="
                    font-family: Poppins, sans-serif;
                    color: #e14eca;
                    font-weight: bolder;
                    ">
    
                    Recruiter Mania
    
                    </h1>
    
                    <h3 style="text-align:center; 
                    font-family: Arial, Helvetica;">
    
                        Reset Password
    
                    </h3>
                    <p style="font-family: Arial, Helvetica; text-align:center;">Hey! Please click below to reset your password. </p>
                    <br>
                    <a style="
                        display:block; 
                        font-family: Arial, Helvetica;
                        padding: 1rem; 
                        background-color: #E14ECA; 
                        color:white; 
                        text-transform:uppercase; 
                        text-align:center;
                        text-decoration: none;"
                    href="${resetUrl}">
                    
                        <b>Reset Password</b>
                    
                    </a>
                    <br>
                    <p style="font-family: Arial, Helvetica;">If you can't access visit: ${resetUrl}</p>
                    <p style="font-family: Arial, Helvetica;">If you did not request a password change, please ignore this message.</p>
                </div>
                ` 
        });
    
        return res.status(200).json({
            success: true,
            msg: 'If your email exists in our database, you will receive a password recovery link in few seconds...'
        })

    } catch(e){
        console.error(e);
        return res.status(404).json({
            success: false,
            msg: 'Something wrong...'
        });
    }    
}

exports.VerifyToken = async (req,res) => {
    try {

        const user = await User.findOne({
            Token: req.params.token,
            Expires: {
                $gt: Date.now()
            }
        });

        if(!user) {
            return res.status(404).json({
                success: false,
                msg: 'Invalid or expired Token, try to reset password again.'
            });
        }
    
        return res.status(200).json({success:true});

    } catch(e) {
        console.error(e);
        return res.status(404).json({
            success: false,
            msg: 'Something wrong...'
        });
    }
}

exports.ResetPassword = async (req,res) => {
    try{        

        const user = await User.findOne({
            Token: req.body.token
        });

        if(!user) {
            return res.status(404).json({
                success: false,
                msg: 'Invalid or expired Token, try to reset password again.'
            });
        }

        if(user.Expires < Date.now()) {
            return res.status(404).json({
                success: false,
                msg: 'Invalid or expired Token, try to reset password again.'
            });
        }

        user.Password = req.body.password;
        user.Token = undefined;
        user.Expires = undefined;

        await user.save();

        return res.status(200).json({
            success: true,
            msg: 'Your password was succesfully modified...'
        })

    } catch(e){
        console.error(e);
        return res.status(404).json({
            success: false,
            msg: 'Something wrong...'
        });
    }
}