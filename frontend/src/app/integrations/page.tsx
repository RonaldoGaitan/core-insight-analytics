'use client'

export default function IntegrationsPage() {
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
          <h1 className="text-6xl font-bold text-white mb-6">Integrations & Connectors</h1>
          <p className="text-2xl text-gray-300">Connect to your data sources in minutes</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10 hover:border-purple-500/50 transition">
            <div className="text-4xl mb-4">🗄️</div>
            <h3 className="text-2xl font-semibold text-white mb-3">PostgreSQL</h3>
            <p className="text-gray-300 mb-4">Direct connection to PostgreSQL databases with SSL support</p>
            <span className="text-green-400 text-sm">✓ Native</span>
          </div>

          <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10 hover:border-purple-500/50 transition">
            <div className="text-4xl mb-4">🐬</div>
            <h3 className="text-2xl font-semibold text-white mb-3">MySQL</h3>
            <p className="text-gray-300 mb-4">Connect to MySQL databases with real-time sync</p>
            <span className="text-green-400 text-sm">✓ Native</span>
          </div>

          <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10 hover:border-purple-500/50 transition">
            <div className="text-4xl mb-4">🔷</div>
            <h3 className="text-2xl font-semibold text-white mb-3">Snowflake</h3>
            <p className="text-gray-300 mb-4">Enterprise data warehouse integration</p>
            <span className="text-green-400 text-sm">✓ Native</span>
          </div>

          <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10 hover:border-purple-500/50 transition">
            <div className="text-4xl mb-4">🔵</div>
            <h3 className="text-2xl font-semibold text-white mb-3">BigQuery</h3>
            <p className="text-gray-300 mb-4">Google Cloud Platform data warehouse</p>
            <span className="text-green-400 text-sm">✓ Native</span>
          </div>

          <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10 hover:border-purple-500/50 transition">
            <div className="text-4xl mb-4">🔴</div>
            <h3 className="text-2xl font-semibold text-white mb-3">Redshift</h3>
            <p className="text-gray-300 mb-4">AWS data warehouse integration</p>
            <span className="text-green-400 text-sm">✓ Native</span>
          </div>

          <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10 hover:border-purple-500/50 transition">
            <div className="text-4xl mb-4">🌐</div>
            <h3 className="text-2xl font-semibold text-white mb-3">REST APIs</h3>
            <p className="text-gray-300 mb-4">Connect to any REST API with custom authentication</p>
            <span className="text-green-400 text-sm">✓ Native</span>
          </div>

          <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10 hover:border-purple-500/50 transition">
            <div className="text-4xl mb-4">📊</div>
            <h3 className="text-2xl font-semibold text-white mb-3">Google Sheets</h3>
            <p className="text-gray-300 mb-4">Import data from Google Sheets</p>
            <span className="text-yellow-400 text-sm">Coming Soon</span>
          </div>

          <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10 hover:border-purple-500/50 transition">
            <div className="text-4xl mb-4">📈</div>
            <h3 className="text-2xl font-semibold text-white mb-3">Salesforce</h3>
            <p className="text-gray-300 mb-4">CRM data integration</p>
            <span className="text-yellow-400 text-sm">Coming Soon</span>
          </div>

          <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10 hover:border-purple-500/50 transition">
            <div className="text-4xl mb-4">🔌</div>
            <h3 className="text-2xl font-semibold text-white mb-3">Custom Connectors</h3>
            <p className="text-gray-300 mb-4">Build custom connectors with our SDK</p>
            <span className="text-yellow-400 text-sm">Coming Soon</span>
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-lg rounded-2xl p-12 border border-purple-500/30 mb-20">
          <h2 className="text-3xl font-bold text-white mb-4 text-center">Need a specific integration?</h2>
          <p className="text-xl text-gray-300 mb-8 text-center">
            We're constantly adding new integrations. Let us know what you need.
          </p>
          <div className="text-center">
            <button className="px-8 py-4 bg-white text-black rounded-lg font-semibold hover:bg-gray-100 transition">
              Request Integration
            </button>
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to connect your data?</h2>
          <p className="text-xl text-gray-300 mb-8">Start connecting your data sources today</p>
          <a href="/login" className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold hover:opacity-90 transition inline-block">
            Start Free Trial
          </a>
        </div>
      </div>
    </main>
  )
}
