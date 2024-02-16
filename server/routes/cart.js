const express = require('express');
const router = express.Router();

// Route: Cart
router.get('/', (req, res) => {
    res.json({ message: 'This is the Cart Page.' });
});

module.exports = router;