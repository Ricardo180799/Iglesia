const express = require("express");
const router = express.Router();
const { Auth } = require("./MidlewareAuth");
const { Allow } = require("./MidlewareRol");
const { getAbouts, UpdateAbouts } = require("../Controllers/AboutController");
const { audits } = require("../Controllers/AuditController");

// Obtiene la info de About us
router.get(
  "/About", 
  getAbouts,audits("Read", "About_us", "Se consultó la información de Nosotros")
);

// Actualiza la info de About us
router.put(
  "/About/Update",
  Auth,
  Allow("Pastor"),
  UpdateAbouts,
  audits("Update", "About_us", "Se actualizó la información de Nosotros")
);

module.exports = router;