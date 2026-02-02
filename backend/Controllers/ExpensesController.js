const {
  getExpenses,
  DeleteExpenses,
  UpdateExpenses,
  AddExpenses,
} = require("../Repositorio/expenses");
const catchAsync = require("../Utils/CatchAsync");

exports.getExpensess = catchAsync(async (req, res, next) => {
  const info = await getExpenses();

  res.locals.response = {
    status: 200,
    body: { info }
  };
  next();
});

exports.DeleteExpensess = catchAsync(async (req, res, next) => {
  const { ID } = req.params;

  await DeleteExpenses(ID);

  res.locals.response = {
    status: 200,
    body: { message: "Gasto eliminado correctamente" }
  };
  next();
});

exports.UpdateExpensess = catchAsync(async (req, res, next) => {
  // Nombres unificados: Images y Dates
  const { Amount, Category, Description, Images, Dates, Created_by, ID } = req.body;

  await UpdateExpenses(
    Amount,
    Category,
    Description,
    Images,
    Dates,
    Created_by,
    ID
  );

  res.locals.response = {
    status: 200,
    body: { message: "Gasto actualizado correctamente" }
  };
  next();
});

exports.AddExpensess = catchAsync(async (req, res, next) => {
  const { Amount, Category, Description, Images, Dates, Created_by } = req.body;

  await AddExpenses(
    Amount,
    Category,
    Description,
    Images,
    Dates,
    Created_by
  );

  res.locals.response = {
    status: 201,
    body: { message: "Gasto añadido correctamente" }
  };
  next();
});