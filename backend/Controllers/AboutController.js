const { getAbout, UpdateAbout } = require("../Repositorio/About_us");

exports.getAbouts = async (req, res, next) => {
  try {
    const info = await getAbout();

    return res.json({ info });
  } catch (err) {
    next(err);
  }
};

exports.UpdateAbouts = async (req, res, next) => {
  const { origen, historia, mision, doctrina, valores, equipo_pastoral } =
    req.body;
  try {
    await UpdateAbout(
      origen,
      historia,
      mision,
      doctrina,
      valores,
      equipo_pastoral
    );

    res.json({ message: "Post actualizado correctamente" });
  } catch (err) {
    next(err);
  }
};
