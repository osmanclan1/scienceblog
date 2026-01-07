'use client'

import React from 'react'
import OhmsLawGraph from './OhmsLawGraph'
import BatteryDischargeGraph from './BatteryDischargeGraph'
import SSBComparisonGraph from './SSBComparisonGraph'
import TemperatureStabilityGraph from './TemperatureStabilityGraph'
import EnergyDensityGraph from './EnergyDensityGraph'
import DendriteFormationGraph from './DendriteFormationGraph'
import BatteryLifespanGraph from './BatteryLifespanGraph'

const graphComponents: Record<string, React.ComponentType> = {
  'ohms-law': OhmsLawGraph,
  'battery-discharge': BatteryDischargeGraph,
  'ssb-comparison': SSBComparisonGraph,
  'temperature-stability': TemperatureStabilityGraph,
  'energy-density': EnergyDensityGraph,
  'dendrite-formation': DendriteFormationGraph,
  'battery-lifespan': BatteryLifespanGraph,
}

interface GraphRendererProps {
  graphId: string
}

export default function GraphRenderer({ graphId }: GraphRendererProps) {
  const GraphComponent = graphComponents[graphId]
  
  if (!GraphComponent) {
    return <div className="text-red-500">Graph &quot;{graphId}&quot; not found</div>
  }
  
  return <GraphComponent />
}

