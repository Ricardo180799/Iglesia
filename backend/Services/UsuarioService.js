const { getUsers } = require("../Repositorio/Usuarios");
const bcrypt = require("bcrypt");
const { Perfil,verifyEmail,Añadir,AddRol } = require("../Repositorio/Usuarios");
const db = require("../Config/DB");
exports.Registro = async (datosUsuario) => {
  const { Name, LastName, Email, Password, Avatar } = datosUsuario;

  try {
    
    const existe = await verifyEmail(Email);

    if (existe) {
      throw new Error("EMAIL_ALREADY_EXISTS");
    }

    
    const resultadoInsert = await Añadir(Name, LastName, Email, Password, Avatar);

  
    const nuevoID = resultadoInsert.ID;

    
    await AddRol(nuevoID, 5, null);

    
    return {
      success: true,
      message: resultadoInsert.message,
      data: {
        ID: nuevoID,
        Name: Name,
        Email: Email,
        Rol: "Miembro" // Rol asignado por defecto
      }
    };

  } catch (err) {
    console.error("Error en el proceso de Registro:", err.message);
    throw err; 
  }
};
exports.Perfils = async (email) => {
  const info = await Perfil(email);
  

  return {
    usuario: info[0].Name,
    Creado: info[0].Created_At,
    Avatar: info[0].Avatar,
  };
};
exports.Sesion = async (Name, Pass) => {

  try {
    
    const row = await getUsers(Name);
    
  
    const u = row.find((user) => user.Name === Name);

   
   let valida = false
  
   if (u) {
      
      valida = await bcrypt.compare(Pass, u.Password);
    } else {
    
      await bcrypt.hash(Pass, 10); 
    }

    if (valida) {
     
      const { Password, ...infoSegura } = u; 
      
      return { valida: true, info: infoSegura };
    } else {
      return { valida: false, mensaje: "Credenciales incorrectas" };
    }

  } catch (err) {
    
    console.error("Error en Sesion:", err);
    throw new Error("Error interno del servidor");
  }
};