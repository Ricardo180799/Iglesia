const jwt = require("jsonwebtoken");
const { claveT, claveR } = require("../Config/Claves");
exports.Refresh = async (req, res, next) => {
  const Auth = req.headers.authorization;
  if (!Auth) {
    return res.status(401).json({ message: "No hay token" });
  }

  const token = Auth.split(" ")[1];
  try {
    const decoded = jwt.verify(token, claveR);
    const Accestoken = jwt.sign(
      { User: decoded.User, Email: decoded.Email, ID: decoded.ID },
      claveT,
      {
        expiresIn: "20m",
      }
    );

    res.json({ message1: `Su nuevo token de acceso es:  ${Accestoken}` });
  } catch (err) {
    return res
      .status(403)
      .json({ message: "Refresh token inválido o expirado" });
  }
};
