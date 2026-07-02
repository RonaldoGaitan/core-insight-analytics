export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-gray-200 px-6 py-4">
        <div className="max-w-4xl mx-auto">
          <a href="/" className="text-gray-600 hover:text-gray-900">← Back to Home</a>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-semibold text-gray-900 mb-8">Privacy Policy</h1>
        
        <div className="prose prose-gray max-w-none">
          <p className="text-gray-600 mb-8">Last updated: January 1, 2026</p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Information We Collect</h2>
            <p className="text-gray-700 mb-4">CoreInsight Analytics collects information you provide directly to us, such as when you create an account, connect data sources, or use our services. This includes:</p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Account information (name, email address)</li>
              <li>Data source credentials (API keys, access tokens)</li>
              <li>Business data from connected platforms (sales, orders, customer information)</li>
              <li>Usage data and analytics</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. How We Use Your Information</h2>
            <p className="text-gray-700 mb-4">We use the information we collect to:</p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Provide, maintain, and improve our services</li>
              <li>Process and analyze your business data</li>
              <li>Communicate with you about your account</li>
              <li>Ensure security and prevent fraud</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Data Security</h2>
            <p className="text-gray-700 mb-4">We implement industry-standard security measures to protect your data:</p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Encryption at rest using AES-256</li>
              <li>Encryption in transit using TLS 1.3</li>
              <li>Row-level security for multi-tenant data isolation</li>
              <li>Regular security audits and penetration testing</li>
              <li>Secure credential storage with Fernet encryption</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Data Sharing</h2>
            <p className="text-gray-700 mb-4">We do not sell your data. We may share your data only in the following circumstances:</p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>With your explicit consent</li>
              <li>With service providers who perform services on our behalf</li>
              <li>To comply with legal requirements</li>
              <li>To protect our rights and property</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Your Rights</h2>
            <p className="text-gray-700 mb-4">You have the right to:</p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Access your personal data</li>
              <li>Correct inaccurate data</li>
              <li>Delete your account and associated data</li>
              <li>Export your data</li>
              <li>Opt out of marketing communications</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Contact Us</h2>
            <p className="text-gray-700">If you have questions about this Privacy Policy, please contact us at:</p>
            <p className="text-gray-700 mt-2">Email: privacy@coreinsight.solutions</p>
            <p className="text-gray-700">Address: Houston, TX</p>
          </section>
        </div>
      </main>

      <footer className="border-t border-gray-200 px-6 py-8 mt-16">
        <div className="max-w-4xl mx-auto text-center text-gray-600 text-sm">
          <p>© 2026 CoreInsight Analytics. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
