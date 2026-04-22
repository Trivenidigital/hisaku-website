import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * cn — merge class names with Tailwind class deduplication.
 *
 * Accepts any combination of strings, arrays, objects, falsy values.
 * Runs through clsx (conditional composition) then tailwind-merge
 * (dedupes conflicting Tailwind utilities so a later class wins over
 * an earlier one of the same property).
 *
 * Matches the shadcn/ui convention so copy-paste components from
 * shadcn, Aceternity UI, and 21st.dev work without modification.
 *
 *   cn("p-4 bg-red", condition && "bg-blue", className)
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
