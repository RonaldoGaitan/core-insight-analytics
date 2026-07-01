'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    // Restrict to only ronaldo.gaitan@icloud.com with specific password
    if (email === 'ronaldo.gaitan@icloud.com' && password === 'Cradle_6798') {
      localStorage.setItem('isAuthenticated', 'true')
      localStorage.setItem('userEmail', email)
      router.push('/dashboard')
    } else {
      setError('Invalid credentials')
    }
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
            />
          </div>
          <div className="field">
            <label>Password</label>
            <input 
              type="password" 
              placeholder="••••••••" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error && <div style={{color: '#d6483f', fontSize: '14px', marginBottom: '16px'}}>{error}</div>}
          <button type="submit" className="btn btn-accent">Sign In</button>
        </form>
      </div>
    </div>
  )
}
