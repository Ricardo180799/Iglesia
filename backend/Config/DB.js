const mysql = require("mysql2/promise");

const host = process.env.DB_HOST
const user = process.env.DB_USER
const password = process.env.DB_PASS
const database = process.env.DB_Database

const pool = mysql.createPool({
  host: host,
  user:user,
  password: password,
  database: database,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});
module.exports = pool;
