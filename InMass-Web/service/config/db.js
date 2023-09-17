const mongoose = require('mongoose')

const db_url = process.env.SECRET_URL;

mongoose.connect(db_url);

mongoose.connection.on('connected', () => {
    console.log('Connected')
})

mongoose.connection.on('error', (err) => {
    console.log(err)
})