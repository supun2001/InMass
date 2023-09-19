const express = require('express')
const cors = require('cors')
const companyService = require('./service/router/company.router')
const loginService = require('./service/router/login.router');
const adminAuthMiddileware = require('./service/middleware/admin.auth.middileware');

require('dotenv').config();
require('./service/config/db')

const app = express();
app.use('/uploads/comLogos', express.static('uploads/comLogos'));
app.use(cors())
app.use(express.json())
app.use('/admin', loginService)
app.use('/api', adminAuthMiddileware, companyService)

const port = process.env.PORT;

app.listen(port, () => {
    console.log(`Server running on ${port}`)
})

