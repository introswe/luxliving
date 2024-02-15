const mysql = require('mysql2/promise');

// Database configuration
const dbConfig = {
    host: 'localhost',
    user: 'root', 
    password: 'luxliving', 
    database: 'furniture' 
  };

// Creates connection pool 
const pool = mysql.createPool(dbConfig);

async function query(sql, params) {
    const [rows, fields] = await pool.execute(sql, params);
    return rows;
}

module.exports = {query};