const db = require("../Config/DB");

exports.getContact_message = async () => {
  const query = "SELECT * FROM contact_messages";
  const [info] = await db.query(query);
  return info;
};

exports.DeleteContact_message = async (ID) => {
  const query = "DELETE FROM contact_messages WHERE ID = ?";
  await db.execute(query, [ID]);
  return true;
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
    "UPDATE contact_messages SET Name = ?, Email = ?, Phone = ?, Message = ?, Type = ? WHERE ID = ?";
  await db.execute(query, [Name, Email, Phone, Message, Type, ID]);
  return true;
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
    "INSERT INTO contact_messages (Name, Apellidos, Email, Teléfono, Mensaje, Tipo) VALUES (?, ?, ?, ?, ?, ?)";
  await db.execute(query, [Name, Apellidos, Email, Teléfono, Mensaje, Tipo]);
  return true;
};