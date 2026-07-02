import dynamic from 'next/dynamic'

const Plot = dynamic(() => import('react-plotly.js'), { ssr: false })

interface ResultDisplayProps {
  result: {
    sql: string
    data: any[]
    visualization?: any
    explanation?: string
  }
}

export default function ResultDisplay({ result }: ResultDisplayProps) {
  return (
    <div className="space-y-6">
      {result.explanation && (
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h3 className="font-semibold mb-2">Explanation</h3>
          <p className="text-gray-700">{result.explanation}</p>
        </div>
      )}

      {result.visualization && (
        <div className="p-4 bg-white border border-gray-200 rounded-lg">
          <Plot
            data={result.visualization.data}
            layout={result.visualization.layout}
            config={{ responsive: true }}
            style={{ width: '100%' }}
          />
        </div>
      )}

      <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
        <h3 className="font-semibold mb-2">Generated SQL</h3>
        <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-x-auto text-sm">
          {result.sql}
        </pre>
      </div>

      <div className="p-4 bg-white border border-gray-200 rounded-lg">
        <h3 className="font-semibold mb-2">Results</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {result.data.length > 0 && Object.keys(result.data[0]).map((key) => (
                  <th key={key} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {key}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {result.data.map((row, idx) => (
                <tr key={idx}>
                  {Object.values(row).map((value, cellIdx) => (
                    <td key={cellIdx} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {String(value)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
