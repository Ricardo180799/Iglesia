const db = require("../Config/DB");

exports.UpdateHome = async (Campo, Valor, ID) => {
  const columnasPermitidas = [
    "Title",
    "Slogan",
    "Presentacion",
    "NextActivities",
    "LastTestimonies",
    "LastPosts",
  ];

  if (!columnasPermitidas.includes(Campo)) {
    throw new Error(`La columna "${Campo}" no es válida o no está permitida.`);
  }

  const query = `UPDATE home SET ${Campo} = ? WHERE ID = ?`;
  await db.execute(query, [Valor, ID]);
  return true;
};

const getLastTestimonies = async (numero) => {
  const query = "SELECT * FROM testimonies ORDER BY ID DESC LIMIT ?";
  const [response] = await db.query(query, [numero]);
  return response.reverse(); 
};

const getLastPost = async (numero) => {
  const query = "SELECT * FROM posts ORDER BY ID DESC LIMIT ?";
  const [response] = await db.query(query, [numero]);
  return response.reverse();
};

const getNextActivities = async (numero) => {
  const query = "SELECT * FROM activities ORDER BY ID DESC LIMIT ?";
  const [response] = await db.query(query, [numero]);
  return response.reverse();
};

exports.getHome = async () => {
  const query = "SELECT * FROM home LIMIT 1";
  const [[infoC]] = await db.query(query);

  if (!infoC) return null;

 
  const [infot, infoP, infoA] = await Promise.all([
    getLastTestimonies(infoC.LastTestimonies),
    getLastPost(infoC.LastPosts),
    getNextActivities(infoC.NextActivities),
  ]);

  return {
    home: infoC,
    testimonies: infot,
    posts: infoP,
    activities: infoA,
  };
};

exports.getHomesConfig = async () => {
  const query = "SELECT * FROM home LIMIT 1";
  const [info] = await db.query(query);
  return info[0];
};

exports.getNumber = async (campo) => {
 
  const query = `SELECT ?? AS valor FROM home LIMIT 1`;
  const [[info]] = await db.query(query, [campo]);
  return info ? info.valor : null;
};