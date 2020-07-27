const Job = require('../Models/Job');
const { PaginatedResults, PaginatedResultsById } = require('../Helpers/PaginatedResults');

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
        
        return res.status(200).json({job});
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
        return res.status(400).json({message: e.message});
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