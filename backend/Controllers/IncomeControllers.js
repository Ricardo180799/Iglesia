const {
  getIncomes,
  DeleteIncome,
  UpdateIncome,
  AddIncome,
} = require("../Repositorio/Incomes");

exports.getIncomess = async (req, res, next) => {
  try {
    const info = await getIncomes();

    return res.json({ info });
  } catch (err) {
    next(err);
  }
};
exports.DeleteIncomes = async (req, res, next) => {
  const { id } = req.body;
  try {
    await DeleteIncome(id);

    return res.json({ message: "Income eliminado correctamente" });
  } catch (err) {
    next(err);
  }
};
exports.UpdateIncomes = async (req, res, next) => {
  const { Source, User_Id, Type, Amount, Description, Date, Created_By, ID } =
    req.body;
  try {
    await UpdateIncome(
      Source,
      User_Id,
      Type,
      Amount,
      Description,
      Date,
      Created_By,
      ID
    );

    res.json({ message: "Income actualizado correctamente" });
  } catch (err) {
    next(err);
  }
};
exports.AddIncomes = async (req, res, next) => {
  const { Source, User_Id, Type, Amount, Description, Dates, Created_By } =
    req.body;
  try {
    await AddIncome(
      Source,
      User_Id,
      Type,
      Amount,
      Description,
      Dates,
      Created_By
    );

    res.json({ message: "Income añadido correctamente" });
  } catch (err) {
    next(err);
  }
};
