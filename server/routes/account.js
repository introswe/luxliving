const express = require('express');
const { query } = require('../database'); 
const authenticateToken = require('../authenticateToken'); 

const router = express.Router();

router.get('/info', authenticateToken, async (req, res) => {
  const userEmail = req.user.email;

  try {
    const userInfo = await query('users', 'SELECT firstName, lastName, email, password, street, city, state, zipcode, cardNumber, expirationDate, securityCode FROM UserInfo WHERE email = ?', [userEmail]);
    console.log(userInfo);
    if (userInfo.length > 0) {
      res.json(userInfo[0]);
    } else {
      res.status(404).json({ message: 'User not found.' });
    }
  } catch (error) {
    console.error('Error fetching user info:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/update', authenticateToken, async (req, res) => {
  // Extracting user's email from JWT payload
  const userEmail = req.user.email;
  // Extracting user info from request body
  const { firstName, lastName, street, city, state, zipcode, cardNumber, expirationDate, securityCode } = req.body;

  try {
    // SQL Query to update user information
    const updateSql = `
      UPDATE UserInfo
      SET firstName = ?, lastName = ?, street = ?, city = ?, state = ?, zipcode = ?, cardNumber = ?, expirationDate = ?, securityCode = ?
      WHERE email = ?`;

    // Execute the update query
    const result = await query('users', updateSql, [firstName, lastName, street, city, state, zipcode, cardNumber, expirationDate, securityCode, userEmail]);

    // Check if the update was successful
    if (result.affectedRows > 0) {
      res.json({ message: 'Account information updated successfully!' });
    } else {
      res.status(404).json({ message: 'User not found.' });
    }
  } catch (error) {
    console.error('Error updating account info:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;