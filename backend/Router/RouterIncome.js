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
const validate = require ("../Utils/Validator")
const {addIncomeSchema,updateIncomeSchema,deleteIncomeSchema} = require("../Schema/SchemaIncome")

router.get(
  "/Panel/Tesoreria/Incomes", 
  Auth, 
  Allow("Pastor", "Tesorero", "Admin", "Dev"),
  getIncomess,
  audits("Lectura", "Income", "Consulta general de ingresos")
);


router.post(
  "/Panel/Tesoreria/Incomes/Add",
  Auth,
  Allow("Pastor", "Tesorero", "Admin", "Dev"),
  validate(addIncomeSchema),
  AddIncomes,
  audits("Add", "Income", "Se añadió un ingreso")
);


router.delete(
  `/Panel/Tesoreria/Incomes/Delete/:ID`,
  Auth,
  Allow("Pastor", "Tesorero", "Admin", "Dev"),
  validate(deleteIncomeSchema),
  DeleteIncomes,
  audits("Delete", "Income", "Se eliminó un ingreso")
);


router.put(
  "/Panel/Tesoreria/Incomes/Update",
  Auth,
  Allow("Pastor", "Tesorero", "Admin", "Dev"),
   validate(updateIncomeSchema),
  UpdateIncomes,
  audits("Update", "Income", "Se actualizó un ingreso")
);

module.exports = router;