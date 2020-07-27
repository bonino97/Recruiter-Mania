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

exports.SanitizeJobData = async (req,res,next) => {

    try {
        //Sanitizando los campos.
        req.sanitizeBody('Title').escape();
        req.sanitizeBody('Place').escape();
        req.sanitizeBody('Enterprise').escape();
        req.sanitizeBody('Contract').escape();
        req.sanitizeBody('Description').escape();
        req.sanitizeBody('Url').escape();
        req.sanitizeBody('Seniority').escape();

        //Validando los campos

        req.checkBody('Title', 'The title cannot be empty').notEmpty();
        req.checkBody('Place', 'The place cannot be empty').notEmpty(); 
        req.checkBody('Skills', 'Add almost one skill').notEmpty(); 

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
    } catch (e) {
        console.error(e);
    }
    
}

exports.SanitizeProfile = async (req,res,next) => {

    try {
        //Sanitizando los campos.
        req.sanitizeBody('FirstName').escape();
        req.sanitizeBody('LastName').escape();
        req.sanitizeBody('ProfileUrl').escape();
        req.sanitizeBody('Enterprise').escape();
        req.sanitizeBody('EnterpriseRole').escape();
        req.sanitizeBody('Country').escape();
        req.sanitizeBody('AboutMe').escape();

        //Validando los campos

        req.checkBody('FirstName', 'The name cannot be empty').notEmpty();
        req.checkBody('LastName', 'The lastname cannot be empty').notEmpty();

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
    } catch (e) {
        console.error(e);
    }
    
}