'use client'

import { useState } from 'react'

export default function DashboardPage() {
  const [query, setQuery] = useState('')

  return (
    <main className="min-h-screen bg-black">
      <nav className="flex items-center justify-between px-8 py-6">
        <div className="text-2xl font-bold text-white">Core Insight</div>
        <div className="flex gap-6">
          <button className="text-gray-300 hover:text-white transition font-medium">Dashboard</button>
          <button className="text-gray-300 hover:text-white transition font-medium">Data Sources</button>
          <button className="text-gray-300 hover:text-white transition font-medium">Settings</button>
          <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-lg hover:opacity-90 transition font-medium">
            Logout
          </button>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-8 py-32">
        <div className="bg-white rounded-3xl shadow-2xl p-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Ask Your Data</h2>
          <p className="text-xl text-gray-600 mb-12">
            Type a question about your data and let AI do the rest
          </p>
          
          <form className="mb-8">
            <div className="flex gap-4">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="What is the total revenue?"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold hover:opacity-90 transition"
              >
                Ask
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  )
}
