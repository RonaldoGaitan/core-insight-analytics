'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function IntegrationsPage() {
  const router = useRouter()

  useEffect(() => {
    // Simple authentication check - redirect to login if not authenticated
    const isAuthenticated = localStorage.getItem('isAuthenticated')
    if (!isAuthenticated) {
      router.push('/login')
    }
  }, [router])

  // Don't render if not authenticated
  if (typeof window !== 'undefined' && !localStorage.getItem('isAuthenticated')) {
    return null
  }

  return (
    <div className="wizard-wrap">
      <div className="wizard-card">
        <div style={{display:'flex',alignItems:'center',gap:'10px',marginBottom:'18px'}}>
          <button className="back-btn">←</button>
          <h2 style={{margin:0,fontSize:'20px'}}>Integrations</h2>
        </div>
        <p className="sub" style={{textAlign:'left',marginBottom:'18px'}}>Connect the platforms you use so CoreInsight can keep your data in sync.</p>
        
        <div className="empty-state">No connections yet. Add one to start syncing data.</div>
        
        <button className="btn btn-dark" style={{width:'100%',marginTop:'6px'}}>+ Add connection</button>
      </div>
    </div>
  )
}
