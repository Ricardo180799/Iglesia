const db = require("../Config/DB");
exports.getAssets = async () => {
  const query = "SELECT * FROM assets ";

  try {
    const [info] = await db.query(query);
    return info;
  } catch (err) {
    throw err;
  }
};
exports.DeleteAssets = async (Id) => {
  const query = "DELETE FROM assets WHERE Id = ?";
  try {
    await db.execute(query, [Id]);
    return true;
  } catch (err) {
    throw err;
  }
};
exports.UpdateAssets = async (
  Name,
  Cantidad,
  Category,
  Adquisition_date,
  Price,
  Status,
  Locations,
  Responsible_id,
  Id
) => {
  const query =
    "UPDATE  assets SET Name = ?,Cantidad=?,Category = ?, Adquisition_date=?, Price=?,Status=?, Locations=?, Responsible_id = ? WHERE Id = ?";
  try {
    await db.execute(query, [
      Name,
      Cantidad,
      Category,
      Adquisition_date,
      Price,
      Status,
      Locations,
      Responsible_id,
      Id,
    ]);
    return true;
  } catch (err) {
    throw err;
  }
};
exports.AddAssets = async (
  Name,
  Cantidad,
  Category,
  Adquisition_date,
  Price,
  Status,
  Locations,
  Responsible_id
) => {
  const query =
    "INSERT INTO assets (Name,Cantidad, Category, Adquisition_date, Price, Status, Locations,Responsible_id)VALUES(?,?,?,?,?,?,?,?)";
  try {
    await db.execute(query, [
      Name,
      Cantidad,
      Category,
      Adquisition_date,
      Price,
      Status,
      Locations,
      Responsible_id,
    ]);
    return true;
  } catch (err) {
    throw err;
  }
};
