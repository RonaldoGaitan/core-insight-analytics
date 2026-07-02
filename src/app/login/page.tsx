'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

export default function LoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')

  useEffect(() => {
    // If already authenticated, redirect to dashboard or redirect URL
    const isAuthenticated = localStorage.getItem('isAuthenticated')
    if (isAuthenticated) {
      const redirect = searchParams.get('redirect')
      router.replace(redirect || '/dashboard')
    }
  }, [router, searchParams])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setEmailError('')
    setPasswordError('')

    // Inline validation
    if (!email) {
      setEmailError('Email is required')
      return
    }
    if (!email.includes('@')) {
      setEmailError('Please enter a valid email')
      return
    }
    if (!password) {
      setPasswordError('Password is required')
      return
    }
    if (password.length < 8) {
      setPasswordError('Password must be at least 8 characters')
      return
    }

    setIsSubmitting(true)

    // Simulate API call with loading state
    await new Promise(resolve => setTimeout(resolve, 500))

    // Restrict to only ronaldo.gaitan@icloud.com with specific password
    if (email === 'ronaldo.gaitan@icloud.com' && password === 'Cradle_6798') {
      localStorage.setItem('isAuthenticated', 'true')
      localStorage.setItem('userEmail', email)
      const redirect = searchParams.get('redirect')
      router.replace(redirect || '/dashboard')
    } else {
      setError('Invalid credentials')
    }

    setIsSubmitting(false)
  }

  return (
    <div className="auth-wrap">
      <div className="auth-card">
        <div className="brand"><span className="mark"></span>CoreInsight Analytics</div>
        <h1>Welcome back</h1>
        <p className="sub">Enter your credentials to access your account</p>
        
        <form onSubmit={handleLogin}>
          <div className="field">
            <label>Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isSubmitting}
            />
            {emailError && <div style={{color: '#d6483f', fontSize: '12px', marginTop: '4px'}}>{emailError}</div>}
          </div>
          <div className="field">
            <label>Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isSubmitting}
            />
            {passwordError && <div style={{color: '#d6483f', fontSize: '12px', marginTop: '4px'}}>{passwordError}</div>}
          </div>
          {error && <div style={{color: '#d6483f', fontSize: '14px', marginBottom: '16px'}}>{error}</div>}
          <button type="submit" className="btn btn-accent" disabled={isSubmitting}>
            {isSubmitting ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  )
}
