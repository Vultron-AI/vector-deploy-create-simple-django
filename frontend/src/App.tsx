/**
 * Main App Component
 *
 * Digital Product Landing Page with Hero, Benefits, and Email Capture sections.
 * Pre-wrapped with DialogProvider to enable the useDialog hook throughout the app.
 */

import * as React from 'react'
import { DialogProvider } from '@/components/ui'
import { Hero } from '@/components/Hero'
import { Benefits } from '@/components/Benefits'
import { EmailCapture } from '@/components/EmailCapture'

function App() {
  // Ref for scrolling to email capture section
  const emailCaptureRef = React.useRef<HTMLDivElement>(null)

  const scrollToEmailCapture = () => {
    emailCaptureRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <DialogProvider>
      <div className="min-h-screen bg-[var(--color-bg)]" data-testid="landing-page">
        {/* Hero Section */}
        <Hero onCTAClick={scrollToEmailCapture} />

        {/* Benefits Section */}
        <Benefits />

        {/* Email Capture Section */}
        <div ref={emailCaptureRef}>
          <EmailCapture />
        </div>

        {/* Footer */}
        <footer className="border-t border-[var(--color-border)] bg-[var(--color-bg)] py-8">
          <div className="mx-auto max-w-7xl px-4 text-center text-sm text-[var(--color-muted)] sm:px-6 lg:px-8">
            <p>&copy; {new Date().getFullYear()} Digital Product. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </DialogProvider>
  )
}

export default App
