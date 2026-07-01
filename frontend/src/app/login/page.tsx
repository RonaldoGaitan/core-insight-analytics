'use client'

import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const router = useRouter()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // Simple authentication - set flag in localStorage
    localStorage.setItem('isAuthenticated', 'true')
    router.push('/dashboard')
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
            <input type="email" placeholder="you@example.com" />
          </div>
          <div className="field">
            <label>Password</label>
            <input type="password" placeholder="••••••••" />
          </div>
          <button type="submit" className="btn btn-accent">Sign In</button>
        </form>
        
        <div className="switch-line">
          Don't have an account? <a href="/signup">Sign up</a>
        </div>
      </div>
    </div>
  )
}
