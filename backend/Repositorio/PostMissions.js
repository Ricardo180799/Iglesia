const db = require("../Config/DB");

exports.getALLPostmissions = async () => {
  const query = "SELECT * FROM postmissions ";

  try {
    const [info] = await db.query(query);
    return info;
  } catch (err) {
    throw err;
  }
};

exports.getPostmissions = async (ID_Missions) => {
  const query = "SELECT * FROM postmissions WHERE ID_Missions = ? ";

  try {
    const [info] = await db.query(query, [ID_Missions]);
    return info;
  } catch (err) {
    throw err;
  }
};
exports.DeletePostmissions = async (ID) => {
  const query = "DELETE FROM postmissions WHERE ID = ?";
  try {
    await db.execute(query, [ID]);
    return true;
  } catch (err) {
    throw err;
  }
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
    "UPDATE  postmissions SET ID_Missions=?, Title = ?, Slug = ?,Content=?,Visual=?,Created_by=? WHERE ID = ?";
  try {
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
  } catch (err) {
    throw err;
  }
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
    "INSERT INTO postmissions (ID_Missions,Title,Slug,Content,Visual,Created_by)VALUES(?,?,?,?,?,?)";
  try {
    await db.execute(query, [
      ID_Missions,
      Title,
      Slug,
      Content,
      Visual,
      Created_by,
    ]);
    return true;
  } catch (err) {
    throw err;
  }
};
