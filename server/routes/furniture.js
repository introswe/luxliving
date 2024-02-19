const express = require('express');
const router = express.Router();

// Route: Furniture
router.get('/', (req, res) => {
    res.json({ message: 'This is the Furniture.' });
});

module.exports = router;
