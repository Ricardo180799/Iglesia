const { GetRol, GetIdRol } = require("../Repositorio/Usuarios");
exports.Open = async (req, res) => {
  try {
    const ID = req.usuario.ID;
   
    const ids = await GetIdRol(ID);
   

    const GetRols = await GetRol(ids);
   
    res.json({ GetRols });
  } catch (err) {
    throw err;
  }
};
