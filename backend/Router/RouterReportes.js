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
const { audits } = require("../Controllers/AuditController");

router.get(
  "/Panel/Tesoreria/Reportes/getBalances",
  Auth,
  Allow("Pastor", "Tesorero", "Dev", "Admin"),
  getBalances,
  audits("Lectura", "Reportes", "Consulta de balance total de gastos y entradas")
);

router.get(
  "/Panel/Tesoreria/Reportes/getIncomesByMonths",
  Auth,
  Allow("Pastor", "Tesorero", "Dev", "Admin"),
  getIncomesByMonths,
  audits("Lectura", "Reportes", "Consulta de entradas mensuales")
);

router.get(
  "/Panel/Tesoreria/Reportes/getExpensesByMonths",
  Auth,
  Allow("Pastor", "Tesorero", "Dev", "Admin"),
  getExpensesByMonths,
  audits("Lectura", "Reportes", "Consulta de salidas mensuales")
);

router.get(
  "/Panel/Tesoreria/Reportes/getMontlyReports",
  Auth,
  Allow("Pastor", "Tesorero", "Dev", "Admin"),
  getMontlyReports,
  audits("Lectura", "Reportes", "Consulta de balance general mensual")
);

module.exports = router;