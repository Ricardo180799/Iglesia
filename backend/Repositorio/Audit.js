const db = require("../Config/DB");

exports.audit = async (User_Id, Action, Module, Details) => {
  const query =
    "INSERT INTO audit (User_Id, Action, Module, Details) VALUES (?, ?, ?, ?)";
  
  await db.execute(query, [User_Id, Action, Module, Details]);
  return true;
};

exports.getAudit = async () => {
  // Ordenado por ID descendente para ver lo más nuevo primero
  const query = "SELECT * FROM audit ORDER BY ID DESC";
  const [info] = await db.query(query);
  return info;
};

exports.getEspecificAudit = async (User_Id) => {
  const query = "SELECT * FROM audit WHERE User_Id = ? ORDER BY ID DESC";
  const [info] = await db.query(query, [User_Id]);
  return info;
};

exports.DeleteAudit = async (ID) => {
  const query = "DELETE FROM audit WHERE ID = ?";
  await db.execute(query, [ID]);
  return true;
};