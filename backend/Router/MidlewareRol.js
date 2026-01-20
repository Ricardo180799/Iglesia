const { GetIdRol, GetRol } = require("../Repositorio/Usuarios");
exports.Allow =
  (...allowedRols) =>
  async (req, res, next) => {
    try {
      const ID = req.usuario.ID;
      const idRol = await GetIdRol(ID);

      const Roles = await GetRol(idRol);
      console.log(ID, idRol, Roles);
      const Verificar = Roles.some((e) => allowedRols.includes(e));
      if (Verificar) {
        console.log("ok");
        return next();
      } else {
        return res.status(403).json({ message: "No tiene permiso" });
      }
    } catch (err) {
      throw err;
    }
  };
