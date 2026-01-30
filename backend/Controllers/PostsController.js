const { getPost, DeletePost, UpdatePost, AddPost } = require("../Repositorio/Posts");
const AppError = require("../Utils/AppError");
const catchAsync = require("../Utils/CatchAsync");

exports.getPosts = catchAsync(async (req, res, next) => {
  const info = await getPost();

  res.locals.response = {
    status: 200,
    body: { info }
  };
  next();
});

exports.DeletePosts = catchAsync(async (req, res, next) => {
  const { ID } = req.params;
  if (!ID) return next(new AppError("ID es requerido", 400));

  await DeletePost(ID);

  res.locals.response = {
    status: 200,
    body: { message: "Post eliminado correctamente" }
  };
  next();
});

exports.UpdatePostss = catchAsync(async (req, res, next) => {
  const { Title, SLUG, Content, Enlace, Created_by, Category_id, ID } = req.body;

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
    ID
  );

  res.locals.response = {
    status: 200,
    body: { message: "Post actualizado correctamente" }
  };
  next();
});

exports.AddPosts = catchAsync(async (req, res, next) => {
  const { Title, SLUG, Content, Enlace, Created_by, Category_id } = req.body;

  let FinalImagen = null;
  if (req.file) {
    FinalImagen = req.file.filename;
  } else if (Enlace && Enlace !== "null" && Enlace !== "") {
    FinalImagen = Enlace;
  }

  await AddPost(Title, SLUG, Content, FinalImagen, Created_by, Category_id);

  res.locals.response = {
    status: 201,
    body: { message: "Post añadido correctamente" }
  };
  next();
});