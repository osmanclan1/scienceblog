'use client'

export default function BatteryDischargeGraph() {
  return (
    <div className="flex justify-center my-8">
      <svg width="600" height="400" xmlns="http://www.w3.org/2000/svg" className="max-w-full h-auto">
        {/* Battery diagram */}
        <rect x="100" y="100" width="80" height="200" fill="#E87C7C" stroke="#2D1B1B" strokeWidth="2" rx="5"/>
        <rect x="120" y="120" width="40" height="160" fill="#FFE5E5" stroke="#2D1B1B" strokeWidth="1"/>
        
        {/* Anode label */}
        <text x="140" y="115" fontFamily="Arial, sans-serif" fontSize="12" fontWeight="bold" fill="#2D1B1B" textAnchor="middle">Anode</text>
        <text x="140" y="135" fontFamily="Arial, sans-serif" fontSize="10" fill="#2D1B1B" textAnchor="middle">(Graphite)</text>
        <text x="140" y="150" fontFamily="Arial, sans-serif" fontSize="10" fill="#2D1B1B" textAnchor="middle">Li → Li⁺ + e⁻</text>
        
        {/* Separator */}
        <rect x="180" y="100" width="20" height="200" fill="#D4BABA" stroke="#2D1B1B" strokeWidth="1"/>
        <text x="190" y="210" fontFamily="Arial, sans-serif" fontSize="10" fill="#2D1B1B" textAnchor="middle">Separator</text>
        
        {/* Cathode */}
        <rect x="200" y="100" width="80" height="200" fill="#4ECDC4" stroke="#2D1B1B" strokeWidth="2" rx="5"/>
        <rect x="220" y="120" width="40" height="160" fill="#E0F7F5" stroke="#2D1B1B" strokeWidth="1"/>
        
        {/* Cathode label */}
        <text x="240" y="115" fontFamily="Arial, sans-serif" fontSize="12" fontWeight="bold" fill="#2D1B1B" textAnchor="middle">Cathode</text>
        <text x="240" y="135" fontFamily="Arial, sans-serif" fontSize="10" fill="#2D1B1B" textAnchor="middle">(Li Metal Oxide)</text>
        <text x="240" y="150" fontFamily="Arial, sans-serif" fontSize="10" fill="#2D1B1B" textAnchor="middle">Li⁺ + e⁻ → Li</text>
        
        {/* Electron flow (external circuit) */}
        <path d="M 180 200 Q 280 150, 380 200" stroke="#E87C7C" strokeWidth="3" fill="none" markerEnd="url(#arrow-red)"/>
        <text x="280" y="140" fontFamily="Arial, sans-serif" fontSize="11" fill="#E87C7C" fontWeight="bold">e⁻ (Electrons)</text>
        
        {/* Ion flow (through electrolyte) */}
        <path d="M 190 120 Q 190 200, 190 280" stroke="#4ECDC4" strokeWidth="3" fill="none" markerEnd="url(#arrow-blue)"/>
        <text x="210" y="200" fontFamily="Arial, sans-serif" fontSize="11" fill="#4ECDC4" fontWeight="bold">Li⁺ (Ions)</text>
        
        {/* Arrow markers */}
        <defs>
          <marker id="arrow-red" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
            <polygon points="0 0, 10 3, 0 6" fill="#E87C7C"/>
          </marker>
          <marker id="arrow-blue" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
            <polygon points="0 0, 10 3, 0 6" fill="#4ECDC4"/>
          </marker>
        </defs>
        
        {/* External circuit device */}
        <rect x="320" y="180" width="40" height="40" fill="#FFF5F5" stroke="#2D1B1B" strokeWidth="2" rx="3"/>
        <text x="340" y="205" fontFamily="Arial, sans-serif" fontSize="10" fill="#2D1B1B" textAnchor="middle">Device</text>
        
        {/* Title */}
        <text x="300" y="50" fontFamily="Arial, sans-serif" fontSize="16" fontWeight="bold" fill="#2D1B1B" textAnchor="middle">Battery Discharge Process</text>
        
        {/* Legend */}
        <rect x="400" y="100" width="150" height="100" fill="#FFF5F5" stroke="#2D1B1B" strokeWidth="1" rx="5"/>
        <text x="475" y="120" fontFamily="Arial, sans-serif" fontSize="12" fontWeight="bold" fill="#2D1B1B" textAnchor="middle">Legend</text>
        <line x1="410" y1="135" x2="430" y2="135" stroke="#E87C7C" strokeWidth="2"/>
        <text x="435" y="140" fontFamily="Arial, sans-serif" fontSize="10" fill="#2D1B1B">Electrons (external)</text>
        <line x1="410" y1="155" x2="430" y2="155" stroke="#4ECDC4" strokeWidth="2"/>
        <text x="435" y="160" fontFamily="Arial, sans-serif" fontSize="10" fill="#2D1B1B">Ions (electrolyte)</text>
      </svg>
    </div>
  )
}




