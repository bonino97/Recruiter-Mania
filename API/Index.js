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

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

require('dotenv').config({path: '.env'});

app.use(cors()); //Habilito CORS, no olvidar importar.
app.use('/', router()); //Rutas
app.use(cookieParser());
app.use(session({
    url: process.env.DB,
    secret: process.env.SECRET,
    key: process.env.KEY,
    resave: false,
    saveUninitialized: false,
    // store: new MongoStore({ mongooseConection: mongoose.connection })
})); //Almaceno la Session

app.listen(process.env.PORT);