'use client'

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-8 bg-black">
      <div className="bg-white rounded-3xl p-12 max-w-md w-full">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome back</h2>
        <p className="text-gray-600 mb-8">Sign in to access your account</p>
        
        <a
          href="/api/auth/login"
          className="block w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold hover:opacity-90 transition text-center"
        >
          Sign In with Auth0
        </a>
        
        <div className="text-center mt-6 text-gray-600">
          Don't have an account? <a href="/signup" className="text-purple-600 hover:underline">Sign up</a>
        </div>
      </div>
    </div>
  )
}
