const express = require('express');
const router = express.Router();
const { query } = require('../database');

// Route: Set Up
router.post('/', async (req, res) => { 
    const { firstName, lastName, email, password, street, city, state, zipcode, card, expiration, code } = req.body;
   
    console.log(
        'Firstname:', firstName, 
        'Lastname:', lastName, 
        'Email:', email, 
        'Password:', password,
        'Street:', street,
        'City:', city,
        'State:', state,
        'Zipcode:', zipcode,
        'Card Number:', card,
        'Expiration Date:', expiration,
        'Security Code:', code
      );

    try {

        const sql = `
            INSERT INTO UserInfo (FirstName, LastName, Email, Password, Street, City, State, ZipCode, CardNumber, ExpirationDate, SecurityCode)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

        const result = await query("users",sql, [firstName, lastName, email, password, street, city, state, zipcode, card, expiration, code]);
        
        res.json({ message: 'Signup successful!', user: email });
    } catch (error) {
        console.error('Signup error:', error);
        res.status(500).json({ message: 'Error during signup', error: error.message });
    }
});

module.exports = router;
