const db = require("../Config/DB");

exports.SendTestimonies = async (info) => {
  const query = `INSERT INTO testimonies (Type,Title,Content,Text,Video_Url,Thumbnail,Author,Created_By) Values (?,?,?,?,?,?,?,?)`;
  await db.execute(query, [
    info.Type,
    info.Title,
    info.Content,
    info.Text,
    info.Video_Url || null,
    info.Thumbnail || null,
    info.Author,
    info.Created_By,
  ]);
  return "Testimonio subido con éxito, en espera de ser aprobado";
};

exports.GetTestimonies = async (vista) => {
  const query = vista 
    ? "SELECT * FROM testimonies" 
    : "SELECT * FROM testimonies WHERE Status = 'Approved'";

  const [rows] = await db.query(query);
  return rows;
};

exports.ChangeStatus = async (ID, Status) => {
  const query = "UPDATE testimonies SET Status = ? WHERE ID = ?";
  await db.execute(query, [Status, ID]);
  return true;
};

exports.DeleteTestimonies = async (id) => {
  const query = "DELETE FROM testimonies WHERE ID = ?";
  await db.execute(query, [id]);
  return true;
};

exports.getEspecificTestimonies = async (ID) => {
  const sql = "SELECT * FROM testimonies WHERE ID = ?";
  const [rows] = await db.query(sql, [ID]);
  return rows[0] || null;
};