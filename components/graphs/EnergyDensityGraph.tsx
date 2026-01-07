'use client'

export default function EnergyDensityGraph() {
  return (
    <div className="flex justify-center my-8">
      <svg width="600" height="350" xmlns="http://www.w3.org/2000/svg" className="max-w-full h-auto">
        <text x="300" y="30" fontFamily="Arial, sans-serif" fontSize="16" fontWeight="bold" fill="#2D1B1B" textAnchor="middle">Energy Density Comparison</text>
        
        {/* Graphite anode */}
        <rect x="50" y="80" width="200" height="200" fill="#FFE5E5" stroke="#2D1B1B" strokeWidth="2" rx="5"/>
        <text x="150" y="110" fontFamily="Arial, sans-serif" fontSize="14" fontWeight="bold" fill="#2D1B1B" textAnchor="middle">Traditional: Graphite Anode</text>
        
        {/* Graphite layer (thick) */}
        <rect x="70" y="140" width="160" height="80" fill="#8B6B6B" stroke="#2D1B1B" strokeWidth="1"/>
        <text x="150" y="185" fontFamily="Arial, sans-serif" fontSize="12" fill="white" textAnchor="middle">Graphite Host</text>
        <text x="150" y="200" fontFamily="Arial, sans-serif" fontSize="11" fill="white" textAnchor="middle">372 mAh/g</text>
        <text x="150" y="240" fontFamily="Arial, sans-serif" fontSize="10" fill="#2D1B1B" textAnchor="middle">❌ Bulky & Heavy</text>
        
        {/* Lithium metal anode */}
        <rect x="350" y="80" width="200" height="200" fill="#E0F7F5" stroke="#2D1B1B" strokeWidth="2" rx="5"/>
        <text x="450" y="110" fontFamily="Arial, sans-serif" fontSize="14" fontWeight="bold" fill="#2D1B1B" textAnchor="middle">Solid-State: Li Metal</text>
        
        {/* Lithium layer (thin) */}
        <rect x="370" y="180" width="160" height="40" fill="#E87C7C" stroke="#2D1B1B" strokeWidth="1"/>
        <text x="450" y="205" fontFamily="Arial, sans-serif" fontSize="12" fill="white" textAnchor="middle">Pure Lithium Metal</text>
        <text x="450" y="220" fontFamily="Arial, sans-serif" fontSize="11" fill="white" textAnchor="middle">3,860 mAh/g</text>
        <text x="450" y="240" fontFamily="Arial, sans-serif" fontSize="10" fill="#4ECDC4" textAnchor="middle">✅ Thin & Light</text>
        
        {/* Capacity comparison bar */}
        <text x="300" y="310" fontFamily="Arial, sans-serif" fontSize="12" fontWeight="bold" fill="#2D1B1B" textAnchor="middle">Capacity Ratio: ~10x Higher</text>
        <rect x="100" y="320" width="100" height="20" fill="#8B6B6B" rx="3"/>
        <text x="150" y="333" fontFamily="Arial, sans-serif" fontSize="10" fill="white" textAnchor="middle">Graphite</text>
        <rect x="400" y="320" width="100" height="20" fill="#E87C7C" rx="3"/>
        <text x="450" y="333" fontFamily="Arial, sans-serif" fontSize="10" fill="white" textAnchor="middle">Li Metal</text>
      </svg>
    </div>
  )
}




