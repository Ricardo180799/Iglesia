const db = require("../Config/DB");
exports.audit = async (User_Id, Action, Module, Details) => {
  const query =
    "INSERT INTO audit (User_Id, Action, Module, Details)VALUES(?,?,?,?)";
  try {
    await db.execute(query, [User_Id, Action, Module, Details]);
    return true;
  } catch (err) {
    throw err;
  }
};
exports.getAudit = async () => {
  const query = "SELECT * FROM audit";
  try {
    const [info] = await db.query(query);
    return info;
  } catch (err) {
    throw err;
  }
};
exports.getEspecificAudit = async (User_Id) => {
  const query = "SELECT * FROM audit WHERE User_Id = ?";
  try {
    const [info] = await db.query(query, [User_Id]);
    return info;
  } catch (err) {
    throw err;
  }
};
exports.DeleteAudit = async (id) => {
  const query = "DELETE FROM audit WHERE ID = ?";
  try {
    await db.execute(query, [id]);
    return true;
  } catch (err) {
    throw err;
  }
};
