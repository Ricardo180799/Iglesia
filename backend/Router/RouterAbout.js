const express = require("express");
const router = express.Router();
const { Auth } = require("./MidlewareAuth");
const { Allow } = require("./MidlewareRol");
const { getAbouts, UpdateAbouts } = require("../Controllers/AboutController");
const { audits } = require("../Controllers/AuditController");
// Obtiene la info de About us
router.get("/About", getAbouts);
//Actualiza la info de About us
router.post(
  "/Panel/About/UpdateAbouts",
  Auth,
  Allow("Pastor"),
  audits("Update", "Abuout_us", "Se actualizó el about_us"),
  UpdateAbouts
);
module.exports = router;
