"use client"

interface RadarChartProps {
  data: Array<{
    skill: string
    value: number
    maxValue?: number
  }>
  size?: number
  className?: string
}

export function RadarChart({ data, size = 200, className = "" }: RadarChartProps) {
  const center = size / 2
  const radius = size / 2 - 40
  const angleStep = (2 * Math.PI) / data.length

  const getPoint = (index: number, value: number, maxValue = 100) => {
    const angle = angleStep * index - Math.PI / 2
    const distance = (value / maxValue) * radius
    const x = center + Math.cos(angle) * distance
    const y = center + Math.sin(angle) * distance
    return { x, y }
  }

  const getGridPoint = (index: number, level: number) => {
    const angle = angleStep * index - Math.PI / 2
    const distance = (level / 100) * radius
    const x = center + Math.cos(angle) * distance
    const y = center + Math.sin(angle) * distance
    return { x, y }
  }

  const getLabelPoint = (index: number) => {
    const angle = angleStep * index - Math.PI / 2
    const distance = radius + 25
    const x = center + Math.cos(angle) * distance
    const y = center + Math.sin(angle) * distance
    return { x, y }
  }

  // Create grid lines
  const gridLevels = [20, 40, 60, 80, 100]
  const gridPaths = gridLevels.map((level) => {
    const points = data.map((_, index) => getGridPoint(index, level))
    const pathData = points.map((point, index) => `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`).join(" ") + " Z"
    return pathData
  })

  // Create data path
  const dataPoints = data.map((item, index) => getPoint(index, item.value, item.maxValue))
  const dataPath = dataPoints.map((point, index) => `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`).join(" ") + " Z"

  return (
    <div className={`flex justify-center ${className}`}>
      <svg width={size} height={size} className="overflow-visible">
        {/* Grid */}
        {gridPaths.map((path, index) => (
          <path
            key={index}
            d={path}
            fill="none"
            stroke="rgba(20, 184, 166, 0.1)"
            strokeWidth="1"
            className="transition-all duration-300"
          />
        ))}

        {/* Axis lines */}
        {data.map((_, index) => {
          const endPoint = getGridPoint(index, 100)
          return (
            <line
              key={index}
              x1={center}
              y1={center}
              x2={endPoint.x}
              y2={endPoint.y}
              stroke="rgba(20, 184, 166, 0.2)"
              strokeWidth="1"
            />
          )
        })}

        {/* Data area */}
        <path d={dataPath} fill="rgba(20, 184, 166, 0.2)" stroke="rgb(20, 184, 166)" strokeWidth="2" />

        {/* Data points */}
        {dataPoints.map((point, index) => (
          <circle
            key={index}
            cx={point.x}
            cy={point.y}
            r="4"
            fill="rgb(20, 184, 166)"
            stroke="white"
            strokeWidth="2"
            className="transition-all duration-300 hover:r-6"
          />
        ))}

        {/* Labels */}
        {data.map((item, index) => {
          const labelPoint = getLabelPoint(index)
          return (
            <g key={index}>
              <text
                x={labelPoint.x}
                y={labelPoint.y}
                textAnchor="middle"
                dominantBaseline="middle"
                className="text-xs font-medium fill-gray-700"
              >
                {item.skill}
              </text>
              <text
                x={labelPoint.x}
                y={labelPoint.y + 12}
                textAnchor="middle"
                dominantBaseline="middle"
                className="text-xs font-bold fill-teal-600"
              >
                {item.value}%
              </text>
            </g>
          )
        })}

        {/* Center point */}
        <circle cx={center} cy={center} r="2" fill="rgb(20, 184, 166)" />
      </svg>
    </div>
  )
}
