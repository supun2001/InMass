const express = require('express')
const companyService = require('./service/router/company.router')

require('dotenv').config();
require('./service/config/db')

const app = express();

app.use(express.json())
app.use('/api', companyService)

const port = process.env.PORT;

app.listen(port, () => {
    console.log(`Server running on ${port}`)
})

