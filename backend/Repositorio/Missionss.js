const db = require("../Config/DB");

exports.getMissions = async () => {
  const query = "SELECT * FROM missionss ";
  const [info] = await db.query(query);
  return info;
};

exports.getEspecificMissions = async (ID) => {
  const query = "SELECT * FROM missionss WHERE ID = ?";
  const [[info]] = await db.query(query, [ID]);
  return info;
};

exports.DeleteMissions = async (ID) => {
  const query = "DELETE FROM missionss WHERE ID = ?";
  await db.execute(query, [ID]);
  return true;
};

exports.UpdateMissions = async (
  Name,
  Visual,
  Locations,
  Description,
  Manager,
  Members,
  Start_Date,
  Update_By,
  ID
) => {
  const query =
    "UPDATE missionss SET Name = ?, Visual=?, Locations =?, Description=?, Manager=?, Members=?, Start_Date=?, Update_By=? WHERE ID = ?";
  await db.execute(query, [
    Name,
    Visual,
    Locations,
    Description,
    Manager,
    Members,
    Start_Date,
    Update_By,
    ID,
  ]);
  return true;
};

exports.AddMissions = async (
  Name,
  Visual,
  Locations,
  Description,
  Manager,
  Members,
  Start_Date
) => {
  const query =
    "INSERT INTO missionss (Name, Visual, Locations, Description, Manager, Members, Start_Date) VALUES (?,?,?,?,?,?,?)";
  await db.execute(query, [
    Name,
    Visual,
    Locations,
    Description,
    Manager,
    Members,
    Start_Date,
  ]);
  return true;
};