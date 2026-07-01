export default function SignupPage() {
  return (
    <div className="auth-wrap">
      <div className="auth-card">
        <div className="brand"><span className="mark"></span>CoreInsight Analytics</div>
        <h1>Create account</h1>
        <p className="sub">Start your free trial today</p>
        
        <form>
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
