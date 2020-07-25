const passport = require('passport');
const User = require('../Models/User');

exports.AuthenticateUser = async (req,res,next) => { 

    passport.authenticate('local', (error, user, info) => {
        if(error) return res.status(400).json({"success" : false, "message" : error});
        if(!user) return res.status(400).json({"success" : false, "message" : info});
        req.login(user, function(error) {
            if (error) return res.status(400).json({"success" : false, "message" : error});
            return res.status(200).json({
                success: true,
                lemonCookie: res.req.headers.cookie.split('=')[1],
                msg: 'Logging...'
            });
        });
    })(req, res, next);

}


//Revisar si el usuario esta autenticado
exports.VerifyUser = async (req,res,next) => {
    
    //Revisar el usuario
    if(req.isAuthenticated()) return next(); //Estan autenticados
    
    return res.status(401).json({
        succes:false,
        msg: 'You need to be logged...'
    });

}