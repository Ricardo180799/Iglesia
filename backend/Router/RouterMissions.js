const express = require("express");
const router = express.Router();
const { Auth } = require("./MidlewareAuth");
const { Allow } = require("./MidlewareRol");
const {
  getEspecificMissionss,
  getMissionss,
  DeleteMissionss,
  UpdateMissionss,
  AddMissionss,
} = require("../Controllers/MissionssController");
const { uploadClouds } = require("./MidlewareFile");
const { audits } = require("../Controllers/AuditController");

router.get(
  "/Missions", 
  getMissionss, 
  audits("Lectura", "Missions", "Consulta general de misiones")
);

router.get(
  "/EspecificMissions/:ID", 
  getEspecificMissionss, 
  audits("Lectura", "Missions", "Consulta detallada de una misión")
);

router.post(
  "/Missions/Agregar",
  Auth,
  Allow("Pastor", "Misionero"),
  uploadClouds,
  AddMissionss,
  audits("Add", "Missions", "Se añadió una nueva Misión")
);

router.delete(
  "/Missions/DeleteMissionss/:ID",
  Auth,
  Allow("Pastor"),
  DeleteMissionss,
  audits("Delete", "Missions", "Se eliminó una misión")
);

router.put(
  "/Missions/UpdateMissionss",
  Auth,
  Allow("Pastor", "Misionero"),
  uploadClouds,
  UpdateMissionss,
  audits("Update", "Missions", "Se actualizó una misión")
);

module.exports = router;