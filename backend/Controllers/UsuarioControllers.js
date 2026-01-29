const { Registro } = require("../Services/UsuarioService");
const { Añadir } = require("../Repositorio/Usuarios");
const { claveT, claveR } = require("../Config/Claves");

const { GetIdRol, GetRol } = require("../Repositorio/Usuarios");
const jwt = require("jsonwebtoken");
const { Sesion } = require("../Services/UsuarioService");
const { Perfils } = require("../Services/UsuarioService");
const { AddRol } = require("../Repositorio/Usuarios");
const { GetId } = require("../Repositorio/Usuarios");
const { UpdateRol } = require("../Repositorio/Usuarios");
const { DeleteUsuario } = require("../Repositorio/Usuarios");
const { getUsersAll } = require("../Repositorio/Usuarios");
const {
  GetRefresh,
  AddRefresh,
  DeleteRefresh,
} = require("../Repositorio/Refresh");
const sign = (payload, clave, time) => {
  const token = jwt.sign(payload, clave, {
    expiresIn: time,
  });
  return token;
};
exports.getUsersAlls = async (req, res) => {
  try {
    const info = await getUsersAll();

    return res.json(info);
  } catch (err) {
    throw err;
  }
};
exports.Registrarse = async (req, res, next) => {
  try {
    
    const registro = await Registro(req.body);

    
    const { ID, Name, Email, Rol } = registro.data;

    
    const payload = { User: Name, Email: Email, ID: ID, Rol: Rol };
    const token = jwt.sign(payload, claveT, { expiresIn: "1h" });

   
    return res.status(201).json({ 
      message: registro.message, 
      token: token, 
      ID: ID 
    });

  } catch (err) {
    if (err.message === "EMAIL_ALREADY_EXISTS") {
      return res.status(400).json({ message: "El correo electrónico ya está registrado" });
    }
    next(err);
  }
};
exports.Sesions = async (req, res, next) => {
  const { Name, Pass } = req.body;

  try {
    const datos = await Sesion(Name, Pass);

    if (!datos.valida) {
      return res.status(401).json({ message: "Contraseña incorrecta" });
    }

    const idR = await GetIdRol(datos.info.ID);
    const Rol = await GetRol(idR);

    const payload = {
      User: datos.info.Name,
      ID: datos.info.ID,
      Email: datos.info.Email,
      Rol: Rol,
    };

    if (Rol.includes("Pastor")) {
      let refreshToken = await GetRefresh(datos.info.ID);

      if (refreshToken) {
        try {
          jwt.verify(refreshToken, claveR);
        } catch (err) {
          await DeleteRefresh(datos.info.ID);
          refreshToken = jwt.sign(payload, claveR, { expiresIn: "7d" });
          await AddRefresh(datos.info.ID, refreshToken);
        }
      } else {
        refreshToken = jwt.sign(payload, claveR, { expiresIn: "7d" });
        await AddRefresh(datos.info.ID, refreshToken);
      }

      const accessToken = jwt.sign(payload, claveT, { expiresIn: "15m" });

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: false,
        sameSite: "Lax",
        maxAge: 2 * 60 * 60 * 1000,
      });

      return res.json({
        message: `Bienvenido ${Name}`,
        accessToken,
        ID: datos.info.ID,
        Rol: Rol,
      });
    }

    const token = jwt.sign(payload, claveT, { expiresIn: "1h" });
    return res.json({
      message: `Bienvenido ${Name}`,
      accessToken: token,
      ID: datos.info.ID,
      Rol: Rol,
    });
  } catch (err) {
    next(err);
  }
};
exports.Logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).send("Error cerrando sesión");
    }
    res.clearCookie("connect.sid");
    res.json({ message: "Sesion cerrada" });
  });
};
exports.Perfil = async (req, res) => {
  const email = req.usuario.Email;

  
  const info = await Perfils(email);
 
  res.json({ info: info });
};
exports.ADDRol = async (req, res) => {
  const { idName, idRol } = req.body;
  const idA = req.usuario.ID;
  const respuesta = await AddRol(idName, idRol, idA);
  if (respuesta) {
    res.json({ message: "Rola asignado correctamente" });
  } else {
    res.status(400).json({ message: "No se pudo asignar el rol" });
  }
};
exports.UpdateRols = async (req, res, next) => {
  const { Id_User, Roles } = req.body;
  const IDM = req.sesion?.ID || null;
  try {
    await UpdateRol(Id_User, Roles, IDM);

    return res.json({
      message: "El rol del usuario se ha actualizado correctamente",
    });
  } catch (err) {
    next(err);
  }
};
exports.DeleteUsuarios = async (req, res, next) => {
  const { ID } = req.params;
  try {
    await DeleteUsuario(ID);

    return res.json({
      message: "El usuario ha sido eliminado correctamente",
    });
  } catch (err) {
    next(err);
  }
};
