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

// Obtiene todos los gastos
router.get(
  "/Panel/Tesoreria/Expenses", 
  Auth, 
  Allow("Pastor", "Tesorero", "Admin", "Dev"),
  getExpensess,
  audits("Lectura", "Expenses", "Consulta general de gastos")
);

// Añade un gasto
router.post(
  "/Panel/Tesoreria/Expenses/Add",
  Auth,
  Allow("Pastor", "Tesorero", "Admin", "Dev"),
  AddExpensess,
  audits("Add", "Expenses", "Se añadió un gasto")
);


router.delete(
  `/Panel/Tesoreria/Expenses/Delete/ID`,
  Auth,
  Allow("Pastor", "Tesorero", "Admin", "Dev"),
  DeleteExpensess,
  audits("Delete", "Expenses", "Se eliminó un gasto")
);

// Actualiza un gasto (Cambiado a PUT para seguir estándares REST)
router.put(
  "/Panel/Tesoreria/Expenses/Update",
  Auth,
  Allow("Pastor", "Tesorero", "Admin", "Dev"),
  UpdateExpensess,
  audits("Update", "Expenses", "Se actualizó un gasto")
);

module.exports = router;