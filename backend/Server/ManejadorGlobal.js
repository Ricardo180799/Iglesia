exports.Manejador = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  // Si estás en desarrollo o si NO has definido NODE_ENV aún
  if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    return res.status(err.statusCode).json({
      status: err.status,
      error: err,
      message: err.message,
      stack: err.stack
    });
  }

  // Si estás en producción
  if (process.env.NODE_ENV === 'production') {
    if (err.isOperational) { // Usualmente AppError marca isOperational = true
      return res.status(err.statusCode).json({
        status: err.status,
        message: err.message
      });
    }

    console.error('ERROR CRÍTICO 💥:', err);
    return res.status(500).json({
      status: 'error',
      message: 'Algo salió muy mal'
    });
  }
};