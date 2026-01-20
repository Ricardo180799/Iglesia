const express = require("express");
const router = express.Router();
const { SendTestimoniess } = require("../Controllers/TestimoniesController");
const { Auth } = require("./MidlewareAuth");
const { Allow } = require("./MidlewareRol");
const { ChangeStatuss } = require("../Controllers/TestimoniesController");
const { getTestimoniess } = require("../Controllers/TestimoniesController");
const { uploadClouds } = require("./MidlewareFile");
const {
  DeleteTestimoniess,
  getEspecificTestimoniess,
} = require("../Controllers/TestimoniesController");
const { audits } = require("../Controllers/AuditController");

//Obtiene info de testimonios
router.get("/Testimonies", getTestimoniess(false));

//Envia un testimonio en espera de ser aprobado
router.post(
  "/Testimonies/SendTestimonies",
  Auth,
  uploadClouds,
  SendTestimoniess,
  audits("Envio", "Testimonios", "Un usuario envió un testimonio")
);

//Obtiene toda la info de los testimonios pendientes
router.get(
  "/Panel/TestimoniesPanel/GetTestimonies",
  Auth,
  Allow("Pastor"),
  getTestimoniess(true)
);

//Cambia el estado de los testimonios entre aprobado, pendiente y desaprobado
router.put(
  "/Panel/TestimoniesPanel/ChangeStatus",
  Auth,
  Allow("Pastor"),

  ChangeStatuss,
  audits("Cambio", "Testimonios", "Se cambió el status de un testimonio")
);
//Para borrar un testimonio
router.delete(
  `/Panel/TestimoniesPanel/DeleteTestimonie/:ID`,
  Auth,
  Allow("Pastor"),

  DeleteTestimoniess,
  audits("Borrar", "Testimonios", "Se borró un testimonio")
);

router.get("/especificTestimonies/:ID", getEspecificTestimoniess);

module.exports = router;
