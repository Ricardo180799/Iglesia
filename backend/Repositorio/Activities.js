
const db = require("../Config/DB");



exports.getActivities = async () => {
  const query = "SELECT * FROM activities";
  const [info] = await db.query(query);
  return info;
};

exports.DeleteActivities = async (id) => {
  const query = "DELETE FROM activities WHERE ID = ?";
  
  const [result] = await db.execute(query, [id]);
  return result; 
};

exports.UpdateActivities = async (Title, Visual, Text, Activity_Date, ID) => {
  const query = "UPDATE activities SET Title = ?, Visual = ?, Text=?, Activity_Date=? WHERE ID = ?";
  const [result] = await db.execute(query, [Title, Visual, Text, Activity_Date, ID]);
  return result;
};

exports.AddActivities = async (Title, Visual, Text, Activity_Date) => {
  const query = "INSERT INTO activities (Title, Visual, Text, Activity_Date) VALUES (?,?,?,?)";
  const [result] = await db.execute(query, [Title, Visual, Text, Activity_Date]);
  return result;
};