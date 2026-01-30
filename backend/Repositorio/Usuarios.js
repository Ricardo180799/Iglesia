const db = require("../Config/DB");
const bcrypt = require("bcrypt");

exports.getUsers = async (Name) => {
  const query = "SELECT * FROM users WHERE Name = ?";
  const [info] = await db.query(query, [Name]);
  return info;
};

exports.GetId = async (email) => {
  const query = `SELECT ID FROM users WHERE Email = ?`;
  const [[user]] = await db.query(query, [email]);
  return user?.ID || null;
};

exports.Añadir = async (Name, LastName, Email, Password, Avatar = null) => {
  const pass = await bcrypt.hash(Password, 10);
  const [result] = await db.execute(
    "INSERT INTO users (Name,LastName,Email,Password,Avatar) VALUES(?,?,?,?,?)",
    [
      Name ?? null,
      LastName ?? null,
      Email ?? null,
      pass ?? null,
      Avatar ?? null,
    ]
  );
  return { message: "Usuario insertado correctamente", ID: result.insertId };
};

exports.Perfil = async (email) => {
  const [rows] = await db.query(`SELECT * FROM USERS WHERE Email = ?`, [email]);
  return rows[0] || null;
};

exports.AddRol = async (idName, idRol, idA) => {
  const query = `INSERT INTO roles_asignados (Id_User,Id_Rol,Assigned_By) Values (?,?,?)`;
  await db.execute(query, [idName, idRol, idA]);
  return true;
};

exports.GetIdRol = async (id) => {
  const query = "SELECT Id_Rol FROM roles_asignados WHERE Id_User = ?";
  const [rows] = await db.query(query, [id]);
  return rows;
};

exports.GetRol = async (ids) => {
  const query = "SELECT NAME FROM roles WHERE ID = ?";
  const roles = await Promise.all(
    ids.map(async (e) => {
      const [[user]] = await db.query(query, [e.Id_Rol]);
      return user.NAME;
    })
  );
  return roles;
};

exports.DeleteUsuario = async (ID) => {
  const query = "DELETE FROM users WHERE ID = ?";
  await db.execute(query, [ID]);
  return true;
};

exports.getUsersAll = async () => {
  const [row] = await db.query(
    "SELECT users.ID, users.Name,users.LastName,users.Avatar, Group_Concat(roles.Name Separator ',') AS Roles FROM users LEFT JOIN roles_asignados ON users.ID = roles_asignados.ID_User LEFT JOIN roles ON roles_asignados.ID_Rol = roles.ID GROUP BY users.ID"
  );
  return row;
};

exports.GetIdRRR = async (Rol) => {
  const query = "SELECT ID FROM roles WHERE Name = ?"; 
  const [[res]] = await db.execute(query, [Rol]);
  return res?.ID || null;
};

exports.UpdateRol = async (Id_User, Roles, IDM) => {
  const Rols = Array.isArray(Roles) && Roles.length > 0 ? Roles : ["Miembro"];
  const queryGetIds = "SELECT ID FROM roles WHERE Name IN (?)";
  const queryDelete = "DELETE FROM roles_asignados WHERE Id_User = ?";
  const queryInsert = "INSERT INTO roles_asignados (Id_User, Id_Rol, Assigned_By) VALUES ?";

  const [rolesInfo] = await db.query(queryGetIds, [Rols]);
  const idsNuevos = rolesInfo.map((e) => e.ID);

  if (idsNuevos.length === 0) {
    throw new Error("No se encontraron roles válidos en la base de datos.");
  }

  await db.query(queryDelete, [Id_User]);
  const valuesToInsert = idsNuevos.map((idRol) => [Id_User, idRol, IDM]);
  await db.query(queryInsert, [valuesToInsert]);

  return true;
};

exports.verifyEmail = async (Email) => {
  const query = "SELECT * FROM users WHERE Email = ?";
  const [rows] = await db.query(query, [Email]);
  return rows.length > 0;
};