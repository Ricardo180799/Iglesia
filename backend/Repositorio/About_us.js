const db = require("../Config/DB");

exports.getAbout = async () => {
  const query = "SELECT * FROM about_us";
  const [info] = await db.query(query);
  return info;
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
    "UPDATE about_us SET origen = ?, historia = ?, mision = ?, doctrina = ?, valores = ?, equipo_pastoral = ? WHERE ID = ?";
  
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
};