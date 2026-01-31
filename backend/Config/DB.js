const mysql = require("mysql2/promise");

// Asegúrate de que estos nombres coincidan 100% con tu archivo .env
const host = process.env.DB_HOST;
const user = process.env.DB_USER;
const password = process.env.DB_PASS;
const database = process.env.DB_NAME; // Cambiado a DB_NAME para ser más estándar

const pool = mysql.createPool({
  host: host,
  user: user,
  password: password,
  database: database,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

module.exports = pool;