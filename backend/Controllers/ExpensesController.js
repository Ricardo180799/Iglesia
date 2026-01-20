const {
  getExpenses,
  DeleteExpenses,
  UpdateExpenses,
  AddExpenses,
} = require("../Repositorio/expenses");

exports.getExpensess = async (req, res) => {
  try {
    const info = await getExpenses();
    return res.json({ info });
  } catch (err) {
    return res.status(500).json({ error: "Error obteniendo gastos" });
  }
};

exports.DeleteExpensess = async (req, res) => {
  try {
    const { id } = req.body;

    if (!id) return res.status(400).json({ error: "ID requerido" });

    const respuesta = await DeleteExpenses(id);

    if (respuesta) {
      return res.json({ message: "Gasto eliminado correctamente" });
    }
  } catch (err) {
    return res.status(500).json({ error: "Error eliminando gasto" });
  }
};

exports.UpdateExpensess = async (req, res) => {
  try {
    const { Amount, Category, Description, Image, Date, Created_by, ID } =
      req.body;

    if (!ID) return res.status(400).json({ error: "ID requerido" });

    const respuesta = await UpdateExpenses(
      Amount,
      Category,
      Description,
      Image,
      Date,
      Created_by,
      ID
    );

    if (respuesta) {
      return res.json({ message: "Gasto actualizado correctamente" });
    }
  } catch (err) {
    return res.status(500).json({ error: "Error actualizando gasto" });
  }
};

exports.AddExpensess = async (req, res) => {
  try {
    const { Amount, Category, Description, Images, Dates, Created_by } =
      req.body;

    const respuesta = await AddExpenses(
      Amount,
      Category,
      Description,
      Images,
      Dates,
      Created_by
    );

    if (respuesta) {
      return res.json({ message: "Gasto añadido correctamente" });
    }
  } catch (err) {
    return res.status(500).json({ error: "Error añadiendo gasto" });
  }
};
