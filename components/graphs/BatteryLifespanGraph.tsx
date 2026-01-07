'use client'

export default function BatteryLifespanGraph() {
  return (
    <div className="flex justify-center my-8">
      <svg width="600" height="350" xmlns="http://www.w3.org/2000/svg" className="max-w-full h-auto">
        <text x="300" y="30" fontFamily="Arial, sans-serif" fontSize="16" fontWeight="bold" fill="#2D1B1B" textAnchor="middle">Battery Lifespan Comparison</text>
        
        {/* Capacity retention over cycles */}
        <line x1="50" y1="300" x2="550" y2="300" stroke="#2D1B1B" strokeWidth="2" markerEnd="url(#arrow-x)"/>
        <line x1="50" y1="300" x2="50" y2="80" stroke="#2D1B1B" strokeWidth="2" markerEnd="url(#arrow-y)"/>
        
        <defs>
          <marker id="arrow-x" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
            <polygon points="0 0, 10 3, 0 6" fill="#2D1B1B"/>
          </marker>
          <marker id="arrow-y" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
            <polygon points="0 0, 10 3, 0 6" fill="#2D1B1B"/>
          </marker>
        </defs>
        
        {/* Grid lines */}
        <line x1="50" y1="250" x2="550" y2="250" stroke="#E0E0E0" strokeWidth="1" strokeDasharray="3,3"/>
        <line x1="50" y1="200" x2="550" y2="200" stroke="#E0E0E0" strokeWidth="1" strokeDasharray="3,3"/>
        <line x1="50" y1="150" x2="550" y2="150" stroke="#E0E0E0" strokeWidth="1" strokeDasharray="3,3"/>
        <line x1="50" y1="100" x2="550" y2="100" stroke="#E0E0E0" strokeWidth="1" strokeDasharray="3,3"/>
        
        {/* Traditional battery degradation */}
        <path d="M 50 300 L 150 280 L 250 240 L 350 200 L 450 160 L 500 140" 
              stroke="#E85D75" strokeWidth="3" fill="none"/>
        <text x="275" y="180" fontFamily="Arial, sans-serif" fontSize="11" fill="#E85D75" fontWeight="bold">Traditional Battery</text>
        <text x="275" y="195" fontFamily="Arial, sans-serif" fontSize="9" fill="#E85D75">(SEI layer buildup)</text>
        
        {/* Solid state battery (more stable) */}
        <path d="M 50 300 L 200 290 L 350 275 L 500 260 L 550 250" 
              stroke="#4ECDC4" strokeWidth="3" fill="none"/>
        <text x="300" y="245" fontFamily="Arial, sans-serif" fontSize="11" fill="#4ECDC4" fontWeight="bold">Solid-State Battery</text>
        <text x="300" y="260" fontFamily="Arial, sans-serif" fontSize="9" fill="#4ECDC4">(Stable chemistry)</text>
        
        {/* Labels */}
        <text x="20" y="300" fontFamily="Arial, sans-serif" fontSize="11" fill="#2D1B1B" textAnchor="middle">0%</text>
        <text x="20" y="100" fontFamily="Arial, sans-serif" fontSize="11" fill="#2D1B1B" textAnchor="middle">100%</text>
        <text x="30" y="190" fontFamily="Arial, sans-serif" fontSize="11" fill="#2D1B1B">Capacity</text>
        
        <text x="50" y="320" fontFamily="Arial, sans-serif" fontSize="11" fill="#2D1B1B">0</text>
        <text x="300" y="320" fontFamily="Arial, sans-serif" fontSize="11" fill="#2D1B1B" textAnchor="middle">1,000</text>
        <text x="550" y="320" fontFamily="Arial, sans-serif" fontSize="11" fill="#2D1B1B" textAnchor="middle">2,000+</text>
        <text x="300" y="340" fontFamily="Arial, sans-serif" fontSize="11" fill="#2D1B1B" textAnchor="middle">Charge Cycles</text>
        
        {/* Legend */}
        <rect x="400" y="60" width="140" height="60" fill="#FFF5F5" stroke="#2D1B1B" strokeWidth="1" rx="3"/>
        <line x1="410" y1="80" x2="430" y2="80" stroke="#E85D75" strokeWidth="3"/>
        <text x="435" y="85" fontFamily="Arial, sans-serif" fontSize="10" fill="#2D1B1B">Traditional</text>
        <line x1="410" y1="100" x2="430" y2="100" stroke="#4ECDC4" strokeWidth="3"/>
        <text x="435" y="105" fontFamily="Arial, sans-serif" fontSize="10" fill="#2D1B1B">Solid-State</text>
      </svg>
    </div>
  )
}




