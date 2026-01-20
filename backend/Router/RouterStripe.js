const express = require("express");
const router = express.Router();
const { audits } = require("../Controllers/AuditController");

const {
  PostInfo,
  ConfirmDonation,
} = require("../Controllers/StripeController");
router.post(
  "/DonarI",
  audits("Solicitud", "Donaciones", "Se envió una solicitud de donación"),
  PostInfo
);
router.post(
  "/ConfirmDonation",
  express.raw({ type: "application/json" }),
  audits("Confirmacion", "Donaciones", "Se envió una confirmación de donación"),
  ConfirmDonation
);
module.exports = router;
