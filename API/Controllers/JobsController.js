const Job = require('../Models/Job');
const { PaginatedResults, PaginatedResultsById } = require('../Helpers/PaginatedResults');
const multer = require('multer');
const shortid = require('shortid');

exports.GetJobs = async (req,res) => {
    try {
        const page = parseInt(req.query.page);
        const limit = parseInt(req.query.limit);
        const jobs = await PaginatedResults(Job, page, limit);

        return res.status(200).json(jobs);

    } catch (e) {
        console.error(e);
        return res.status(400).json({message: e.message});
    }
}

exports.GetJobByUrl = async (req, res, next) => {
    try {
        const job = await Job.findOne({Url: req.params.url});
        if(!job) return next();
        return res.status(200).json(job);
    } catch (e) {
        console.error(e);
        return res.status(400).json({message: e.message})
    }
}

exports.NewJob = async (req,res) => {
    try{
        
        const job = new Job(req.body);  
        job.User = req.user._id;
        const jobInstance = await job.save();
        return res.status(200).json({jobInstance});
    } catch (e) {
        console.error(e);
        return res.status(400).json({message: e.message});
    }
}

exports.UpdateJob = async (req,res) => {
    try{

        const updatedJob = req.body;
        const job = await Job.findOneAndUpdate(
            {Url: req.params.url},
            updatedJob,
            {new: true, runValidators: true}
        );
        
        return res.status(200).json({
            success: true,
            data: job,
            message: 'Job Updated successfully...'
        });

    } catch (e) {
        console.error(e);
        return res.status(400).json({message: e.message});
    }
}

exports.GetJobsByUserId = async (req,res) => {
    try{
        const page = parseInt(req.query.page);
        const limit = parseInt(req.query.limit);
        
        const queryFilter = {User: req.user._id};
        const jobs = await PaginatedResultsById(Job, queryFilter, page, limit);
        return res.status(200).json({jobs});

    } catch (e) {
        console.error(e);
        return res.status(400).json({
            message: e.message
        });
    }
}

exports.DeleteJob = async (req,res) => {
    try{
        const { id } = req.params;
        const job = await Job.findById(id);

        if(VerifyUser(job, req.user)){ //Valido que el usuario que elimina, es el usuario autor de la posicion de trabajo.
            await job.remove();
            return res.status(200).json({success: true, message: `${job.Title} position deleted correctly...`});
        } 
        
        return res.status(401).json({success: false, message: `You haven't got permission to delete this job. But keep trying, happy hacking :)`});

    } catch(e) {
        console.error(e);
    }
}

const VerifyUser = (job = {}, user = {}) => {
    if(!job.User.equals(user._id)){
        return false;
    }
    return true;
}

const multerConfig = {
    limits: { fileSize: 2000000 }, // 2 mb,
    storage: filerStorage = multer.diskStorage({
        destination: (req,file,cb) => {
            cb(null, __dirname+'../../Uploads/Resumes');
        }, 
        filename: (req,file,cb) => {
            const extension = file.mimetype.split('/')[1];
            cb(null, `${shortid.generate()}.${extension}`);
        }
    }),
    fileFilter(req,file,cb) {
        if(file.mimetype === 'application/pdf') {
            // el cb se ejecuta como true o false : true cuando la imagen se acepta
            cb(null, true);
        } else {
            
            cb(new Error('Invalid format, only PDF allowed...'));
        }
    }
}

const Upload = multer(multerConfig).single('Resume');

exports.SendResume = async (req,res,next) => {
    try {
        Upload(req,res,function(error){
            if(error) {
                console.log(error);
                if(error instanceof multer.MulterError) {
                    if(error.code == 'LIMIT_FILE_SIZE') {
                        
                        return res.status(400).json({
                            success: false,
                            message:'File Exceed 2MB'
                        });

                    } else {
                        return res.status(400).json({
                            success: false,
                            message: error.message
                        });
                    }
                } else {
                    return res.status(400).json({
                        success: false,
                        message: error.message
                    });
                }
            } else {
                return next();
            }
        });
    } catch (e) {
        console.error(e);
    }
}

exports.SaveCandidate = async (req,res) => {
    try{

        const job = await Job.findOne({Url: req.params.url});

        if(!job) {
            return res.status(400).json({
                success: false,
                message: 'Job not found...'
            });
        }

        if(job.Candidates == null){
            job.Candidates = [];
        }

        let candidates = {
                FirstName: req.body.FirstName,
                LastName: req.body.LastName,
                Email: req.body.Email,
                LinkedinUrl: req.body.LinkedinUrl,
                Resume: req.file.filename
        }

        job.Candidates.push(candidates);

        var jobUpdated = await job.save();

        console.log(jobUpdated);

        return res.status(200).json({
            success: true,
            message: 'Resume sended successfully'
        });

    } catch (e) {
        console.error(e)
        return res.status(400).json({
            success: false,
            message: 'Something wrong...'
        });
    }

}

exports.GetCandidatesPerJob = async (req,res) => {
    const job = await Job.findOne({Url: req.params.url});
    
    if(!job) {
        return res.status(400).json({
            success: false,
            message: 'Job not found...'
        });
    }
    
    if(job.User == req.user._id.toString()){ //Valido filtrado de informacion. Para q otro no vea las vacantes.
        
        return res.status(200).json({
            success: true,
            data: job.Candidates
        });

    } else {
        return res.status(401).json({
            success: false,
            message: 'Unauthorized.'
        });
    }
}
