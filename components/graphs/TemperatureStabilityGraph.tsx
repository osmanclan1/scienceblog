'use client'

export default function TemperatureStabilityGraph() {
  return (
    <div className="flex justify-center my-8">
      <svg width="600" height="300" xmlns="http://www.w3.org/2000/svg" className="max-w-full h-auto">
        {/* Temperature comparison */}
        <text x="300" y="30" fontFamily="Arial, sans-serif" fontSize="16" fontWeight="bold" fill="#2D1B1B" textAnchor="middle">Temperature Stability Comparison</text>
        
        {/* Traditional battery */}
        <rect x="50" y="80" width="200" height="150" fill="#FFE5E5" stroke="#E85D75" strokeWidth="2" rx="5"/>
        <text x="150" y="110" fontFamily="Arial, sans-serif" fontSize="14" fontWeight="bold" fill="#2D1B1B" textAnchor="middle">Traditional Battery</text>
        <text x="150" y="135" fontFamily="Arial, sans-serif" fontSize="12" fill="#2D1B1B" textAnchor="middle">Liquid Electrolyte</text>
        
        {/* Temperature bar for traditional */}
        <rect x="70" y="160" width="160" height="30" fill="#E85D75" rx="3"/>
        <text x="150" y="180" fontFamily="Arial, sans-serif" fontSize="11" fill="white" textAnchor="middle">Stable up to ~60°C</text>
        <text x="150" y="200" fontFamily="Arial, sans-serif" fontSize="10" fill="#E85D75" textAnchor="middle">⚠️ Risk of thermal runaway</text>
        
        {/* Solid state battery */}
        <rect x="350" y="80" width="200" height="150" fill="#E0F7F5" stroke="#4ECDC4" strokeWidth="2" rx="5"/>
        <text x="450" y="110" fontFamily="Arial, sans-serif" fontSize="14" fontWeight="bold" fill="#2D1B1B" textAnchor="middle">Solid-State Battery</text>
        <text x="450" y="135" fontFamily="Arial, sans-serif" fontSize="12" fill="#2D1B1B" textAnchor="middle">Solid Electrolyte</text>
        
        {/* Temperature bar for solid state */}
        <rect x="370" y="160" width="160" height="30" fill="#4ECDC4" rx="3"/>
        <text x="450" y="180" fontFamily="Arial, sans-serif" fontSize="11" fill="white" textAnchor="middle">Stable up to ~200°C</text>
        <text x="450" y="200" fontFamily="Arial, sans-serif" fontSize="10" fill="#4ECDC4" textAnchor="middle">✅ No thermal runaway risk</text>
        
        {/* Temperature scale */}
        <line x1="50" y1="250" x2="550" y2="250" stroke="#2D1B1B" strokeWidth="2"/>
        <line x1="70" y1="245" x2="70" y2="255" stroke="#2D1B1B" strokeWidth="1"/>
        <text x="70" y="270" fontFamily="Arial, sans-serif" fontSize="10" fill="#2D1B1B" textAnchor="middle">0°C</text>
        <line x1="150" y1="245" x2="150" y2="255" stroke="#E85D75" strokeWidth="2"/>
        <text x="150" y="270" fontFamily="Arial, sans-serif" fontSize="10" fill="#E85D75" textAnchor="middle">60°C</text>
        <line x1="450" y1="245" x2="450" y2="255" stroke="#4ECDC4" strokeWidth="2"/>
        <text x="450" y="270" fontFamily="Arial, sans-serif" fontSize="10" fill="#4ECDC4" textAnchor="middle">200°C</text>
      </svg>
    </div>
  )
}




