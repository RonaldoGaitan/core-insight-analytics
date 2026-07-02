'use client'

import { useEffect, useRef } from 'react'

interface LineChartProps {
  title: string
  data: { label: string; value: number }[]
  color?: string
}

export default function LineChart({ title, data, color = '#16181d' }: LineChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (typeof window !== 'undefined' && (window as any).Chart && canvasRef.current) {
      const ctx = canvasRef.current
      new (window as any).Chart(ctx, {
        type: 'line',
        data: {
          labels: data.map(d => d.label),
          datasets: [{
            data: data.map(d => d.value),
            borderColor: color,
            backgroundColor: color + '0.1',
            fill: true,
            tension: 0.4,
            pointRadius: 0,
            borderWidth: 2
          }]
        },
        options: {
          responsive: true,
          plugins: { legend: { display: false } },
          scales: {
            x: { grid: { display: false } },
            y: { grid: { color: '#f1f1ef' }, display: true }
          }
        }
      })
    }
  }, [data, color])

  return (
    <div className="card">
      <h4>{title}</h4>
      <canvas ref={canvasRef} height={110} />
    </div>
  )
}
