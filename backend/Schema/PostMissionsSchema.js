const { z } = require('zod');

const numericId = z.union([z.number(), z.string()])
  .refine((val) => !isNaN(Number(val)), { 
    message: "El ID proporcionado debe ser un número válido" 
  })
  .transform((val) => Number(val));

const postMissionBody = z.object({
  ID_Missions: numericId,
  
  Title: z.string({ 
      required_error: "El título es requerido",
      invalid_type_error: "El título debe ser un texto" 
    }).trim().min(5, "El título es muy corto").max(200, "El título es muy largo"),
  
  Slug: z.string({ 
      required_error: "El slug es requerido" 
    }).trim().min(2, "El slug es muy corto"),
  
  Content: z.string({ 
      required_error: "El contenido es requerido" 
    }).min(10, "El contenido es demasiado corto"),
  
  Link: z.string({ 
      invalid_type_error: "El link debe ser un texto" 
    }).nullable().optional().or(z.literal("null")).or(z.literal("")),
  
  Created_by: numericId
}).strict();

const addPostMissionSchema = z.object({ 
  body: postMissionBody 
});

const updatePostMissionSchema = z.object({ 
  body: postMissionBody.extend({
    ID: numericId
  }) 
});

const deletePostMissionSchema = z.object({ 
  params: z.object({
    ID: numericId
  }) 
});

const getPostMissionSchema = z.object({
  params: z.object({
    ID: numericId
  })
});

module.exports = {
  addPostMissionSchema,
  updatePostMissionSchema,
  deletePostMissionSchema,
  getPostMissionSchema
};