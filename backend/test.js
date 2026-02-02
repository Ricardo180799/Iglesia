// 1. IMPORTACIONES
// Traemos la función que queremos probar y la clase que creaste el 31 de enero
const {Manejador} = require("./Server/ManejadorGlobal");
const AppError = require('./Utils/AppError');


describe('Global Error Handler Middleware', () => {
  
  
  let req, res, next;

 
  beforeEach(() => {
    req = {}; 
    res = {
      status: jest.fn().mockReturnThis(), 
      json: jest.fn()                    
    };
    next = jest.fn();
    
    
    process.env.NODE_ENV = 'production';
  });

  
  test('Debería enviar el statusCode y mensaje correcto para un AppError', () => {
    
    const error = new AppError('No tienes permiso', 403);

    
    Manejador(error, req, res, next);

    
    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({
      status: 'fail',
      message: 'No tienes permiso',
      success: false
    });
  });

  // --- TEST 2: ERRORES GENÉRICOS (Bugs desconocidos) ---
  test('Debería responder con 500 si ocurre un error desconocido (no operacional)', () => {
    // Preparar: Un error común de JS (no es AppError)
    const error = new Error('Algo salió muy mal');

    
   Manejador(error, req, res, next);

    
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        status: 'error',
        message: 'Algo salió muy mal' 
      })
    );
  });
});