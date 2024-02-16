const express = require('express');
const router = express.Router();

// Route: Account
router.get('/', (req, res) => {
    res.json({ message: 'The Account Page.' });
});

module.exports = router;
