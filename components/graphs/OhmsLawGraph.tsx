'use client'

export default function OhmsLawGraph() {
  return (
    <div className="flex justify-center my-8">
      <svg width="500" height="300" xmlns="http://www.w3.org/2000/svg" className="max-w-full h-auto">
        {/* Axes */}
        <line x1="50" y1="250" x2="450" y2="250" stroke="currentColor" strokeWidth="2" markerEnd="url(#arrowhead)"/>
        <line x1="50" y1="250" x2="50" y2="50" stroke="currentColor" strokeWidth="2" markerEnd="url(#arrowhead)"/>
        
        {/* Arrow markers */}
        <defs>
          <marker id="arrowhead" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
            <polygon points="0 0, 10 3, 0 6" fill="currentColor"/>
          </marker>
        </defs>
        
        {/* Grid lines */}
        <line x1="50" y1="200" x2="450" y2="200" stroke="#E0E0E0" strokeWidth="1" strokeDasharray="5,5"/>
        <line x1="50" y1="150" x2="450" y2="150" stroke="#E0E0E0" strokeWidth="1" strokeDasharray="5,5"/>
        <line x1="50" y1="100" x2="450" y2="100" stroke="#E0E0E0" strokeWidth="1" strokeDasharray="5,5"/>
        <line x1="50" y1="50" x2="450" y2="50" stroke="#E0E0E0" strokeWidth="1" strokeDasharray="5,5"/>
        
        {/* Hyperbolic curve (I = V/R, as R approaches 0) */}
        <path d="M 450 250 Q 300 200, 200 150 Q 150 120, 100 80 Q 80 60, 60 55" 
              stroke="#E87C7C" strokeWidth="3" fill="none"/>
        
        {/* Labels */}
        <text x="240" y="270" fontFamily="Arial, sans-serif" fontSize="14" fill="currentColor" textAnchor="middle">Resistance (R) → 0</text>
        <text x="20" y="150" fontFamily="Arial, sans-serif" fontSize="14" fill="currentColor" textAnchor="middle">Current (I)</text>
        <text x="55" y="245" fontFamily="Arial, sans-serif" fontSize="12" fill="#666">∞</text>
        <text x="55" y="255" fontFamily="Arial, sans-serif" fontSize="12" fill="#666">0</text>
        
        {/* Title */}
        <text x="250" y="30" fontFamily="Arial, sans-serif" fontSize="16" fontWeight="bold" fill="currentColor" textAnchor="middle">Ohm&apos;s Law: I = V/R</text>
        <text x="250" y="50" fontFamily="Arial, sans-serif" fontSize="12" fill="#666" textAnchor="middle">As R → 0, I → ∞</text>
        
        {/* Annotations */}
        <circle cx="60" cy="55" r="4" fill="#E87C7C"/>
        <text x="70" y="50" fontFamily="Arial, sans-serif" fontSize="11" fill="#E87C7C">Short Circuit</text>
        <text x="70" y="65" fontFamily="Arial, sans-serif" fontSize="11" fill="#E87C7C">(R ≈ 0)</text>
      </svg>
    </div>
  )
}




