// app/components/WelcomeOverlay.tsx

'use client'

import { useEffect, useState } from 'react'

export default function WelcomeOverlay() {
  const [showWelcome, setShowWelcome] = useState(true)

  useEffect(() => {
    const hasVisited = localStorage.getItem('hasVisited')
    if (hasVisited) setShowWelcome(false)
  }, [])

  const handleGetStarted = () => {
    localStorage.setItem('hasVisited', 'true')
    setShowWelcome(false)
  }

  if (!showWelcome) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white dark:bg-gray-900 text-center">
      <main className="p-6">
        <h1 className="text-4xl font-bold mb-4 text-gray-800 dark:text-white">Welcome to Newsly 📰</h1>
        <p className="text-lg mb-6 text-gray-600 dark:text-gray-300">
          Stay updated with the latest news tailored to your interests.
        </p>
        <button
          onClick={handleGetStarted}
          className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
        >
          Get Started
        </button>
      </main>
    </div>
  )
}
