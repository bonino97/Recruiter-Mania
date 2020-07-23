const Job = require('../Models/Job');
const { PaginatedResults } = require('../Helpers/PaginatedResults');

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
        console.log(req.body);
        const job = new Job(req.body);  
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
