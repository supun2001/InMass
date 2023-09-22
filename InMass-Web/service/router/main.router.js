const express = require('express')

const router = express.Router();

router.use('/company', require('../controller/company.controller'))
router.use('/job', require('../controller/job.controller'))

module.exports = router;