const User = require('../Models/User');
const multer = require('multer');
const shortid = require('shortid');

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

//Configuracion de Multer

const multerConfig = {
    limits: { fileSize: 2000000 }, // 3 mb,
    storage: filerStorage = multer.diskStorage({
        destination: (req,file,cb) => {
            cb(null, __dirname+'../../Uploads/Profiles');
        }, 
        filename: (req,file,cb) => {
            const extension = file.mimetype.split('/')[1];
            cb(null, `${shortid.generate()}.${extension}`);
        }
    }),
    fileFilter(req,file,cb) {
        if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
            // el cb se ejecuta como true o false : true cuando la imagen se acepta
            cb(null, true);
        } else {
            
            cb(new Error('Invalid format, only JPG or PNG its allowed...'));
        }
    }
}

const Upload = multer(multerConfig).single('Image');

exports.UploadAvatar = async (req,res,next) => {
    try {
        Upload(req,res,function(error){
            if(error) {
                if(error instanceof multer.MulterError) {
                    if(error.code === 'LIMIT_FILE_SIZE') {
                        return res.status(400).json({
                            success: false,
                            message:'File Exceed 2MB'
                        });
                    } else {
                        return res.status(400).json({
                            success: false,
                            message: error.message
                        });
                    }
                } else {
                    return res.status(400).json({
                        success: false,
                        message: error.message
                    });
                }
            } else {
                return next();
            }
        });
    } catch (e) {
        console.error(e);
    }
}

exports.UpdateProfileAvatar = async (req,res) => {
    
    try {

        const user = await User.findById(req.user._id);

        if(req.file){
            user.Image = req.file.filename;
            user.save();
            return res.status(200).json({
                success: true,
                message: 'Image uploaded succesfully...'
            });
        }

        return res.status(400).json({
            success: false,
            message: 'We cant upload your image, please try again later...'
        });

    } catch (e) {
        console.error(e);
        return res.status(400).json({
            success: false,
            message: 'Something wrong...'
        });
    }
}

