const {
  getALLPostmissions,
  getPostmissions,
  DeletePostmissions,
  UpdatePostmissions,
  AddPostmissions,
} = require("../Repositorio/PostMissions");
const AppError = require("../Utils/AppError");
const catchAsync = require("../Utils/CatchAsync");

exports.getALLPostmissionss = catchAsync(async (req, res, next) => {
  const info = await getALLPostmissions();
  
  res.locals.response = {
    status: 200,
    body: info
  };
  next();
});

exports.getPostmissionss = catchAsync(async (req, res, next) => {
  const { ID } = req.params;
  const info = await getPostmissions(ID);
  
  res.locals.response = {
    status: 200,
    body: info
  };
  next();
});

exports.DeletePostmissionss = catchAsync(async (req, res, next) => {
  const { ID } = req.params;
  await DeletePostmissions(ID);

  res.locals.response = {
    status: 200,
    body: { message: "Contenido eliminado correctamente" }
  };
  next();
});

exports.UpdatePostmissionss = catchAsync(async (req, res, next) => {
  const { ID_Missions, Title, Slug, Content, Link, Created_by, ID } = req.body;

  let finalVisual = null;
  if (req.file) {
    finalVisual = req.file.filename;
  } else if (Link && Link !== "" && Link !== "null") {
    finalVisual = Link;
  }

  await UpdatePostmissions(
    ID_Missions,
    Title,
    Slug,
    Content,
    finalVisual,
    Created_by,
    ID
  );

  res.locals.response = {
    status: 200,
    body: { message: "Contenido actualizado correctamente" }
  };
  next();
});

exports.AddPostmissionss = catchAsync(async (req, res, next) => {
  const { ID_Missions, Title, Slug, Content, Link, Created_by } = req.body;

  let finalVisual = null;
  if (req.file) {
    finalVisual = req.file.filename;
  } else if (Link && Link !== "" && Link !== "null") {
    finalVisual = Link;
  }

  await AddPostmissions(
    ID_Missions,
    Title,
    Slug,
    Content,
    finalVisual,
    Created_by
  );

  res.locals.response = {
    status: 201,
    body: { message: "Contenido añadido correctamente" }
  };
  next();
});