const express = require('express');
const router = express.Router();

// Route: Living Room
router.get('/', (req, res) => {
    res.json({ message: 'This is the Living Room.' });
});

module.exports = router;
