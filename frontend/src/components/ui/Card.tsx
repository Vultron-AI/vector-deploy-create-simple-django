/**
 * Card Component
 *
 * A reusable card component with optional title, description, and footer sections.
 *
 * CUSTOMIZATION: Update the className values to match your design tokens from tokens.css.
 * Look for comments marked "STYLE:" to find customization points.
 *
 * Usage:
 *   <Card>Content here</Card>
 *   <Card title="Title" description="Description">Content</Card>
 *   <Card interactive onClick={() => {}}>Clickable card</Card>
 */

import * as React from 'react'
import { cn } from '@/lib/utils'

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Card title displayed in the header */
  title?: string
  /** Card description displayed below the title */
  description?: string
  /** Footer content */
  footer?: React.ReactNode
  /** Whether the card is interactive (clickable/hoverable) */
  interactive?: boolean
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, title, description, footer, interactive, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          // STYLE: Base card styles
          'rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)]',
          // STYLE: Interactive state
          interactive && 'cursor-pointer transition-shadow hover:shadow-md',
          className
        )}
        {...props}
      >
        {(title || description) && (
          <CardHeader>
            {title && <CardTitle>{title}</CardTitle>}
            {description && <CardDescription>{description}</CardDescription>}
          </CardHeader>
        )}
        {children && <CardContent>{children}</CardContent>}
        {footer && <CardFooter>{footer}</CardFooter>}
      </div>
    )
  }
)
Card.displayName = 'Card'

// Card Header
interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      // STYLE: Card header styles
      className={cn('flex flex-col space-y-1.5 p-6', className)}
      {...props}
    />
  )
)
CardHeader.displayName = 'CardHeader'

// Card Title
interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {}

const CardTitle = React.forwardRef<HTMLParagraphElement, CardTitleProps>(
  ({ className, ...props }, ref) => (
    <h3
      ref={ref}
      // STYLE: Card title styles
      className={cn('text-lg font-semibold leading-none tracking-tight text-[var(--color-fg)]', className)}
      {...props}
    />
  )
)
CardTitle.displayName = 'CardTitle'

// Card Description
interface CardDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {}

const CardDescription = React.forwardRef<HTMLParagraphElement, CardDescriptionProps>(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      // STYLE: Card description styles
      className={cn('text-sm text-[var(--color-muted)]', className)}
      {...props}
    />
  )
)
CardDescription.displayName = 'CardDescription'

// Card Content
interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {}

const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      // STYLE: Card content styles
      className={cn('p-6 pt-0', className)}
      {...props}
    />
  )
)
CardContent.displayName = 'CardContent'

// Card Footer
interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      // STYLE: Card footer styles
      className={cn('flex items-center p-6 pt-0', className)}
      {...props}
    />
  )
)
CardFooter.displayName = 'CardFooter'

export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
}
