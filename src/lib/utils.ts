import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function clampNumber(value: number, min: number, max?: number): number {
  const numValue = Number(value)
  if (isNaN(numValue)) return min
  if (max !== undefined) {
    return Math.min(Math.max(numValue, min), max)
  }
  return Math.max(numValue, min)
}
