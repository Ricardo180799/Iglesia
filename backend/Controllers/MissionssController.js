const {
  getEspecificMissions,
  getMissions,
  DeleteMissions,
  UpdateMissions,
  AddMissions,
} = require("../Repositorio/Missionss");
const AppError = require("../Utils/AppError");
const catchAsync = require("../Utils/CatchAsync");

exports.getMissionss = catchAsync(async (req, res, next) => {
  const info = await getMissions();
  
  res.locals.response = {
    status: 200,
    body: info
  };
  next();
});

exports.getEspecificMissionss = catchAsync(async (req, res, next) => {
  const { ID } = req.params;
  const info = await getEspecificMissions(ID);

  if (!info) return next(new AppError("Misión no encontrada", 404));

  res.locals.response = {
    status: 200,
    body: info
  };
  next();
});

exports.DeleteMissionss = catchAsync(async (req, res, next) => {
  const { ID } = req.params;
  await DeleteMissions(ID);

  res.locals.response = {
    status: 200,
    body: { message: "Misión eliminada correctamente" }
  };
  next();
});

exports.UpdateMissionss = catchAsync(async (req, res, next) => {
  const {
    Name,
    Link,
    Locations,
    Description,
    Manager,
    Members,
    Start_Date,
    Update_By,
    ID,
  } = req.body;

  let finalVisual = null;
  if (req.file) {
    finalVisual = req.file.filename;
  } else if (Link && Link !== "" && Link !== "null") {
    finalVisual = Link;
  }

  await UpdateMissions(
    Name,
    finalVisual,
    Locations,
    Description,
    Manager,
    Members,
    Start_Date,
    Update_By,
    ID
  );

  res.locals.response = {
    status: 200,
    body: { message: "Misión actualizada correctamente" }
  };
  next();
});

exports.AddMissionss = catchAsync(async (req, res, next) => {
  const { Name, Link, Locations, Description, Manager, Members, Start_Date } = req.body;

  let finalVisual = null;
  if (req.file) {
    finalVisual = req.file.filename;
  } else if (Link && Link !== "" && Link !== "null") {
    finalVisual = Link;
  }

  await AddMissions(
    Name,
    finalVisual,
    Locations,
    Description,
    Manager,
    Members,
    Start_Date
  );

  res.locals.response = {
    status: 201,
    body: { message: "Misión añadida correctamente" }
  };
  next();
});