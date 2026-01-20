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

//Obtiene configuracion del home
router.get("/Panel/homee", Auth, Allow("Pastor"), getHomeConfigs);

//Obtiene La Info del home para el frontend
router.get("/home", getHomesFront);

//Actualiza una configuracion Home
router.put(
  "/Panel/home/UpdateHomes",
  Auth,
  Allow("Pastor"),
  audits("Update", "Homee", "Se actualizó la configuración del home "),
  UpdateHomes
);

module.exports = router;
