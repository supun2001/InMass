const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser');
const companyService = require('./service/router/main.router')
const loginService = require('./service/router/login.router');
const adminAuthMiddileware = require('./service/middleware/admin.auth.middileware');

require('dotenv').config();
require('./service/config/db')

const app = express();
app.use(cors())

app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use('/uploads/comLogos', express.static('uploads/comLogos'));
app.use('/uploads/jobPosts', express.static('uploads/jobPosts'));
app.use(express.json())
app.use('/admin', loginService)
app.use('/api', adminAuthMiddileware, companyService)

const port = process.env.PORT;

app.listen(port, () => {
    console.log(`Server running on ${port}`)
})

