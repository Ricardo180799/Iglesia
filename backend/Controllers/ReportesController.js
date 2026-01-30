const {
  getBalance,
  getIncomesByMonth,
  getExpensesByMonth,
  getMontlyReport,
} = require("../Repositorio/Reportes");
const AppError = require("../Utils/AppError");
const catchAsync = require("../Utils/CatchAsync");

exports.getBalances = catchAsync(async (req, res, next) => {
  const info = await getBalance();
  
  res.locals.response = {
    status: 200,
    body: info
  };
  next();
});

exports.getIncomesByMonths = catchAsync(async (req, res, next) => {
  const info = await getIncomesByMonth();
  
  res.locals.response = {
    status: 200,
    body: info
  };
  next();
});

exports.getExpensesByMonths = catchAsync(async (req, res, next) => {
  const info = await getExpensesByMonth();
  
  res.locals.response = {
    status: 200,
    body: info
  };
  next();
});

exports.getMontlyReports = catchAsync(async (req, res, next) => {
  const info = await getMontlyReport();
  
  res.locals.response = {
    status: 200,
    body: info
  };
  next();
});