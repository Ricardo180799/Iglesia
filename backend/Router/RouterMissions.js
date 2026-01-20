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

//Obtiene Todas las misiones
router.get("/Missions", getMissionss);

//Obtiene la info de una misión en específico
router.get(`/EspecificMissions/:ID`, getEspecificMissionss);

//Añade una misión
router.post(
  "/Missions/Agregar",
  Auth,
  Allow("Pastor", "Misionero"),
  uploadClouds,
  AddMissionss,
  audits("Add", "Missions", "Se añadió una nueva Misión"),
);
//Borra una Misión
router.delete(
  `/Missions/DeleteMissionss/:ID`,
  Auth,
  Allow("Pastor"),
  DeleteMissionss,
  audits("Delete", "Missions", "Se eliminó una  misión"),
);
//Actualiza una Misión
router.put(
  "/Missions/UpdateMissionss",
  Auth,
  Allow("Pastor", "Misionero"),
  uploadClouds,
  UpdateMissionss,
  audits("Update", "Missions", "Se actualizó una  misión"),
);
module.exports = router;
