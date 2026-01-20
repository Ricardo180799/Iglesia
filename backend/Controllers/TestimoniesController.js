const { SendTestimonies } = require("../Repositorio/Testimonies");
const { ChangeStatus } = require("../Repositorio/Testimonies");
const { DeleteTestimonies } = require("../Repositorio/Testimonies");
const {
  GetTestimonies,
  getEspecificTestimonies,
} = require("../Repositorio/Testimonies");
exports.SendTestimoniess = async (req, res, next) => {
  try {
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
      Created_By: Created_By || "Sistema",
    };

    const resultado = await SendTestimonies(infoParaRepo);

    res.status(201).json({
      success: true,
      mensaje: resultado,
      guardado: {
        thumbnail: finalThumbnail,
        video: finalVideo,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al procesar el testimonio" });
  }
};
exports.ChangeStatuss = async (req, res, next) => {
  const { ID, Status } = req.body;
  try {
    await ChangeStatus(ID, Status);
    return res.json({ message: "Testimonio Actualizado" });
  } catch (err) {
    next(err);
  }
};

exports.DeleteTestimoniess = async (req, res, next) => {
  const { ID } = req.params;
  try {
    await DeleteTestimonies(ID);

    res.json({ message: "El testimonio ha sido borrado correctamente" });
  } catch (err) {
    next(err);
  }
};
exports.getTestimoniess = (vista) => async (req, res, next) => {
  try {
    const info = await GetTestimonies(vista);
    res.json(info);
  } catch (err) {
    res.status(500).json({ error: "Error obteniendo testimonios" });
  }
};
exports.getEspecificTestimoniess = async (req, res, next) => {
  const { ID } = req.params;
  try {
    const info = await getEspecificTestimonies(ID);
    return res.json({ info });
  } catch (err) {
    next(err);
  }
};
