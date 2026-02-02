const express = require("express");
const router = express.Router();
const { Auth } = require("./MidlewareAuth");
const { Allow } = require("./MidlewareRol");
const validate = require ("../Utils/Validator")
const {createActivitySchema,updateActivitySchema,deleteActivitySchema} = require("../Schema/SchemaAbout")
const {
  getActivitiess,
  DeleteActivitiess,
  UpdateActivitiess,
  AddActivitiess,
} = require("../Controllers/ActivitiesController");
const { audits } = require("../Controllers/AuditController");
const { uploadClouds } = require("./MidlewareFile");

//Obtiene Todas las actividades
router.get("/Actividades", getActivitiess);

//Añade una actividad
router.post(
  "/AddActivitiess",
  Auth,
  Allow("Pastor"),
  validate(createActivitySchema),
  uploadClouds,
  AddActivitiess,
  audits("Add", "Actividades", "Se añadió una nueva Actividad")
);
//Borra una actividad
router.delete(
  `/DeleteActivitiess/:ID`,
  Auth,
  Allow("Pastor"),
  validate(deleteActivitySchema),
  DeleteActivitiess,
  audits("Delete", "Actividades", "Se eliminó una  Actividad")
);

//Actualiza un post
router.put(
  "/UpdateActivitiess",
  Auth,
  Allow("Pastor"),
  validate(updateActivitySchema),
  UpdateActivitiess,
  audits("Update", "Actividades", "Se actualizó una  Actividad")
);
module.exports = router;
