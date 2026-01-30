const db = require("../Config/DB");

exports.getExpenses = async () => {
  const query = "SELECT * FROM expenses";
  const [info] = await db.query(query);
  return info;
};

exports.DeleteExpenses = async (ID) => {
  const query = "DELETE FROM expenses WHERE ID = ?";
  await db.execute(query, [ID]);
  return true;
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
    "UPDATE expenses SET Amount = ?, Category = ?, Description = ?, Image = ?, Date = ?, Created_by = ? WHERE ID = ?";
  
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
};

exports.AddExpenses = async (
  Amount,
  Category,
  Description,
  Images,
  Dates,
  Created_by
) => {
  const query =
    "INSERT INTO expenses (Amount, Category, Description, Image, Date, Created_by) VALUES (?, ?, ?, ?, ?, ?)";
  
  const values = [
    Amount,
    Category,
    Description,
    Images ?? null,
    Dates,
    Created_by,
  ];

  await db.execute(query, values);
  return true;
};