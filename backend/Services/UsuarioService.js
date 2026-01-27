const { getUsers } = require("../Repositorio/Usuarios");
const bcrypt = require("bcrypt");
const { Perfil } = require("../Repositorio/Usuarios");
const db = require("../Config/DB");
exports.Registro = async (email) => {
  try {
    const [rows] = await db.query("SELECT * FROM users WHERE Email = ?", [
      email,
    ]);
    return rows[0] || false;
  } catch (err) {
    console.error("Error verificando email:", err);
    throw err;
  }
};

exports.Sesion = async (Name, Pass) => {
  const row = await getUsers();
  const u = row.find((u) => u.Name === Name);
  const hash = u.Password;
  try {
    const valida = await bcrypt.compare(Pass, hash);
    return { valida: valida, info: u };
  } catch (err) {
    throw err;
  }
};
exports.Perfils = async (email) => {
  const info = await Perfil(email);
  

  return {
    usuario: info[0].Name,
    Creado: info[0].Created_At,
    Avatar: info[0].Avatar,
  };
};
