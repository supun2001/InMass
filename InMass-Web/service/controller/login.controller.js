const express = require('express');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const router = express.Router();

let refreshTokens = [];

const admin = [
    {
        username: "admin",
        password: "admin"
    }
]

router.get('/', (req, res) => {
    // Verify the user
    const { username, password } = req.body;
    const user = admin.find((admin) => admin.username === username && admin.password === password); // Corrected the condition

    if (user) {
        // JWT token
        const adminUser = { name: "Welcome", password: "1234" }
        const accessToken = jwt.sign(adminUser, process.env.SECRET_KEY, { expiresIn: '3h' })
        // const refreshToken = jwt.sign(adminUser, process.env.REFRESH_TOKEN, { expiresIn: '24h' })
        // refreshTokens.push(refreshToken)
        // res.send({ accessToken, refreshToken }) // Corrected the property name
        res.send({ accessToken })
    } else {
        res.send("Username and password are wrong")
    }
})

// router.post('/token', (req, res) => {
//     const refreshToken = req.body.refreshToken; // Corrected the variable name
//     if (refreshToken == null) res.sendStatus(401)
//     if (!refreshTokens.includes(refreshToken)) res.sendStatus(403)
//     jwt.verify(refreshToken, process.env.REFRESH_TOKEN, (err, adminUser) => {
//         if (err) res.sendStatus(403)
//         const accessToken = jwt.sign({ username: adminUser.username, password: adminUser.password }, process.env.SECRET_KEY, { expiresIn: '10s' })
//         res.send({ accessToken })
//     })
// })

// router.delete('/logout', (req, res) => {
//     const refreshToken = req.body.refreshToken; // Corrected the variable name
//     refreshTokens = refreshTokens.filter(t => t !== refreshToken)
//     res.sendStatus(204)
// })

module.exports = router;
