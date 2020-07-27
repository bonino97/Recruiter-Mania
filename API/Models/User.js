const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const slug = require('slug');
const shortId = require('shortid');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({ 
    Email:{
        type: String,
        required: 'The Email is required.',
        trim: true, 
        unique: true,
        lowercase: true
    },
    FirstName:{
        type: String,
        required: 'The First Name is required.'
    },
    LastName:{
        type: String,
        required: 'The Last Name is required.'
    },
    Password:{
        type: String, 
        required: 'The Password is required.',
        trim: true
    },

    AboutMe: String,
    Enterprise: String,
    EnterpriseRole: String,
    Country: String,
    TwitterUrl: String,
    LinkedinUrl: String,
    FacebookUrl: String,
    Website: String,
    ProfileUrl: String,
    Image: String,

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

UserSchema.pre('save', async function(next){ //Funciona como Hook pre Guardado. (Leer documentacion, por que existen muchos.)
    //Crear la URL
    const ProfileUrl = slug(this.FirstName+this.LastName);
    this.ProfileUrl = `${ProfileUrl}-${shortId.generate()}`;

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
