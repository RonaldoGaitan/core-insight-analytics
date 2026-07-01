'use client'

export default function FeaturesPage() {
  return (
    <main className="min-h-screen bg-black">
      <nav className="flex items-center justify-between px-8 py-6">
        <div className="text-2xl font-bold text-white">Core Insight</div>
        <div className="flex gap-6">
          <a href="/features" className="text-gray-300 hover:text-white transition font-medium">Features</a>
          <a href="/pricing" className="text-gray-300 hover:text-white transition font-medium">Pricing</a>
          <a href="/about" className="text-gray-300 hover:text-white transition font-medium">About</a>
          <a href="/login" className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-lg hover:opacity-90 transition font-medium">
            Get Started
          </a>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-8 py-32">
        <div className="text-center mb-20">
          <h1 className="text-6xl font-bold text-white mb-6">Powerful Features</h1>
          <p className="text-2xl text-gray-300">Everything you need to deliver world-class analytics</p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 mb-20">
          <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-10 border border-white/10">
            <div className="text-purple-400 text-5xl mb-6">🔍</div>
            <h3 className="text-3xl font-semibold text-white mb-4">AI That Sees Your Schema</h3>
            <p className="text-gray-300 text-lg">
              Not guesses at it. Our AI understands your data structure and generates accurate queries. No manual mapping required.
            </p>
          </div>

          <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-10 border border-white/10">
            <div className="text-purple-400 text-5xl mb-6">👥</div>
            <h3 className="text-3xl font-semibold text-white mb-4">Self-Service Adoption</h3>
            <p className="text-gray-300 text-lg">
              Self-service that actually gets adopted by your users without extensive training. Natural language queries anyone can use.
            </p>
          </div>

          <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-10 border border-white/10">
            <div className="text-purple-400 text-5xl mb-6">🎨</div>
            <h3 className="text-3xl font-semibold text-white mb-4">100% Embedded & Customizable</h3>
            <p className="text-gray-300 text-lg">
              Fully embed analytics into your product with complete customization options. Match your brand, match your UX.
            </p>
          </div>

          <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-10 border border-white/10">
            <div className="text-purple-400 text-5xl mb-6">🔐</div>
            <h3 className="text-3xl font-semibold text-white mb-4">Multi-Tenant Security</h3>
            <p className="text-gray-300 text-lg">
              Security at every level, not the prayer level. Complete data isolation guaranteed with row-level security.
            </p>
          </div>

          <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-10 border border-white/10">
            <div className="text-purple-400 text-5xl mb-6">📈</div>
            <h3 className="text-3xl font-semibold text-white mb-4">Visualizations Without Requests</h3>
            <p className="text-gray-300 text-lg">
              Generate beautiful visualizations instantly without feature requests. AI picks the right chart type automatically.
            </p>
          </div>

          <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-10 border border-white/10">
            <div className="text-purple-400 text-5xl mb-6">⚙️</div>
            <h3 className="text-3xl font-semibold text-white mb-4">Automate Insights to Action</h3>
            <p className="text-gray-300 text-lg">
              Automate every insight into action with workflow automation. Alerts, reports, and integrations out of the box.
            </p>
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to get started?</h2>
          <p className="text-xl text-gray-300 mb-8">See Core Insight in action with a free trial</p>
          <a href="/login" className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold hover:opacity-90 transition inline-block">
            Start Free Trial
          </a>
        </div>
      </div>
    </main>
  )
}
