const User = require('../Models/User');
const { update } = require('../Models/User');

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
        console.error(e);
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

exports.GetMyInstance = async (req,res) => {
    try {

        const user = await User.findById(req.user._id);
        return res.status(200).json({
            success: true,
            data: user
        });

    } catch (e) {
        console.error(e)
        return res.status(400).json({
            success: false,
            msg: 'An error ocurred. Please, try again later.'
        });
    }
}

exports.UpdateProfile = async (req,res) => {
    try{
        const updatedUser = req.body;
        const user = await User.findOneAndUpdate({_id: req.user._id}, updatedUser, {new: true, runValidators: true});
        return res.status(200).json({
            success: true,
            msg: 'User successfully updated!',
            data: user
        });
    }catch(e){
        console.error(e);
    }

}