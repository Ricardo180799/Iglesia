const db = require("../Config/DB");

exports.getAssets = async () => {
  const query = "SELECT * FROM assets";
  const [info] = await db.query(query);
  return info;
};

exports.DeleteAssets = async (ID) => {
  const query = "DELETE FROM assets WHERE ID = ?";
  await db.execute(query, [ID]);
  return true;
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
  ID
) => {
  const query =
    "UPDATE assets SET Name = ?, Cantidad = ?, Category = ?, Adquisition_date = ?, Price = ?, Status = ?, Locations = ?, Responsible_id = ? WHERE ID = ?";
  
  await db.execute(query, [
    Name,
    Cantidad,
    Category,
    Adquisition_date,
    Price,
    Status,
    Locations,
    Responsible_id,
    ID,
  ]);
  return true;
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
    "INSERT INTO assets (Name, Cantidad, Category, Adquisition_date, Price, Status, Locations, Responsible_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
  
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
};