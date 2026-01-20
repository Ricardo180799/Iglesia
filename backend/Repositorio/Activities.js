const db = require("../Config/DB");
exports.getActivities = async () => {
  const query = "SELECT * FROM activities ";

  try {
    const [info] = await db.query(query);
    return info;
  } catch (err) {
    throw err;
  }
};
exports.DeleteActivities = async (id) => {
  const query = "DELETE FROM activities WHERE ID = ?";
  try {
    await db.execute(query, [id]);
    return true;
  } catch (err) {
    throw err;
  }
};
exports.UpdateActivities = async (Title, Visual, Text, Activity_Date, ID) => {
  const query =
    "UPDATE  activities SET Title = ?, Visual = ?,Text=?, Activity_Date=? WHERE ID = ?";
  try {
    await db.execute(query, [Title, Visual, Text, Activity_Date, ID]);
    return true;
  } catch (err) {
    throw err;
  }
};
exports.AddActivities = async (Title, Visual, Text, Activity_Date) => {
  const query =
    "INSERT INTO activities (Title, Visual, Text, Activity_Date)VALUES(?,?,?,?)";
  try {
    await db.execute(query, [Title, Visual, Text, Activity_Date]);
    return true;
  } catch (err) {
    throw err;
  }
};
