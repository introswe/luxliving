const express = require('express');
const router = express.Router();
const { query } = require('../database');
const jwt = require('jsonwebtoken');

// Route: Login
router.post('/', async (req, res) => {
    const { email, password } = req.body;

    try {
        const sql = `SELECT * FROM UserInfo WHERE Email = ? AND Password = ? LIMIT 1`;
        const users = await query("users", sql, [email, password]);

        if (users.length > 0) {
            const token = jwt.sign({ email: users[0].Email, userId: users[0].UserID }, process.env.JWT_SECRET);
            res.json({ message: 'Login successful', token: token }); 
        } else {
            res.status(401).json({ message: 'Login failed: User not found or password does not match.' });
        }
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'An error occurred during login', error: error.message });
    }
});

module.exports = router;
