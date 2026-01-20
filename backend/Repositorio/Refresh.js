const db = require("../Config/DB");
exports.GetRefresh = async (user_id) => {
  const query = "SELECT token FROM refresh_tokens WHERE user_id = ?";

  try {
    const [rows] = await db.query(query, [user_id]);

    if (rows.length > 0) {
      return rows[0].token;
    } else {
      return null;
    }
  } catch (err) {
    throw err;
  }
};
exports.AddRefresh = async (user_id, token) => {
  const query = "INSERT INTO refresh_tokens (user_id,token)VALUES(?,?)";
  try {
    await db.execute(query, [user_id, token]);
  } catch (err) {
    throw err;
  }
};
exports.DeleteRefresh = async (user_id) => {
  const query = "DELETE FROM refresh_tokens WHERE user_id = ?";
  try {
    await db.execute(query, [user_id]);
  } catch (err) {
    throw err;
  }
};
