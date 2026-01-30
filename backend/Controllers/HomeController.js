const { UpdateHome, getHome, getHomesConfig } = require("../Repositorio/Home");
const catchAsync = require("../Utils/CatchAsync");

exports.UpdateHomes = catchAsync(async (req, res, next) => {
  const { Campo, Valor } = req.body;
  const ID = 1;

  await UpdateHome(Campo, Valor, ID);

  res.locals.response = {
    status: 200,
    body: { message: "Configuración Home actualizada correctamente" }
  };
  next();
});

exports.getHomesFront = catchAsync(async (req, res, next) => {
  const info = await getHome();
  
  res.locals.response = {
    status: 200,
    body: { info }
  };
  next();
});

exports.getHomeConfigs = catchAsync(async (req, res, next) => {
  const info = await getHomesConfig();
  
  res.locals.response = {
    status: 200,
    body: info
  };
  next();
});