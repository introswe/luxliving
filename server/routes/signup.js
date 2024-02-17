const express = require('express');
const router = express.Router();

// Route: Set Up
router.post('/', (req, res) => {
    const { firstName, lastName, email, password } = req.body;
    console.log('Firstname:', firstName, 'Lasname:', lastName, 'Email:', email, 'Password:', password);
    
    res.json({ message: 'Login Successful Server:', user: email });
});

module.exports = router;
