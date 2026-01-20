const {
  getEspecificMissions,
  getMissions,
  DeleteMissions,
  UpdateMissions,
  AddMissions,
} = require("../Repositorio/Missionss");

exports.getMissionss = async (req, res, next) => {
  try {
    const info = await getMissions();
    res.json(info);
  } catch (err) {
    next(err);
  }
};
exports.getEspecificMissionss = async (req, res, next) => {
  const { ID } = req.params;

  try {
    const info = await getEspecificMissions(ID);

    res.json(info);
  } catch (err) {
    next(err);
  }
};
exports.DeleteMissionss = async (req, res, next) => {
  const { ID } = req.params;
  try {
    await DeleteMissions(ID);

    return res.json({ message: "Misión eliminada correctamente" });
  } catch (err) {
    next(err);
  }
};
exports.UpdateMissionss = async (req, res, next) => {
  const {
    Name,
    Link,
    Locations,
    Description,
    Manager,
    Members,
    Start_Date,
    Update_By,
    ID,
  } = req.body;

  try {
    let finalVisual = null;

    if (req.file) {
      finalVisual = req.file.filename;
    } else if (Link && Link !== "" && Link !== "null") {
      finalVisual = Link;
    }

    await UpdateMissions(
      Name,
      finalVisual,
      Locations,
      Description,
      Manager,
      Members,
      Start_Date,
      Update_By,
      ID,
    );

    res.json({ message: "Misión actualizada correctamente" });
  } catch (err) {
    next(err);
  }
};

exports.AddMissionss = async (req, res, next) => {
  const { Name, Link, Locations, Description, Manager, Members, Start_Date } =
    req.body;

  try {
    let finalVisual = null;

    if (req.file) {
      finalVisual = req.file.filename;
    } else if (Link && Link !== "" && Link !== "null") {
      finalVisual = Link;
    }

    await AddMissions(
      Name,
      finalVisual,
      Locations,
      Description,
      Manager,
      Members,
      Start_Date,
    );

    res.json({ message: "Misión añadida correctamente" });
  } catch (err) {
    next(err);
  }
};
