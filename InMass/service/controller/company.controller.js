const express = require('express');

const router = express.Router();
const company = require('../model/company.model')

router.get('/', (req, res) => {
    company.find().then(docs => {
        res.send(docs)
    }).catch(err => {
        res.status(500).send(err)
    })
}).get('/:id', (req, res) => {
    let id = req.params.id;
    company.findById(id).then(docs => {
        res.send(docs)
    }).catch(err => {
        res.status(500).send(err)
    })
}).post('/', (req, res) => {
    const obj = req.body;
    company.create(obj).then(docs => {
        res.status(201).send(docs)
    }).catch(err => {
        res.status(500).send(err)
    })
}).put('/:id', (req, res) => {
    let id = req.params.id;
    const obj = req.body;
    company.findByIdAndUpdate(id, {
        c_name: obj.c_name,
        c_logo: obj.c_logo,
        c_description: obj.c_description,
        c_address: obj.c_address,
        facebook: obj.facebook,
        linkedin: obj.linkedin,
        hr_name: obj.hr_name,
        hr_email: obj.hr_email,
        hr_number: obj.hr_number
    }).then((docs) => {
        res.status(201).send(docs)
    }).catch((err, docs) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(200).send(docs)
        }
    })
}).delete('/:id', (req, res) => {
    let id = req.params.id;
    company.findByIdAndDelete(id).then(docs => {
        res.send(docs)
    }).catch(err => {
        res.status(500).send(err)
    })
})

module.exports = router;