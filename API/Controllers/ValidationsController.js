exports.SanitizeRegisterData = async (req,res,next) => {
    req.sanitizeBody('FirstName').escape();
    req.sanitizeBody('LastName').escape();
    req.sanitizeBody('Email').escape();

    req.checkBody('FirstName', 'The name cannot be empty').notEmpty();
    req.checkBody('LastName', 'The lastname cannot be empty').notEmpty();
    req.checkBody('Email', 'The email cannot be empty').notEmpty();
    req.checkBody('Email', 'The email is invalid').isEmail();
    req.checkBody('Password', 'The password cannot be empty').notEmpty();

    const errors = req.validationErrors();

    if(errors){ //Si hay errores.
        return res.status(400).json({
            success: false,
            msg: 'Please check the entered fields',
            errors: errors.map(error => error.msg)
        }); //Filtro y muestro solo mensajes
    }

    //Si toda la validacion es correcta

    next();
}