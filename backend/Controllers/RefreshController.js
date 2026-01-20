const jwt = require("jsonwebtoken");
const { claveR, claveT } = require("../Config/Claves");
const {
  GetRefresh,
  AddRefresh,
  DeleteRefresh,
} = require("../Repositorio/Refresh");

exports.AddRefreshs = async (req, res) => {
  const { ID, token } = req.body;
  try {
    await AddRefresh(ID, token);
    return res.json({ message: "RefreshToken añadido correctamente" });
  } catch (err) {
    throw err;
  }
};
exports.DeleteRefreshs = async (req, res) => {
  const { user_id } = req.sesion;
  try {
    const refreshToken = await DeleteRefresh(user_id);
    return res.json({ message: "RefresToken eliminado" });
  } catch (err) {
    throw err;
  }
};
exports.RefreshAccess = async (req, res, next) => {
  const refreshTokenClient = req.cookies.refreshToken;

  if (!refreshTokenClient) {
    return res.status(401).json({ mensaje: "No hay Refresh Token" });
  }

  try {
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
        throw new Error("Token inválido");
      }
    }
    const userInDB = await GetRefresh(decoded.ID);
    if (
      !userInDB ||
      (userInDB !== refreshTokenClient && !res.getHeader("Set-Cookie"))
    ) {
      return res.status(403).json({ mensaje: "Sesión no reconocida" });
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

    res.json({ ok: true, accessToken });
  } catch (err) {
    next(err);
  }
};
