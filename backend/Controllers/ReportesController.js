const {
  getBalance,
  getIncomesByMonth,
  getExpensesByMonth,
  getMontlyReport,
} = require("../Repositorio/Reportes");
exports.getBalances = async (req, res) => {
  try {
    const info = await getBalance();
    return res.json(info);
  } catch (err) {
    throw err;
  }
};
exports.getIncomesByMonths = async (req, res) => {
  try {
    const info = await getIncomesByMonth();
    return res.json(info);
  } catch (err) {
    throw err;
  }
};
exports.getExpensesByMonths = async (req, res) => {
  try {
    const info = await getExpensesByMonth();
    return res.json(info);
  } catch (err) {
    throw err;
  }
};
exports.getMontlyReports = async (req, res) => {
  try {
    const info = await getMontlyReport();
    return res.json(info);
  } catch (err) {
    throw err;
  }
};
