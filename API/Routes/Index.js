const express = require('express');
const router = express.Router();

//Controllers 
const HomeController = require('../Controllers/HomeController');
const JobsController = require('../Controllers/JobsController');

module.exports = () => {
    //Home
    router.get('/api', HomeController.HomeOptions);
    
    // Banner Formulario - Nuevo Trabajo
    // router.get('/api/job/new', JobsController.NewJobOptions);
    
    router.get('/api/jobs', JobsController.GetJobs);
    router.get('/api/job/:url', JobsController.GetJobByUrl);
    

    // Cargar Nuevo Trabajo o Vacante.
    router.post('/api/job/new', JobsController.NewJob);

    //Actualizar Trabajo
    router.put('/api/job/:url', JobsController.UpdateJob)

    return router;
}