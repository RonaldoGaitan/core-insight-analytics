'use client'

export default function SignupPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-8 bg-black">
      <div className="bg-white rounded-3xl p-12 max-w-md w-full">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Create account</h2>
        <p className="text-gray-600 mb-8">Start your free trial today</p>
        
        <a
          href="/api/auth/login?screen_hint=signup"
          className="block w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold hover:opacity-90 transition text-center"
        >
          Sign Up with Auth0
        </a>
        
        <div className="text-center mt-6 text-gray-600">
          Already have an account? <a href="/login" className="text-purple-600 hover:underline">Sign in</a>
        </div>
      </div>
    </div>
  )
}
