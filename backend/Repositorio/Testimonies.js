const db = require("../Config/DB");

exports.SendTestimonies = async (info) => {
  const query = `INSERT INTO testimonies (Type,Title,Content,Text,Video_Url,Thumbnail,Author,Created_By) Values (?,?,?,?,?,?,?,?)`;
  try {
    await db.execute(query, [
      info.Type,
      info.Title,
      info.Content,
      info.Text,
      info.Video_Url,
      info.Thumbnail,
      info.Author,
      info.Created_By,
    ]);
    const message = "Testimonio subido con éxito, en espera de ser aprobado";
    return message;
  } catch (err) {
    throw err;
  }
};
exports.GetTestimonies = async (vista) => {
  let query = "";
  if (vista) {
    query = "SELECT * FROM testimonies";
  }
  if (!vista) {
    query = "SELECT * FROM testimonies WHERE Status = 'Approved'";
  }

  try {
    const [rows] = await db.query(query);
    return rows;
  } catch (err) {
    throw err;
  }
};
exports.ChangeStatus = async (ID, Status) => {
  const query = "UPDATE testimonies SET Status = ? WHERE ID = ?";
  try {
    await db.execute(query, [Status, ID]);
    return true;
  } catch (err) {
    throw err;
  }
};
exports.DeleteTestimonies = async (id) => {
  const query = " DELETE FROM testimonies WHERE ID = ?";
  try {
    await db.execute(query, [id]);
    return true;
  } catch (err) {
    throw err;
  }
};
exports.getEspecificTestimonies = async (ID) => {
  const sql = "SELECT * FROM testimonies WHERE ID = ?";

  const [rows] = await db.query(sql, [ID]);
  return rows[0] || null;
};
