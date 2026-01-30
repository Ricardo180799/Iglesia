const {
  getActivities,
  DeleteActivities,
  UpdateActivities,
  AddActivities,
} = require("../Repositorio/Activities");
const AppError = require("../Utils/AppError");
const catchAsync = require("../Utils/CatchAsync");


exports.getActivitiess = catchAsync(async (req, res, next) => {
  const info = await getActivities();
  
  if (!info || info.length === 0) {
    return next(new AppError("Actualmente no hay actividades registradas.", 404));
  }

  
  res.status(200).json(info);
});


exports.DeleteActivitiess = catchAsync(async (req, res, next) => {
  const { ID } = req.params;

  if (isNaN(ID)) {
    return next(new AppError("El ID proporcionado debe ser un número válido.", 400));
  }

  const resultado = await DeleteActivities(ID);

  if (resultado.affectedRows === 0) {
    return next(new AppError("No se pudo eliminar: La actividad con ese ID no existe.", 404));
  }

  
  res.locals.response = {
    status: 200,
    body: { message: "Actividad eliminada correctamente" }
  };
  next(); 
});


exports.UpdateActivitiess = catchAsync(async (req, res, next) => {
  const { Title, Enlace, Text, Activity_Date, ID } = req.body;

  if (!ID) return next(new AppError("Se requiere el ID para realizar la actualización.", 400));
  if (!Title || !Text || !Activity_Date) {
    return next(new AppError("El título, el texto y la fecha son obligatorios.", 400));
  }

  if (isNaN(Date.parse(Activity_Date))) {
    return next(new AppError("La fecha proporcionada no tiene un formato válido.", 400));
  }

  let FinalVisual = null;
  if (req.file) {
    FinalVisual = req.file.filename;
  } else if (Enlace && Enlace !== "null" && Enlace !== "") {
    FinalVisual = Enlace;
  } else {
    return next(new AppError("Debes proporcionar una imagen o un enlace visual.", 400));
  }

  const resultado = await UpdateActivities(Title, FinalVisual, Text, Activity_Date, ID);

  if (resultado.affectedRows === 0) {
    return next(new AppError("No se pudo actualizar: El ID proporcionado no existe.", 404));
  }

  
  res.locals.response = {
    status: 200,
    body: { message: "Actividad actualizada correctamente" }
  };
  next();
});


exports.AddActivitiess = catchAsync(async (req, res, next) => {
  const { Title, Enlace, Text, Activity_Date } = req.body;

  if (!Title || !Text || !Activity_Date) {
    return next(new AppError("Todos los campos (Título, Texto, Fecha) son requeridos.", 400));
  }

  if (Title.length < 5 || Title.length > 100) {
    return next(new AppError("El título debe tener entre 5 y 100 caracteres.", 400));
  }

  let FinalVisual = null;
  if (req.file) {
    FinalVisual = req.file.filename;
  } else if (Enlace && Enlace !== "null" && Enlace !== "") {
    FinalVisual = Enlace;
  } else {
    return next(new AppError("Es obligatorio subir una imagen o proveer un enlace.", 400));
  }

  await AddActivities(Title, FinalVisual, Text, Activity_Date);

  
  res.locals.response = {
    status: 201,
    body: { message: "Actividad añadida correctamente" }
  };
  next();
});