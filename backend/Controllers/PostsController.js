const { getPost } = require("../Repositorio/Posts");
const { DeletePost } = require("../Repositorio/Posts");
const { UpdatePost } = require("../Repositorio/Posts");
const { AddPost } = require("../Repositorio/Posts");

exports.getPosts = async (req, res, next) => {
  try {
    const info = await getPost();
    res.json({ info });
  } catch (err) {
    next(err);
  }
};
exports.DeletePosts = async (req, res, next) => {
  const { ID } = req.params;
  try {
    await DeletePost(ID);

    return res.json({ message: "Post eliminado correctamente" });
  } catch (err) {
    next(err);
  }
};
exports.UpdatePostss = async (req, res, next) => {
  const { Title, SLUG, Content, Enlace, Created_by, Category_id, ID } =
    req.body;

  try {
    let FinalImagen = null;

    if (req.file) {
      FinalImagen = req.file.filename;
    } else if (Enlace && Enlace !== "null" && Enlace !== "") {
      FinalImagen = Enlace;
    }

    await UpdatePost(
      Title,
      SLUG,
      Content,
      FinalImagen,
      Created_by,
      Category_id,
      ID,
    );

    res.json({ message: "Post actualizado correctamente" });
  } catch (err) {
    next(err);
  }
};

exports.AddPosts = async (req, res, next) => {
  const { Title, SLUG, Content, Enlace, Created_by, Category_id } = req.body;

  try {
    let FinalImagen = null;

    if (req.file) {
      FinalImagen = req.file.filename;
    } else if (Enlace && Enlace !== "null" && Enlace !== "") {
      FinalImagen = Enlace;
    }

    await AddPost(Title, SLUG, Content, FinalImagen, Created_by, Category_id);

    res.json({ message: "Post añadido correctamente" });
  } catch (err) {
    next(err);
  }
};
