const AppError = require("../Utils/AppError");

exports.Manejador = (err, req, res, next) => {
  
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  
  if (process.env.NODE_ENV === 'development') {
    return res.status(err.statusCode).json({
      status: err.status,
      error: err,
      message: err.message,
      stack: err.stack
    });
  }

  
  if (process.env.NODE_ENV === 'production') {
  
    if (err instanceof AppError) {
    
      return res.status(err.statusCode).json({
        status: err.status,
        message: err.message
      });
    }

    
    console.error('ERROR CRÍTICO (No controlado) 💥:', err);

    return res.status(500).json({
      status: 'error',
      message: 'Algo salió muy mal en el servidor'
    });
  }
};