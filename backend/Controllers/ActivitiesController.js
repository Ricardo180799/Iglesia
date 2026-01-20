const {
  getActivities,
  DeleteActivities,
  UpdateActivities,
  AddActivities,
} = require("../Repositorio/Activities");
exports.getActivitiess = async (req, res, next) => {
  try {
    const info = await getActivities();
    res.json(info);
  } catch (err) {
    next(err);
  }
};
exports.DeleteActivitiess = async (req, res, next) => {
  const { ID } = req.params;
  try {
    await DeleteActivities(ID);

    return res.json({ message: "Actividad eliminada correctamente" });
  } catch (err) {
    next(err);
  }
};
// Actualiza un post
exports.UpdateActivitiess = async (req, res, next) => {
  const { Title, Enlace, Text, Activity_Date, ID } = req.body;

  try {
    let FinalVisual = null;

    if (req.file) {
      FinalVisual = req.file.filename;
    } else if (Enlace && Enlace !== "null" && Enlace !== "") {
      FinalVisual = Enlace;
    }

    await UpdateActivities(Title, FinalVisual, Text, Activity_Date, ID);

    res.json({ message: "Actividad actualizada correctamente" });
  } catch (err) {
    next(err);
  }
};
exports.AddActivitiess = async (req, res, next) => {
  const { Title, Enlace, Text, Activity_Date } = req.body;

  try {
    let FinalVisual = null;

    if (req.file) {
      FinalVisual = req.file.filename;
    } else if (Enlace && Enlace !== "null" && Enlace !== "") {
      FinalVisual = Enlace;
    }
    console.log("Datosssss... ", Title, FinalVisual, Text, Activity_Date);
    await AddActivities(Title, FinalVisual, Text, Activity_Date);

    return res.json({ message: "Actividad añadida correctamente" });
  } catch (err) {
    next(err);
  }
};
