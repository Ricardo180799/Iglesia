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
const validate = require ("../Utils/Validator");
const { 
  registroSchema,
  loginSchema,
  addRolSchema,
  updateRolSchema,
  deleteUsuarioSchema 
} = require("../Schema/SchemaAssets");
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
  uploadClouds, // Multer primero para procesar el body
  validate(registroSchema), // Luego validamos con Zod
  Registrarse,
  audits("Registrar", "users", "Se registró un usuario")
);

router.post(
  "/Sesion",
  loginLimiter,
  validate(loginSchema),
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

router.get(
  "/Ministerio",
  Auth,
  Allow("Pastor", "Misionero", "Tesorero", "Dev", "Admin"),
  Open,
  audits("Acceso", "panel", "Acceso a Ministerio") 
);

router.get(
  "/ControlPanel", 
  Auth, 
  Allow("Pastor"), 
  Open,
  audits("Acceso", "panel", "Acceso a Panel de Control")
);

router.post(
  "/AddRol",
  Auth,
  Allow("Pastor"),
  validate(addRolSchema),
  ADDRol,
  audits("AñadirRol", "users", "Se añadió un nuevo rol")
);

router.get(
  "/Panel/GetUsers", 
  Auth, 
  Allow("Pastor"), 
  getUsersAlls,
  audits("Lectura", "users", "Consulta de lista completa de usuarios")
);

router.put(
  "/Panel/GetUsers/UpdateRolll",
  Auth,
  Allow("Pastor"),
  validate(updateRolSchema),
  UpdateRols,
  audits("ActualizarRol", "users", "Se actualizó un rol")
);

router.delete(
  "/Panel/GetUsers/DeleteUsuario/:ID",
  Auth,
  Allow("Pastor"),
  validate(deleteUsuarioSchema),
  DeleteUsuarios,
  audits("Delete", "users", "Se eliminó un usuario")
);

module.exports = router;