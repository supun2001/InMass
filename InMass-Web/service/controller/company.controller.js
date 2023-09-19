const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const company = require('../model/company.model');

// File path
const storage = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, 'uploads/comLogos');
    },
    filename: (req, file, callBack) => {
        callBack(null, Date.now() + '-' + file.originalname);
    },
});

const uploads = multer({ storage: storage });

router.get('/', (req, res) => {
    // Fetch all companies
    company.find()
        .then(docs => {
            res.status(200).send(docs)
        })
        .catch(err => {
            res.status(500).send(err)
        });
});

router.post('/', uploads.single('c_logo'), async (req, res) => {
    // Create a new company
    try {
        // Check if a file is uploaded
        if (!req.file) {
            return res.status(400).json({ success: false, message: 'No file uploaded' });
        }

        // Extract company data from the request body
        const companyData = req.body;
        companyData.c_logo = req.file.filename;

        const createdCompany = await company.create(companyData);

        return res.status(201).json({ success: true, company: createdCompany });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
});

router.get('/:id', (req, res) => {
    // Get company by ID
    const id = req.params.id;
    company.findById(id)
        .then(doc => {
            if (!doc) {
                return res.status(404).json({ success: false, message: 'Company not found' });
            }
            res.status(200).json({ success: true, company: doc });
        })
        .catch(err => {
            res.status(500).json({ success: false, error: err.message });
        });
});

router.put('/:id', uploads.single('c_logo'), (req, res) => {
    // Update company by ID
    const id = req.params.id;
    const obj = req.body;

    // Check if a new file is uploaded
    if (req.file) {
        // Delete the old file associated with the company logo (if it exists)
        company.findById(id)
            .then(oldCompany => {
                if (oldCompany && oldCompany.c_logo) {
                    const filePath = path.join('uploads/comLogos', oldCompany.c_logo);
                    fs.unlinkSync(filePath);
                }
            });

        // Update the company's c_logo field with the new filename
        obj.c_logo = req.file.filename;
    }

    company.findByIdAndUpdate(id, obj)
        .then(doc => {
            if (!doc) {
                return res.status(404).json({ success: false, message: 'Company not found' });
            }
            res.status(200).json({ success: true, company: obj });
        })
        .catch(err => {
            res.status(500).json({ success: false, error: err.message });
        });
});

router.delete('/:id', (req, res) => {
    // Delete company by ID
    const id = req.params.id;

    // Find the company to get the filename of the associated logo
    company.findById(id)
        .then(companyToDelete => {
            if (!companyToDelete) {
                return res.status(404).json({ success: false, message: 'Company not found' });
            }

            // Delete the associated file from 'uploads/comLogos' (if it exists)
            if (companyToDelete.c_logo) {
                const filePath = path.join('uploads/comLogos', companyToDelete.c_logo);
                fs.unlinkSync(filePath);
            }

            // Delete the company document from MongoDB using deleteOne
            company.deleteOne({ _id: id })
                .then(() => {
                    res.status(200).json({ success: true, message: 'Company deleted' });
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
