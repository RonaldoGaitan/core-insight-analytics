export default function FeaturesPage() {
  return (
    <section className="view active">
      <nav className="topnav">
        <div style={{display:'flex',alignItems:'center',gap:'10px'}}>
          <button className="back-btn">←</button>
          <div className="brand"><span className="mark"></span>CoreInsight Analytics</div>
        </div>
        <div className="navlinks">
          <a href="/">Home</a>
          <a href="/pricing">Pricing</a>
          <a href="/about">About</a>
        </div>
        <button className="btn btn-dark" onClick={() => window.location.href = '/signup'}>Get Started</button>
      </nav>

      <div className="features-page">
        <div className="features-hero">
          <h1>Everything you need to understand your business</h1>
          <p>Powerful features designed to help you make data-driven decisions faster.</p>
        </div>

        <div className="feature-block">
          <h3>AI-Powered Analytics</h3>
          <p>Our advanced AI analyzes your data and provides actionable insights in plain English, no technical expertise required.</p>
          <div className="feature-grid-2">
            <div className="feature-item">
              <h4>Natural Language Queries</h4>
              <p>Ask questions like "Why did revenue drop?" and get instant answers.</p>
            </div>
            <div className="feature-item">
              <h4>Automated Insights</h4>
              <p>Get notified about important trends and anomalies automatically.</p>
            </div>
          </div>
        </div>

        <div className="feature-block">
          <h3>Data Integration</h3>
          <p>Connect all your business tools in minutes and keep your data automatically synced.</p>
          <div className="feature-grid-2">
            <div className="feature-item">
              <h4>50+ Integrations</h4>
              <p>Shopify, Square, Stripe, QuickBooks, and many more.</p>
            </div>
            <div className="feature-item">
              <h4>Real-time Sync</h4>
              <p>Your data is always up-to-date with automatic synchronization.</p>
            </div>
          </div>
        </div>

        <div className="feature-block">
          <h3>Security & Privacy</h3>
          <p>Enterprise-grade security to protect your sensitive business data.</p>
          <div className="feature-grid-2">
            <div className="feature-item">
              <h4>Bank-Level Encryption</h4>
              <p>Your data is encrypted at rest and in transit.</p>
            </div>
            <div className="feature-item">
              <h4>Role-Based Access</h4>
              <p>Control who sees what with granular permissions.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
