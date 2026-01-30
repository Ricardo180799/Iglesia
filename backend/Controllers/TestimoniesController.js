const { 
  SendTestimonies, 
  ChangeStatus, 
  DeleteTestimonies, 
  GetTestimonies, 
  getEspecificTestimonies 
} = require("../Repositorio/Testimonies");
const AppError = require("../Utils/AppError");
const catchAsync = require("../Utils/CatchAsync");

exports.SendTestimoniess = catchAsync(async (req, res, next) => {
  const {
    Type,
    Title,
    Content,
    Author,
    Text,
    Video_url,
    Thumbnail_url,
    Created_By,
  } = req.body;

  let finalThumbnail = null;
  let finalVideo = null;

  if (req.file) {
    const isImage = req.file.mimetype.startsWith("image/");
    const isVideo = req.file.mimetype.startsWith("video/");
    if (isImage) finalThumbnail = req.file.path;
    if (isVideo) finalVideo = req.file.path;
  } else {
    const link = Video_url || Thumbnail_url;
    if (link) {
      const esFormatoVideo =
        /\.(mp4|webm|ogg|mov)$/i.test(link) ||
        link.includes("youtube.com") ||
        link.includes("youtu.be") ||
        link.includes("vimeo.com");
      if (esFormatoVideo) finalVideo = link;
      else finalThumbnail = link;
    }
  }

  const infoParaRepo = {
    Type,
    Title,
    Content,
    Author,
    Text: Text || null,
    Video_Url: finalVideo,
    Thumbnail: finalThumbnail,
    Created_By: Created_By || 20,
  };

  const resultado = await SendTestimonies(infoParaRepo);

  res.locals.response = {
    status: 201,
    body: {
      success: true,
      mensaje: resultado,
      guardado: {
        thumbnail: finalThumbnail,
        video: finalVideo,
      },
    }
  };
  next();
});

exports.ChangeStatuss = catchAsync(async (req, res, next) => {
  const { ID, Status } = req.body;
  if (!ID || !Status) return next(new AppError("ID y Status son requeridos", 400));

  await ChangeStatus(ID, Status);
  
  res.locals.response = {
    status: 200,
    body: { message: "Testimonio Actualizado" }
  };
  next();
});

exports.DeleteTestimoniess = catchAsync(async (req, res, next) => {
  const { ID } = req.params;
  if (!ID) return next(new AppError("ID es requerido", 400));

  await DeleteTestimonies(ID);

  res.locals.response = {
    status: 200,
    body: { message: "El testimonio ha sido borrado correctamente" }
  };
  next();
});

exports.getTestimoniess = (vista) => catchAsync(async (req, res, next) => {
  const info = await GetTestimonies(vista);
  
  res.locals.response = {
    status: 200,
    body: info
  };
  next();
});

exports.getEspecificTestimoniess = catchAsync(async (req, res, next) => {
  const { ID } = req.params;
  if (!ID) return next(new AppError("ID es requerido", 400));

  const info = await getEspecificTestimonies(ID);
  if (!info) return next(new AppError("Testimonio no encontrado", 404));

  res.locals.response = {
    status: 200,
    body: { info }
  };
  next();
});