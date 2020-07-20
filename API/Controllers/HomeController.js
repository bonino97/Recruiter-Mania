const Job = require('../Models/Job');

exports.HomeOptions = async (req, res, next) => { //Mostrar Trabajos en el Curso

    res.status(200).json({
        tagLine: 'Find, Share & Post Developers Jobs!',
        bar: true,
        postJobButton: true
    });
}