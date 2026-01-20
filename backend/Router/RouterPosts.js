const express = require("express");
const router = express.Router();
const { Auth } = require("./MidlewareAuth");
const { Allow } = require("./MidlewareRol");
const { getPosts } = require("../Controllers/PostsController");
const { DeletePosts } = require("../Controllers/PostsController");
const { UpdatePostss } = require("../Controllers/PostsController");
const { AddPosts } = require("../Controllers/PostsController");
const { audits } = require("../Controllers/AuditController");
const { uploadClouds } = require("./MidlewareFile");

//Obtiene Todos los posts
router.get("/Post", getPosts);

//Añade un post
router.post(
  "/Posts/Agregar",
  Auth,
  Allow("Pastor"),
  uploadClouds,
  AddPosts,
  audits("Add", "Posts", "Se añadió un nuevo Post"),
);
//Borra un post
router.delete(
  `/Posts/DeletePost/:ID`,
  Auth,
  Allow("Pastor"),
  DeletePosts,
  audits("Delete", "Posts", "Se eliminó un  Post"),
);

//Actualiza un post
router.put(
  "/Posts/UpdatePostss",
  Auth,
  Allow("Pastor"),
  uploadClouds,
  UpdatePostss,
  audits("Update", "Posts", "Se actualizó un  Post"),
);
module.exports = router;
