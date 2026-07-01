export default function Home() {
  return (
    <section className="view active">
      <nav className="topnav">
        <div style={{display:'flex',alignItems:'center',gap:'10px'}}>
          <button className="back-btn">←</button>
          <div className="brand"><span className="mark"></span>CoreInsight Analytics</div>
        </div>
        <div className="navlinks">
          <a href="/features">Features</a>
          <a href="/pricing">Pricing</a>
          <a href="/about">About</a>
        </div>
        <button className="btn btn-dark" onClick={() => window.location.href = '/signup'}>Book a Demo</button>
      </nav>

      <div className="hero">
        <div className="eyebrow">AI Analytics</div>
        <h1>Know exactly why<br/>your numbers moved.</h1>
        <p>CoreInsight connects to the tools you already use and turns raw sales data into plain-English answers, in seconds.</p>
        <div className="hero-ctas">
          <button className="btn btn-dark" onClick={() => window.location.href = '/signup'}>Get Started</button>
          <button className="btn btn-ghost" onClick={() => window.location.href = '/dashboard'}>View Live Dashboard</button>
        </div>
      </div>

      <div className="mock-frame">
        <div className="mock-bar"><span></span><span></span><span></span></div>
        <div style={{padding:'24px',display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:'14px'}}>
          <div className="card" style={{padding:'14px'}}><div className="meta">Revenue</div><div style={{fontFamily:'var(--font-display)',fontSize:'22px'}}>$85,420</div></div>
          <div className="card" style={{padding:'14px'}}><div className="meta">Customers</div><div style={{fontFamily:'var(--font-display)',fontSize:'22px'}}>1,245</div></div>
          <div className="card" style={{padding:'14px'}}><div className="meta">Monthly Growth</div><div style={{fontFamily:'var(--font-display)',fontSize:'22px',color:'var(--good)'}}>12%</div></div>
        </div>
        <div style={{padding:'0 24px 24px'}}>
          <canvas id="heroChart" height="90"></canvas>
        </div>
      </div>

      <div className="logos-section">
        <h3>Easily connect your tools</h3>
        <p>Integrate your favorite apps in minutes, securely sync your data, and start gaining insights.</p>
        <div className="logo-grid">
          <div className="logo-pill" style={{color:'#16181d'}}>Square</div>
          <div className="logo-pill" style={{color:'#5a8a2e',fontStyle:'italic'}}>shopify</div>
          <div className="logo-pill" style={{color:'#2ca01c'}}>QuickBooks</div>
          <div className="logo-pill" style={{color:'#635bff',fontStyle:'italic'}}>stripe</div>
          <div className="logo-pill" style={{color:'#5a4fcf'}}>Lightspeed</div>
          <div className="logo-pill" style={{color:'#1aa3d6'}}>Clover</div>
          <div className="logo-pill" style={{color:'#003087'}}>PayPal</div>
          <div className="logo-pill" style={{color:'#e0182b',letterSpacing:'.02em'}}>DOORDASH</div>
        </div>
        <button className="btn btn-dark" style={{marginTop:'36px',padding:'13px 26px'}} onClick={() => window.location.href = '/signup'}>Book a Demo</button>
      </div>

      <div className="stat-row">
        <div><div className="num">11,247</div><div className="lbl">records synced / store</div></div>
        <div><div className="num">75%</div><div className="lbl">customer retention</div></div>
        <div><div className="num">&lt; 5 min</div><div className="lbl">to first insight</div></div>
      </div>

      <div className="feature-cards-section">
        <div className="feature-cards-grid">
          <div className="feature-card-large">
            <h3>Simple analytics dashboard</h3>
            <p>Get all the important stats on one single page. No training necessary. Connect your data sources and see insights instantly.</p>
            <div className="example">
              <div className="example-label">EXAMPLE</div>
              <div className="example-text">Connect Shopify → See revenue, orders, customers in one dashboard</div>
            </div>
          </div>

          <div className="feature-card-large">
            <h3>AI-powered queries</h3>
            <p>Ask questions in plain English and get instant answers. No SQL knowledge required. Our AI understands your business context.</p>
            <div className="example">
              <div className="example-label">EXAMPLE</div>
              <div className="example-text">"Why did revenue drop last week?" → AI analyzes data and explains the cause</div>
            </div>
          </div>

          <div className="feature-card-large">
            <h3>Automatic visualizations</h3>
            <p>Beautiful charts and graphs generated automatically based on your questions. No manual configuration needed.</p>
            <div className="example">
              <div className="example-label">EXAMPLE</div>
              <div className="example-text">"Show me sales by product" → Auto-generates bar chart with product breakdown</div>
            </div>
          </div>

          <div className="feature-card-large">
            <h3>Multi-source integration</h3>
            <p>Connect Shopify, Square, Stripe, QuickBooks, Google Analytics, and 50+ other tools. All your data in one place, automatically synced.</p>
            <div className="example">
              <div className="example-label">EXAMPLE</div>
              <div className="example-text">Connect website + 5 business platforms → Unified view of all metrics</div>
            </div>
          </div>

          <div className="feature-card-large">
            <h3>Privacy-first architecture</h3>
            <p>Your data is 100% yours. Enterprise-grade encryption, row-level security, and complete data isolation for every tenant.</p>
            <div className="example">
              <div className="example-label">EXAMPLE</div>
              <div className="example-text">Multi-tenant security ensures customers never see each other's data</div>
            </div>
          </div>

          <div className="feature-card-large">
            <h3>Real-time sync</h3>
            <p>Your data is always up-to-date with automatic synchronization. No manual exports or imports needed.</p>
            <div className="example">
              <div className="example-label">EXAMPLE</div>
              <div className="example-text">New Shopify order → Appears in dashboard within seconds</div>
            </div>
          </div>
        </div>
      </div>

      <div className="use-cases-section">
        <div className="use-cases-container">
          <h2>Real examples of CoreInsight in action</h2>
          <p>See how businesses use CoreInsight to make better decisions every day.</p>

          <div className="use-case-card">
            <h4>E-commerce Store Owner</h4>
            <div className="question">Question: "Which products are selling the most this month?"</div>
            <div className="answer">
              <div className="answer-label">COREINSIGHT ANSWER:</div>
              <div className="answer-text">Your top 3 products this month are: Coffee Blend ($12,450), Retail Product ($8,320), and Reflex Cooler ($6,180). Coffee Blend is up 18% from last month, driven by strong repeat purchases from loyalty members.</div>
            </div>
          </div>

          <div className="use-case-card">
            <h4>Restaurant Chain Manager</h4>
            <div className="question">Question: "Why did revenue drop last Tuesday?"</div>
            <div className="answer">
              <div className="answer-label">COREINSIGHT ANSWER:</div>
              <div className="answer-text">Revenue dropped 23% last Tuesday due to: 1) Reduced foot traffic (15% fewer customers), 2) Higher refund rate (3.2% vs 1.8% average), and 3) Lower average order value ($42 vs $48). The downtown location was most affected.</div>
            </div>
          </div>

          <div className="use-case-card">
            <h4>SaaS Founder</h4>
            <div className="question">Question: "What's our customer retention rate?"</div>
            <div className="answer">
              <div className="answer-label">COREINSIGHT ANSWER:</div>
              <div className="answer-text">Your 30-day retention rate is 75%, slightly above your 3-month average of 72%. Customers on annual plans retain at 89% vs 68% for monthly plans. Enterprise customers have the highest retention at 94%.</div>
            </div>
          </div>

          <div className="use-case-card">
            <h4>Retail Business Owner</h4>
            <div className="question">Question: "Which marketing channel brings the most revenue?"</div>
            <div className="answer">
              <div className="answer-label">COREINSIGHT ANSWER:</div>
              <div className="answer-text">Instagram drives the most revenue ($45,230 this month), followed by Google Ads ($32,180) and email marketing ($28,450). Instagram has the highest ROI at 4.2x, while Google Ads is at 2.8x.</div>
            </div>
          </div>

          <div className="use-case-card">
            <h4>Website Owner</h4>
            <div className="question">Question: "Which pages have the highest bounce rate?"</div>
            <div className="answer">
              <div className="answer-label">COREINSIGHT ANSWER:</div>
              <div className="answer-text">Your pricing page has the highest bounce rate at 78%, followed by the blog homepage at 65%. Visitors from organic search have a 42% lower bounce rate than those from social media. Consider adding a FAQ section to pricing to reduce drop-offs.</div>
            </div>
          </div>

          <div className="use-case-card">
            <h4>Content Creator</h4>
            <div className="question">Question: "Which blog posts drive the most conversions?"</div>
            <div className="answer">
              <div className="answer-label">COREINSIGHT ANSWER:</div>
              <div className="answer-text">"How to increase sales" drives 23 conversions (4.2% conversion rate), "Best analytics tools" drives 18 conversions (3.8%), and "Marketing tips" drives 15 conversions (3.1%). Posts published on Tuesday have 27% higher conversion rates than weekend posts.</div>
            </div>
          </div>
        </div>
      </div>

      <footer className="site">
        <span>© 2026 CoreInsight Analytics</span>
        <span>Houston, TX</span>
      </footer>
    </section>
  )
}
