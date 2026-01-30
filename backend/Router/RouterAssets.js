const express = require("express");
const router = express.Router();
const { Auth } = require("./MidlewareAuth");
const { Allow } = require("./MidlewareRol");
const {
  getAssetss,
  DeleteAssetss,
  UpdateAssetss,
  AddAssetss,
} = require("../Controllers/AssetsController");
const { audits } = require("../Controllers/AuditController");

// Obtiene el inventario
router.get(
  '/Panel/Inventario/getAssetss',
  Auth,
  Allow("Pastor", "Tesorero", "Dev", "Admin"),
  getAssetss,
  audits("Lectura", "Assets", "Consulta general del inventario")
);

// Añade un recurso
router.post(
  '/Panel/Inventario/AddAssetss',
  Auth,
  Allow("Pastor", "Tesorero", "Admin", "Dev"),
  AddAssetss,
  audits("Add", "Assets", "Se añadió recurso al inventario")
);

// Borra un recurso
router.delete(
  '/Panel/Inventario/DeleteAssetss/:ID',
  Auth,
  Allow("Pastor", "Tesorero", "Admin", "Dev"),
  DeleteAssetss,
  audits("Delete", "Assets", "Se eliminó un recurso del inventario")
);

// Actualiza un recurso
router.put(
  '/Panel/Inventario/UpdateAssetss',
  Auth,
  Allow("Pastor", "Tesorero", "Admin", "Dev"),
  UpdateAssetss,
  audits("Update", "Assets", "Se actualizó un recurso del inventario")
);

module.exports = router;