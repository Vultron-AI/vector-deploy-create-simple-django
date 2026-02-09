/**
 * E2E Tests for Digital Product Landing Page
 *
 * These tests validate the landing page functionality and capture screenshots.
 *
 * Required screenshots:
 * - MainPage.png: The main landing page
 * - LandingPage.png: The landing page (same as main since no auth)
 */

import { test, expect } from '@playwright/test'
import { mkdirSync, existsSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

// DO NOT CHANGE THESE NAMES
const MAIN_PAGE_SCREENSHOT_NAME = 'MainPage'
const LANDING_PAGE_SCREENSHOT_NAME = 'LandingPage'

// Ensure screenshots directory exists (ESM-compatible)
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const screenshotsDir = join(__dirname, '..', 'screenshots')
if (!existsSync(screenshotsDir)) {
  mkdirSync(screenshotsDir, { recursive: true })
}

test.describe('Landing Page E2E Tests', () => {
  /**
   * Test: Landing Page Screenshot
   * Captures a full-page screenshot of the landing page
   */
  test('captures LandingPage screenshot', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    // Wait for main landing page elements to be visible
    await expect(page.getByTestId('landing-page')).toBeVisible()
    await expect(page.getByTestId('hero-section')).toBeVisible()

    // Capture full-page screenshot
    await page.screenshot({
      path: join(screenshotsDir, LANDING_PAGE_SCREENSHOT_NAME + '.png'),
      fullPage: true,
    })

    // Verify key landing page elements
    await expect(page.getByTestId('hero-headline')).toBeVisible()
    await expect(page.getByTestId('hero-description')).toBeVisible()
    await expect(page.getByTestId('hero-cta-button')).toBeVisible()
    await expect(page).toHaveTitle(/.+/)
  })

  /**
   * Test: Main Page Screenshot
   * Same as landing page since there's no authentication
   */
  test('captures MainPage screenshot', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    // Wait for all sections to be visible
    await expect(page.getByTestId('landing-page')).toBeVisible()
    await expect(page.getByTestId('hero-section')).toBeVisible()
    await expect(page.getByTestId('benefits-section')).toBeVisible()
    await expect(page.getByTestId('email-capture-section')).toBeVisible()

    // Capture full-page screenshot
    await page.screenshot({
      path: join(screenshotsDir, MAIN_PAGE_SCREENSHOT_NAME + '.png'),
      fullPage: true,
    })

    // Verify all main sections
    await expect(page.getByTestId('benefits-title')).toBeVisible()
    await expect(page.getByTestId('email-capture-title')).toBeVisible()
    await expect(page).toHaveTitle(/.+/)
  })

  /**
   * Test: Email Capture Form Validation
   * Tests that the email form validates input correctly
   */
  test('validates email form input', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    const emailInput = page.getByTestId('email-capture-input')
    const submitButton = page.getByTestId('email-capture-submit')

    // Test empty submission
    await submitButton.click()
    // Should show error for empty input
    await expect(page.getByText(/please enter/i)).toBeVisible()

    // Test invalid email format
    await emailInput.fill('invalid-email')
    await submitButton.click()
    await expect(page.getByText(/valid email/i)).toBeVisible()
  })

  /**
   * Test: Email Capture Form Submission
   * Tests successful email subscription flow
   */
  test('submits email form successfully', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    // Clear any existing localStorage
    await page.evaluate(() => localStorage.clear())

    const emailInput = page.getByTestId('email-capture-input')
    const submitButton = page.getByTestId('email-capture-submit')

    // Fill in valid email and submit
    await emailInput.fill('test@example.com')
    await submitButton.click()

    // Wait for success state (loading -> success)
    await expect(submitButton).toBeEnabled({ timeout: 5000 })

    // Verify email was stored in localStorage
    const storedEmails = await page.evaluate(() => {
      const stored = localStorage.getItem('email_subscribers')
      return stored ? JSON.parse(stored) : []
    })
    expect(storedEmails.some((sub: { email: string }) => sub.email === 'test@example.com')).toBe(true)
  })

  /**
   * Test: Benefits Section Display
   * Verifies all benefit cards are displayed
   */
  test('displays all benefit cards', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    await expect(page.getByTestId('benefits-section')).toBeVisible()
    await expect(page.getByTestId('benefits-grid')).toBeVisible()

    // Check all 4 benefit cards are visible
    for (let i = 0; i < 4; i++) {
      await expect(page.getByTestId(`benefit-card-${i}`)).toBeVisible()
    }
  })

  /**
   * Test: CTA Button Scrolls to Email Capture
   * Verifies that clicking the CTA button scrolls to the email capture section
   */
  test('CTA button scrolls to email capture', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    // Click the CTA button
    await page.getByTestId('hero-cta-button').click()

    // Wait for smooth scroll to complete
    await page.waitForTimeout(1000)

    // Verify email capture section is in view
    const emailSection = page.getByTestId('email-capture-section')
    await expect(emailSection).toBeInViewport()
  })
})
