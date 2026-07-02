interface KPICardProps {
  title: string
  value: string | number
  trend?: {
    value: string
    positive: boolean
  }
  icon?: string
}

export default function KPICard({ title, value, trend, icon }: KPICardProps) {
  return (
    <div className="card" style={{ padding: '18px' }}>
      <div className="meta">{title}</div>
      <div style={{ 
        fontFamily: 'var(--font-display)', 
        fontSize: '26px', 
        fontWeight: 500,
        marginTop: '8px',
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
      }}>
        {icon && <span>{icon}</span>}
        {value}
      </div>
      {trend && (
        <div className={`trend-badge ${trend.positive ? 'positive' : 'negative'}`} style={{ marginTop: '8px' }}>
          {trend.positive ? '↑' : '↓'} {trend.value}
        </div>
      )}
    </div>
  )
}
