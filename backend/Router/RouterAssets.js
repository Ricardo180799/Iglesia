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

//Obtiene el inventario
router.get(
  "/Panel/Inventario/getAssetss",
  Auth,
  Allow("Pastor", "Tesorero", "Dev", "Admin"),
  getAssetss
);
//Añade un recurso
router.post(
  "/Panel/Inventario/AddAssetss",
  Auth,
  Allow("Pastor", "Tesorero", "Admin", "Dev"),
  audits("Add", "Assets", "Se añadió recurso al inventario"),
  AddAssetss
);

//Borra un recurso
router.delete(
  `/Panel/Inventario/DeleteAssetss/:Id`,
  Auth,
  Allow("Pastor", "Tesorero", "Admin", "Dev"),
  audits("Delete", "Assets", "Se eliminó un recurso del inventario"),
  DeleteAssetss
);
//Actualiza un recurso
router.put("/Panel/Inventario/UpdateAssetss", UpdateAssetss);
module.exports = router;
