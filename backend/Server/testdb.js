const pool = require("../Config/DB"); // importa tu pool de MySQL

async function testConnection() {
  try {
    const [rows] = await pool.query("SELECT NOW() AS fecha");
    
  } catch (err) {
    console.error("Error de conexión:", err);
  } finally {
    pool.end();
  }
}

testConnection();
