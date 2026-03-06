import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(input: string, locale: string) {
  const date = new Date(input);
  return new Intl.DateTimeFormat(locale === "pt" ? "pt-BR" : "en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric"
  }).format(date);
}
