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

//Obtiene Todos los mensajes
router.get("/Post", getContact_messages);
//Añade un mensaje
router.post(
  "/Messages/Contact",
  Auth,
  audits("Add", "Contact_messages", "Se añadió un Contact_messages"),
  AddContact_messages
);

//Borra un mensaje
router.post(
  "/Panel/Messages/DeleteContact_messages",
  Auth,
  Allow("Pastor"),
  audits("Delete", "Contact_messages", "Se eliminó un Contact_messages"),
  DeleteContact_messages
);
//Actualiza un mensaje
router.post(
  "/Panel/Messages/UpdateContact_messages",
  Auth,
  Allow("Pastor"),
  audits("Update", "Contact_messages", "Se actualizó un Contact_messages"),
  UpdateContact_messages
);
module.exports = router;
