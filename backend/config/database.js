const { Pool } = require('pg')
require('dotenv').config()

const pool = new Pool({
    connectionString: process.env.POSTGRES_URL + "?sslmode=require",
})

pool.connect((err) => {
    if (err) throw err
    console.log('Connect to PostgreSQL successfully!');
})

module.exports = pool