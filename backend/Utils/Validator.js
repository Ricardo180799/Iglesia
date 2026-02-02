const AppError = require('./AppError');

/**
 * Middleware de Validación Universal
 * @param {z.ZodObject} schema - El esquema de Zod definido para la ruta
 */
const validate = (schema) => (req, res, next) => {
  try {
    // .parse() valida los datos. Si fallan, salta directamente al catch.
    schema.parse({
      body: req.body,
      query: req.query,
      params: req.params,
    });

    // Si la validación es exitosa, pasamos al siguiente middleware
    next();
  } catch (error) {
    console.log("🛡️ ZOD BLOQUEÓ ESTO:", error.errors[0].message)
    // Si el error viene de Zod, lo formateamos para que sea legible
    if (error.errors) {
      const messages = error.errors.map((err) => {
        // err.path[0] suele ser 'body', 'params' o 'query'
        // err.path[1] es el nombre del campo (ej: 'name')
        const campo = err.path[1] ? ` en ${err.path[1]}` : "";
        return `${err.message}${campo}`;
      });

      const fullMessage = messages.join('; ');

      // Enviamos el error a tu Global Error Handler usando tu clase AppError
      return next(new AppError(`Datos inválidos: ${fullMessage}`, 400));
    }

    // Si ocurre un error inesperado que no es de Zod
    next(error);
  }
};

module.exports = validate;