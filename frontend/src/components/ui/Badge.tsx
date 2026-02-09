/**
 * Badge Component
 *
 * A badge component with multiple variants for status indicators.
 *
 * CUSTOMIZATION: Update the className values to match your design tokens from tokens.css.
 * Look for comments marked "STYLE:" to find customization points.
 *
 * Usage:
 *   <Badge>Default</Badge>
 *   <Badge variant="success">Active</Badge>
 *   <Badge variant="error">Error</Badge>
 *   <Badge variant="warning">Warning</Badge>
 *   <Badge variant="info">Info</Badge>
 */

import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const badgeVariants = cva(
  // STYLE: Base badge styles
  'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors',
  {
    variants: {
      variant: {
        // STYLE: Default variant
        default: 'bg-[var(--color-surface)] text-[var(--color-fg)] border border-[var(--color-border)]',
        // STYLE: Success variant
        success: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
        // STYLE: Warning variant
        warning: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
        // STYLE: Error variant
        error: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
        // STYLE: Info variant
        info: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant, ...props }, ref) => (
    <span
      ref={ref}
      className={cn(badgeVariants({ variant, className }))}
      {...props}
    />
  )
)
Badge.displayName = 'Badge'

export { Badge, badgeVariants }
