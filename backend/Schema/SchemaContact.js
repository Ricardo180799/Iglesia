const { z } = require('zod');


const numericId = z.union([z.number(), z.string()])
  .refine((val) => !isNaN(Number(val)), { 
    message: "El ID proporcionado debe ser un número válido" 
  })
  .transform((val) => Number(val));


const phoneValidation = z.string({ required_error: "El teléfono es obligatorio" })
  .trim()
  .regex(/^[0-9]+$/, "El teléfono solo debe contener números (sin espacios ni guiones)")
  .min(7, "El teléfono debe tener al menos 7 dígitos")
  .max(15, "El teléfono no puede exceder los 15 dígitos");


const contactAddBody = z.object({
  Name: z.string({ required_error: "El nombre es requerido" }).trim().min(2).max(100),
  Apellidos: z.string({ required_error: "Los apellidos son requeridos" }).trim().min(2).max(100),
  Email: z.string({ required_error: "El email es obligatorio" }).email("Formato de email inválido"),
  Teléfono: phoneValidation, 
  Mensaje: z.string({ required_error: "El mensaje no puede estar vacío" }).min(10).max(1000),
  Tipo: z.string().trim().min(2)
}).strict();


const contactUpdateBody = z.object({
  Name: z.string().trim().min(2).optional(),
  Email: z.string().email().optional(),
  Phone: phoneValidation.optional(),
  Message: z.string().min(10).optional(), 
  Type: z.string().optional(),
  ID: numericId 
}).strict();


const addContactSchema = z.object({ body: contactAddBody });
const updateContactSchema = z.object({ body: contactUpdateBody });
const deleteContactSchema = z.object({ params: z.object({ ID: numericId }) });

module.exports = {
  addContactSchema,
  updateContactSchema,
  deleteContactSchema
};