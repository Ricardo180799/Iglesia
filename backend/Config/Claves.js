const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../.env") });

const Stripe = require("stripe");

const claveS = process.env.CLAVE_S;
const claveT = process.env.CLAVE_T;
const claveR = process.env.CLAVE_R;

const claveStripe = new Stripe(process.env.STRIPE_SECRET_KEY);

module.exports = { claveS, claveT, claveR, claveStripe };
