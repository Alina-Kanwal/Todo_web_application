/**
 * Home page - redirects to dashboard or signin
 */

import { redirect } from 'next/navigation'

export default function HomePage() {
  // Redirect to dashboard (will handle auth state in dashboard)
  redirect('/dashboard')
}
