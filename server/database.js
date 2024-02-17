const mysql = require('mysql2/promise');

const dbConfig = {
    host: '34.133.137.184',
    user: 'root',
};

const pools = {};

function getPool(database) {
    if (!pools[database]) {
        pools[database] = mysql.createPool({ ...dbConfig, database });
    }
    return pools[database];
}

async function query(database, sql, params) {
    const pool = getPool(database);
    const [rows, fields] = await pool.execute(sql, params);
    return rows;
}

module.exports = { query };
