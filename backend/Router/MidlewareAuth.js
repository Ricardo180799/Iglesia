const jwt = require("jsonwebtoken");
const { claveT } = require("../Config/Claves");
exports.Auth = async (req, res, next) => {
  if (process.env.NODE_ENV === 'test') {
    // Simulamos que el token fue verificado y devolvió un ID de usuario
    req.usuario = { id: 20, nombre: "Tester",Rol:"Pastor" }; 
    return next();
  }
  const Auth = req.headers.authorization;
  if (!Auth) {
    return res.status(401).json({
      message: "No hay ningun token, debe empezar sesión o registrarse",
    });
  }
  try {
    const codigo = Auth.split(" ")[1];
    const decoded = await jwt.verify(codigo, claveT);
    req.usuario = decoded;

    next();
  } catch (err) {
    return res.status(401).json({ mensaje: "Token incorrecto o expirado" });
  }
};
