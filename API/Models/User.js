const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({ 
    Email:{
        type: String,
        required: 'The Email is required.',
        trim: true,
        unique: true,
        lowercase: true
    },
    FullName:{
        type: String,
        required: 'The Full Name is required.'
    },
    Password:{
        type: String, 
        required: 'The Password is required.',
        trim: true
    },
    Token: String,
    Expires: Date
});

//Metodo para Hashear los Passwords
UserSchema.pre('save', async function (next) {
    //Si el password ya esta hasheado, no hacemos nada.
    if(!this.isModified('Password')) {
        return next(); //Detener la ejecucion, y continuar con el siguiente middleware
    }
    const Hash = await bcrypt.hash(this.Password, 10);
    this.Password = Hash; 

    next();
});

// UserSchema.post('save', function (error, doc, next) {

// });

//Autenticar Usuarios
UserSchema.methods = {
    ComparePassword: function(Password){
        return bcrypt.compareSync(Password, this.Password);
    }
}


module.exports = mongoose.model('User', UserSchema);
