import React from 'react';

interface MonthlyChartProps {
  data: number[];
}

export function MonthlyChart({ data }: MonthlyChartProps) {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const maxValue = Math.max(...data);

  return (
    <div className="col-span-full bg-white rounded-2xl shadow-xl p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Production</h3>
      <div className="h-64 relative">
        <div className="flex items-end justify-between h-48 mt-4">
          {data.map((value, index) => (
            <div
              key={index}
              className="w-1/12 bg-blue-500 rounded-t transition-all duration-300 hover:bg-blue-600 relative group"
              style={{ height: `${(value / maxValue) * 100}%` }}
            >
              <div className="text-xs text-center mt-2 transform -rotate-45 origin-left">
                {months[index]}
              </div>
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                {value.toFixed(0)} kWh
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}