const { GetRol, GetIdRol } = require("../Repositorio/Usuarios");
exports.Open = async (req, res) => {
  try {
    const ID = req.usuario.ID;
    console.log("IDDDDDDDD" + ID);
    const ids = await GetIdRol(ID);
    console.log(ids);

    const GetRols = await GetRol(ids);
    console.log("GETROLSADSAD:" + GetRols);
    res.json({ GetRols });
  } catch (err) {
    throw err;
  }
};
