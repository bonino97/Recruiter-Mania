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
    router.get(`${apiUrl}/my-jobs`, JobsController.GetJobsByUserId);
    
    /* POST */
    // Cargar Nuevo Trabajo o Vacante.
    router.post(`${apiUrl}/job/new`, AuthController.VerifyUser, ValidationsController.SanitizeJobData, JobsController.NewJob);

    /* PUT */
    //Actualizar Trabajo
    router.put(`${apiUrl}/job/:url`, AuthController.VerifyUser, ValidationsController.SanitizeJobData, JobsController.UpdateJob);

    /* DELETE */
    router.delete(`${apiUrl}/job/:id`, AuthController.VerifyUser, JobsController.DeleteJob);
    
    /*******************/
    /* UsersController */
    /*******************/

    router.post(`${apiUrl}/register`, ValidationsController.SanitizeRegisterData, UsersController.Register);
    router.get(`${apiUrl}/me`, AuthController.VerifyUser, UsersController.GetMyInstance);
    router.put(`${apiUrl}/me`, AuthController.VerifyUser, ValidationsController.SanitizeProfile, UsersController.UpdateProfile);
    router.put(`${apiUrl}/me/avatar`, AuthController.VerifyUser, UsersController.UploadAvatar, UsersController.UpdateProfileAvatar);

    /*******************/
    /* AuthController  */
    /*******************/

    router.post(`${apiUrl}/login`, AuthController.AuthenticateUser);
    router.post(`${apiUrl}/logout`, AuthController.Logout);

    return router;
}