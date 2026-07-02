'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { SAMPLE_PROMPTS } from '@/lib/dataSourceSchema'

const DATA_SOURCES = [
  { id: 'shopify', name: 'Shopify', icon: '🛒', color: 'bg-green-500' },
  { id: 'stripe', name: 'Stripe', icon: '💳', color: 'bg-purple-500' },
  { id: 'square', name: 'Square', icon: '📱', color: 'bg-blue-500' },
  { id: 'quickbooks', name: 'QuickBooks', icon: '📊', color: 'bg-yellow-500' },
  { id: 'lightspeed', name: 'Lightspeed', icon: '💡', color: 'bg-orange-500' },
  { id: 'clover', name: 'Clover', icon: '🍀', color: 'bg-green-600' },
  { id: 'paypal', name: 'PayPal', icon: '🅿️', color: 'bg-blue-600' },
  { id: 'doordash', name: 'DoorDash', icon: '🚪', color: 'bg-red-500' },
  { id: 'wix', name: 'Wix', icon: '🌐', color: 'bg-indigo-500' },
]

export default function IntegrationsWizardPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [selectedSource, setSelectedSource] = useState<string | null>(null)
  const [credentials, setCredentials] = useState({ storeUrl: '', apiKey: '' })
  const [isConnecting, setIsConnecting] = useState(false)
  const [syncProgress, setSyncProgress] = useState(0)
  const [syncStatus, setSyncStatus] = useState('')

  const handleConnect = async () => {
    setIsConnecting(true)
    setStep(3)
    
    // Simulate sync progress
    const steps = [
      { progress: 20, status: 'Connecting...' },
      { progress: 40, status: 'Authenticating...' },
      { progress: 60, status: 'Importing data...' },
      { progress: 80, status: 'Processing records...' },
      { progress: 100, status: 'Sync complete!' }
    ]

    for (const step of steps) {
      await new Promise(resolve => setTimeout(resolve, 800))
      setSyncProgress(step.progress)
      setSyncStatus(step.status)
    }

    setIsConnecting(false)
  }

  const StepIndicator = () => (
    <div className="flex items-center justify-center mb-8">
      {[1, 2, 3].map((stepNum) => (
        <div key={stepNum} className="flex items-center">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
            stepNum <= step 
              ? 'bg-gray-900 text-white' 
              : 'bg-gray-200 text-gray-600'
          }`}>
            {stepNum < step ? '✓' : stepNum}
          </div>
          {stepNum < 3 && (
            <div className={`w-16 h-1 mx-2 ${
              stepNum < step ? 'bg-gray-900' : 'bg-gray-200'
            }`} />
          )}
        </div>
      ))}
    </div>
  )

  const Step1 = () => (
    <div>
      <h2 className="text-2xl font-semibold text-gray-900 mb-2">Select Your Data Source</h2>
      <p className="text-gray-600 mb-8">Choose the platform you want to connect</p>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {DATA_SOURCES.map((source) => (
          <button
            key={source.id}
            onClick={() => setSelectedSource(source.id)}
            className={`p-6 border-2 rounded-lg transition-all ${
              selectedSource === source.id
                ? 'border-gray-900 bg-gray-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="text-4xl mb-3">{source.icon}</div>
            <div className="font-medium text-gray-900">{source.name}</div>
            {selectedSource === source.id && (
              <div className="absolute top-2 right-2 w-6 h-6 bg-gray-900 rounded-full flex items-center justify-center">
                <span className="text-white text-sm">✓</span>
              </div>
            )}
          </button>
        ))}
      </div>

      <div className="mt-8 flex justify-end">
        <button
          onClick={() => setStep(2)}
          disabled={!selectedSource}
          className="px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          Continue
        </button>
      </div>
    </div>
  )

  const Step2 = () => {
    const source = DATA_SOURCES.find(s => s.id === selectedSource)
    
    return (
      <div>
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">{source?.icon}</div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Connect {source?.name}</h2>
          <p className="text-gray-600">Enter your {source?.name} credentials</p>
        </div>

        <div className="max-w-md mx-auto space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Store URL
            </label>
            <input
              type="text"
              value={credentials.storeUrl}
              onChange={(e) => setCredentials({...credentials, storeUrl: e.target.value})}
              placeholder="https://your-store.myshopify.com"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              API Key / Access Token
            </label>
            <input
              type="password"
              value={credentials.apiKey}
              onChange={(e) => setCredentials({...credentials, apiKey: e.target.value})}
              placeholder="Enter your API key"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
            />
          </div>

          <div className="text-sm text-gray-500 flex items-center gap-2">
            <span>🔒</span>
            Your information is encrypted and protected using bank-level security
          </div>
        </div>

        <div className="mt-8 flex justify-between">
          <button
            onClick={() => setStep(1)}
            className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Back
          </button>
          <button
            onClick={handleConnect}
            disabled={!credentials.storeUrl || !credentials.apiKey}
            className="px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            Connect
          </button>
        </div>
      </div>
    )
  }

  const Step3 = () => {
    const source = DATA_SOURCES.find(s => s.id === selectedSource)
    const prompts = selectedSource && SAMPLE_PROMPTS[selectedSource as keyof typeof SAMPLE_PROMPTS] 
      ? SAMPLE_PROMPTS[selectedSource as keyof typeof SAMPLE_PROMPTS] 
      : []

    return (
      <div className="text-center">
        <div className="mb-8">
          <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
            {syncProgress === 100 ? (
              <span className="text-4xl">✅</span>
            ) : (
              <div className="w-12 h-12 border-4 border-gray-900 border-t-transparent rounded-full animate-spin" />
            )}
          </div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">
            {syncProgress === 100 ? 'Connection Successful!' : 'Syncing Your Data'}
          </h2>
          <p className="text-gray-600">{syncStatus}</p>
        </div>

        {/* Progress Bar */}
        <div className="max-w-md mx-auto mb-8">
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gray-900 transition-all duration-500"
              style={{ width: `${syncProgress}%` }}
            />
          </div>
          <p className="text-sm text-gray-600 mt-2">{syncProgress}%</p>
        </div>

        {/* Sync Checklist */}
        <div className="max-w-md mx-auto space-y-3 mb-8">
          {['Connecting', 'Authenticating', 'Importing', 'Processing'].map((item, index) => (
            <div key={item} className="flex items-center gap-3 text-left">
              <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                (index + 1) * 25 <= syncProgress ? 'bg-green-500' : 'bg-gray-200'
              }`}>
                {(index + 1) * 25 <= syncProgress && <span className="text-white text-xs">✓</span>}
              </div>
              <span className={`text-sm ${ (index + 1) * 25 <= syncProgress ? 'text-gray-900' : 'text-gray-400'}`}>
                {item}
              </span>
            </div>
          ))}
        </div>

        {syncProgress === 100 && (
          <div className="space-y-6">
            <div>
              <p className="text-gray-700 mb-4">Your {source?.name} data is connected! Get started with these suggestions:</p>
              <div className="flex flex-wrap gap-3 justify-center">
                {prompts.map((prompt, index) => (
                  <button
                    key={index}
                    onClick={() => router.push('/ask-ai')}
                    className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 text-sm"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>
            <button
              onClick={() => router.push('/dashboard')}
              className="px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800"
            >
              Go to Dashboard
            </button>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <button
            onClick={() => router.push('/integrations')}
            className="text-gray-600 hover:text-gray-900"
          >
            ← Back
          </button>
          <h1 className="text-xl font-semibold text-gray-900">Connect Data Source</h1>
          <div className="w-16" />
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-12">
        <StepIndicator />
        
        <div className="bg-white rounded-xl p-8 shadow-sm">
          {step === 1 && <Step1 />}
          {step === 2 && <Step2 />}
          {step === 3 && <Step3 />}
        </div>
      </main>
    </div>
  )
}
