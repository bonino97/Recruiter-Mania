const express = require('express');
const router = express.Router();


//Default API Url
const apiUrl = '/api'

//Controllers 
const HomeController = require('../Controllers/HomeController');
const JobsController = require('../Controllers/JobsController');
const UsersController = require('../Controllers/UsersController');
const ValidationsController = require('../Controllers/ValidationsController');

module.exports = () => {
    /********************/
    /*  HomeController  */
    /********************/
    
    router.get(apiUrl, HomeController.HomeOptions);
    
    /********************/
    /*  JobsController  */
    /********************/
    /* GET */
    router.get(`${apiUrl}/jobs`, JobsController.GetJobs);
    router.get(`${apiUrl}/job/:url`, JobsController.GetJobByUrl);
    
    /* POST */
    // Cargar Nuevo Trabajo o Vacante.
    router.post(`${apiUrl}/job/new`, JobsController.NewJob);

    /* PUT */
    //Actualizar Trabajo
    router.put(`${apiUrl}/job/:url`, JobsController.UpdateJob);
    
    /*******************/
    /* UsersController */
    /*******************/

    router.post(`${apiUrl}/register`, ValidationsController.SanitizeRegisterData, UsersController.Register);
    

    return router;
}