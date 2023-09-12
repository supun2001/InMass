const mongoose = require('mongoose')

const secretUrl = process.env.SECRET_URL;

mongoose.connect(secretUrl);
mongoose.connection.on('connected', () => {
    console.log("Connected")
})

mongoose.connection.on('error', (err) => {
    console.log(err)
})