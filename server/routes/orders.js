const express = require('express');
const router = express.Router();

// Route: Orders
router.get('/', (req, res) => {
    res.json({ message: 'This is the Orders Page.' });
});

module.exports = router;