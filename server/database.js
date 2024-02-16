const mysql = require('mysql2/promise');

// Database configuration
const dbConfig = {
    host: '34.133.137.184',
    user: 'root', 
    database: 'furniture' 
  };

// Creates connection pool 
const pool = mysql.createPool(dbConfig);

async function query(sql, params) {
    const [rows, fields] = await pool.execute(sql, params);
    return rows;
}

module.exports = {query};