const express = require('express');
const companyRoutes = require('./service/routes/company.routes');

require('dotenv').config();
require('./service/config/db')

const app = express();

app.use('/api', companyRoutes);

const port = process.env.PORT;

app.listen(port, () => {
    console.log("Server running")
})