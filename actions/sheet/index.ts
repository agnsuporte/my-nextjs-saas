"use server";

import { prisma } from "@/lib/db";
import { CreateSheetSchema, UpdateSheetSchema } from "@/schemas/sheet";
import { unstable_noStore as noStore, revalidatePath } from "next/cache";
import type { z } from "zod";

/**
 * Este método executa um lançamento de uma jornada de trabalho.
 * @param {z.infer<typeof CreateSheetSchema>} sheet - Dados para registro.
 * @returns {Promise<{error?: string, success?: string}>}.
 */
export async function addSheet(
  sheet: z.infer<typeof CreateSheetSchema>,
): Promise<{ error?: string; success?: string }> {
  noStore();

  const valid = await CreateSheetSchema.safeParse(sheet);

  if (!valid.success) {
    return {
      error: "Dados inválidos",
    };
  }

  const {
    user_id,
    date,
    local,
    start_time,
    end_time,
    lunch_start,
    lunch_end,
    return_lunch,
    end_work,
  } = sheet;

  try {
    const createSheet = await prisma.sheet.create({
      data: {
        user_id,
        date: new Date(date).toISOString(), // Ensure date is in ISO format
        local,
        start_time: `${date}T${start_time}:00.000Z`,
        end_time: `${date}T${end_time}:00.000Z`,
        lunch_start: `${date}T${lunch_start}:00.000Z`,
        lunch_end: `${date}T${lunch_end}:00.000Z`,
        return_lunch: `${date}T${return_lunch}:00.000Z`,
        end_work: `${date}T${end_work}:00.000Z`,
      },
    });
    revalidatePath("/sheet");
    return {
      success: "Registro efetuado com sucesso!",
    };
  } catch (error) {
    // console.log("[SHEET]...:", sheet)
    // console.log("[ERROR]...:", error)
    return {
      error: "[ERROR_ADD_SHEET]",
    };
  }
}

/**
 * Este método atualiza um lançamento de uma jornada de trabalho.
 * @param {z.infer<typeof UpdateSheetSchema>} sheet - Dados para registro.
 * @returns {Promise<{error?: string, success?: string}>}.
 */
export async function updateSheet(
  sheet: z.infer<typeof UpdateSheetSchema>,
): Promise<{ error?: string; success?: string }> {
  noStore();

  const valid = await UpdateSheetSchema.safeParse(sheet);

  if (!valid.success) {
    return {
      error: "Dados inválidos",
    };
  }

  const {
    id,
    date,
    local,
    start_time,
    end_time,
    lunch_start,
    lunch_end,
    return_lunch,
    end_work,
  } = sheet;

  try {
    await prisma.sheet.update({
      where: {
        id: id,
      },
      data: {
        date: new Date(date).toISOString(), // Ensure date is in ISO format
        local,
        start_time: `${date}T${start_time}:00.000Z`,
        end_time: `${date}T${end_time}:00.000Z`,
        lunch_start: `${date}T${lunch_start}:00.000Z`,
        lunch_end: `${date}T${lunch_end}:00.000Z`,
        return_lunch: `${date}T${return_lunch}:00.000Z`,
        end_work: `${date}T${end_work}:00.000Z`,
      },
    });
    revalidatePath("/sheet");
    return {
      success: "Registro atualizado com sucesso!",
    };
  } catch (error) {
    // console.log("[SHEET]...:", sheet)
    // console.log("[ERROR]...:", error)
    return {
      error: "[ERROR_UPDATE_SHEET]",
    };
  }
}

/**
 * Este método remove um lançamento da base de dados
 * @param {string} id
 * @returns {Promise<{message: string}>}
 */
export async function deleteSheet(id: string): Promise<{ message: string }> {
  noStore();
  try {
    await prisma.sheet.delete({
      where: { id },
    });
    revalidatePath("/sheet");
    return { message: "Deleted Sheet." };
  } catch (error) {
    return { message: "Database Error: Failed to Delete Sheet." };
  }
}
