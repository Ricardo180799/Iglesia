const {
  getALLPostmissions,
  getPostmissions,
  DeletePostmissions,
  UpdatePostmissions,
  AddPostmissions,
} = require("../Repositorio/PostMissions");

exports.getALLPostmissionss = async (req, res, next) => {
  try {
    const info = await getALLPostmissions();
    return res.json(info);
  } catch (err) {
    next(err);
  }
};

exports.getPostmissionss = async (req, res, next) => {
  const { ID } = req.params;
  try {
    const info = await getPostmissions(ID);
    return res.json(info);
  } catch (err) {
    next(err);
  }
};
exports.DeletePostmissionss = async (req, res, next) => {
  const { ID } = req.params;
  try {
    await DeletePostmissions(ID);

    return res.json({ message: "Contenido eliminado correctamente" });
  } catch (err) {
    next(err);
  }
};
exports.UpdatePostmissionss = async (req, res, next) => {
  const { ID_Missions, Title, Slug, Content, Link, Created_by, ID } = req.body;

  try {
    
    let finalVisual = null;

    if (req.file) {
      
      finalVisual = req.file.filename;
    } else if (Link && Link !== "" && Link !== "null") {
      
      finalVisual = Link;
    }

    await UpdatePostmissions(
      ID_Missions,
      Title,
      Slug,
      Content,
      finalVisual, 
      Created_by,
      ID
    );

    res.json({ message: "Contenido actualizado correctamente" });
  } catch (err) {
    next(err);
  }
};

exports.AddPostmissionss = async (req, res, next) => {
  const { ID_Missions, Title, Slug, Content, Link, Created_by } = req.body;

  try {
    let finalVisual = null;

    if (req.file) {
      finalVisual = req.file.filename;
    } else if (Link && Link !== "" && Link !== "null") {
      finalVisual = Link;
    }

    console.log("Datos a insertar:", {
      ID_Missions,
      Title,
      finalVisual,
      Created_by,
    });

    await AddPostmissions(
      ID_Missions,
      Title,
      Slug,
      Content,
      finalVisual,
      Created_by
    );

    res.json({ message: "Contenido añadido correctamente" });
  } catch (err) {
    next(err);
  }
};
