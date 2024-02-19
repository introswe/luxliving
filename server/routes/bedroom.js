const express = require('express');
const { query } = require('../database'); 
const authenticateToken = require('../authenticateToken');

const router = express.Router();

router.get('/info', authenticateToken, async (req, res) => {
    try {
      const bedroomFurniture = await query('furniture', 'SELECT * FROM Bedroom');
      console.log(bedroomFurniture);
      res.json(bedroomFurniture.length > 0 ? bedroomFurniture : []);
    } catch (error) {
      console.error('Error fetching bedroom furniture:', error);
      res.status(500).json({ message: 'Server error' });
    }
  });  
  
module.exports = router;