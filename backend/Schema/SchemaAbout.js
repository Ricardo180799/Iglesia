const { z } = require('zod');


const updateAboutSchema = z.object({
  
  body: z.object({
    
    // Validación para el campo 'name'
    name: z.string({ 
        required_error: "El nombre es requerido", // Error si el campo no viene en el JSON
        invalid_type_error: "El nombre debe ser un texto" // Error si mandan un número o booleano
      })
      .trim() // Elimina espacios vacíos accidentales al inicio y final
      .min(3, "Mínimo 3 caracteres") // Seguridad: Evita nombres vacíos o insignificantes
      .max(100, "Máximo 100 caracteres"), // Seguridad: Evita ataques de strings masivos (Buffer Overflow)

    // Validación para el campo 'info'
    info: z.string({
        required_error: "La información es obligatoria"
      })
      .min(10, "La descripción es muy corta") // Asegura calidad en el contenido
      .max(2000, "La descripción es demasiado larga") // Límite de seguridad para la base de datos
      
  })
  .strict() // SEGURIDAD CLAVE: Lanza error si el usuario envía campos extra (ej: {admin: true})
});

module.exports = { updateAboutSchema };