const { z } = require('zod');

// 1. Validador de ID unificado (Valida y transforma a número)
const numericId = z.union([z.number(), z.string()])
  .refine((val) => !isNaN(Number(val)), { 
    message: "El ID proporcionado debe ser un número válido" 
  })
  .transform((val) => Number(val));

// 2. Esquema base para el cuerpo (Body) sin el ID
const activityBody = z.object({
  Title: z.string({ required_error: "El título es requerido" })
    .trim()
    .min(5, "El título debe tener entre 5 y 100 caracteres")
    .max(100, "El título debe tener entre 5 y 100 caracteres"),
  
  Text: z.string({ required_error: "El texto es obligatorio" })
    .min(10, "El texto es demasiado corto")
    .max(5000, "El texto es demasiado largo"),
  
  Activity_Date: z.string({ required_error: "La fecha es obligatoria" })
    .refine((date) => !isNaN(Date.parse(date)), {
      message: "La fecha proporcionada no tiene un formato válido"
    }),

  Enlace: z.string().nullable().optional().or(z.literal("null")).or(z.literal(""))
}).strict();

// 3. Definición de esquemas específicos (Separados)
const createActivitySchema = z.object({ 
  body: activityBody 
});

const updateActivitySchema = z.object({ 
  body: activityBody.extend({
    ID: numericId // Aquí el ID es obligatorio y debe ser numérico para actualizar
  }) 
});

const deleteActivitySchema = z.object({ 
  params: z.object({
    ID: numericId // El ID que viene en la URL también se valida y transforma
  }) 
});

// 4. Exportaciones limpias
module.exports = {
  createActivitySchema,
  updateActivitySchema,
  deleteActivitySchema
};