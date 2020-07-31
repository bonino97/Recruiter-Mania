const Job = require('../Models/Job');

exports.HomeOptions = async (req, res, next) => { //Mostrar Trabajos en el Curso

    res.status(200).json({
        tagLine: 'Find, Share or Post a Job position!',
        bar: true,
        postJobButton: false,
        home: true
    });
}

exports.PanelOptions = async (req, res, next) => { //Mostrar Trabajos en el Curso

    res.status(200).json({
        tagLine: 'Admin Panel',
        subTagLine: 'Manage your Jobs position from here...',
        postJobButton: true,
        editProfileButton: true,
        panel: true
    });
}