import React from 'react';
import { BarChart, Card, Title, Text } from '@tremor/react';

interface Configuration {
  systemSize: number;
  panels: number;
  cost: number;
  savings: number;
  payback: number;
}

interface OptimalConfigurationsProps {
  configurations: Configuration[];
  onSelect: (config: Configuration) => void;
}

export function OptimalConfigurations({ configurations, onSelect }: OptimalConfigurationsProps) {
  const chartData = configurations.map(config => ({
    name: `${config.systemSize.toFixed(1)}kW System`,
    'Net Cost': config.cost,
    'Lifetime Savings': config.savings,
  }));

  return (
    <Card className="mt-8">
      <Title>Alternative Configurations</Title>
      <Text>Compare different system sizes and their financial impact</Text>
      
      <BarChart
        className="mt-6"
        data={chartData}
        index="name"
        categories={['Net Cost', 'Lifetime Savings']}
        colors={['blue', 'green']}
        valueFormatter={(number) => `$${(number / 1000).toFixed(1)}k`}
        yAxisWidth={48}
      />

      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        {configurations.map((config, index) => (
          <div
            key={index}
            className="p-4 border rounded-lg hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => onSelect(config)}
          >
            <h3 className="font-semibold text-lg">{config.systemSize.toFixed(1)}kW System</h3>
            <ul className="mt-2 space-y-1 text-sm text-gray-600">
              <li>Panels: {config.panels}</li>
              <li>Net Cost: ${config.cost.toLocaleString()}</li>
              <li>25-Year Savings: ${config.savings.toLocaleString()}</li>
              <li>Payback: {config.payback.toFixed(1)} years</li>
            </ul>
          </div>
        ))}
      </div>
    </Card>
  );
}