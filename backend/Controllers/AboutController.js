const { getAbout, UpdateAbout } = require("../Repositorio/About_us");
const catchAsync = require("../Utils/CatchAsync");
const AppError = require("../Utils/AppError");

exports.getAbouts = catchAsync(async (req, res, next) => {
  const info = await getAbout();

  res.locals.response = {
    status: 200,
    body: { info }
  };
  next();
});

exports.UpdateAbouts = catchAsync(async (req, res, next) => {
  const { origen, historia, mision, doctrina, valores, equipo_pastoral, ID } = req.body;

  if (!ID) return next(new AppError("ID requerido", 400));

  await UpdateAbout(
    origen,
    historia,
    mision,
    doctrina,
    valores,
    equipo_pastoral,
    ID
  );

  res.locals.response = {
    status: 200,
    body: { message: "Información actualizada correctamente" }
  };
  next();
});