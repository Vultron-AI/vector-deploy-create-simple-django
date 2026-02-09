/**
 * Hero Section Component
 *
 * The hero section for the landing page with headline, subheadline, and CTA.
 * Communicates the product's core value proposition.
 *
 * Usage:
 *   <Hero />
 *   <Hero onCTAClick={() => scrollToEmailCapture()} />
 */

import { Button } from '@/components/ui'

interface HeroProps {
  /** Callback when CTA button is clicked */
  onCTAClick?: () => void
}

export function Hero({ onCTAClick }: HeroProps) {
  return (
    <section
      className="relative overflow-hidden bg-gradient-to-b from-[var(--color-surface)] to-[var(--color-bg)] py-20 sm:py-32"
      data-testid="hero-section"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          {/* Badge/Label */}
          <div className="mb-6">
            <span className="inline-flex items-center rounded-full bg-[var(--color-accent)]/10 px-4 py-1.5 text-sm font-medium text-[var(--color-accent)]">
              Launching Soon
            </span>
          </div>

          {/* Headline */}
          <h1
            className="text-4xl font-bold tracking-tight text-[var(--color-fg)] sm:text-5xl md:text-6xl"
            data-testid="hero-headline"
          >
            Transform Your{' '}
            <span className="text-[var(--color-accent)]">Digital Experience</span>
          </h1>

          {/* Subheadline */}
          <p
            className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-[var(--color-muted)]"
            data-testid="hero-description"
          >
            Unlock the power of our innovative digital product. Streamline your workflow,
            boost productivity, and achieve your goals faster than ever before.
          </p>

          {/* CTA Buttons */}
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Button
              size="lg"
              onClick={onCTAClick}
              data-testid="hero-cta-button"
            >
              Get Early Access
            </Button>
            <Button
              variant="ghost"
              size="lg"
              onClick={onCTAClick}
            >
              Learn More
              <span aria-hidden="true" className="ml-2">
                &rarr;
              </span>
            </Button>
          </div>
        </div>
      </div>

      {/* Decorative background elements */}
      <div
        className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        aria-hidden="true"
      >
        <div
          className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[var(--color-accent)] to-[var(--color-accent-hover)] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
        />
      </div>
    </section>
  )
}
