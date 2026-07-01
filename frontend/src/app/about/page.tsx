'use client'

export default function AboutPage() {
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
          <h1 className="text-6xl font-bold text-white mb-6">About Core Insight</h1>
          <p className="text-2xl text-gray-300 max-w-3xl mx-auto">
            We're on a mission to make analytics accessible for every SaaS product
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-16 mb-20">
          <div>
            <h2 className="text-4xl font-bold text-white mb-6">Our Story</h2>
            <p className="text-lg text-gray-300 mb-4">
              Founded in 2024, Core Insight was born from a simple observation: every SaaS company needs analytics, but building it is hard and buying it is expensive.
            </p>
            <p className="text-lg text-gray-300 mb-4">
              We spent years watching companies struggle with the same problem - their customers wanted insights, but the engineering effort to deliver them was overwhelming.
            </p>
            <p className="text-lg text-gray-300">
              So we built Core Insight: an AI-native analytics platform that understands your data and delivers insights without the engineering overhead.
            </p>
          </div>

          <div>
            <h2 className="text-4xl font-bold text-white mb-6">Our Mission</h2>
            <p className="text-lg text-gray-300 mb-4">
              To democratize analytics for SaaS companies of all sizes, making it as easy to embed insights as it is to embed a chart.
            </p>
            <p className="text-lg text-gray-300 mb-4">
              We believe every SaaS product should have world-class analytics without requiring a world-class engineering team.
            </p>
            <p className="text-lg text-gray-300">
              Our AI-native approach means you get insights faster, with less code, and happier customers.
            </p>
          </div>
        </div>

        <div className="mb-20">
          <h2 className="text-4xl font-bold text-white mb-12 text-center">Our Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-2xl font-semibold text-white mb-3">Customer First</h3>
              <p className="text-gray-300">
                Every decision we make starts with what's best for our customers and their users.
              </p>
            </div>
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-2xl font-semibold text-white mb-3">Speed Matters</h3>
              <p className="text-gray-300">
                We move fast because our customers need insights now, not months from now.
              </p>
            </div>
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10">
              <div className="text-4xl mb-4">🔐</div>
              <h3 className="text-2xl font-semibold text-white mb-3">Security First</h3>
              <p className="text-gray-300">
                Multi-tenant security isn't an afterthought - it's built into everything we do.
              </p>
            </div>
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Join Our Team</h2>
          <p className="text-xl text-gray-300 mb-8">We're always looking for talented people to help us build the future of analytics</p>
          <button className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold hover:opacity-90 transition">
            View Open Positions
          </button>
        </div>
      </div>
    </main>
  )
}
