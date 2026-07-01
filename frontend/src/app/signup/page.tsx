'use client'

import { useRouter } from 'next/navigation'

export default function SignupPage() {
  const router = useRouter()

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault()
    // Simple authentication - set flag in localStorage
    localStorage.setItem('isAuthenticated', 'true')
    router.push('/dashboard')
  }

  return (
    <div className="auth-wrap">
      <div className="auth-card">
        <div className="brand"><span className="mark"></span>CoreInsight Analytics</div>
        <h1>Create account</h1>
        <p className="sub">Start your free trial today</p>
        
        <form onSubmit={handleSignup}>
          <div className="field">
            <label>Full Name</label>
            <input type="text" placeholder="John Doe" />
          </div>
          <div className="field">
            <label>Email</label>
            <input type="email" placeholder="you@example.com" />
          </div>
          <div className="field">
            <label>Password</label>
            <input type="password" placeholder="••••••••" />
          </div>
          <button type="submit" className="btn btn-accent">Create Account</button>
        </form>
        
        <div className="switch-line">
          Already have an account? <a href="/login">Sign in</a>
        </div>
      </div>
    </div>
  )
}
