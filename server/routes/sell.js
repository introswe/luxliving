const express = require('express');
const { query } = require('../database'); 
const authenticateToken = require('../authenticateToken');

const router = express.Router();

const validTables = ['Bedroom', 'Furniture', 'Livingroom', 'Storage'];

router.get('/info/:table', authenticateToken, async (req, res) => {
    const { table } = req.params;
    if (!validTables.includes(table)) {
      return res.status(400).json({ message: 'Invalid table name.' });
    }
    try {
      const furnitureData = await query('furniture', `SELECT * FROM ${table}`);
      console.log(furnitureData);
      res.json(furnitureData.length > 0 ? furnitureData : []);
    } catch (error) {
      console.error(`Error fetching data from ${tableName}:`, error);
      res.status(500).json({ message: 'Server error' });
    }
  });  

  router.post('/update/:table', authenticateToken, async (req, res) => {
    const { table } = req.params;
    if (!validTables.includes(table)) {
      return res.status(400).json({ message: 'Invalid table name.' });
    }
    const { id, title, image, description, price } = req.body;
    try {
        const updateSql = `UPDATE ${table} SET title = ?, image = ?, description = ?, price = ? WHERE id = ?`;
        const result = await query('furniture', updateSql, [title, image, description, price, id]);
        if (result.affectedRows > 0) {
            res.json({ message: `${table} item updated successfully!` });
        } else {
            res.status(404).json({ message: 'Item not found.' });
        }
    } catch (error) {
        console.error(`Error updating item in ${table}:`, error);
        res.status(500).json({ message: 'Server error' });
    }
});


router.post('/add/:table', authenticateToken, async (req, res) => {
  const { table } = req.params;
  const { title, image, description, price } = req.body;
  if (!validTables.includes(table)) {
    return res.status(400).json({ message: 'Invalid table name.' });
  }

  try {
    const insertSql = `INSERT INTO ${table} (title, image, description, price) VALUES (?, ?, ?, ?)`;
    const result = await query('furniture', insertSql, [title, image, description, price]);
    if (result.affectedRows > 0) {
      res.status(201).json({ message: `New item added successfully to ${table}!` });
    } else {
      res.status(400).json({ message: 'Failed to add new furniture item.' });
    }
  } catch (error) {
    console.error(`Error adding new item to ${table}:`, error);
    res.status(500).json({ message: 'Server error' });
  }
});


router.delete('/delete/:table/:itemID', authenticateToken, async (req, res) => {
  const { table, itemID } = req.params;
  if (!validTables.includes(table)) {
    return res.status(400).json({ message: 'Invalid table name.' });
  }

  try {
    const deleteSql = `DELETE FROM ${table} WHERE id = ?`;
    const result = await query('furniture', deleteSql, [itemID]);
    if (result.affectedRows > 0) {
      res.json({ message: `Item deleted successfully from ${table}.` });
    } else {
      res.status(404).json({ message: 'Furniture item not found or already deleted.' });
    }
  } catch (error) {
    console.error(`Error deleting item from ${table}:`, error);
    res.status(500).json({ message: 'Server error' });
  }
});


module.exports = router;