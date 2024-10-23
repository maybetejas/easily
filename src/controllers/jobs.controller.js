import { validationResult } from 'express-validator';
import JobsModel from '../models/jobs.model.js';


export default class JobsController {

    getJobs(req, res) {
        const jobs = JobsModel.returnJobs();
        res.render('jobs', { jobs: jobs })
    }

    getJobDetails(req, res) {
        const jobId = parseInt(req.params.id);
        const jobs = JobsModel.returnJobs();
        const job = jobs.find(j => j.id === jobId);
        if (job) {
            res.render('job-details', { job: job, errors: null, status: null })
        } else {
            res.status(400).send('Job not found sorry');
        }
    }

    submitJob(req, res) {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            const errorMessages = errors.array().map(error => error.msg);
            const jobId = parseInt(req.params.id);
            const jobs = JobsModel.returnJobs();
            const job = jobs.find(j => j.id === jobId);
            if (job) {
                res.render('job-details', { job: job, errors: errorMessages, status: null })
            } else {
                res.status(400).send('Job not found sorry');
            }
        } else {
            const submitStatus = JobsModel.addApplicant(req.body, req.file, parseInt(req.params.id))
           
            const jobId = parseInt(req.params.id);
            const jobs = JobsModel.returnJobs();
            const job = jobs.find(j => j.id === jobId);
            if (job) {
                res.render('job-details', { job: job, errors: null, status: submitStatus })
            } else {
                res.status(400).send('Job not found sorry');
            }
        }
    }

    postJob(req, res) {
        if (!req.session.user) {
            res.render('unavailable-page');
        } else {
            res.render('post-job');
        }
    }

    addJob(req, res) {
        const postJobStatus = JobsModel.addJob(req.body);
        if (postJobStatus) {
            res.redirect('/jobs')
        }
    }

    dltJob(req, res) {
        const dltStatus = JobsModel.deleteJob(parseInt(req.params.id));
        if (dltStatus) {
            res.redirect('/jobs');
        }
    }

    editJobShow(req, res) {
        const jobId = parseInt(req.params.id);
        const jobs = JobsModel.returnJobs();
        const job = jobs.find(j => j.id === jobId);
        res.render('edit-job', { job });
    }

    editJob(req, res) {
        const status = JobsModel.editJobEntry(req.body, req.params.id);
        if (status) {
            res.redirect(`/jobs/${req.params.id}`);
        }
    }

    viewApplicants(req, res) {
        const jobId = req.params.id; // Getting the job ID from the route
        console.log(jobId); // Logging it for debugging
        const applications = JobsModel.returnApplicants(jobId); 
        res.render('applicants', { applications: applications }); // Passing the applicants to the view
    }
    

}