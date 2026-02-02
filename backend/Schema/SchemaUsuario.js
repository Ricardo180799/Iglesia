const { z } = require('zod');

const numericId = z.union([z.number(), z.string()])
  .refine((val) => !isNaN(Number(val)), { 
    message: "El ID proporcionado debe ser un número válido" 
  })
  .transform((val) => Number(val));

const registroSchema = z.object({
  body: z.object({
    Name: z.string({ required_error: "El nombre es requerido" })
      .trim()
      .min(3, "Mínimo 3 caracteres")
      .max(50, "Máximo 50 caracteres"),
    Email: z.string({ required_error: "El email es obligatorio" })
      .email("Formato de email inválido"),
    Pass: z.string({ required_error: "La contraseña es obligatoria" })
      .min(8, "La contraseña debe tener al menos 8 caracteres"),
    Rol: numericId.optional().default(1)
  }).strict()
});

const loginSchema = z.object({
  body: z.object({
    Name: z.string({ required_error: "El nombre de usuario es requerido" }).trim(),
    Pass: z.string({ required_error: "La contraseña es requerida" })
  }).strict()
});

const addRolSchema = z.object({
  body: z.object({
    idName: numericId,
    idRol: numericId
  }).strict()
});

const updateRolSchema = z.object({
  body: z.object({
    Id_User: numericId,
    Roles: z.array(z.string()).or(z.string())
  }).strict()
});

const deleteUsuarioSchema = z.object({
  params: z.object({
    ID: numericId
  })
});

module.exports = {
  registroSchema,
  loginSchema,
  addRolSchema,
  updateRolSchema,
  deleteUsuarioSchema
};