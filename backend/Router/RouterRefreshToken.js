const express = require("express");
const router = express.Router();
const { Auth } = require("./MidlewareAuth");
const { Allow } = require("./MidlewareRol");
const {
  GetRefreshs,
  AddRefreshs,
  DeleteRefreshs,
  RefreshAccess,
} = require("../Controllers/RefreshController");
const { audits } = require("../Controllers/AuditController");
router.get(
  "/DeleteRefreshs",
  Auth,
  Allow("Pastor"),
  audits("Delete", "RefreshToken", "Se eliminó un refreshToken"),
  DeleteRefreshs
);
router.get("/Refreshh", RefreshAccess);
module.exports = router;
