const mongoose = require('mongoose');
require('dotenv').config({path: '.env'});


mongoose.connect(process.env.DB, {useNewUrlParser: true});
mongoose.connection.on('error', (error) => {
    console.log(error); //Seria ideal generar Logs en alguna folder.
}); 

//Importar los Modelos.
const Job = require('../Models/Job');
const User = require('../Models/User');