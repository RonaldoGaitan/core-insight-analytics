export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-gray-200 px-6 py-4">
        <div className="max-w-4xl mx-auto">
          <a href="/" className="text-gray-600 hover:text-gray-900">← Back to Home</a>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-semibold text-gray-900 mb-8">Terms of Service</h1>
        
        <div className="prose prose-gray max-w-none">
          <p className="text-gray-600 mb-8">Last updated: January 1, 2026</p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Acceptance of Terms</h2>
            <p className="text-gray-700">By accessing or using CoreInsight Analytics, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our service.</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Description of Service</h2>
            <p className="text-gray-700 mb-4">CoreInsight Analytics provides an AI-powered analytics platform that:</p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Connects to your business data sources</li>
              <li>Provides AI-powered insights and analytics</li>
              <li>Generates visualizations and reports</li>
              <li>Enables conversational data exploration</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. User Responsibilities</h2>
            <p className="text-gray-700 mb-4">As a user, you agree to:</p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Provide accurate and complete information</li>
              <li>Maintain the security of your account credentials</li>
              <li>Comply with all applicable laws and regulations</li>
              <li>Not use the service for illegal or unauthorized purposes</li>
              <li>Not attempt to circumvent security measures</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Data Ownership</h2>
            <p className="text-gray-700">You retain ownership of all data you provide to CoreInsight Analytics. We do not claim ownership of your business data. You may request deletion of your data at any time.</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Payment Terms</h2>
            <p className="text-gray-700 mb-4">Payment for our services is handled as follows:</p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Fees are charged on a monthly or annual basis</li>
              <li>Payment is due at the beginning of each billing cycle</li>
              <li>We reserve the right to change pricing with 30 days notice</li>
              <li>Refunds are handled on a case-by-case basis</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Service Availability</h2>
            <p className="text-gray-700">We strive to maintain 99.9% uptime. However, we do not guarantee uninterrupted service. We are not liable for any downtime or service interruptions.</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Limitation of Liability</h2>
            <p className="text-gray-700">To the maximum extent permitted by law, CoreInsight Analytics shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of our service.</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Termination</h2>
            <p className="text-gray-700 mb-4">Either party may terminate this agreement at any time:</p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Upon termination, your access to the service will cease</li>
              <li>You may export your data before termination</li>
              <li>We will delete your data within 30 days of termination</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Changes to Terms</h2>
            <p className="text-gray-700">We reserve the right to modify these terms at any time. We will notify users of significant changes via email. Continued use of the service constitutes acceptance of modified terms.</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Contact Information</h2>
            <p className="text-gray-700">For questions about these Terms of Service, please contact:</p>
            <p className="text-gray-700 mt-2">Email: legal@coreinsight.solutions</p>
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
