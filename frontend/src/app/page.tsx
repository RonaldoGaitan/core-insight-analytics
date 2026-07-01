'use client'

import { useState } from 'react'
import QueryInput from '@/components/QueryInput'
import ResultDisplay from '@/components/ResultDisplay'

export default function Home() {
  const [query, setQuery] = useState('')
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const handleQuery = async (question: string) => {
    setLoading(true)
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/query`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question }),
      })
      const data = await response.json()
      setResult(data)
    } catch (error) {
      console.error('Query failed:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-black">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-pink-900/20"></div>
        
        <nav className="relative z-10 flex items-center justify-between px-8 py-6">
          <div className="text-2xl font-bold text-white">
            Core Insight
          </div>
          <div className="flex gap-6">
            <button className="text-gray-300 hover:text-white transition font-medium">Features</button>
            <button className="text-gray-300 hover:text-white transition font-medium">Pricing</button>
            <button className="text-gray-300 hover:text-white transition font-medium">Docs</button>
            <a href="/login" className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-lg hover:opacity-90 transition font-medium">
              Get Started
            </a>
          </div>
        </nav>

        <div className="relative z-10 max-w-7xl mx-auto px-8 py-32">
          <div className="text-center mb-16">
            <h1 className="text-6xl md:text-8xl font-bold text-white mb-6 leading-tight">
              AI-Native Embedded Analytics
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                for SaaS
              </span>
            </h1>
            <p className="text-2xl text-gray-300 max-w-3xl mx-auto mb-12">
              Turn analytics into a retention engine. Built for fast-moving product teams.
            </p>
            <div className="flex gap-4 justify-center">
              <button className="bg-white text-black px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition text-lg">
                Get Started
              </button>
              <button className="border border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white/10 transition text-lg">
                Watch Demo
              </button>
            </div>
          </div>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10">
              <div className="text-purple-400 text-4xl mb-4">🎯</div>
              <h3 className="text-2xl font-semibold text-white mb-3">No Tradeoffs</h3>
              <p className="text-gray-300 text-lg">
                Multi-tenant analytics deployed seamlessly with your own infrastructure
              </p>
            </div>
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10">
              <div className="text-purple-400 text-4xl mb-4">⚡</div>
              <h3 className="text-2xl font-semibold text-white mb-3">For Your Customers</h3>
              <p className="text-gray-300 text-lg">
                The analytics layer your SaaS product needs for your customers, product, and business
              </p>
            </div>
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10">
              <div className="text-purple-400 text-4xl mb-4">🚀</div>
              <h3 className="text-2xl font-semibold text-white mb-3">Deliver Faster</h3>
              <p className="text-gray-300 text-lg">
                Every embedded analytics project eventually hits the same wall. We solve it.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-8 py-32">
        <div className="text-center mb-20">
          <h2 className="text-5xl font-bold text-white mb-6">
            The analytics layer your SaaS product needs
          </h2>
          <p className="text-2xl text-gray-300">
            For your customers, product, and business
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-10 border border-white/10">
            <div className="text-purple-400 text-5xl mb-6">🔍</div>
            <h3 className="text-2xl font-semibold text-white mb-4">AI That Sees Your Schema</h3>
            <p className="text-gray-300 text-lg">
              Not guesses at it. Our AI understands your data structure and generates accurate queries.
            </p>
          </div>
          <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-10 border border-white/10">
            <div className="text-purple-400 text-5xl mb-6">👥</div>
            <h3 className="text-2xl font-semibold text-white mb-4">Self-Service Adoption</h3>
            <p className="text-gray-300 text-lg">
              Self-service that actually gets adopted by your users without extensive training.
            </p>
          </div>
          <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-10 border border-white/10">
            <div className="text-purple-400 text-5xl mb-6">🎨</div>
            <h3 className="text-2xl font-semibold text-white mb-4">100% Embedded & Customizable</h3>
            <p className="text-gray-300 text-lg">
              Fully embed analytics into your product with complete customization options.
            </p>
          </div>
          <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-10 border border-white/10">
            <div className="text-purple-400 text-5xl mb-6">🔐</div>
            <h3 className="text-2xl font-semibold text-white mb-4">Multi-Tenant Security</h3>
            <p className="text-gray-300 text-lg">
              Security at every level, not the prayer level. Complete data isolation guaranteed.
            </p>
          </div>
          <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-10 border border-white/10">
            <div className="text-purple-400 text-5xl mb-6">📈</div>
            <h3 className="text-2xl font-semibold text-white mb-4">Visualizations Without Requests</h3>
            <p className="text-gray-300 text-lg">
              Generate beautiful visualizations instantly without feature requests.
            </p>
          </div>
          <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-10 border border-white/10">
            <div className="text-purple-400 text-5xl mb-6">⚙️</div>
            <h3 className="text-2xl font-semibold text-white mb-4">Automate Insights to Action</h3>
            <p className="text-gray-300 text-lg">
              Automate every insight into action with workflow automation.
            </p>
          </div>
        </div>
      </div>

      {/* Pricing CTA Section */}
      <div className="max-w-7xl mx-auto px-8 py-32">
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl p-16 text-center">
          <h2 className="text-5xl font-bold text-white mb-6">
            Put a Real Number on Build vs. Buy
          </h2>
          <p className="text-2xl text-white/90 mb-12">
            Real numbers, no guesswork. Get pricing for your team within one business day.
          </p>
          <div className="flex gap-4 justify-center">
            <button className="bg-white text-purple-900 px-10 py-4 rounded-lg font-semibold hover:bg-gray-100 transition text-lg">
              Get Pricing
            </button>
            <button className="border border-white text-white px-10 py-4 rounded-lg font-semibold hover:bg-white/10 transition text-lg">
              Contact Sales
            </button>
          </div>
        </div>
      </div>

      {/* Query Interface */}
      <div className="max-w-7xl mx-auto px-8 py-32">
        <div className="bg-white rounded-3xl shadow-2xl p-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Try the Product, Right Now</h2>
          <p className="text-xl text-gray-600 mb-12">
            Ask your data a question, build a dashboard, customize the UI, or create a workflow
          </p>
          
          <QueryInput 
            query={query}
            setQuery={setQuery}
            onSubmit={handleQuery}
            loading={loading}
          />
          
          {result && <ResultDisplay result={result} />}
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-white/10 mt-16">
        <div className="max-w-7xl mx-auto px-8 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="text-2xl font-bold text-white mb-4">Core Insight</div>
              <p className="text-gray-400">
                AI-native analytics platform for modern SaaS applications
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Features</li>
                <li>Pricing</li>
                <li>Integrations</li>
                <li>Security</li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Documentation</li>
                <li>API Reference</li>
                <li>Blog</li>
                <li>Support</li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li>About</li>
                <li>Careers</li>
                <li>Contact</li>
                <li>Privacy</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 mt-12 pt-8 text-center text-gray-400">
            © 2024 Core Insight Analytics. All rights reserved.
          </div>
        </div>
      </footer>
    </main>
  )
}
