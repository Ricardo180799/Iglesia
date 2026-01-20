const express = require("express");
const rateLimit = require("express-rate-limit");
const { getUsersAlls } = require("../Controllers/UsuarioControllers");
const { ADDRol } = require("../Controllers/UsuarioControllers");
const { Allow } = require("./MidlewareRol");
const { UpdateRols } = require("../Controllers/UsuarioControllers");
const { DeleteUsuarios } = require("../Controllers/UsuarioControllers");
const { audits } = require("../Controllers/AuditController");
const { Open } = require("../Controllers/ControlController");
const loginLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 5,
  message: "Has excedido el número de intentos",
});
const { Auth } = require("./MidlewareAuth");
const { Perfil } = require("../Controllers/UsuarioControllers");
const router = express.Router();
const { Registrarse } = require("../Controllers/UsuarioControllers");
const { Logout } = require("../Controllers/UsuarioControllers");
const { Sesions } = require("../Controllers/UsuarioControllers");

router.post(
  "/Registrar",
  loginLimiter,
  audits("Registrar", "users", "Se registro un usuario"),
  Registrarse
);
router.post(
  "/Sesion",
  loginLimiter,
  audits("Sesion", "users", "Inicio sesion un usuario"),
  Sesions
);
router.post(
  "/Logout",

  Logout
);
router.post(
  "/Perfil",
  Auth,
  audits("Perfil", "users", " Un usuario entro a su perfil"),
  Perfil
);
//Acceso al panel de ministerio
router.get(
  "/Ministerio",
  Auth,
  Allow("Pastor", "Misionero", "Tesorero", "Dev", "Admin"),
  Open
);

//Acceso al panel de control
router.get("/ControlPanel", Auth, Allow("Pastor"), Open);
//Añadir roles
router.post(
  "/AddRol",
  Auth,
  Allow("Pastor"),
  audits("AñadirRol", "users", "Se añadio un nuevo rol"),
  ADDRol
);
//Obtener info de la tabla usuarios
router.get("/Panel/GetUsers", Auth, Allow("Pastor"), getUsersAlls);
//Modificar el rol de un usuario
router.put(
  "/Panel/GetUsers/UpdateRolll",
  Auth,
  Allow("Pastor"),
  audits("ActualizarRol", "users", "Se actualizo un rol"),
  UpdateRols
);
//Eliminar un usuario
router.delete(
  `/Panel/GetUsers/DeleteUsuario/:ID`,
  Auth,
  Allow("Pastor"),
  audits("Delete", "users", "Se elimino un usuario un usuario"),
  DeleteUsuarios
);

module.exports = router;
