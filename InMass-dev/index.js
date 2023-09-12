const express = require('express')
const companyRoute = require('./service/routes/company.api.routes')
const app =express();

app.use('/api',companyRoute)

const port = process.env.PORT || 3000

app.listen(port,()=>{
    console.log('Server running on http://localhost:${port}')
})