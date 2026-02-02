const { z } = require('zod');

const updateHomeSchema = z.object({
  body: z.object({
    Campo: z.string({
        required_error: "El campo es obligatorio",
        invalid_type_error: "El campo debe ser un texto"
      })
      .trim()
      .min(2, "El nombre del campo es demasiado corto")
      .max(50, "El nombre del campo es demasiado largo"),
      
    Valor: z.string({
        required_error: "El valor es obligatorio",
        invalid_type_error: "El valor debe ser un texto"
      })
      .trim()
      .min(1, "El valor no puede estar vacío")
      .max(5000, "El valor es demasiado largo")
  }).strict()
});

module.exports = {
  updateHomeSchema
};