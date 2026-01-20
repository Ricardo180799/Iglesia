const express = require("express");
const router = express.Router();
const {
  getBalances,
  getIncomesByMonths,
  getExpensesByMonths,
  getMontlyReports,
} = require("../Controllers/ReportesController");
const { Auth } = require("./MidlewareAuth");
const { Allow } = require("./MidlewareRol");

//Obtiene Gastos y Entradas Total
router.get(
  "/Panel/Tesoreria/Reportes/getBalances",
  Auth,
  Allow("Pastor", "Tesorero", "Dev", "Admin"),
  getBalances
);
//Obtiene Entradas por mes
router.get(
  "/Panel/Tesoreria/Reportes/getIncomesByMonths",
  Auth,
  Allow("Pastor", "Tesorero", "Dev", "Admin"),
  getIncomesByMonths
);
//Obtiene Salidas por mes
router.get(
  "/Panel/Tesoreria/Reportes/getExpensesByMonths",
  Auth,
  Allow("Pastor", "Tesorero", "Dev", "Admin"),
  getExpensesByMonths
);
//Obtiene Balance general
router.get(
  "/Panel/Tesoreria/Reportes/getMontlyReports",
  Auth,
  Allow("Pastor", "Tesorero", "Dev", "Admin"),
  getMontlyReports
);
module.exports = router;
