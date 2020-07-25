const User = require('../Models/User');

exports.Register = async (req,res,next) => {

    try {
        const user = new User(req.body);
        const newUser = await user.save();
        if(!newUser) return next();
        return res.status(200).json({
            success: true,
            msg: 'Your account was created successfully!'
        });
    } catch (e) {

        if(e.code === 11000) {
            return res.status(400).json({
                success: false,
                msg: 'Hey, this email is in use!'
            });
        }

        return res.status(400).json({
            success: false,
            msg: 'An error ocurred. Please, try again later.'
        });
    }
}
