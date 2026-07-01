export default function PricingPage() {
  return (
    <section className="view active">
      <nav className="topnav">
        <div style={{display:'flex',alignItems:'center',gap:'10px'}}>
          <button className="back-btn">←</button>
          <div className="brand"><span className="mark"></span>CoreInsight Analytics</div>
        </div>
        <div className="navlinks">
          <a href="/">Home</a>
          <a href="/features">Features</a>
          <a href="/about">About</a>
        </div>
        <button className="btn btn-dark" onClick={() => window.location.href = '/signup'}>Get Started</button>
      </nav>

      <div className="pricing-page">
        <div className="pricing-hero">
          <h1>Simple, transparent pricing</h1>
          <p>Start free and scale as you grow. No hidden fees.</p>
        </div>

        <div className="pricing-grid">
          <div className="pricing-card">
            <h3>Starter</h3>
            <div className="price">$0<span>/month</span></div>
            <p className="desc">Perfect for small businesses getting started.</p>
            <ul>
              <li>✓ 1 data source</li>
              <li>✓ 1,000 records/month</li>
              <li>✓ Basic analytics</li>
              <li>✓ Email support</li>
            </ul>
            <button className="btn btn-ghost" onClick={() => window.location.href = '/signup'}>Start Free</button>
          </div>

          <div className="pricing-card featured">
            <div className="badge">Most Popular</div>
            <h3>Growth</h3>
            <div className="price">$49<span>/month</span></div>
            <p className="desc">For growing businesses with multiple data sources.</p>
            <ul>
              <li>✓ 5 data sources</li>
              <li>✓ 50,000 records/month</li>
              <li>✓ Advanced analytics</li>
              <li>✓ AI insights</li>
              <li>✓ Priority support</li>
            </ul>
            <button className="btn btn-dark" onClick={() => window.location.href = '/signup'}>Get Started</button>
          </div>

          <div className="pricing-card">
            <h3>Enterprise</h3>
            <div className="price">$199<span>/month</span></div>
            <p className="desc">For large organizations with custom needs.</p>
            <ul>
              <li>✓ Unlimited data sources</li>
              <li>✓ Unlimited records</li>
              <li>✓ Custom integrations</li>
              <li>✓ Dedicated support</li>
              <li>✓ SLA guarantee</li>
            </ul>
            <button className="btn btn-ghost" onClick={() => window.location.href = '/signup'}>Contact Sales</button>
          </div>
        </div>
      </div>
    </section>
  )
}
