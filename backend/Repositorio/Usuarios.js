const db = require("../Config/DB");
const bcrypt = require("bcrypt");

exports.getUsers = async (Name) => {
   const query = "SELECT * FROM users WHERE Name = ?";
  try {
    const [info] = await db.query(query,[Name]);
    return info;
  } catch (err) {
    throw err;
  }
};
exports.GetId = async (email) => {
  const query = `SELECT ID FROM users WHERE Email = ?`;

  try {
    const [[user]] = await db.query(query, [email]);
    return user?.ID || null;
  } catch (err) {
    throw err;
  }
};
exports.Añadir = async (Name, LastName, Email, Password, Avatar = null) => {
  try {
    const pass = await bcrypt.hash(Password, 10);
    const  [result] = await db.execute(
      "INSERT INTO users (Name,LastName,Email,Password,Avatar) VALUES(?,?,?,?,?)",
      [
        Name ?? null,
        LastName ?? null,
        Email ?? null,
        pass ?? null,
        Avatar ?? null,
      ]
    );
    const message = "Usuario insertado correctamente";
    return { message: message,ID: result.insertId};
  } catch (err) {
    console.error("Error añadiendo a usuario", err);
    throw err;
  }
};
exports.Perfil = async (email) => {
  try {
    const [rows] = await db.query(`SELECT * FROM USERS WHERE Email = ?`, [
      email,
    ]);

    return rows[0] || null;
  } catch (err) {
    console.log(err);
    throw err;
  }
};
exports.AddRol = async (idName, idRol, idA) => {
  const query = `INSERT INTO roles_asignados (Id_User,Id_Rol,Assigned_By) Values (?,?,?)`;
  try {
    await db.execute(query, [idName, idRol, idA]);

    return true;
  } catch (err) {
    throw err;
  }
};
exports.GetIdRol = async (id) => {
  const query = "SELECT Id_Rol FROM roles_asignados WHERE Id_User = ?";
  try {
    const [rows] = await db.query(query, [id]);
    return rows;
  } catch (err) {
    throw err;
  }
};
exports.GetRol = async (ids) => {
  const query = "SELECT NAME FROM roles WHERE ID = ?";
  
  try {
    const roles = await Promise.all(
      ids.map(async (e) => {
        const [[user]] = await db.query(query, [e.Id_Rol]);
        
        return user.NAME;
      })
    );
    return roles;
  } catch (err) {
    throw err;
  }
};

exports.DeleteUsuario = async (ID) => {
  const query = "DELETE FROM users WHERE ID = ?";
  try {
    await db.execute(query, [ID]);
    return true;
  } catch (err) {
    throw err;
  }
};
exports.getUsersAll = async () => {
  try {
    const [row] = await db.query(
      "SELECT users.ID, users.Name,users.LastName,users.Avatar, Group_Concat(roles.Name Separator ',') AS Roles FROM users LEFT JOIN roles_asignados ON users.ID = roles_asignados.ID_User LEFT JOIN roles ON roles_asignados.ID_Rol = roles.ID GROUP BY users.ID"
    );
    return row;
  } catch (err) {
    console.log(err);
    throw err;
  }
};
exports.GetIdRRR = async (Rol) => {
  const query = "SELECT ID";

  try {
    await db.execute(query, [Id_Rol, Id_User]);
    return true;
  } catch (err) {
    throw err;
  }
};

exports.UpdateRol = async (Id_User, Roles, IDM) => {
  const Rols = Array.isArray(Roles) && Roles.length > 0 ? Roles : ["Miembro"];

  const queryGetIds = "SELECT ID FROM roles WHERE Name IN (?)";

  const queryDelete = "DELETE FROM roles_asignados WHERE Id_User = ?";
  const queryInsert =
    "INSERT INTO roles_asignados (Id_User, Id_Rol, Assigned_By) VALUES ?";

  try {
    const [rolesInfo] = await db.query(queryGetIds, [Rols]);

    const idsNuevos = rolesInfo.map((e) => e.ID);

    if (idsNuevos.length === 0) {
      throw new Error("No se encontraron roles válidos en la base de datos.");
    }

    await db.query(queryDelete, [Id_User]);

    const valuesToInsert = idsNuevos.map((idRol) => [Id_User, idRol, IDM]);

    await db.query(queryInsert, [valuesToInsert]);

    return true;
  } catch (err) {
    console.error("Error en repositorio UpdateRol:", err);
    throw err;
  }
};
exports.verifyEmail = async (Email) => {
  const query = "SELECT * FROM users WHERE Email = ?";

  try {
    
    const [rows] = await db.query(query, [Email]);

  
    return rows.length > 0;

  } catch (err) {
    
    console.error("Fallo crítico en verifyEmail:", err.message);
    
   
    throw new Error("DB_CONNECTION_ERROR");
  }
};