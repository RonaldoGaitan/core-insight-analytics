'use client'

import { useEffect, useRef } from 'react'

interface BarChartProps {
  title: string
  data: { label: string; value: number }[]
  color?: string
}

export default function BarChart({ title, data, color = '#16181d' }: BarChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (typeof window !== 'undefined' && (window as any).Chart && canvasRef.current) {
      const ctx = canvasRef.current
      new (window as any).Chart(ctx, {
        type: 'bar',
        data: {
          labels: data.map(d => d.label),
          datasets: [{
            data: data.map(d => d.value),
            backgroundColor: color,
            borderRadius: 4
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
