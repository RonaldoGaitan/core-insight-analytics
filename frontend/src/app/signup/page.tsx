'use client'

export default function SignupPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-8 bg-black">
      <div className="bg-white rounded-3xl p-12 max-w-md w-full">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Create account</h2>
        <p className="text-gray-600 mb-8">Start your free trial today</p>
        
        <form className="space-y-6">
          <div>
            <label className="block font-medium text-gray-700 mb-2">Full Name</label>
            <input
              type="text"
              placeholder="John Doe"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
          </div>
          <div>
            <label className="block font-medium text-gray-700 mb-2">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
          </div>
          <div>
            <label className="block font-medium text-gray-700 mb-2">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold hover:opacity-90 transition"
          >
            Create Account
          </button>
        </form>
        
        <div className="text-center mt-6 text-gray-600">
          Already have an account? <a href="/login" className="text-purple-600 hover:underline">Sign in</a>
        </div>
      </div>
    </div>
  )
}
