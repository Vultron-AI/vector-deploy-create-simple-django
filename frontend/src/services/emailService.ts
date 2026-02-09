/**
 * Email Service
 *
 * Handles email storage using localStorage for demonstration purposes.
 * In a production environment, this would integrate with a backend API.
 *
 * Usage:
 *   import { emailService } from '@/services/emailService'
 *   await emailService.subscribe('user@example.com')
 *   const emails = emailService.getSubscribers()
 */

const STORAGE_KEY = 'email_subscribers'

interface Subscriber {
  email: string
  subscribedAt: string
}

/**
 * Simulates network delay for realistic UX
 */
function simulateDelay(ms: number = 500): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

/**
 * Validates email format
 */
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * Get all subscribers from localStorage
 */
function getSubscribers(): Subscriber[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : []
  } catch {
    return []
  }
}

/**
 * Check if an email is already subscribed
 */
function isSubscribed(email: string): boolean {
  const subscribers = getSubscribers()
  return subscribers.some(
    (sub) => sub.email.toLowerCase() === email.toLowerCase()
  )
}

/**
 * Subscribe a new email
 * @throws Error if email is invalid or already subscribed
 */
async function subscribe(email: string): Promise<{ success: boolean; message: string }> {
  // Simulate network delay
  await simulateDelay(800)

  // Validate email format
  if (!email || !isValidEmail(email)) {
    throw new Error('Please enter a valid email address')
  }

  // Check for duplicate
  if (isSubscribed(email)) {
    throw new Error('This email is already subscribed')
  }

  // Store the email
  const subscribers = getSubscribers()
  const newSubscriber: Subscriber = {
    email: email.toLowerCase().trim(),
    subscribedAt: new Date().toISOString(),
  }

  subscribers.push(newSubscriber)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(subscribers))

  return {
    success: true,
    message: 'Thank you for subscribing! We\'ll be in touch soon.',
  }
}

/**
 * Unsubscribe an email
 */
async function unsubscribe(email: string): Promise<{ success: boolean; message: string }> {
  await simulateDelay(500)

  const subscribers = getSubscribers()
  const filteredSubscribers = subscribers.filter(
    (sub) => sub.email.toLowerCase() !== email.toLowerCase()
  )

  if (subscribers.length === filteredSubscribers.length) {
    throw new Error('Email not found in subscription list')
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredSubscribers))

  return {
    success: true,
    message: 'Successfully unsubscribed',
  }
}

/**
 * Clear all subscribers (for testing purposes)
 */
function clearAll(): void {
  localStorage.removeItem(STORAGE_KEY)
}

export const emailService = {
  subscribe,
  unsubscribe,
  getSubscribers,
  isSubscribed,
  clearAll,
  isValidEmail,
}
