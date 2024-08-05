import type { MyTime } from "@/types/chart/chart";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateOTP(numberOfDigits: number) {
  const digits = "0123456789";
  let OTP = "";
  const len = digits.length;
  for (let i = 0; i < numberOfDigits; i++) {
    OTP += digits[Math.floor(Math.random() * len)];
  }

  return OTP;
}

export const generateYAxis = (time: MyTime[]) => {
  // Calculate what labels we need to display on the y-axis
  // based on highest record and in 1000s
  const yAxisLabels = [];
  const highestRecord = Math.max(...time.map((month) => month.hours));
  const topLabel = Math.ceil(highestRecord / 1000) * 1000;

  for (let i = topLabel; i >= 0; i -= 1000) {
    yAxisLabels.push(`$${i / 1000}K`);
  }

  return { yAxisLabels, topLabel };
};

export const formatDateToLocal = (dateStr: Date, locale = "pt-PT") => {
  const date = new Date(dateStr);
  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "short",
    year: "numeric",
  };
  const formatter = new Intl.DateTimeFormat(locale, options);
  return formatter.format(date);
};

export const formatTimeToLocal = (dateStr: string): string => {
  const date = new Date(dateStr);
  const horas = date.getUTCHours().toString().padStart(2, "0");
  const minutos = date.getUTCMinutes().toString().padStart(2, "0");
  return `${horas}:${minutos}`;
};

export const formatCurrency = (amount: number) => {
  return (amount / 100).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
};

export const generatePagination = (currentPage: number, totalPages: number) => {
  // If the total number of pages is 7 or less,
  // display all pages without any ellipsis.
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  // If the current page is among the first 3 pages,
  // show the first 3, an ellipsis, and the last 2 pages.
  if (currentPage <= 3) {
    return [1, 2, 3, "...", totalPages - 1, totalPages];
  }

  // If the current page is among the last 3 pages,
  // show the first 2, an ellipsis, and the last 3 pages.
  if (currentPage >= totalPages - 2) {
    return [1, 2, "...", totalPages - 2, totalPages - 1, totalPages];
  }

  // If the current page is somewhere in the middle,
  // show the first page, an ellipsis, the current page and its neighbors,
  // another ellipsis, and the last page.
  return [
    1,
    "...",
    currentPage - 1,
    currentPage,
    currentPage + 1,
    "...",
    totalPages,
  ];
};


//  * Explicação do Código Atualizado:
//  * Parsers: A função calculateTimeDifference divide os horários de entrada (startTime e endTime) 
//    em horas e minutos.
//  * Conversão para minutos: Converte esses horários em minutos totais desde a meia-noite.
//  * Diferença em minutos: Calcula a diferença entre os horários em minutos.
//  * Tratamento de horário negativo: Se a diferença for negativa (indicando que o endTime é 
//    no dia seguinte), adiciona 1440 minutos (24 horas) para corrigir.
//  * Conversão de volta para horas e minutos: Converte a diferença de volta para horas e minutos.
//  * Formatação HH
//  * : Formata a diferença no formato HH:MM.
//  * Retorno: Retorna a diferença no formato HH:MM por padrão ou um valor numérico se solicitado.
//  * Assim, esta função agora retorna a diferença no formato HH:MM por padrão e também pode retornar 
//    o valor numérico em horas quando solicitado.

 /**
  * Este método retorna a diferença no formato HH:MM por padrão e também pode retornar
  * o valor numérico em horas quando solicitado.
  * @param {string} startTime 
  * @param {string} endTime 
  * @param {boolean} returnNumeric 
  * @returns {string | number}
 */
export function calculateTimeDifference(
  startTime: string,
  endTime: string,
  returnNumeric: boolean = false
): string | number {
  // Parse the input strings to get hours and minutes
  const [startHours, startMinutes] = startTime.split(':').map(Number);
  const [endHours, endMinutes] = endTime.split(':').map(Number);

  // Convert the times to minutes
  const startTotalMinutes = startHours * 60 + startMinutes;
  const endTotalMinutes = endHours * 60 + endMinutes;

  // Calculate the difference in minutes
  let differenceInMinutes = endTotalMinutes - startTotalMinutes;

  // If the difference is negative, add 24 hours (1440 minutes) to handle overnight times
  if (differenceInMinutes < 0) {
    differenceInMinutes += 1440;
  }

  // Convert the difference back to hours and minutes
  const differenceHours = Math.floor(differenceInMinutes / 60);
  const differenceMinutes = differenceInMinutes % 60;

  // Format the difference as HH:MM
  const formattedDifference = `${String(differenceHours).padStart(2, '0')}:${String(differenceMinutes).padStart(2, '0')}`;

  // Return the result in the requested format
  if (returnNumeric) {
    return differenceHours + differenceMinutes / 60;
  } else {
    return formattedDifference;
  }
}
