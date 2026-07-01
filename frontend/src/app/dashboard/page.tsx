'use client'

export default function DashboardPage() {
  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand"><span className="mark"></span>CoreInsight</div>
        <a className="side-link active"><span className="dot"></span>Dashboard</a>
        <a className="side-link"><span className="dot"></span>Data</a>
        <a className="side-link"><span className="dot"></span>Ask AI</a>
        <a className="side-link"><span className="dot"></span>Integrations</a>
        <a className="side-link" href="/"><span className="dot"></span>Log Out</a>
        <div className="sidebar-foot">
          <div className="avatar"></div>
          <div><div className="who">Jordan Lee</div><div className="role">Owner</div></div>
        </div>
      </aside>

      <main className="main">
        <div className="main-top">
          <div style={{display:'flex',alignItems:'center',gap:'12px'}}>
            <button className="back-btn">←</button>
            <div>
              <h2>Dashboard</h2>
              <div className="sub">Last synced 4 minutes ago</div>
            </div>
          </div>
        </div>

        <div className="dash-body">
          <div className="kpi-row">
            <div className="kpi-card">
              <div className="lbl">Revenue</div>
              <div className="val-row"><div className="val">$85,420</div></div>
              <div className="delta up">▲ 12% vs last month</div>
            </div>
            <div className="kpi-card">
              <div className="lbl">Customers</div>
              <div className="val-row"><div className="val">1,245</div></div>
              <div className="delta up">▲ 4.1%</div>
            </div>
            <div className="kpi-card">
              <div className="lbl">Orders</div>
              <div className="val-row"><div className="val">320</div></div>
              <div className="delta down">▼ 2.3%</div>
            </div>
            <div className="kpi-card">
              <div className="lbl">Net Profit</div>
              <div className="val-row"><div className="val">$18,750</div></div>
              <div className="delta up">▲ 7.8%</div>
            </div>
          </div>

          <div className="grid-2">
            <div className="card">
              <h4>Sales Overview</h4>
              <canvas id="salesChart" height="110"></canvas>
            </div>
            <div className="card">
              <h4>Top Products</h4>
              <canvas id="productsChart" height="110"></canvas>
            </div>
          </div>

          <div className="card">
            <h4>Recent Orders</h4>
            <table className="simple">
              <thead><tr><th>Order</th><th>Customer</th><th>Channel</th><th>Status</th><th>Amount</th></tr></thead>
              <tbody>
                <tr><td>#10482</td><td>Maria Chen</td><td>Shopify</td><td>Fulfilled</td><td>$128.00</td></tr>
                <tr><td>#10481</td><td>Devon Ortiz</td><td>Square</td><td>Fulfilled</td><td>$64.50</td></tr>
                <tr><td>#10480</td><td>Priya Nair</td><td>Stripe</td><td>Refunded</td><td>$92.00</td></tr>
                <tr><td>#10479</td><td>Liam Brooks</td><td>Shopify</td><td>Fulfilled</td><td>$210.00</td></tr>
                <tr><td>#10478</td><td>Ana Souza</td><td>DoorDash</td><td>Pending</td><td>$38.75</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  )
}
