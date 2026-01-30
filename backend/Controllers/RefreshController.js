const jwt = require("jsonwebtoken");
const { claveR, claveT } = require("../Config/Claves");
const {
  GetRefresh,
  AddRefresh,
  DeleteRefresh,
} = require("../Repositorio/Refresh");
const AppError = require("../Utils/AppError");
const catchAsync = require("../Utils/CatchAsync");

exports.AddRefreshs = catchAsync(async (req, res, next) => {
  const { ID, token } = req.body;
  await AddRefresh(ID, token);

  res.locals.response = {
    status: 200,
    body: { message: "RefreshToken añadido correctamente" }
  };
  next();
});

exports.DeleteRefreshs = catchAsync(async (req, res, next) => {
  const { user_id } = req.usuario; // Corregido req.sesion a req.usuario por consistencia
  await DeleteRefresh(user_id);

  res.locals.response = {
    status: 200,
    body: { message: "RefresToken eliminado" }
  };
  next();
});

exports.RefreshAccess = catchAsync(async (req, res, next) => {
  const refreshTokenClient = req.cookies.refreshToken;

  if (!refreshTokenClient) {
    return next(new AppError("No hay Refresh Token", 401));
  }

  let decoded;
  try {
    decoded = jwt.verify(refreshTokenClient, claveR);
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      const data = jwt.decode(refreshTokenClient);
      const newPayload = {
        User: data.User,
        ID: data.ID,
        Email: data.Email,
        Rol: data.Rol,
      };
      const newRefreshToken = jwt.sign(newPayload, claveR, {
        expiresIn: "7d",
      });
      await DeleteRefresh(data.ID);
      await AddRefresh(data.ID, newRefreshToken);
      res.cookie("refreshToken", newRefreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "Lax",
        maxAge: 2 * 60 * 60 * 1000,
      });
      decoded = newPayload;
    } else {
      return next(new AppError("Token inválido", 403));
    }
  }

  const userInDB = await GetRefresh(decoded.ID);
  if (
    !userInDB ||
    (userInDB !== refreshTokenClient && !res.getHeader("Set-Cookie"))
  ) {
    return next(new AppError("Sesión no reconocida", 403));
  }

  const accessToken = jwt.sign(
    {
      User: decoded.User,
      ID: decoded.ID,
      Email: decoded.Email,
      Rol: decoded.Rol,
    },
    claveT,
    { expiresIn: "15m" }
  );

  res.locals.response = {
    status: 200,
    body: { ok: true, accessToken }
  };
  next();
});