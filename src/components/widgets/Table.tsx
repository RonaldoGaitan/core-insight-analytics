interface TableProps {
  title: string
  columns: { key: string; label: string }[]
  data: Record<string, any>[]
}

export default function Table({ title, columns, data }: TableProps) {
  return (
    <div className="card">
      <h4>{title}</h4>
      <table className="simple">
        <thead>
          <tr>
            {columns.map(col => (
              <th key={col.key}>{col.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              {columns.map(col => (
                <td key={col.key}>{row[col.key]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
