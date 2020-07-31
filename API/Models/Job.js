const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const slug = require('slug');
const shortId = require('shortid');

const JobSchema = new mongoose.Schema({
    Title:{
        type: String,
        required: 'The Job Position is required.',
        trim: true
    },
    Enterprise: {
        type: String,
        trim: true
    },
    Place: {
        type: String,
        trim: true,
        required: 'The Place is required.'
    },
    Salary: {
        type: String,
        trim: true,
        default: 0
    },
    Contract: {
        type: String,
        trim: true
    },
    Seniority: {
        type: String,
        trim: true
    },
    Description: {
        type: String,
        trim: true
    },
    Url: {
        type: String,
        lowercase: true
    }, 
    Skills: [String],
    Candidates: [{
        FirstName: String,
        LastName: String,
        Email: String,
        LinkedinUrl: String,
        Resume: String
    }],
    User: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: 'The User is required.'
    }
});

JobSchema.pre('save', function(next){ //Funciona como Hook pre Guardado. (Leer documentacion, por que existen muchos.)
    //Crear la URL
    console.log(this.Url);
    if(this.Url == null) {
        const Url = slug(this.Title);
        this.Url = `${Url}-${shortId.generate()}`;
    
        next();
    } else {
        next();
    }
}); 


module.exports = mongoose.model('Job', JobSchema);