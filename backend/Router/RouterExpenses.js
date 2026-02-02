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
const validate = require ("../Utils/Validator") 
const {addExpensesSchema,updateExpensesSchema,deleteExpensesSchema} = require("../Schema/SchemaExpenses")

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
  validate(addExpensesSchema),
  AddExpensess,
  audits("Add", "Expenses", "Se añadió un gasto")
);


router.delete(
  `/Panel/Tesoreria/Expenses/Delete/ID`,
  Auth,
  Allow("Pastor", "Tesorero", "Admin", "Dev"),
  validate(deleteExpensesSchema),
  DeleteExpensess,
  audits("Delete", "Expenses", "Se eliminó un gasto")
);

// Actualiza un gasto (Cambiado a PUT para seguir estándares REST)
router.put(
  "/Panel/Tesoreria/Expenses/Update",
  Auth,
  Allow("Pastor", "Tesorero", "Admin", "Dev"),
  validate(updateExpensesSchema),
  UpdateExpensess,
  audits("Update", "Expenses", "Se actualizó un gasto")
);

module.exports = router;