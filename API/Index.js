const mongoose = require('mongoose');
require('./Config/Db'); //Configuracion de la DB.
const express = require('express');
const app = express();
const cors = require('cors');
const router = require('./Routes/Index');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');

const passport = require('passport');
require('./Config/Passport');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

require('dotenv').config({path: '.env'});

app.use(expressValidator()); //Express Validator para Sanitizar Entradas

app.use(cors({
    origin: ['http://localhost:4201', 'http://127.0.0.1:4201'],
    credentials: true
})); //Habilito CORS, no olvidar importar.

app.use(cookieParser());
app.use(session({
    url: process.env.DB,
    secret: process.env.SECRET,
    key: process.env.KEY,
    resave: false,
    saveUninitialized: false,
    cookie:{
        maxAge: 36000000,
        secure: false,
        httpOnly: false
    },
    store: new MongoStore({ 
        url: process.env.DB, 
        collection: 'sessions'
    })
})); //Almaceno la Session

//Inicializar passport 
app.use(passport.initialize());
app.use(passport.session());

app.use('/', router()); //Rutas

app.listen(process.env.PORT);