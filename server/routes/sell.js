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

router.post('/update', authenticateToken, async (req, res) => {
  const { id, title, image, description, price } = req.body;
  try {
    const updateSql = `
      UPDATE Bedroom
      SET title = ?, image = ?, description = ?, price = ?
      WHERE id = ?`;
    const result = await query('furniture', updateSql, [title, image, description, price, id]);
    if (result.affectedRows > 0) {
      res.json({ message: 'Bedroom furniture updated successfully!' });
    } else {
      res.status(404).json({ message: 'Furniture item not found.' });
    }
  } catch (error) {
    console.error('Error updating bedroom furniture:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/add', authenticateToken, async (req, res) => {
  const { title, image, description, price } = req.body;
  try {
    const insertSql = `
      INSERT INTO Bedroom (title, image, description, price)
      VALUES (?, ?, ?, ?)`;
    const result = await query('furniture', insertSql, [title, image, description, price]);
    if (result.affectedRows > 0) {
      res.status(201).json({ message: 'New bedroom furniture added successfully!' });
    } else {
      res.status(400).json({ message: 'Failed to add new furniture item.' });
    }
  } catch (error) {
    console.error('Error adding new bedroom furniture:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.delete('/delete/:itemID', authenticateToken, async (req, res) => {
  const { itemID } = req.params;
  try {
    const deleteSql = `
      DELETE FROM Bedroom
      WHERE id = ?`;
    const result = await query('furniture', deleteSql, [itemID]);
    if (result.affectedRows > 0) {
      res.json({ message: 'Bedroom furniture deleted successfully!' });
    } else {
      res.status(404).json({ message: 'Furniture item not found or already deleted.' });
    }
  } catch (error) {
    console.error('Error deleting bedroom furniture:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
