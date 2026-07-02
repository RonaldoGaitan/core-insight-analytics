'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AskAIPage() {
  const router = useRouter()
  const [messages, setMessages] = useState<Array<{role: 'user' | 'ai', content: any}>>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSend = async () => {
    if (!input.trim()) return

    const userMessage = { role: 'user' as const, content: input }
    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    try {
      // Call the backend API
      const token = localStorage.getItem('access_token')
      const response = await fetch('https://api.coreinsight.solutions/api/query', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ question: input })
      })

      if (!response.ok) {
        throw new Error('Failed to get response')
      }

      const data = await response.json()
      
      // Parse the AI response into structured cards
      const aiResponse = {
        role: 'ai' as const,
        content: {
          summary: `Based on your data, I found ${data.data?.length || 0} relevant results.`,
          breakdown: [
            { label: 'Records Found', value: data.data?.length || 0, icon: '📊' },
            { label: 'Query Time', value: '< 1s', icon: '⚡' }
          ],
          insights: [
            'Data retrieved successfully from your connected sources',
            'Results are filtered to your account only'
          ],
          actions: [
            { label: 'View in Dashboard', action: () => router.push('/dashboard') },
            { label: 'Analyze by Date', action: () => setInput('Show me trends over time') }
          ]
        }
      }

      setMessages(prev => [...prev, aiResponse])
    } catch (error) {
      const errorMessage = {
        role: 'ai' as const,
        content: {
          summary: 'Sorry, I encountered an error processing your question.',
          breakdown: [],
          insights: ['Please try again or check your connection'],
          actions: []
        }
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-gray-900">Ask AI</h1>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => router.push('/dashboard')}
              className="text-gray-600 hover:text-gray-900"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </header>

      {/* Main Chat Area */}
      <main className="max-w-4xl mx-auto px-6 py-8 pb-32">
        {messages.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🤖</div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">Ask anything about your business</h2>
            <p className="text-gray-600 mb-8">I'll analyze your data and provide insights</p>
            
            {/* Sample Prompts */}
            <div className="flex flex-wrap gap-3 justify-center">
              <button
                onClick={() => setInput('Show me revenue by week')}
                className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 text-sm"
              >
                📈 Show me revenue by week
              </button>
              <button
                onClick={() => setInput('What are my top products?')}
                className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 text-sm"
              >
                🏆 What are my top products?
              </button>
              <button
                onClick={() => setInput('Track my refund rate over time')}
                className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 text-sm"
              >
                ↩️ Track my refund rate over time
              </button>
            </div>
          </div>
        )}

        {/* Messages */}
        <div className="space-y-6">
          {messages.map((message, index) => (
            <div key={index} className={message.role === 'user' ? 'flex justify-end' : 'flex justify-start'}>
              {message.role === 'user' ? (
                <div className="bg-gray-900 text-white px-4 py-2 rounded-full max-w-md">
                  {message.content}
                </div>
              ) : (
                <div className="w-full max-w-2xl space-y-4">
                  {/* Summary Card */}
                  <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                    <p className="text-gray-900 font-medium">{message.content.summary}</p>
                  </div>

                  {/* Breakdown Card */}
                  {message.content.breakdown && message.content.breakdown.length > 0 && (
                    <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                      <h3 className="text-sm font-medium text-gray-700 mb-3">Breakdown</h3>
                      <div className="grid grid-cols-2 gap-4">
                        {message.content.breakdown.map((item: any, i: number) => (
                          <div key={i} className="flex items-center gap-2">
                            <span className="text-xl">{item.icon}</span>
                            <div>
                              <p className="text-sm text-gray-600">{item.label}</p>
                              <p className="font-semibold text-gray-900">{item.value}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Key Insights Card */}
                  {message.content.insights && message.content.insights.length > 0 && (
                    <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                      <h3 className="text-sm font-medium text-gray-700 mb-3">Key Insights</h3>
                      <ul className="space-y-2">
                        {message.content.insights.map((insight: string, i: number) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                            <span className="text-green-500 mt-0.5">•</span>
                            {insight}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Suggested Actions */}
                  {message.content.actions && message.content.actions.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {message.content.actions.map((action: any, i: number) => (
                        <button
                          key={i}
                          onClick={action.action}
                          className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full text-sm text-gray-700"
                        >
                          {action.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Fixed Input Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
        <div className="max-w-4xl mx-auto flex gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask a question about your business..."
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
            disabled={isLoading}
          />
          <button
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            className="px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            {isLoading ? '...' : 'Send'}
          </button>
        </div>
      </div>
    </div>
  )
}
