const express = require("express");
const router = express.Router();
const { Auth } = require("./MidlewareAuth");
const { Allow } = require("./MidlewareRol");
const { 
  getPosts, 
  DeletePosts, 
  UpdatePostss, 
  AddPosts 
} = require("../Controllers/PostsController");
const { audits } = require("../Controllers/AuditController");
const { uploadClouds } = require("./MidlewareFile");

router.get(
  "/Post", 
  getPosts,
  audits("Lectura", "Posts", "Consulta de todos los posts")
);

router.post(
  "/Posts/Agregar",
  Auth,
  Allow("Pastor"),
  uploadClouds,
  AddPosts,
  audits("Add", "Posts", "Se añadió un nuevo Post")
);

router.delete(
  "/Posts/DeletePost/:ID",
  Auth,
  Allow("Pastor"),
  DeletePosts,
  audits("Delete", "Posts", "Se eliminó un Post")
);

router.put(
  "/Posts/UpdatePostss",
  Auth,
  Allow("Pastor"),
  uploadClouds,
  UpdatePostss,
  audits("Update", "Posts", "Se actualizó un Post")
);

module.exports = router;