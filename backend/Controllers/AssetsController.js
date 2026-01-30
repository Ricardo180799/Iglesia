const {
  getAssets,
  DeleteAssets,
  UpdateAssets,
  AddAssets,
} = require("../Repositorio/Assets");
const catchAsync = require("../Utils/CatchAsync");
const AppError = require("../Utils/AppError");

exports.getAssetss = catchAsync(async (req, res, next) => {
  const info = await getAssets();

  res.locals.response = {
    status: 200,
    body: info
  };
  next();
});

exports.DeleteAssetss = catchAsync(async (req, res, next) => {
  const { ID } = req.params;

  if (!ID) return next(new AppError("ID requerido", 400));

  await DeleteAssets(ID);

  res.locals.response = {
    status: 200,
    body: { message: "Recurso eliminado correctamente" }
  };
  next();
});

exports.UpdateAssetss = catchAsync(async (req, res, next) => {
  const {
    Name,
    Cantidad,
    Category,
    Adquisition_date,
    Price,
    Status,
    Locations,
    Responsible_id,
    ID,
  } = req.body;

  if (!ID) return next(new AppError("ID requerido", 400));

  await UpdateAssets(
    Name,
    Cantidad,
    Category,
    Adquisition_date,
    Price,
    Status,
    Locations,
    Responsible_id,
    ID
  );

  res.locals.response = {
    status: 200,
    body: { message: "Inventario actualizado correctamente" }
  };
  next();
});

exports.AddAssetss = catchAsync(async (req, res, next) => {
  const {
    Name = "",
    Category = "",
    Cantidad = 0,
    Adquisition_date = null,
    Price = 0,
    Status = "nuevo",
    Locations = "",
    Responsible_id = 0,
  } = req.body;

  await AddAssets(
    Name,
    Cantidad,
    Category,
    Adquisition_date,
    Price,
    Status,
    Locations,
    Responsible_id
  );

  res.locals.response = {
    status: 201,
    body: { message: "Recurso añadido correctamente" }
  };
  next();
});