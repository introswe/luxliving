const express = require('express');
const router = express.Router();

// Route: Storage
router.get('/', (req, res) => {
    res.json({ message: 'This is the Storage.' });
});

module.exports = router;
