const express = require('express');
const router = express.Router();

//Default API Url
const apiUrl = '/api'

//Controllers 
const HomeController = require('../Controllers/HomeController');
const JobsController = require('../Controllers/JobsController');
const UsersController = require('../Controllers/UsersController');
const ValidationsController = require('../Controllers/ValidationsController');
const AuthController = require('../Controllers/AuthController');

module.exports = () => {
    /********************/
    /*  HomeController  */
    /********************/
    
    router.get(apiUrl, HomeController.HomeOptions);
    router.get(`${apiUrl}/panel`, HomeController.PanelOptions);
    
    /********************/
    /*  JobsController  */
    /********************/
    /* GET */
    router.get(`${apiUrl}/jobs`, JobsController.GetJobs);
    router.get(`${apiUrl}/job/:url`, JobsController.GetJobByUrl);
    
    /* POST */
    // Cargar Nuevo Trabajo o Vacante.
    router.post(`${apiUrl}/job/new`, AuthController.VerifyUser, JobsController.NewJob);

    /* PUT */
    //Actualizar Trabajo
    router.put(`${apiUrl}/job/:url`, AuthController.VerifyUser, JobsController.UpdateJob);
    
    /*******************/
    /* UsersController */
    /*******************/

    router.post(`${apiUrl}/register`, ValidationsController.SanitizeRegisterData, UsersController.Register);
    
    /*******************/
    /* AuthController  */
    /*******************/

    router.post(`${apiUrl}/login`, AuthController.AuthenticateUser, UsersController.Logged);

    return router;
}