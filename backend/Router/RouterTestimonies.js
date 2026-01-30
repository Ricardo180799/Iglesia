const express = require("express");
const router = express.Router();
const { 
  SendTestimoniess, 
  ChangeStatuss, 
  getTestimoniess, 
  DeleteTestimoniess, 
  getEspecificTestimoniess 
} = require("../Controllers/TestimoniesController");
const { Auth } = require("./MidlewareAuth");
const { Allow } = require("./MidlewareRol");
const { uploadClouds } = require("./MidlewareFile");
const { audits } = require("../Controllers/AuditController");

router.get(
  "/Testimonies", 
  getTestimoniess(false), 
  audits("Lectura", "Testimonios", "Consulta de testimonios aprobados")
);

router.post(
  "/Testimonies/SendTestimonies",
  Auth,
  uploadClouds,
  SendTestimoniess,
  audits("Envio", "Testimonios", "Un usuario envió un testimonio")
);

router.get(
  "/Panel/TestimoniesPanel/GetTestimonies",
  Auth,
  Allow("Pastor"),
  getTestimoniess(true),
  audits("Lectura", "Testimonios", "Consulta de panel de testimonios")
);

router.put(
  "/Panel/TestimoniesPanel/ChangeStatus",
  Auth,
  Allow("Pastor"),
  ChangeStatuss,
  audits("Cambio", "Testimonios", "Se cambió el status de un testimonio")
);

router.delete(
  "/Panel/TestimoniesPanel/DeleteTestimonie/:ID",
  Auth,
  Allow("Pastor"),
  DeleteTestimoniess,
  audits("Borrar", "Testimonios", "Se borró un testimonio")
);

router.get(
  "/especificTestimonies/:ID", 
  getEspecificTestimoniess, 
  audits("Lectura", "Testimonios", "Consulta de testimonio específico")
);

module.exports = router;