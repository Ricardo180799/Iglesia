const { Registro, Sesion, Perfils } = require("../Services/UsuarioService");
const { 
  getUsersAll, AddRol, UpdateRol, DeleteUsuario, 
  GetIdRol, GetRol 
} = require("../Repositorio/Usuarios");
const { GetRefresh, AddRefresh, DeleteRefresh } = require("../Repositorio/Refresh");
const { claveT, claveR } = require("../Config/Claves");
const jwt = require("jsonwebtoken");
const AppError = require("../Utils/AppError"); 
const catchAsync = require("../Utils/CatchAsync");

const generateToken = (payload, clave, time) => jwt.sign(payload, clave, { expiresIn: time });

exports.getUsersAlls = catchAsync(async (req, res, next) => {
  const info = await getUsersAll();
  
  res.locals.response = { 
    status: 200, 
    body: info 
  };
  next();
});

exports.Registrarse = catchAsync(async (req, res, next) => {
  const registro = await Registro(req.body);
  if (!registro) throw new AppError("Error al procesar el registro", 400);

  const { ID, Name, Email, Rol } = registro.data;
  const payload = { User: Name, Email, ID, Rol };
  const token = generateToken(payload, claveT, "1h");

  res.locals.response = {
    status: 201,
    body: { message: registro.message, token, ID }
  };
  next();
});

exports.Sesions = catchAsync(async (req, res, next) => {
  const { Name, Pass } = req.body;
  const datos = await Sesion(Name, Pass);

  if (!datos.valida) {
    return next(new AppError("Credenciales inválidas o contraseña incorrecta", 401));
  }

  const idR = await GetIdRol(datos.info.ID);
  const Rol = await GetRol(idR);
  const payload = { User: datos.info.Name, ID: datos.info.ID, Email: datos.info.Email, Rol };

  let accessToken;

  if (Rol.includes("Pastor")) {
    let refreshToken = await GetRefresh(datos.info.ID);
    if (refreshToken) {
      try {
        jwt.verify(refreshToken, claveR);
      } catch (err) {
        await DeleteRefresh(datos.info.ID);
        refreshToken = generateToken(payload, claveR, "7d");
        await AddRefresh(datos.info.ID, refreshToken);
      }
    } else {
      refreshToken = generateToken(payload, claveR, "7d");
      await AddRefresh(datos.info.ID, refreshToken);
    }
    accessToken = generateToken(payload, claveT, "15m");

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "Lax",
      maxAge: 2 * 60 * 60 * 1000,
    });
  } else {
    accessToken = generateToken(payload, claveT, "1h");
  }

  res.locals.response = {
    status: 200,
    body: { message: `Bienvenido ${Name}`, accessToken, ID: datos.info.ID, Rol } 
  };
  next();
});

exports.Logout = catchAsync(async (req, res, next) => {
  req.session.destroy((err) => {
    if (err) return next(new AppError("Error al cerrar la sesión", 500));
    res.clearCookie("connect.sid");
    res.locals.response = { 
      status: 200, 
      body: { message: "Sesión cerrada" } 
    };
    next();
  });
});

exports.Perfil = catchAsync(async (req, res, next) => {
  const info = await Perfils(req.usuario.Email);
  if (!info) return next(new AppError("Perfil no encontrado", 404));

  res.locals.response = { 
    status: 200, 
    body: { info } 
  };
  next();
});

exports.ADDRol = catchAsync(async (req, res, next) => {
  const { idName, idRol } = req.body;
  const idA = req.usuario.ID;
  
  const respuesta = await AddRol(idName, idRol, idA);
  if (!respuesta) return next(new AppError("No se pudo asignar el rol", 400));

  res.locals.response = { 
    status: 200, 
    body: { message: "Rol asignado correctamente" } 
  };
  next();
});

exports.UpdateRols = catchAsync(async (req, res, next) => {
  const { Id_User, Roles } = req.body;
  const IDM = req.usuario?.ID || null;

  await UpdateRol(Id_User, Roles, IDM);

  res.locals.response = {
    status: 200,
    body: { message: "El rol del usuario se ha actualizado correctamente" }
  };
  next();
});

exports.DeleteUsuarios = catchAsync(async (req, res, next) => {
  const { ID } = req.params;
  await DeleteUsuario(ID);

  res.locals.response = {
    status: 200,
    body: { message: "El usuario ha sido eliminado correctamente" }
  };
  next();
});