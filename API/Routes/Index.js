const express = require('express');
const router = express.Router();

//Controllers 
const HomeController = require('../Controllers/HomeController');
const JobsController = require('../Controllers/JobsController');

module.exports = () => {
    /********************/
    /*  HomeController  */
    /********************/
    
    router.get('/api', HomeController.HomeOptions);
    
    /********************/
    /*  JobsController  */
    /********************/
    /* GET */
    router.get('/api/jobs', JobsController.GetJobs);
    router.get('/api/job/:url', JobsController.GetJobByUrl);
    
    /* POST */
    // Cargar Nuevo Trabajo o Vacante.
    router.post('/api/job/new', JobsController.NewJob);

    /* PUT */
    //Actualizar Trabajo
    router.put('/api/job/:url', JobsController.UpdateJob)
    
    /*******************/
    /* UsersController */
    /*******************/
    

    return router;
}