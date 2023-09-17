const express = require('express')

const router = express.Router();

router.use('/company', require('../controller/company.controller'))

module.exports = router;