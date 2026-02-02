const { z } = require('zod');

const numericId = z.union([z.number(), z.string()])
  .refine((val) => !isNaN(Number(val)), { 
    message: "El ID proporcionado debe ser un número válido" 
  })
  .transform((val) => Number(val));

const postBody = z.object({
  Title: z.string({ 
      required_error: "El título es requerido",
      invalid_type_error: "El título debe ser un texto" 
    })
    .trim()
    .min(5, "El título debe tener al menos 5 caracteres")
    .max(200, "El título es demasiado largo"),
  
  SLUG: z.string({ 
      required_error: "El SLUG es requerido" 
    })
    .trim()
    .min(2, "El SLUG es muy corto"),
  
  Content: z.string({ 
      required_error: "El contenido es requerido" 
    })
    .min(10, "El contenido es demasiado corto"),
  
  Enlace: z.string({ 
      invalid_type_error: "El enlace debe ser un texto" 
    })
    .nullable()
    .optional()
    .or(z.literal("null"))
    .or(z.literal("")),
  
  Created_by: numericId,
  
  Category_id: numericId
}).strict();

const addPostSchema = z.object({ 
  body: postBody 
});

const updatePostSchema = z.object({ 
  body: postBody.extend({
    ID: numericId
  }) 
});

const deletePostSchema = z.object({ 
  params: z.object({
    ID: numericId
  }) 
});

module.exports = {
  addPostSchema,
  updatePostSchema,
  deletePostSchema
};