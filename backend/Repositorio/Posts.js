const db = require("../Config/DB");

exports.getPost = async () => {
  const query = "SELECT * FROM posts ";
  const [info] = await db.query(query);
  return info;
};

exports.DeletePost = async (id) => {
  const query = "DELETE FROM posts WHERE ID = ?";
  await db.execute(query, [id]);
  return true;
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
    "UPDATE posts SET Title = ?, SLUG = ?, Content = ?, Visual = ?, Created_by = ?, Category_id = ? WHERE ID = ?";
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
    "INSERT INTO posts (Title, SLUG, Content, Visual, Created_by, Category_id) VALUES (?, ?, ?, ?, ?, ?)";
  await db.execute(query, [
    Title,
    SLUG,
    Content,
    Visual,
    Created_by,
    Category_id,
  ]);
  return true;
};