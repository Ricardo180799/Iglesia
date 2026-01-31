const express = require("express");
const rateLimit = require("express-rate-limit");
const router = express.Router();

// Importación de Controladores
const { uploadClouds } = require("./MidlewareFile");
const { 
  getUsersAlls, 
  ADDRol, 
  UpdateRols, 
  DeleteUsuarios, 
  Registrarse, 
  Logout, 
  Sesions, 
  Perfil 
} = require("../Controllers/UsuarioControllers");
const { audits } = require("../Controllers/AuditController");
const { Open } = require("../Controllers/ControlController");

// Middlewares
const { Allow } = require("./MidlewareRol");
const { Auth } = require("./MidlewareAuth");

const loginLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 5,
  message: "Has excedido el número de intentos",
});

// --- RUTAS PÚBLICAS ---

router.post(
  "/Registrar",
  loginLimiter,
  uploadClouds,
  Registrarse,
  audits("Registrar", "users", "Se registró un usuario") // El audit al final para enviar la respuesta
);

router.post(
  "/Sesion",
  loginLimiter,
  Sesions,
  audits("Sesion", "users", "Inicio sesión un usuario")
);

router.post(
  "/Logout",
  Logout,
  audits("Logout", "users", "Cierre de sesión")
);

// --- RUTAS PROTEGIDAS ---

router.post(
  "/Perfil",
  Auth,
  Perfil,
  audits("Perfil", "users", "Un usuario entró a su perfil")
);

// Acceso al panel de ministerio (Sin audit de escritura, pero auditamos el acceso si lo deseas)
router.get(
  "/Ministerio",
  Auth,
  Allow("Pastor", "Misionero", "Tesorero", "Dev", "Admin"),
  Open,
  audits("Acceso", "panel", "Acceso a Ministerio") 
);

// Acceso al panel de control
router.get(
  "/ControlPanel", 
  Auth, 
  Allow("Pastor"), 
  Open,
  audits("Acceso", "panel", "Acceso a Panel de Control")
);

// Añadir roles
router.post(
  "/AddRol",
  Auth,
  Allow("Pastor"),
  ADDRol,
  audits("AñadirRol", "users", "Se añadió un nuevo rol")
);

// Obtener info de la tabla usuarios (Audit opcional para lectura)
router.get(
  "/Panel/GetUsers", 
  Auth, 
  Allow("Pastor"), 
  getUsersAlls,
  audits("Lectura", "users", "Consulta de lista completa de usuarios")
);

// Modificar el rol de un usuario
router.put(
  "/Panel/GetUsers/UpdateRolll",
  Auth,
  Allow("Pastor"),
  UpdateRols,
  audits("ActualizarRol", "users", "Se actualizó un rol")
);

// Eliminar un usuario
router.delete(
  "/Panel/GetUsers/DeleteUsuario/:ID",
  Auth,
  Allow("Pastor"),
  DeleteUsuarios,
  audits("Delete", "users", "Se eliminó un usuario")
);

module.exports = router;