const express = require('express');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const router = express.Router();

// Removed refresh token related code
// let refreshTokens = [];

const admin = [
    {
        username: process.env.ADMIN_USERNAME,
        password: process.env.ADMIN_PASSWORD,
    }
]

router.post('/', (req, res) => {
    // Verify the user
    const { username, password } = req.body;
    const user = admin.find((admin) => admin.username === username && admin.password === password);
    if (user) {
        // JWT token
        const adminUser = { name: "Welcome", password: "1234" }
        const accessToken = jwt.sign(adminUser, process.env.SECRET_KEY, { expiresIn: '3h' });
        res.status(200).send({ message: 'Login successful', accessToken });
    } else {
        res.status(401).send("Username and password are wrong");
    }
})

// Removed token and logout routes

module.exports = router;
