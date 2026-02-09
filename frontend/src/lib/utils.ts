/**
 * Utility functions for styling and class management
 */

import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Combines class names with Tailwind CSS conflict resolution
 * Uses clsx for conditional classes and tailwind-merge for conflict resolution
 *
 * Usage:
 *   cn('p-4', 'p-2') // returns 'p-2' (tailwind-merge handles conflicts)
 *   cn('btn', isActive && 'btn-active') // conditional classes
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
