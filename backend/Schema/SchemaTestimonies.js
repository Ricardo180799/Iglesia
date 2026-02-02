const { z } = require('zod');

const numericId = z.union([z.number(), z.string()])
  .refine((val) => !isNaN(Number(val)), { 
    message: "El ID proporcionado debe ser un número válido" 
  })
  .transform((val) => Number(val));

const testimonyBody = z.object({
  Type: z.string({ 
      required_error: "El tipo es requerido",
      invalid_type_error: "El tipo debe ser un texto" 
    }).trim().min(2, "Mínimo 2 caracteres"),
  
  Title: z.string({ 
      required_error: "El título es requerido",
      invalid_type_error: "El título debe ser un texto" 
    }).trim().min(5, "El título debe tener al menos 5 caracteres").max(200, "Título demasiado largo"),
  
  Content: z.string({ 
      required_error: "El contenido es requerido" 
    }).min(10, "Contenido demasiado corto"),
  
  Author: z.string({ 
      required_error: "El autor es requerido" 
    }).trim().min(2, "Nombre de autor demasiado corto"),
  
  Text: z.string({ 
      invalid_type_error: "El texto debe ser un string" 
    }).trim().nullable().optional(),
  
  Video_url: z.string({ 
      invalid_type_error: "La URL de video debe ser un texto" 
    }).trim().nullable().optional().or(z.literal("null")).or(z.literal("")),
  
  Thumbnail_url: z.string({ 
      invalid_type_error: "La URL de miniatura debe ser un texto" 
    }).trim().nullable().optional().or(z.literal("null")).or(z.literal("")),
  
  Created_By: numericId.default(20)
}).strict();

const sendTestimonySchema = z.object({ 
  body: testimonyBody 
});

const changeStatusSchema = z.object({
  body: z.object({
    ID: numericId,
    Status: z.string({ required_error: "El status es obligatorio" })
      .trim()
      .min(1, "El status no puede estar vacío")
  }).strict()
});

const deleteTestimonySchema = z.object({ 
  params: z.object({
    ID: numericId
  }) 
});

const getEspecificTestimonySchema = z.object({
  params: z.object({
    ID: numericId
  })
});

module.exports = {
  sendTestimonySchema,
  changeStatusSchema,
  deleteTestimonySchema,
  getEspecificTestimonySchema
};