const express = require('express')
const router = express.Router();

router.use('/login', require('../controller/login.controller'))
module.exports = router;