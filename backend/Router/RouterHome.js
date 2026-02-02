const express = require("express");
const router = express.Router();
const { Auth } = require("./MidlewareAuth");
const { Allow } = require("./MidlewareRol");
const {
  getHomesFront,
  UpdateHomes,
  getHomeConfigs,
} = require("../Controllers/HomeController");
const { audits } = require("../Controllers/AuditController");
const validate = require ("../Utils/Validator")
const {updateHomeSchema} = require("../Schema/SchemaHome")

router.get(
  "/Panel/homee", 
  Auth, 
  Allow("Pastor"), 
  getHomeConfigs,
  audits("Lectura", "Home", "Consulta de configuración administrativa del Home")
);

router.get(
  "/home", 
  getHomesFront,
  audits("Lectura", "Home", "Consulta de datos para el Frontend")
);

router.put(
  "/Panel/home/UpdateHomes",
  Auth,
  Allow("Pastor"),
  validate(updateHomeSchema),
  UpdateHomes,
  audits("Update", "Home", "Se actualizó la configuración del home")
);

module.exports = router;