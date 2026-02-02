const express = require("express");
const router = express.Router();
const { Auth } = require("./MidlewareAuth");
const { Allow } = require("./MidlewareRol");
const {
  getContact_messages,
  DeleteContact_messages,
  UpdateContact_messages,
  AddContact_messages,
} = require("../Controllers/Contact_MessagesController");
const { audits } = require("../Controllers/AuditController");
const validate = require("../Utils/Validator")
const {addContactSchema,updateContactSchema,deleteContactSchema} = require("../Schema/SchemaContact")

// Obtiene todos los mensajes
router.get(
  '/Panel/Messages', 
  Auth, 
  Allow("Pastor"), 
  getContact_messages,
  audits("Lectura", "Contact_messages", "Consulta de mensajes de contacto")
);

// Añade un mensaje (Público o Auth dependiendo de tu lógica, aquí mantenemos Auth si es necesario)
router.post(
  '/Messages/Contact',
  validate(addContactSchema),
  AddContact_messages,
  audits("Add", "Contact_messages", "Se envió un nuevo formulario de contacto")
);

// Borra un mensaje
router.delete(
  '/Panel/Messages/Delete/:ID',
  Auth,
  Allow("Pastor"),
   validate( deleteContactSchema),
  DeleteContact_messages,
  audits("Delete", "Contact_messages", "Se eliminó un mensaje de contacto")
);

// Actualiza un mensaje
router.put(
  '/Panel/Messages/Update',
  Auth,
  Allow("Pastor"),
  validate( updateContactSchema),
  UpdateContact_messages,
  audits("Update", "Contact_messages", "Se actualizó un mensaje de contacto")
);

module.exports = router;