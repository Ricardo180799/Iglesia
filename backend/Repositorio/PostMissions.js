const db = require("../Config/DB");

exports.getALLPostmissions = async () => {
  const query = "SELECT * FROM postmissions ";
  const [info] = await db.query(query);
  return info;
};

exports.getPostmissions = async (ID_Missions) => {
  const query = "SELECT * FROM postmissions WHERE ID_Missions = ? ";
  const [info] = await db.query(query, [ID_Missions]);
  return info;
};

exports.DeletePostmissions = async (ID) => {
  const query = "DELETE FROM postmissions WHERE ID = ?";
  await db.execute(query, [ID]);
  return true;
};

exports.UpdatePostmissions = async (
  ID_Missions,
  Title,
  Slug,
  Content,
  Visual,
  Created_by,
  ID
) => {
  const query =
    "UPDATE postmissions SET ID_Missions=?, Title = ?, Slug = ?, Content=?, Visual=?, Created_by=? WHERE ID = ?";
  await db.execute(query, [
    ID_Missions,
    Title,
    Slug,
    Content,
    Visual,
    Created_by,
    ID,
  ]);
  return true;
};

exports.AddPostmissions = async (
  ID_Missions,
  Title,
  Slug,
  Content,
  Visual,
  Created_by
) => {
  const query =
    "INSERT INTO postmissions (ID_Missions, Title, Slug, Content, Visual, Created_by) VALUES (?, ?, ?, ?, ?, ?)";
  await db.execute(query, [
    ID_Missions,
    Title,
    Slug,
    Content,
    Visual,
    Created_by,
  ]);
  return true;
};