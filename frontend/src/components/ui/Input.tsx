/**
 * Input Component
 *
 * A reusable input component with label, placeholder, error state, and disabled state support.
 *
 * CUSTOMIZATION: Update the className values to match your design tokens from tokens.css.
 * Look for comments marked "STYLE:" to find customization points.
 *
 * Usage:
 *   <Input label="Email" placeholder="Enter your email" />
 *   <Input label="Password" type="password" error="Password is required" />
 *   <Input label="Name" disabled />
 */

import * as React from 'react'
import { cn } from '@/lib/utils'

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Label text displayed above the input */
  label?: string
  /** Error message displayed below the input */
  error?: string
  /** Helper text displayed below the input (hidden when error is present) */
  helperText?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, helperText, id, ...props }, ref) => {
    // Always call useId unconditionally (React hooks rule)
    const generatedId = React.useId()
    // Use provided id or fallback to generated one
    const inputId = id || generatedId

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            // STYLE: Label styles - update colors to use your tokens
            className="mb-1.5 block text-sm font-medium text-[var(--color-fg)]"
          >
            {label}
          </label>
        )}
        <input
          id={inputId}
          className={cn(
            // STYLE: Base input styles
            'flex h-9 w-full rounded-[var(--radius-md)] border bg-[var(--color-bg)] px-3 py-2 text-sm',
            'placeholder:text-[var(--color-muted)]',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-1',
            'disabled:cursor-not-allowed disabled:opacity-50',
            // STYLE: Error state - update colors to use your tokens
            error
              ? 'border-[var(--color-error)] focus-visible:ring-[var(--color-error)]'
              : 'border-[var(--color-border)]',
            className
          )}
          ref={ref}
          aria-invalid={error ? 'true' : undefined}
          aria-describedby={
            error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined
          }
          {...props}
        />
        {error && (
          <p
            id={`${inputId}-error`}
            // STYLE: Error text styles
            className="mt-1.5 text-sm text-[var(--color-error)]"
            role="alert"
          >
            {error}
          </p>
        )}
        {!error && helperText && (
          <p
            id={`${inputId}-helper`}
            // STYLE: Helper text styles
            className="mt-1.5 text-sm text-[var(--color-muted)]"
          >
            {helperText}
          </p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'

export { Input }
