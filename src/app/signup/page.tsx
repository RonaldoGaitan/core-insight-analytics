'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function SignupPage() {
  const router = useRouter()

  // Redirect to login - signup is disabled
  useEffect(() => {
    router.push('/login')
  }, [router])

  return null
}
