const { z } = require('zod');

// 1. Validador reutilizable para IDs (transforma string a number automáticamente)
const numericId = z.union([z.number(), z.string()])
  .refine((val) => !isNaN(Number(val)), { message: "Debe ser un ID numérico válido" })
  .transform((val) => Number(val));

// 2. Esquema base para los campos del cuerpo (Body)
const assetBody = z.object({
  Name: z.string({ required_error: "El nombre es requerido" }).trim().min(2).max(100),
  Cantidad: z.number({ invalid_type_error: "La cantidad debe ser un número" }).nonnegative(),
  Category: z.string({ required_error: "La categoría es requerida" }).trim().min(2).max(100),
  Adquisition_date: z.string({ required_error: "La fecha es obligatoria" })
    .refine((date) => !isNaN(Date.parse(date)), { message: "La fecha proporcionada no tiene un formato válido" }),
  Price: z.number().min(0, "El precio no puede ser negativo"),
  Status: z.string().trim().min(2).max(100).default("nuevo"),
  Locations: z.string().trim().min(2).max(100),
  Responsible_id: numericId,
}).strict();

// 3. Definición de esquemas por acción (siguiendo tu estilo solicitado)
const addAssetsSchema = z.object({ 
  body: assetBody 
});

const updateAssetsSchema = z.object({ 
  body: assetBody.extend({
    ID: numericId // Obligatorio para actualizaciones
  }) 
});

const deleteAssetsSchema = z.object({ 
  params: z.object({
    ID: numericId
  }) 
});

// 4. Exportación destructurada
module.exports = {
  addAssetsSchema,
  updateAssetsSchema,
  deleteAssetsSchema
};