const express = require("express");
const router = express.Router();
const { Auth } = require("./MidlewareAuth");
const { Allow } = require("./MidlewareRol");
const {
  getIncomess,
  DeleteIncomes,
  UpdateIncomes,
  AddIncomes,
} = require("../Controllers/IncomeControllers");
const { audits } = require("../Controllers/AuditController");

//Obtiene Todos los incomes
router.get("/Panel/Tesoreria/Incomes", getIncomess);
//Añade un income
router.post(
  "/Panel/Tesoreria/Incomes/Add",
  Auth,
  Allow("Pastor", "Tesorero", "Admin", "Dev"),
  audits("Add", "Income", "Se añadió un income"),
  AddIncomes
);

//Borra un Income
router.post(
  "/Panel/Tesoreía/Incomes/DeleteIncomes",
  Auth,
  Allow("Pastor", "Tesorero", "Admin", "Dev"),
  audits("Delete", "Income", "Se eliminó un Income"),
  DeleteIncomes
);
//Actualiza un income
router.post(
  "/Panel/Tesorería/Incomes/UpdateIncomes",
  Auth,
  Allow("Pastor", "Tesorero", "Admin", "Dev"),
  audits("Update", "Misiones", "Se actualizó un Income"),
  UpdateIncomes
);
module.exports = router;
