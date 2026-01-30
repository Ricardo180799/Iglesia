const {
  getContact_message,
  DeleteContact_message,
  UpdateContact_message,
  AddContact_message,
} = require("../Repositorio/Contact_messages");
const catchAsync = require("../Utils/CatchAsync");
const AppError = require("../Utils/AppError");

exports.getContact_messages = catchAsync(async (req, res, next) => {
  const info = await getContact_message();

  res.locals.response = {
    status: 200,
    body: { info }
  };
  next();
});

exports.DeleteContact_messages = catchAsync(async (req, res, next) => {
  const { ID } = req.params;

  if (!ID) return next(new AppError("ID requerido", 400));

  await DeleteContact_message(ID);

  res.locals.response = {
    status: 200,
    body: { message: "Contacto eliminado correctamente" }
  };
  next();
});

exports.UpdateContact_messages = catchAsync(async (req, res, next) => {
  const { Name, Email, Phone, Message, Type, ID } = req.body;

  if (!ID) return next(new AppError("ID requerido", 400));

  await UpdateContact_message(Name, Email, Phone, Message, Type, ID);

  res.locals.response = {
    status: 200,
    body: { message: "Contacto actualizado correctamente" }
  };
  next();
});

exports.AddContact_messages = catchAsync(async (req, res, next) => {
  const { Name, Apellidos, Email, Teléfono, Mensaje, Tipo } = req.body;

  await AddContact_message(Name, Apellidos, Email, Teléfono, Mensaje, Tipo);

  res.locals.response = {
    status: 201,
    body: { message: "Formulario enviado correctamente" }
  };
  next();
});