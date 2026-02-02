const { z } = require('zod');


const numericId = z.union([z.number(), z.string()])
  .refine((val) => !isNaN(Number(val)), { 
    message: "El ID proporcionado debe ser un número válido" 
  })
  .transform((val) => Number(val));


const expenseBody = z.object({
  Amount: z.number({ 
      required_error: "El monto es obligatorio",
      invalid_type_error: "El monto debe ser un número" 
    })
    .positive("El monto debe ser mayor a 0"),

  Category: z.string({ 
      required_error: "La categoría es obligatoria",
      invalid_type_error: "La categoría debe ser un texto" 
    })
    .trim()
    .min(2, "La categoría debe tener al menos 2 caracteres")
    .max(100, "La categoría no puede exceder los 100 caracteres"),

  Description: z.string({ 
      invalid_type_error: "La descripción debe ser un texto" 
    })
    .trim()
    .max(500, "La descripción no puede exceder los 500 caracteres")
    .optional(),

  Images: z.string({ 
      invalid_type_error: "El campo de imágenes debe ser un texto" 
    })
    .nullable()
    .optional(),

  Dates: z.string({ 
      required_error: "La fecha es obligatoria" 
    })
    .refine((date) => !isNaN(Date.parse(date)), { 
      message: "La fecha proporcionada no tiene un formato válido" 
    }),

  Created_by: numericId
}).strict();


const addExpensesSchema = z.object({ 
  body: expenseBody 
});

const updateExpensesSchema = z.object({ 
  body: expenseBody.extend({
    ID: numericId 
  }) 
});

const deleteExpensesSchema = z.object({ 
  params: z.object({
    ID: numericId
  }) 
});

module.exports = {
  addExpensesSchema,
  updateExpensesSchema,
  deleteExpensesSchema
};