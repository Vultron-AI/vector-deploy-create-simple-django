/**
 * Benefits Section Component
 *
 * Displays key product benefits in a responsive grid of cards.
 * Highlights the main advantages of the digital product.
 *
 * Usage:
 *   <Benefits />
 */

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui'
import { Zap, Shield, Sparkles, Clock } from 'lucide-react'

interface Benefit {
  icon: React.ReactNode
  title: string
  description: string
}

const benefits: Benefit[] = [
  {
    icon: <Zap className="h-8 w-8 text-[var(--color-accent)]" />,
    title: 'Lightning Fast',
    description:
      'Experience blazing fast performance that keeps up with your workflow. No more waiting around.',
  },
  {
    icon: <Shield className="h-8 w-8 text-[var(--color-accent)]" />,
    title: 'Secure by Design',
    description:
      'Your data is protected with enterprise-grade security. We take your privacy seriously.',
  },
  {
    icon: <Sparkles className="h-8 w-8 text-[var(--color-accent)]" />,
    title: 'Intuitive Interface',
    description:
      'A beautiful, user-friendly design that makes complex tasks simple and enjoyable.',
  },
  {
    icon: <Clock className="h-8 w-8 text-[var(--color-accent)]" />,
    title: 'Save Time',
    description:
      'Automate repetitive tasks and focus on what matters most. Reclaim hours every week.',
  },
]

export function Benefits() {
  return (
    <section
      className="bg-[var(--color-bg)] py-20 sm:py-32"
      data-testid="benefits-section"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-2xl text-center">
          <h2
            className="text-3xl font-bold tracking-tight text-[var(--color-fg)] sm:text-4xl"
            data-testid="benefits-title"
          >
            Why Choose Our Product?
          </h2>
          <p className="mt-4 text-lg leading-8 text-[var(--color-muted)]">
            Discover the features that set us apart and help you achieve more.
          </p>
        </div>

        {/* Benefits Grid */}
        <div
          className="mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2 lg:gap-8"
          data-testid="benefits-grid"
        >
          {benefits.map((benefit, index) => (
            <Card
              key={index}
              interactive
              className="transition-all hover:border-[var(--color-accent)]/50"
              data-testid={`benefit-card-${index}`}
            >
              <CardHeader>
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-[var(--color-accent)]/10">
                  {benefit.icon}
                </div>
                <CardTitle className="text-xl">{benefit.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-[var(--color-muted)]">{benefit.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
