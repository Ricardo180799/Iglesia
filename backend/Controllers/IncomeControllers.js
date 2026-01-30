const {
  getIncomes,
  DeleteIncome,
  UpdateIncome,
  AddIncome,
} = require("../Repositorio/Incomes");
const AppError = require("../Utils/AppError");
const catchAsync = require("../Utils/CatchAsync");

exports.getIncomess = catchAsync(async (req, res, next) => {
  const info = await getIncomes();
  
  res.locals.response = {
    status: 200,
    body: info
  };
  next();
});

exports.DeleteIncomes = catchAsync(async (req, res, next) => {
  const { ID } = req.params;
  if (!ID) return next(new AppError("ID de ingreso requerido", 400));

  await DeleteIncome(ID);

  res.locals.response = {
    status: 200,
    body: { message: "Ingreso eliminado correctamente" }
  };
  next();
});

exports.UpdateIncomes = catchAsync(async (req, res, next) => {
  const {
    Source,
    User_Id,
    Type,
    Amount,
    Description,
    Date,
    Created_By,
    ID,
  } = req.body;

  await UpdateIncome(
    Source,
    User_Id,
    Type,
    Amount,
    Description,
    Date,
    Created_By,
    ID
  );

  res.locals.response = {
    status: 200,
    body: { message: "Ingreso actualizado correctamente" }
  };
  next();
});

exports.AddIncomes = catchAsync(async (req, res, next) => {
  const {
    Source,
    User_Id,
    Type,
    Amount,
    Description,
    Dates,
    Created_By,
  } = req.body;

  await AddIncome(
    Source,
    User_Id,
    Type,
    Amount,
    Description,
    Dates,
    Created_By
  );

  res.locals.response = {
    status: 201,
    body: { message: "Ingreso añadido correctamente" }
  };
  next();
});