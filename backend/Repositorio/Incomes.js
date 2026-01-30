const db = require("../Config/DB");

exports.getIncomes = async () => {
  const query = "SELECT * FROM income";
  const [info] = await db.query(query);
  return info;
};

exports.DeleteIncome = async (ID) => {
  const query = "DELETE FROM income WHERE ID = ?";
  await db.execute(query, [ID]);
  return true;
};

exports.UpdateIncome = async (
  Source,
  User_Id,
  Type,
  Amount,
  Description,
  Date,
  Created_By,
  ID
) => {
  const query =
    "UPDATE income SET Source = ?, User_Id = ?, Type = ?, Amount = ?, Description = ?, Date = ?, Created_By = ? WHERE ID = ?";
  
  await db.execute(query, [
    Source,
    User_Id,
    Type,
    Amount,
    Description,
    Date,
    Created_By,
    ID,
  ]);
  return true;
};

exports.AddIncome = async (
  Source,
  User_Id,
  Type,
  Amount,
  Description,
  Dates,
  Created_By
) => {
  const query =
    "INSERT INTO income (Source, User_Id, Type, Amount, Description, Date, Created_By) VALUES (?, ?, ?, ?, ?, ?, ?)";
  
  const values = [
    Source ?? null,
    User_Id ?? null,
    Type ?? null,
    Amount ?? null,
    Description ?? null,
    Dates ?? null,
    Created_By ?? null,
  ];

  await db.execute(query, values);
  return true;
};