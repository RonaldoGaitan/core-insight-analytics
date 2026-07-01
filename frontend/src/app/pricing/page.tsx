'use client'

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-black">
      <nav className="flex items-center justify-between px-8 py-6">
        <div className="text-2xl font-bold text-white">Core Insight</div>
        <div className="flex gap-6">
          <a href="/" className="text-gray-300 hover:text-white transition font-medium">Features</a>
          <a href="/pricing" className="text-gray-300 hover:text-white transition font-medium">Pricing</a>
          <a href="/about" className="text-gray-300 hover:text-white transition font-medium">About</a>
          <a href="/login" className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-lg hover:opacity-90 transition font-medium">
            Get Started
          </a>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-8 py-32">
        <div className="text-center mb-20">
          <h1 className="text-6xl font-bold text-white mb-6">Simple, Transparent Pricing</h1>
          <p className="text-2xl text-gray-300">No hidden fees. No surprises. Just powerful analytics.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-20">
          <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10">
            <h3 className="text-2xl font-semibold text-white mb-2">Starter</h3>
            <p className="text-gray-400 mb-6">For small teams getting started</p>
            <div className="text-4xl font-bold text-white mb-6">$99<span className="text-lg text-gray-400">/month</span></div>
            <ul className="space-y-3 mb-8 text-gray-300">
              <li>✓ Up to 5 users</li>
              <li>✓ 10 data sources</li>
              <li>✓ Basic visualizations</li>
              <li>✓ Email support</li>
            </ul>
            <button className="w-full py-3 border border-white text-white rounded-lg font-semibold hover:bg-white/10 transition">
              Get Started
            </button>
          </div>

          <div className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 backdrop-blur-lg rounded-2xl p-8 border border-purple-500/50 relative">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
              Popular
            </div>
            <h3 className="text-2xl font-semibold text-white mb-2">Professional</h3>
            <p className="text-gray-400 mb-6">For growing businesses</p>
            <div className="text-4xl font-bold text-white mb-6">$299<span className="text-lg text-gray-400">/month</span></div>
            <ul className="space-y-3 mb-8 text-gray-300">
              <li>✓ Up to 25 users</li>
              <li>✓ Unlimited data sources</li>
              <li>✓ Advanced visualizations</li>
              <li>✓ Priority support</li>
              <li>✓ API access</li>
            </ul>
            <button className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold hover:opacity-90 transition">
              Get Started
            </button>
          </div>

          <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10">
            <h3 className="text-2xl font-semibold text-white mb-2">Enterprise</h3>
            <p className="text-gray-400 mb-6">For large organizations</p>
            <div className="text-4xl font-bold text-white mb-6">Custom</div>
            <ul className="space-y-3 mb-8 text-gray-300">
              <li>✓ Unlimited users</li>
              <li>✓ Custom integrations</li>
              <li>✓ Dedicated support</li>
              <li>✓ SLA guarantee</li>
              <li>✓ On-premise option</li>
            </ul>
            <button className="w-full py-3 border border-white text-white rounded-lg font-semibold hover:bg-white/10 transition">
              Contact Sales
            </button>
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Need a custom solution?</h2>
          <p className="text-xl text-gray-300 mb-8">Contact our sales team for enterprise pricing</p>
          <button className="px-8 py-4 bg-white text-black rounded-lg font-semibold hover:bg-gray-100 transition">
            Contact Sales
          </button>
        </div>
      </div>
    </main>
  )
}
