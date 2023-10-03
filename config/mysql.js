const mysql = require('mysql2')
require('dotenv').config()
//Create connection to database
const pool = mysql.createPool({
  host: process.env.HOST,
  user: process.env.USER,
  port: process.env.PORT,
  password: process.env.PASSWORD,
  database: process.env.DATABASE
})

// pool.query(
//   `SELECT * FROM users WHERE id=5`,
//   (error, results, fields) => {
//     if(error) throw new Error('Error querying results: ', error)
//     console.log(results)
//     pool.end()
//   }
// )
module.exports = pool
