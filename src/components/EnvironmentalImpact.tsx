import React from 'react';
import { Card, Title, AreaChart } from '@tremor/react';
import { Leaf, Car, TreeDeciduous } from 'lucide-react';

interface EnvironmentalImpactProps {
  environmentalImpact: {
    co2Reduction: number;
    treesEquivalent: number;
    carsOffRoad: number;
  };
  monthlyUsage: number;
}

export function EnvironmentalImpact({ environmentalImpact, monthlyUsage }: EnvironmentalImpactProps) {
  // Generate 25-year environmental impact data
  const yearlyData = Array.from({ length: 25 }, (_, year) => {
    const withoutSolar = monthlyUsage * 12 * 0.709 * (year + 1); // CO2 emissions in kg
    const withSolar = withoutSolar * 0.2; // Assuming 80% reduction
    
    return {
      year: year + 1,
      'With Solar': Math.round(withSolar / 1000), // Convert to metric tons
      'Without Solar': Math.round(withoutSolar / 1000),
    };
  });

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center space-x-3">
            <div className="bg-green-100 p-3 rounded-lg">
              <Leaf className="text-green-600" size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-600">CO₂ Reduction</p>
              <p className="text-2xl font-bold">{environmentalImpact.co2Reduction.toFixed(1)} tons</p>
              <p className="text-sm text-gray-500">per year</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center space-x-3">
            <div className="bg-emerald-100 p-3 rounded-lg">
              <TreeDeciduous className="text-emerald-600" size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-600">Equivalent to</p>
              <p className="text-2xl font-bold">{environmentalImpact.treesEquivalent}</p>
              <p className="text-sm text-gray-500">trees planted</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-100 p-3 rounded-lg">
              <Car className="text-blue-600" size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-600">Equivalent to</p>
              <p className="text-2xl font-bold">{environmentalImpact.carsOffRoad}</p>
              <p className="text-sm text-gray-500">cars off the road</p>
            </div>
          </div>
        </div>
      </div>

      <Card>
        <Title>25-Year CO₂ Emissions Comparison</Title>
        <AreaChart
          className="h-72 mt-4"
          data={yearlyData}
          index="year"
          categories={['With Solar', 'Without Solar']}
          colors={['green', 'gray']}
          valueFormatter={(number) => `${number.toLocaleString()} tons CO₂`}
        />
      </Card>
    </div>
  );
}