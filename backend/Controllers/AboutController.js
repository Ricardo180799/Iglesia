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
  const { name,info } = req.body;

 

  await UpdateAbout(
    name,info
  );

  res.locals.response = {
    status: 200,
    body: { message: "Información actualizada correctamente" }
  };
  next();
});