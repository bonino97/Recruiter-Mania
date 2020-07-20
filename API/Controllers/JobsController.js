const Job = require('../Models/Job');
const { PaginatedResults } = require('../Helpers/PaginatedResults');

exports.NewJobOptions = (req,res) => {
    res.status(200).json({
        tagLine: 'New Job!',
        subTagLine: 'Complete the form & post your enterprise offer!',
        button: false
    });
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

exports.GetJobs = async (req,res) => {
    try {
        const page = parseInt(req.query.page);
        const limit = parseInt(req.query.limit);
        const jobs = await PaginatedResults(Job, page, limit);

        res.status(200).json(jobs);

    } catch (e) {
        console.error(e);
        return res.status(400).json({message: e.message});
    }
}
