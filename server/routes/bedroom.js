const express = require('express');
const { query } = require('../database'); 

const router = express.Router();

router.get('/info', async (req, res) => {
    try {
        const furniture = await query('furniture', 'SELECT * FROM Bedroom');
        console.log(furniture);
        res.json(furniture.length > 0 ? furniture : []);
    } catch (error) {
        console.error('Error fetching bedroom furniture:', error);
        res.status(500).json({ message: 'Server error' });
    }
});  
  
module.exports = router;
