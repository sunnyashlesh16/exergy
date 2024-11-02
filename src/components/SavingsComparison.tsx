import React from 'react';
import { AreaChart, Card, Title } from '@tremor/react';

interface SavingsComparisonProps {
  monthlyBill: number;
  systemSize: number;
}

export function SavingsComparison({ monthlyBill, systemSize }: SavingsComparisonProps) {
  const data = Array.from({ length: 25 }, (_, year) => {
    const withoutSolar = monthlyBill * 12 * Math.pow(1.025, year);
    const withSolar = (monthlyBill * 12 * (1 - systemSize * 0.15)) * Math.pow(1.025, year);
    
    return {
      year: year + 1,
      'With Solar': Math.round(withSolar),
      'Without Solar': Math.round(withoutSolar),
      Savings: Math.round(withoutSolar - withSolar)
    };
  });

  return (
    <Card className="mt-8">
      <Title>25-Year Cost Comparison</Title>
      <AreaChart
        className="h-72 mt-4"
        data={data}
        index="year"
        categories={['With Solar', 'Without Solar']}
        colors={['green', 'red']}
        valueFormatter={(number) => `$${(number).toLocaleString()}`}
      />
    </Card>
  );
}