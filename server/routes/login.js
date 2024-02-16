const express = require('express');
const router = express.Router();

// Route: Login
router.get('/', (req, res) => {
    res.json({ message: 'This is the Login Page.' });
});

module.exports = router;
