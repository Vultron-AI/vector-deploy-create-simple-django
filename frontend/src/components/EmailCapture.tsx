/**
 * Email Capture Form Component
 *
 * A form component for capturing email addresses with validation,
 * loading states, and toast notifications for feedback.
 *
 * Usage:
 *   <EmailCapture />
 */

import * as React from 'react'
import { Button, Input, toast } from '@/components/ui'
import { emailService } from '@/services/emailService'

export function EmailCapture() {
  const [email, setEmail] = React.useState('')
  const [error, setError] = React.useState('')
  const [isLoading, setIsLoading] = React.useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    // Client-side validation
    if (!email) {
      setError('Please enter your email address')
      return
    }

    if (!emailService.isValidEmail(email)) {
      setError('Please enter a valid email address')
      return
    }

    setIsLoading(true)

    try {
      const result = await emailService.subscribe(email)

      // Show success toast
      toast({
        title: 'Success!',
        description: result.message,
        variant: 'success',
      })

      // Clear the form
      setEmail('')
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Something went wrong'

      // Show error toast
      toast({
        title: 'Error',
        description: errorMessage,
        variant: 'error',
      })

      setError(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section
      className="bg-[var(--color-surface)] py-20 sm:py-32"
      data-testid="email-capture-section"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          {/* Section Header */}
          <h2
            className="text-3xl font-bold tracking-tight text-[var(--color-fg)] sm:text-4xl"
            data-testid="email-capture-title"
          >
            Get Early Access
          </h2>
          <p className="mt-4 text-lg leading-8 text-[var(--color-muted)]">
            Be the first to know when we launch. Subscribe to our newsletter for exclusive
            updates and early access.
          </p>

          {/* Email Form */}
          <form
            onSubmit={handleSubmit}
            className="mx-auto mt-10 max-w-md"
            data-testid="email-capture-form"
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:gap-3">
              <div className="flex-1">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value)
                    if (error) setError('')
                  }}
                  error={error}
                  disabled={isLoading}
                  data-testid="email-capture-input"
                  aria-label="Email address"
                />
              </div>
              <Button
                type="submit"
                disabled={isLoading}
                className="sm:flex-shrink-0"
                data-testid="email-capture-submit"
              >
                {isLoading ? (
                  <>
                    <svg
                      className="mr-2 h-4 w-4 animate-spin"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Subscribing...
                  </>
                ) : (
                  'Subscribe'
                )}
              </Button>
            </div>
          </form>

          {/* Privacy Notice */}
          <p className="mt-4 text-sm text-[var(--color-muted)]">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </div>
    </section>
  )
}
