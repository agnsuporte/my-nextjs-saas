import { z } from "zod";

/**
 * Expressão Regular (timeRegex): Esta regex verifica se a string 
 * está no formato "HH", onde:
    ([01]\d|2[0-3]) corresponde a horas de 00 a 23.
    ([0-5]\d) corresponde a minutos de 00 a 59.
 */
// Expressão regular para validar o formato de horário "HH:MM"
const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;

/**
 * Um refinamento personalizado que usa a expressão regular para verificar
 * se a string está no formato correto.
 */
const timeValidation = z.string().refine((value) => timeRegex.test(value), {
  message: "Informe um horário válido",
});

/**
 * O método Date.parse é usado para garantir que a data fornecida seja válida.
 */
const SheetSchema = z.object({
  id: z.string(),
  user_id: z.string(),
  date: z.string().refine((value) => !isNaN(Date.parse(value)), {
    message: "Informe uma data válida",
  }),
  local: z
    .string()
    .min(2, { message: "Deve conter pelo menos 2 caracteres" })
    .max(100),
  start_time: timeValidation,
  end_time: timeValidation,
  lunch_start: timeValidation,
  lunch_end: timeValidation,
  return_lunch: timeValidation,
  end_work: timeValidation,
});

export const CreateSheetSchema = SheetSchema.omit({ id: true });

export const UpdateSheetSchema = SheetSchema.omit({ user_id: true });


