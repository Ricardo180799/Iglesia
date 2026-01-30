const db = require("../Config/DB");

exports.getBalance = async () => {
  const query =
    "SELECT (SELECT IFNULL(SUM(Amount),0) FROM income) AS Total_incomes,(SELECT IFNULL(SUM(Amount),0) FROM expenses) AS Total_expenses";
  const [row] = await db.query(query);
  return row[0];
};

exports.getIncomesByMonth = async () => {
  const query =
    "SELECT YEAR(Date) AS YEAR_,MONTH(Date) AS MONTH_,SUM(Amount) AS TOTAL_INCOMES FROM income GROUP BY YEAR(Date),MONTH(Date) ORDER BY YEAR_ DESC,MONTH_ DESC";
  const [rows] = await db.query(query);
  return rows;
};

exports.getExpensesByMonth = async () => {
  const query =
    "SELECT YEAR(Date) AS YEAR_,MONTH(Date) AS MONTH_,SUM(Amount) AS TOTAL_Expenses FROM expenses GROUP BY YEAR(Date),MONTH(Date) ORDER BY YEAR_ DESC,MONTH_ DESC";
  const [rows] = await db.query(query);
  return rows;
};

exports.getMontlyReport = async () => {
  const query =
    "SELECT M.Month_,M.Year_,IFNULL(I.Total_Incomes,0) AS Total_Incomes,IFNULL(E.Total_Expenses,0)AS Total_Expenses FROM(SELECT DISTINCT YEAR(Date) AS Year_,MONTH(Date) AS Month_ FROM income UNION SELECT DISTINCT YEAR(Date) AS Year_,MONTH(Date) AS Month_ FROM expenses) AS M LEFT JOIN(SELECT YEAR(Date) AS Year_,MONTH(Date) AS Month_,SUM(AMOUNT) AS Total_Incomes FROM income GROUP BY YEAR(Date),MONTH(Date)) AS I ON M.Month_ = I.Month_ AND M.Year_ = I.Year_ LEFT JOIN(SELECT YEAR(Date) AS Year_,MONTH(Date) AS Month_,SUM(AMOUNT) AS Total_Expenses FROM expenses GROUP BY YEAR(Date),MONTH(Date)) AS E ON M.Month_ = E.Month_ AND M.Year_ = E.Year_ ORDER BY M.Year_ DESC, M.Month_ DESC";
  const [rows] = await db.query(query);
  return rows;
};