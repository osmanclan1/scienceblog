'use client'

export default function SSBComparisonGraph() {
  return (
    <div className="flex justify-center my-8">
      <svg width="700" height="400" xmlns="http://www.w3.org/2000/svg" className="max-w-full h-auto">
        {/* Traditional Battery */}
        <text x="175" y="30" fontFamily="Arial, sans-serif" fontSize="14" fontWeight="bold" fill="#2D1B1B" textAnchor="middle">Traditional Li-Ion Battery</text>
        
        <rect x="50" y="60" width="100" height="200" fill="#E87C7C" stroke="#2D1B1B" strokeWidth="2" rx="5"/>
        <text x="100" y="85" fontFamily="Arial, sans-serif" fontSize="11" fontWeight="bold" fill="#2D1B1B" textAnchor="middle">Anode</text>
        <text x="100" y="100" fontFamily="Arial, sans-serif" fontSize="9" fill="#2D1B1B" textAnchor="middle">(Graphite)</text>
        
        {/* Liquid electrolyte */}
        <rect x="150" y="60" width="100" height="200" fill="#FFE5E5" stroke="#2D1B1B" strokeWidth="2" rx="5" opacity="0.7">
          <animate attributeName="opacity" values="0.7;0.9;0.7" dur="2s" repeatCount="indefinite"/>
        </rect>
        <text x="200" y="170" fontFamily="Arial, sans-serif" fontSize="11" fontWeight="bold" fill="#2D1B1B" textAnchor="middle">Liquid</text>
        <text x="200" y="185" fontFamily="Arial, sans-serif" fontSize="11" fontWeight="bold" fill="#2D1B1B" textAnchor="middle">Electrolyte</text>
        <text x="200" y="200" fontFamily="Arial, sans-serif" fontSize="9" fill="#E85D75" textAnchor="middle">(Flammable)</text>
        
        <rect x="250" y="60" width="100" height="200" fill="#4ECDC4" stroke="#2D1B1B" strokeWidth="2" rx="5"/>
        <text x="300" y="85" fontFamily="Arial, sans-serif" fontSize="11" fontWeight="bold" fill="#2D1B1B" textAnchor="middle">Cathode</text>
        
        {/* Separator line */}
        <line x1="150" y1="160" x2="150" y2="160" stroke="#2D1B1B" strokeWidth="2" strokeDasharray="5,5"/>
        <line x1="250" y1="160" x2="250" y2="160" stroke="#2D1B1B" strokeWidth="2" strokeDasharray="5,5"/>
        <text x="200" y="145" fontFamily="Arial, sans-serif" fontSize="9" fill="#666" textAnchor="middle">Separator</text>
        
        {/* Solid State Battery */}
        <text x="525" y="30" fontFamily="Arial, sans-serif" fontSize="14" fontWeight="bold" fill="#2D1B1B" textAnchor="middle">Solid-State Battery</text>
        
        <rect x="400" y="60" width="100" height="200" fill="#E87C7C" stroke="#2D1B1B" strokeWidth="2" rx="5"/>
        <text x="450" y="85" fontFamily="Arial, sans-serif" fontSize="11" fontWeight="bold" fill="#2D1B1B" textAnchor="middle">Anode</text>
        <text x="450" y="100" fontFamily="Arial, sans-serif" fontSize="9" fill="#2D1B1B" textAnchor="middle">(Li Metal)</text>
        
        {/* Solid electrolyte */}
        <rect x="500" y="60" width="100" height="200" fill="#D4BABA" stroke="#2D1B1B" strokeWidth="3" rx="5"/>
        <text x="550" y="170" fontFamily="Arial, sans-serif" fontSize="11" fontWeight="bold" fill="#2D1B1B" textAnchor="middle">Solid</text>
        <text x="550" y="185" fontFamily="Arial, sans-serif" fontSize="11" fontWeight="bold" fill="#2D1B1B" textAnchor="middle">Electrolyte</text>
        <text x="550" y="200" fontFamily="Arial, sans-serif" fontSize="9" fill="#4ECDC4" textAnchor="middle">(Non-flammable)</text>
        <text x="550" y="215" fontFamily="Arial, sans-serif" fontSize="9" fill="#2D1B1B" textAnchor="middle">+ Separator</text>
        
        <rect x="600" y="60" width="100" height="200" fill="#4ECDC4" stroke="#2D1B1B" strokeWidth="2" rx="5"/>
        <text x="650" y="85" fontFamily="Arial, sans-serif" fontSize="11" fontWeight="bold" fill="#2D1B1B" textAnchor="middle">Cathode</text>
        
        {/* Comparison arrows */}
        <path d="M 350 160 L 390 160" stroke="#E87C7C" strokeWidth="2" fill="none" markerEnd="url(#arrow-compare)"/>
        <defs>
          <marker id="arrow-compare" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
            <polygon points="0 0, 10 3, 0 6" fill="#E87C7C"/>
          </marker>
        </defs>
        
        {/* Key differences */}
        <text x="350" y="290" fontFamily="Arial, sans-serif" fontSize="10" fill="#E85D75" textAnchor="middle">❌ Flammable</text>
        <text x="350" y="305" fontFamily="Arial, sans-serif" fontSize="10" fill="#E85D75" textAnchor="middle">❌ Separate separator</text>
        <text x="350" y="320" fontFamily="Arial, sans-serif" fontSize="10" fill="#E85D75" textAnchor="middle">❌ Graphite anode</text>
        
        <text x="550" y="290" fontFamily="Arial, sans-serif" fontSize="10" fill="#4ECDC4" textAnchor="middle">✅ Non-flammable</text>
        <text x="550" y="305" fontFamily="Arial, sans-serif" fontSize="10" fill="#4ECDC4" textAnchor="middle">✅ Built-in separator</text>
        <text x="550" y="320" fontFamily="Arial, sans-serif" fontSize="10" fill="#4ECDC4" textAnchor="middle">✅ Li metal anode</text>
      </svg>
    </div>
  )
}




