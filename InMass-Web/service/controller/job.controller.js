const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const job = require('../model/jobs.model');

// File path
const storage = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, 'uploads/jobPosts');
    },
    filename: (req, file, callBack) => {
        callBack(null, Date.now() + '-' + file.originalname);
    },
});

const uploads = multer({ storage: storage });

router.get('/', (req, res) => {
    // Fetch all companies
    job.find()
        .then(docs => {
            res.status(200).send(docs)
        })
        .catch(err => {
            res.status(500).send(err)
        });
});

router.post('/', uploads.single('j_post'), async (req, res) => {
    // Create a new company
    try {
        // Check if a file is uploaded
        if (!req.file) {
            return res.status(400).json({ success: false, message: 'No file uploaded' });
        }

        // Extract company data from the request body
        const jobData = req.body;
        jobData.j_post = req.file.filename;

        const createJob = await job.create(jobData);

        return res.status(201).json({ success: true, company: jobData });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
});

router.get('/:id', (req, res) => {
    // Get company by ID
    const id = req.params.id;
    job.findById(id)
        .then(doc => {
            if (!doc) {
                return res.status(404).json({ success: false, message: 'Company not found' });
            }
            res.status(200).json({ success: true, job: doc });
        })
        .catch(err => {
            res.status(500).json({ success: false, error: err.message });
        });
});

router.put('/:id', uploads.single('j_post'), (req, res) => {
    // Update company by ID
    const id = req.params.id;
    const obj = req.body;

    // Check if a new file is uploaded
    if (req.file) {
        // Delete the old file associated with the company logo (if it exists)
        job.findById(id)
            .then(oldJob => {
                if (oldJob && oldJob.j_post) {
                    const filePath = path.join('uploads/jobPosts', oldJob.j_post);
                    fs.unlinkSync(filePath);
                }
            });

        // Update the company's c_logo field with the new filename
        obj.j_post = req.file.filename;
    }

    job.findByIdAndUpdate(id, obj)
        .then(doc => {
            if (!doc) {
                return res.status(404).json({ success: false, message: 'Job not found' });
            }
            res.status(200).json({ success: true, job: obj });
        })
        .catch(err => {
            res.status(500).json({ success: false, error: err.message });
        });
});

router.delete('/:id', (req, res) => {
    // Delete company by ID
    const id = req.params.id;

    // Find the company to get the filename of the associated logo
    job.findById(id)
        .then(jobToDelete => {
            if (!jobToDelete) {
                return res.status(404).json({ success: false, message: 'Job not found' });
            }

            // Delete the associated file from 'uploads/comLogos' (if it exists)
            if (jobToDelete.j_post) {
                const filePath = path.join('uploads/jobPosts', jobToDelete.j_post);
                fs.unlinkSync(filePath);
            }

            // Delete the company document from MongoDB using deleteOne
            job.deleteOne({ _id: id })
                .then(() => {
                    res.status(200).json({ success: true, message: 'Job deleted' });
                })
                .catch(err => {
                    res.status(500).json({ success: false, error: err.message });
                });
        })
        .catch(err => {
            res.status(500).json({ success: false, error: err.message });
        });
});


module.exports = router;
