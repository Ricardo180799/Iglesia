const db = require("../Config/DB");
const AppError = require("../Utils/AppError")

exports.getAbout = async () => {
  const query = "SELECT * FROM about_us";
  const [info] = await db.query(query);
  return info;
};

exports.UpdateAbout = async (
 name,info
) => {
  const columnasPermitidas = [
    "origen", "historia", "mision", "vision", 
    "doctrina", "valores", "equipo_pastoral"
  ];

 
  if (!columnasPermitidas.includes(name)) {
    throw new AppError(`El campo "${name}" no es una columna permitida para actualización`, 400);
  }
  const query =
   `UPDATE about_us SET ${name} = ? WHERE id = 1`  ;
  
  await db.execute(query, [
   info
  ]);
  return true;
};