const express = require('express');
const router = express.Router();

// Route: Bedroom
router.get('/', (req, res) => {
    res.json({ message: 'This is the Bedroom.' });
});

module.exports = router;
