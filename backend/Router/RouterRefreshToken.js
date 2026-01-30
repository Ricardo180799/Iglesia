const express = require("express");
const router = express.Router();
const { Auth } = require("./MidlewareAuth");
const { Allow } = require("./MidlewareRol");
const {
  DeleteRefreshs,
  RefreshAccess,
} = require("../Controllers/RefreshController");
const { audits } = require("../Controllers/AuditController");

router.get(
  "/DeleteRefreshs",
  Auth,
  Allow("Pastor"),
  DeleteRefreshs,
  audits("Delete", "RefreshToken", "Se eliminó un refreshToken")
);

router.get(
  "/Refreshh", 
  RefreshAccess,
  audits("Refresh", "Auth", "Se renovó un access token")
);

module.exports = router;