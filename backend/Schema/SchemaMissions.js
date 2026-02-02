const { z } = require('zod');

const numericId = z.union([z.number(), z.string()])
  .refine((val) => !isNaN(Number(val)), { 
    message: "El ID proporcionado debe ser un número válido" 
  })
  .transform((val) => Number(val));

const missionBody = z.object({
  Name: z.string({ 
      required_error: "El nombre es requerido",
      invalid_type_error: "El nombre debe ser un texto" 
    }).trim().min(2, "Mínimo 2 caracteres").max(150, "Máximo 150 caracteres"),
  
  Link: z.string({ 
      invalid_type_error: "El link debe ser un texto" 
    }).nullable().optional().or(z.literal("null")).or(z.literal("")),
  
  Locations: z.string({ 
      required_error: "La localización es requerida" 
    }).trim().min(2, "Mínimo 2 caracteres"),
  
  Description: z.string({ 
      required_error: "La descripción es requerida" 
    }).trim().min(10, "La descripción es muy corta"),
  
  Manager: z.string({ 
      required_error: "El encargado es requerido" 
    }).trim().min(2, "Mínimo 2 caracteres"),
  
  Members: z.string({ 
      required_error: "Los miembros son requeridos" 
    }).trim().min(2, "Mínimo 2 caracteres"),
  
  Start_Date: z.string({ 
      required_error: "La fecha de inicio es obligatoria" 
    }).refine((date) => !isNaN(Date.parse(date)), { 
      message: "Formato de fecha de inicio inválido" 
    })
}).strict();

const addMissionsSchema = z.object({ 
  body: missionBody 
});

const updateMissionsSchema = z.object({ 
  body: missionBody.extend({
    Update_By: numericId,
    ID: numericId
  }) 
});

const deleteMissionsSchema = z.object({ 
  params: z.object({
    ID: numericId
  }) 
});

const getSpecificMissionSchema = z.object({
  params: z.object({
    ID: numericId
  })
});

module.exports = {
  addMissionsSchema,
  updateMissionsSchema,
  deleteMissionsSchema,
  getSpecificMissionSchema
};