import React from 'react';
import { LucideIcon } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string;
  description: string;
  Icon: LucideIcon;
  iconBgColor: string;
  iconColor: string;
}

export function MetricCard({ title, value, description, Icon, iconBgColor, iconColor }: MetricCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-6">
      <div className="flex items-center mb-4">
        <div className={`p-3 ${iconBgColor} rounded-lg`}>
          <Icon className={iconColor} size={24} />
        </div>
        <h3 className="ml-3 text-lg font-semibold text-gray-900">{title}</h3>
      </div>
      <p className="text-3xl font-bold text-gray-900">{value}</p>
      <p className="text-sm text-gray-500 mt-2">{description}</p>
    </div>
  );
}