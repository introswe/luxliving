const express = require('express');
const router = express.Router();

// Route: Login
router.post('/', (req, res) => {
    const { username, password } = req.body;
    console.log('Username:', username, 'Password:', password);
    
    res.json({ message: 'Login Successful Server:', user: username });
});

module.exports = router;
