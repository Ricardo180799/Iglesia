const { GetRol, GetIdRol } = require("../Repositorio/Usuarios");
const catchAsync = require("../Utils/CatchAsync");

exports.Open = catchAsync(async (req, res, next) => {
  const ID = req.usuario.ID;

  const ids = await GetIdRol(ID);
  const GetRols = await GetRol(ids);

  res.status(200).json({ GetRols });
});