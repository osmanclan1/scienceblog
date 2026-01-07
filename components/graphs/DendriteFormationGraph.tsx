'use client'

export default function DendriteFormationGraph() {
  return (
    <div className="flex justify-center my-8">
      <svg width="700" height="400" xmlns="http://www.w3.org/2000/svg" className="max-w-full h-auto">
        <text x="350" y="30" fontFamily="Arial, sans-serif" fontSize="16" fontWeight="bold" fill="#2D1B1B" textAnchor="middle">Dendrite Formation: Liquid vs Solid Electrolyte</text>
        
        {/* Liquid battery with dendrite */}
        <text x="175" y="70" fontFamily="Arial, sans-serif" fontSize="14" fontWeight="bold" fill="#2D1B1B" textAnchor="middle">Liquid Electrolyte</text>
        
        <rect x="50" y="90" width="100" height="120" fill="#E87C7C" stroke="#2D1B1B" strokeWidth="2" rx="3"/>
        <text x="100" y="115" fontFamily="Arial, sans-serif" fontSize="10" fill="#2D1B1B" textAnchor="middle">Anode</text>
        
        {/* Liquid separator (soft) */}
        <rect x="150" y="90" width="50" height="120" fill="#FFE5E5" stroke="#2D1B1B" strokeWidth="1" opacity="0.6"/>
        <text x="175" y="155" fontFamily="Arial, sans-serif" fontSize="9" fill="#2D1B1B" textAnchor="middle">Soft</text>
        <text x="175" y="170" fontFamily="Arial, sans-serif" fontSize="9" fill="#2D1B1B" textAnchor="middle">Separator</text>
        
        {/* Dendrite piercing through */}
        <path d="M 100 180 L 140 150 L 160 140 L 200 120" stroke="#E85D75" strokeWidth="4" fill="none" markerEnd="url(#arrow-danger)"/>
        <text x="150" y="130" fontFamily="Arial, sans-serif" fontSize="10" fill="#E85D75" fontWeight="bold">Dendrite</text>
        <text x="150" y="145" fontFamily="Arial, sans-serif" fontSize="9" fill="#E85D75">(Pierces)</text>
        
        <rect x="200" y="90" width="100" height="120" fill="#4ECDC4" stroke="#2D1B1B" strokeWidth="2" rx="3"/>
        <text x="250" y="115" fontFamily="Arial, sans-serif" fontSize="10" fill="#2D1B1B" textAnchor="middle">Cathode</text>
        
        <text x="150" y="240" fontFamily="Arial, sans-serif" fontSize="11" fill="#E85D75" textAnchor="middle">⚠️ Short Circuit Risk</text>
        
        {/* Solid state battery blocking dendrite */}
        <text x="525" y="70" fontFamily="Arial, sans-serif" fontSize="14" fontWeight="bold" fill="#2D1B1B" textAnchor="middle">Solid Electrolyte</text>
        
        <rect x="400" y="90" width="100" height="120" fill="#E87C7C" stroke="#2D1B1B" strokeWidth="2" rx="3"/>
        <text x="450" y="115" fontFamily="Arial, sans-serif" fontSize="10" fill="#2D1B1B" textAnchor="middle">Anode</text>
        
        {/* Solid separator (rigid) */}
        <rect x="500" y="90" width="50" height="120" fill="#D4BABA" stroke="#2D1B1B" strokeWidth="3"/>
        <text x="525" y="155" fontFamily="Arial, sans-serif" fontSize="9" fill="#2D1B1B" textAnchor="middle" fontWeight="bold">Rigid</text>
        <text x="525" y="170" fontFamily="Arial, sans-serif" fontSize="9" fill="#2D1B1B" textAnchor="middle" fontWeight="bold">Solid</text>
        
        {/* Dendrite blocked */}
        <path d="M 450 180 L 490 150 L 500 145" stroke="#E85D75" strokeWidth="4" fill="none"/>
        <circle cx="500" cy="145" r="5" fill="#E85D75"/>
        <line x1="495" y1="140" x2="505" y2="150" stroke="#E85D75" strokeWidth="2"/>
        <line x1="505" y1="140" x2="495" y2="150" stroke="#E85D75" strokeWidth="2"/>
        <text x="475" y="130" fontFamily="Arial, sans-serif" fontSize="10" fill="#E85D75" fontWeight="bold">Dendrite</text>
        <text x="475" y="145" fontFamily="Arial, sans-serif" fontSize="9" fill="#E85D75">(Blocked)</text>
        
        <rect x="550" y="90" width="100" height="120" fill="#4ECDC4" stroke="#2D1B1B" strokeWidth="2" rx="3"/>
        <text x="600" y="115" fontFamily="Arial, sans-serif" fontSize="10" fill="#2D1B1B" textAnchor="middle">Cathode</text>
        
        <text x="525" y="240" fontFamily="Arial, sans-serif" fontSize="11" fill="#4ECDC4" textAnchor="middle">✅ Safe Fast Charging</text>
        
        {/* Arrow markers */}
        <defs>
          <marker id="arrow-danger" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
            <polygon points="0 0, 10 3, 0 6" fill="#E85D75"/>
          </marker>
        </defs>
        
        {/* Charging speed comparison */}
        <text x="350" y="280" fontFamily="Arial, sans-serif" fontSize="12" fontWeight="bold" fill="#2D1B1B" textAnchor="middle">Charging Speed</text>
        <text x="150" y="300" fontFamily="Arial, sans-serif" fontSize="10" fill="#E85D75" textAnchor="middle">~1 hour (80%)</text>
        <text x="150" y="315" fontFamily="Arial, sans-serif" fontSize="10" fill="#E85D75" textAnchor="middle">Limited by safety</text>
        <text x="525" y="300" fontFamily="Arial, sans-serif" fontSize="10" fill="#4ECDC4" textAnchor="middle">~15 minutes (80%)</text>
        <text x="525" y="315" fontFamily="Arial, sans-serif" fontSize="10" fill="#4ECDC4" textAnchor="middle">Ultra-fast charging</text>
      </svg>
    </div>
  )
}




