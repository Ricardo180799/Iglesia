const {
  getAssets,
  DeleteAssets,
  UpdateAssets,
  AddAssets,
} = require("../Repositorio/Assets");
exports.getAssetss = async (req, res) => {
  try {
    const info = await getAssets();
    return res.json(info);
  } catch (err) {
    return res.status(500).json({ error: "Error obteniendo inventario" });
  }
};

exports.DeleteAssetss = async (req, res) => {
  try {
    const { Id } = req.params;

    if (!Id) return res.status(400).json({ error: "ID requerido" });

    const respuesta = await DeleteAssets(Id);

    if (respuesta) {
      return res.json({ message: "Recurso eliminado correctamente" });
    }
  } catch (err) {
    return res.status(500).json({ error: "Error eliminando recurso" });
  }
};

exports.UpdateAssetss = async (req, res) => {
  try {
    const {
      Name,
      Cantidad,
      Category,
      Adquisition_date,
      Price,
      Status,
      Locations,
      Responsible_id,
      Id,
    } = req.body;

    if (!Id) return res.status(400).json({ error: "ID requerido" });
    const respuesta = await UpdateAssets(
      Name,
      Cantidad,
      Category,
      Adquisition_date,
      Price,
      Status,
      Locations,
      Responsible_id,
      Id
    );

    if (respuesta) {
      return res.json({ message: "Inventario actualizado correctamente" });
    }
  } catch (err) {
    return res.status(500).json({ error: "Error actualizando inventario" });
  }
};

exports.AddAssetss = async (req, res) => {
  try {
    const {
      Name = "",
      Category = "",
      Cantidad = 0,
      Adquisition_date = null,
      Price = 0,
      Status = "nuevo",
      Locations = "",
      Responsible_id = 0,
    } = req.body;

    const respuesta = await AddAssets(
      Name,
      Cantidad,
      Category,
      Adquisition_date,
      Price,
      Status,
      Locations,
      Responsible_id
    );

    if (respuesta) {
      return res.json({ message: "Recurso añadido correctamente" });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Error añadiendo recurso" });
  }
};
