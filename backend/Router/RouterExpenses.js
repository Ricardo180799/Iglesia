const express = require("express");
const router = express.Router();
const { Auth } = require("./MidlewareAuth");
const { Allow } = require("./MidlewareRol");
const {
  getExpensess,
  DeleteExpensess,
  UpdateExpensess,
  AddExpensess,
} = require("../Controllers/ExpensesController");
const { audits } = require("../Controllers/AuditController");

//Obtiene Todos los expenses
router.get("/Panel/Tesoreria/Expenses", getExpensess);
//Añade un expense
router.post(
  "/Panel/Tesoreria/Expenses/Add",
  Auth,
  Allow("Pastor", "Tesorero", "Admin", "Dev"),
  audits("Add", "Expenses", "Se añadió un expense"),
  AddExpensess
);

//Borra un expense
router.post(
  "/Panel/Tesoreia/Expenses/DeleteExpensess",
  Auth,
  Allow("Pastor", "Tesorero", "Admin", "Dev"),
  audits("Delete", "Expenses", "Se eliminó un expense"),
  DeleteExpensess
);
//Actualiza un expense
router.post(
  "/Panel/Tesoreria/Expenses/UpdateExpensess",
  Auth,
  Allow("Pastor", "Tesorero", "Admin", "Dev"),
  audits("Update", "Expenses", "Se actualizó un expense"),
  UpdateExpensess
);
module.exports = router;
