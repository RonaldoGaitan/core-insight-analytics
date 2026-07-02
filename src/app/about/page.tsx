'use client'

export default function AboutPage() {
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
          <a href="/pricing">Pricing</a>
        </div>
        <button className="btn btn-dark" onClick={() => window.location.href = '/signup'}>Get Started</button>
      </nav>

      <div className="about-page">
        <div className="about-hero">
          <h1>About CoreInsight</h1>
          <p>We're on a mission to make data analytics accessible to every business.</p>
        </div>

        <div className="about-section">
          <h3>Our Story</h3>
          <p>Founded in 2024, CoreInsight Analytics was born from a simple observation: small and medium businesses struggle to make sense of their data. While enterprise companies have teams of data scientists, most businesses are left with spreadsheets and gut feelings.</p>
          <p>We set out to change that by building an AI-powered analytics platform that anyone can use. No coding required, no data science degree needed—just ask questions in plain English and get instant insights.</p>
        </div>

        <div className="about-section">
          <h3>Our Mission</h3>
          <p>To democratize data analytics and empower every business to make data-driven decisions. We believe that understanding your data shouldn't require a PhD or a six-figure budget.</p>
        </div>

        <div className="about-section">
          <h3>Our Values</h3>
          <p><strong>Simplicity:</strong> Complex data should be simple to understand.</p>
          <p><strong>Accessibility:</strong> Great analytics should be available to everyone.</p>
          <p><strong>Trust:</strong> Your data is yours—we protect it like it's our own.</p>
          <p><strong>Innovation:</strong> We're constantly pushing the boundaries of what's possible with AI.</p>
        </div>

        <div className="about-section">
          <h3>Our Team</h3>
          <p>We're a team of data scientists, engineers, and designers passionate about making analytics accessible.</p>
          <div className="team-grid">
            <div className="team-member">
              <div className="avatar"></div>
              <h4>Sarah Chen</h4>
              <p>CEO & Co-Founder</p>
            </div>
            <div className="team-member">
              <div className="avatar"></div>
              <h4>Marcus Johnson</h4>
              <p>CTO & Co-Founder</p>
            </div>
            <div className="team-member">
              <div className="avatar"></div>
              <h4>Emily Rodriguez</h4>
              <p>Head of Product</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
