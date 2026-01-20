const db = require("../Config/DB");
exports.getContact_message = async () => {
  const query = "SELECT * FROM contact_messages ";

  try {
    const [info] = await db.query(query);
    return info;
  } catch (err) {
    throw err;
  }
};
exports.DeleteContact_message = async (id) => {
  const query = "DELETE FROM contact_messages WHERE ID = ?";
  try {
    await db.execute(query, [id]);
    return true;
  } catch (err) {
    throw err;
  }
};
exports.UpdateContact_message = async (
  Name,
  Email,
  Phone,
  Message,
  Type,
  ID
) => {
  const query =
    "UPDATE  contact_messages SET Name = ?, Email = ?,Phone=?, Message=?,Type=? WHERE ID =?";
  try {
    await db.execute(query, [Name, Email, Phone, Message, Type, ID]);
    return true;
  } catch (err) {
    throw err;
  }
};
exports.AddContact_message = async (
  Name,
  Apellidos,
  Email,
  Teléfono,
  Mensaje,
  Tipo
) => {
  const query =
    "INSERT INTO contact_messages (Name,Apellidos,Email, Teléfono,Mensaje, Tipo)VALUES(?,?,?,?,?,?)";
  try {
    await db.execute(query, [Name, Apellidos, Email, Teléfono, Mensaje, Tipo]);
    return true;
  } catch (err) {
    throw err;
  }
};
