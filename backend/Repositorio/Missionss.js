const db = require("../Config/DB");
exports.getMissions = async () => {
  const query = "SELECT * FROM missionss ";

  try {
    const [info] = await db.query(query);
    return info;
  } catch (err) {
    throw err;
  }
};
exports.getEspecificMissions = async (ID) => {
  const query = "SELECT * FROM missionss WHERE ID = ?";

  try {
    const [[info]] = await db.query(query, [ID]);
    return info;
  } catch (err) {
    throw err;
  }
};
exports.DeleteMissions = async (ID) => {
  const query = "DELETE FROM missionss WHERE ID = ?";
  try {
    await db.execute(query, [ID]);
    return true;
  } catch (err) {
    throw err;
  }
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
    "UPDATE  missionss SET Name = ?,Visual=?,Locations =?,Description=?,Manager=?,Members=?,Start_Date=?,Update_By=? WHERE ID = ?";
  try {
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
  } catch (err) {
    throw err;
  }
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
    "INSERT INTO missionss (Name,Visual,Locations,Description,Manager,Members,Start_Date)VALUES(?,?,?,?,?,?,?)";
  try {
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
  } catch (err) {
    throw err;
  }
};
