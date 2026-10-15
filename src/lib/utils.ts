import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Merge Tailwind classes safely (later classes win over conflicting earlier ones). */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Format a number with Malaysian English grouping, e.g. 150000 → "150,000". */
export function formatNumber(value: number) {
  return new Intl.NumberFormat("en-MY").format(value);
}

/** Build a WhatsApp click-to-chat link with an optional pre-filled message. */
export function whatsappLink(number: string, message?: string) {
  const base = `https://wa.me/${number.replace(/\D/g, "")}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
