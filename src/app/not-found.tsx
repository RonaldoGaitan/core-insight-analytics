'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function NotFound() {
  const router = useRouter()

  useEffect(() => {
    // Redirect to home after 5 seconds
    const timer = setTimeout(() => {
      router.push('/')
    }, 5000)

    return () => clearTimeout(timer)
  }, [router])

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="text-center">
        <div className="text-9xl font-bold text-gray-900 mb-4">404</div>
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">Page Not Found</h1>
        <p className="text-gray-600 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="space-y-4">
          <button
            onClick={() => router.push('/')}
            className="px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800"
          >
            Go to Homepage
          </button>
          <div className="text-sm text-gray-500">
            Redirecting to homepage in 5 seconds...
          </div>
        </div>
      </div>
    </div>
  )
}
