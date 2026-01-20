const uploadCloud = require("../Config/cloudinaryConfig");

const multer = require("multer");

exports.uploadClouds = (req, res, next) => {
  const uploadSingle = uploadCloud.single("File");

  uploadSingle(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({ error: `Error de subida: ${err.message}` });
    } else if (err) {
      return res.status(400).json({ error: err.message });
    }

    next();
  });
};
