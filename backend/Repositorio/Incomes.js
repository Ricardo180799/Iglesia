const db = require("../Config/DB");
exports.getIncomes = async () => {
  const query = "SELECT * FROM income ";

  try {
    const [info] = await db.query(query);
    return info;
  } catch (err) {
    throw err;
  }
};
exports.DeleteIncome = async (id) => {
  const query = "DELETE FROM income WHERE ID = ?";
  try {
    await db.execute(query, [id]);
    return true;
  } catch (err) {
    throw err;
  }
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
    "UPDATE  income SET Source = ?, User_Id = ?,Type=?, Amount=?,Description=?,Date=?,Created_By=? WHERE ID = ?";
  try {
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
  } catch (err) {
    throw err;
  }
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
  console.log(Source, User_Id, Type, Amount, Description, Dates, Created_By);
  const query =
    "INSERT INTO income (Source, User_Id, Type, Amount, Description,Date,Created_By)VALUES(?,?,?,?,?,?,?)";
  try {
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
  } catch (err) {
    throw err;
  }
};
