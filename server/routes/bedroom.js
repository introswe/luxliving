const express = require('express');
const router = express.Router();

// Route: Bedroom
router.get('/', (req, res) => {
    res.json({ message: 'This is the Bed Page.' });
});

module.exports = router;