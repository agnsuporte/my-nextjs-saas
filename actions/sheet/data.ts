"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import type { MonthsTotals } from "@/types/chart/chart";
import type { Sheet } from "@/types/sheet";
import { unstable_noStore as noStore, revalidatePath } from "next/cache";

interface MonthData {
  month: string;
  total: number;
}

interface TotalSheets {
  total: number;
}

const ITEMS_PER_PAGE = 6;

async function getUserLoged(): Promise<string> {
  const session = await auth();
  return !session?.user.id ? "" : session?.user.id;
}

/**
 * Este método filtra as "Sheets" do usuário altenticado
 * Mostra por página diacordo com "ITEMS_PER_PAGE"
 * @param {string} query
 * @param {number} currentPage
 * @returns {Promise<{sheets: Sheet[]}>}
 */
export async function fetchFilteredSheets(
  query: string,
  currentPage: number,
): Promise<{ sheets: Sheet[] }> {
  noStore();

  let sheets: Sheet[];
  const loged = await getUserLoged();

  if (!loged) {
    return { sheets: [] }; // Retorna um objeto com vazio
  }

  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    sheets = await prisma.sheet.findMany({
      where: {
        user_id: loged,
        local: {
          contains: query, // Filtra utilizando a string de consulta
          mode: "insensitive", // Faz a busca case-insensitive, opcional
        },
      },
      orderBy: { date: "desc" },
      skip: offset,
      take: ITEMS_PER_PAGE,
    });

    return { sheets };
  } catch (error) {
    console.error("Error fetching sheets:", error);
    return { sheets: [] }; // Retorne um array vazio em caso de erro
  }
}

/**
 * Este método busca "Sheet" por ID
 * @param {string} id
 * @returns {Promise<{sheet: Sheet | null}>}
 */
export async function fetchSheetByID(
  id: string,
): Promise<{ sheet: Sheet | null }> {
  noStore();

  let sheet: Sheet | null = null;
  const loged = await getUserLoged();

  if (!loged) {
    return { sheet: null }; // Retorna um objeto com sheet como null se o usuário não estiver logado
  }

  try {
    sheet = await prisma.sheet.findFirst({
      where: {
        id: id,
      },
    });

    return { sheet: sheet ?? null }; // Garante que sempre retorne um objeto com sheet sendo Sheet ou null
  } catch (error) {
    console.error("Error fetching sheets:", error);
    return { sheet: null }; // Retorne um objeto com sheet como null em caso de erro
  }
}

/**
 * Este método retorna o número total de "Sheets"
 * do usuário autenticado.
 * @param {string} query
 * @returns {Promise<{total: number}>}
 */
export async function fetchSheetsPages(
  query?: string,
): Promise<{ total: number }> {
  noStore();

  let count: number;
  const loged = await getUserLoged();

  if (!loged) {
    return { total: 0 }; // Retorna um objeto com vazio
  }

  try {
    count = await prisma.sheet.count({
      where: {
        user_id: loged,
        local: {
          contains: query, // Filtra utilizando a string de consulta
          mode: "insensitive", // Faz a busca case-insensitive, opcional
        },
      },
    });

    const value = count;
    const pages = Math.ceil(Number(value) / ITEMS_PER_PAGE);

    return { total: pages };
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch total number of sheets.");
  }
}

/**
 * Este método retorna o número total de "Lançamentos"
 * @returns {Promise<{totals?: MonthData[]}>}
 */
export async function fetchSheetsAllMonths(): Promise<{
  totals: MonthsTotals[];
}> {
  noStore();
  let months: MonthData[];
  const loged = await getUserLoged();

  if (!loged) {
    return { totals: [] }; // Retorna um objeto com vazio
  }

  try {
    months = await prisma.$queryRaw`
			SELECT 
				to_char(date, 'YYYY-MM') as month,
				CAST(count(*) AS INTEGER) as total
			FROM 
				"Sheet"
			WHERE
				"user_id" = ${loged}::uuid
			GROUP BY 
				to_char(date, 'YYYY-MM')
			ORDER BY 
				month DESC
			LIMIT 6;	
		`;

    return { totals: months };
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch all Months of sheets.");
  }
}

/**
 * Este método retorna as"Sheets" do mês e ano solicitado
 * @returns {Promise<{sheets?: Sheet[]}>}
 */
export async function fetchSheetsMonth(
  ano: string,
  mes: string,
): Promise<{ sheets?: Sheet[] }> {
  noStore();
  let month: Sheet[];
  const loged = await getUserLoged();

  if (!loged) {
    return { sheets: [] }; // Retorna um objeto com sheets vazio
  }

  try {
    month = await prisma.$queryRaw `
			SELECT 
				id, 
				user_id, 
				date, 
				to_char(date,'Mon') as mon,
       	extract(year from date) as yyyy,				
				local, 
				start_time, 
				end_time, 
				lunch_start, 
				lunch_end, 
				return_lunch, 
				end_work
			FROM 
				"Sheet"
			WHERE
				"user_id" = ${loged}::uuid
			AND 
				EXTRACT(YEAR FROM date) = ${ano}::integer AND EXTRACT(MONTH FROM date) = ${mes}::integer
			ORDER BY 
				date DESC;	
		`;

    return { sheets: month };
  } catch (error) {
    console.error("Database Error:", error);
    return { sheets: [] };
    // throw new Error("Failed to fetch Month of sheet.");
  }
}

/**
 * Este método retorna o total de "Sheets" do mês e ano solicitado
 * @returns {Promise<TotalSheets>}
 */
export async function fetchCountSheetsMonth(
  ano: string,
  mes: string,
): Promise<TotalSheets> {
  noStore();
  // let totalSheets: TotalSheets
  const loged = await getUserLoged();

  if (!loged) {
    return { total: 0 };
  }

  try {
    const totalSheets: TotalSheets = await prisma.$queryRaw`
		SELECT 
			CAST(count(*) AS INTEGER) as total
		FROM 
			"Sheet"
		WHERE 
			"user_id" = ${loged}::uuid
		AND 
			EXTRACT(YEAR FROM date) = ${ano}::integer AND EXTRACT(MONTH FROM date) = ${mes}::integer
		`;

    return totalSheets;
  } catch (error) {
    console.error("Database Error:", error);
    return { total: 0 };
    // throw new Error("Failed to fetch count Month of sheet.");
  }
}
