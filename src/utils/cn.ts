import { twMerge } from 'tailwind-merge'
import { normalizeClass } from 'vue'
import { type ClassValue } from 'clsx'

export function cn(...inputs: ClassValue[]) {
  return twMerge(normalizeClass(inputs))
}
