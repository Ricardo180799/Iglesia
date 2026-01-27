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

  const query = `UPDATE  home SET ${Campo} = ? WHERE ID = ?`;
  try {
    await db.execute(query, [Valor, ID]);
    return true;
  } catch (err) {
    throw err;
  }
};

const getLastTestimonies = async (numero) => {
  const query1 =
    "SELECT * FROM(SELECT * FROM testimonies ORDER BY ID DESC LIMIT ?) AS ULTIMAS ORDER BY ID ASC";
  try {
    const [response] = await db.query(query1, [numero]);
    return response;
  } catch (err) {
    throw err;
  }
};
const getLastPost = async (numero) => {
  const query1 =
    "SELECT * FROM(SELECT * FROM posts ORDER BY ID DESC LIMIT ?) AS ULTIMAS ORDER BY ID ASC";
  try {
    const [response] = await db.query(query1, [numero]);
    return response;
  } catch (err) {
    throw err;
  }
};
const getNextActivities = async (numero) => {
  const query1 =
    "SELECT * FROM(SELECT * FROM activities ORDER BY ID DESC LIMIT ?) AS Proximas ORDER BY ID ASC";
  try {
    const [response] = await db.query(query1, [numero]);
    return response;
  } catch (err) {
    throw err;
  }
};

exports.getHome = async () => {
  const query = "SELECT * FROM home";

  try {
    const [[infoC]] = await db.query(query);

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
  } catch (err) {
    throw err;
  }
};

exports.getHomesConfig = async () => {
  const query = "SELECT * FROM home ";

  try {
    const [info] = await db.query(query);
    return info[0];
  } catch (err) {
    throw err;
  }
};
exports.getNumber = async (campo) => {
  const query = `SELECT \`${campo}\`  AS valor FROM home LIMIT 1`;
  try {
    const [[info]] = await db.query(query);
   
    return info.valor;
  } catch (err) {
    throw err;
  }
};
