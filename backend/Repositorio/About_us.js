const db = require("../Config/DB");
exports.getAbout = async () => {
  const query = "SELECT * FROM about_us ";

  try {
    const [info] = await db.query(query);
    return info;
  } catch (err) {
    throw err;
  }
};

exports.UpdateAbout = async (
  origen,
  historia,
  mision,
  doctrina,
  valores,
  equipo_pastoral,
  ID
) => {
  const query =
    "UPDATE about_us SET origen = ?, historia = ?, mision=?,doctrina=?,valores=?,equipo_pastoral=? WHERE ID = ?";
  try {
    await db.execute(query, [
      origen,
      historia,
      mision,
      doctrina,
      valores,
      equipo_pastoral,
      ID,
    ]);
    return true;
  } catch (err) {
    throw err;
  }
};
