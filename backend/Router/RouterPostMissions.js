const express = require("express");
const router = express.Router();
const { Auth } = require("./MidlewareAuth");
const { Allow } = require("./MidlewareRol");
const {
  getALLPostmissionss,
  getPostmissionss,
  DeletePostmissionss,
  UpdatePostmissionss,
  AddPostmissionss,
} = require("../Controllers/PostMissionsController");
const { uploadClouds } = require("./MidlewareFile");
const { audits } = require("../Controllers/AuditController");

router.get(
  "/AllPostMissions", 
  getALLPostmissionss,
  audits("Lectura", "Misiones", "Consulta de todos los contenidos de misiones")
);

router.get(
  "/PostMissions/:ID", 
  getPostmissionss,
  audits("Lectura", "Misiones", "Consulta de contenido de misión específica")
);

router.delete(
  "/PostMissions/DeletePostmissionss/:ID",
  Auth,
  Allow("Pastor"),
  DeletePostmissionss,
  audits("Delete", "Misiones", "Se eliminó un contenido misión")
);

router.put(
  "/PostMissions/UpdatePostmissionss",
  Auth,
  Allow("Pastor", "Misionero"),
  uploadClouds,
  UpdatePostmissionss,
  audits("Update", "Misiones", "Se actualizó un contenido misión")
);

router.post(
  "/PostMissions/AddPostmissionss",
  Auth,
  Allow("Pastor", "Misionero"),
  uploadClouds,
  AddPostmissionss,
  audits("Add", "Misiones", "Se añadió un contenido misión")
);

module.exports = router;