require("dotenv").config();
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "imagenes_iglesia",

    resource_type: "auto",
    allowed_formats: ["jpg", "png", "jpeg", "webp", "mp4", "mov", "webm"],
  },
});

const uploadCloud = multer({
  storage,
  limits: { fileSize: 50 * 1024 * 1024 },
});

module.exports = uploadCloud;
