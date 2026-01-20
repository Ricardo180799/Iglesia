exports.Manejador = async (err, req, res, next) => {
  console.error("Error: ", err);
  const statusCode = err.statusCode || 500;
  const message = err.message || "Error interno del servidor";
  res.statusCode(statusCode).json({
    ok: false,
    message,
    ...(process.env.NODE_ENV === "development" && {
      stack: err.stack,
    }),
  });
};
