'use client'

import { useEffect, useRef } from 'react'

interface PieChartProps {
  title: string
  data: { label: string; value: number }[]
  colors?: string[]
}

export default function PieChart({ title, data, colors = ['#16181d', '#52555e', '#e3e4e8', '#f0f1f4'] }: PieChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (typeof window !== 'undefined' && (window as any).Chart && canvasRef.current) {
      const ctx = canvasRef.current
      new (window as any).Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: data.map(d => d.label),
          datasets: [{
            data: data.map(d => d.value),
            backgroundColor: colors,
            borderWidth: 0
          }]
        },
        options: {
          responsive: true,
          plugins: { 
            legend: { 
              display: true,
              position: 'right'
            } 
          },
          cutout: '60%'
        }
      })
    }
  }, [data, colors])

  return (
    <div className="card">
      <h4>{title}</h4>
      <canvas ref={canvasRef} height={110} />
    </div>
  )
}
