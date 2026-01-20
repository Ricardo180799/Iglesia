const db = require("../Config/DB");
exports.getExpenses = async () => {
  const query = "SELECT * FROM expenses ";

  try {
    const [info] = await db.query(query);
    return info;
  } catch (err) {
    throw err;
  }
};
exports.DeleteExpenses = async (id) => {
  const query = "DELETE FROM expenses WHERE ID = ?";
  try {
    await db.execute(query, [id]);
    return true;
  } catch (err) {
    throw err;
  }
};
exports.UpdateExpenses = async (
  Amount,
  Category,
  Description,
  Images,
  Dates,
  Created_by,
  ID
) => {
  const query =
    "UPDATE  expenses SET Amount = ?,Category = ?, Description=?, Image=?,Date=?, Created_by=? WHERE ID = ?";
  try {
    await db.execute(query, [
      Amount,
      Category,
      Description,
      Images,
      Dates,
      Created_by,
      ID,
    ]);
    return true;
  } catch (err) {
    throw err;
  }
};
exports.AddExpenses = async (
  Amount,
  Category,
  Description,
  Images,
  Dates,
  Created_by
) => {
  const value = [
    Amount,
    Category,
    Description,
    Images ?? null,
    Dates,
    Created_by,
  ];
  const query =
    "INSERT INTO expenses (Amount, Category, Description, Image,Date,Created_by)VALUES(?,?,?,?,?,?)";
  try {
    await db.execute(query, value);
    return true;
  } catch (err) {
    throw err;
  }
};
