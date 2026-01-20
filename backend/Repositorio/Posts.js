const db = require("../Config/DB");
exports.getPost = async () => {
  const query = "SELECT * FROM posts ";

  try {
    const [info] = await db.query(query);
    return info;
  } catch (err) {
    throw err;
  }
};
exports.DeletePost = async (id) => {
  const query = "DELETE FROM posts WHERE ID = ?";
  try {
    await db.execute(query, [id]);
    return true;
  } catch (err) {
    throw err;
  }
};
exports.UpdatePost = async (
  Title,
  SLUG,
  Content,
  Visual,
  Created_by,
  Category_id,
  ID,
) => {
  const query =
    "UPDATE  posts SET Title = ?, SLUG = ?,Content=?,Visual=?,Created_by=?,Category_id=? WHERE ID = ?";
  try {
    await db.execute(query, [
      Title,
      SLUG,
      Content,
      Visual,
      Created_by,
      Category_id,
      ID,
    ]);
    return true;
  } catch (err) {
    throw err;
  }
};
exports.AddPost = async (
  Title,
  SLUG,
  Content,
  Visual,
  Created_by,
  Category_id,
) => {
  const query =
    "INSERT INTO posts (Title,SLUG,Content,Visual,Created_by,Category_id)VALUES(?,?,?,?,?,?)";
  try {
    await db.execute(query, [
      Title,
      SLUG,
      Content,
      Visual,
      Created_by,
      Category_id,
    ]);
    return true;
  } catch (err) {
    throw err;
  }
};
