const db = require("../Config/DB");

exports.GetRefresh = async (user_id) => {
  const query = "SELECT token FROM refresh_tokens WHERE user_id = ?";
  const [rows] = await db.query(query, [user_id]);

  if (rows.length > 0) {
    return rows[0].token;
  }
  return null;
};

exports.AddRefresh = async (user_id, token) => {
  const query = "INSERT INTO refresh_tokens (user_id,token) VALUES (?,?)";
  await db.execute(query, [user_id, token]);
};

exports.DeleteRefresh = async (user_id) => {
  const query = "DELETE FROM refresh_tokens WHERE user_id = ?";
  await db.execute(query, [user_id]);
};