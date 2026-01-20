const { UpdateHome, getHome, getHomesConfig } = require("../Repositorio/Home");

exports.UpdateHomes = async (req, res) => {
  try {
    const { Campo, Valor } = req.body;
    const ID = 1;

    await UpdateHome(Campo, Valor, ID);

    return res.json({
      message: "Configuración Home actualizada correctamente",
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

exports.getHomesFront = async (req, res) => {
  try {
    const info = await getHome();
    return res.json({ info });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
exports.getHomeConfigs = async (req, res) => {
  try {
    const info = await getHomesConfig();
    return res.json(info);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
