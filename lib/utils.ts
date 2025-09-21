import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPhoneNumber(phoneNumber: string) {
  let formattedNum = phoneNumber;
  if (formattedNum.includes("+44")) {
    formattedNum = "0" + formattedNum.substring(3);
  } else if (formattedNum.includes("+")) {
    return formattedNum;
  }
  return formattedNum
    .replace(/\s+/g, "")
    .replace(/(.)(\d{4})(\d)/, "+44 $2 $3");
}

// Format dates for display
export const formatDateMonthYear = (date?: Date) => {
  if (!date) return "Not specified";
  return new Date(date).toLocaleDateString("en-GB", {
    month: "short",
    year: "numeric",
  });
};

export const formatDateShort = (date?: Date) => {
  if (!date) return "Not specified";
  return new Date(date).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};
