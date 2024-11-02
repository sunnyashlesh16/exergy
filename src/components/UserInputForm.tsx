import React from 'react';
import { Home, ArrowRight, Calculator, Sun, DollarSign, Ruler } from 'lucide-react';
import type { UserPreferences } from '../types/solar';

interface UserInputFormProps {
  preferences: UserPreferences;
  loading: boolean;
  onPreferencesChange: (preferences: Partial<UserPreferences>) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export function UserInputForm({ preferences, loading, onPreferencesChange, onSubmit }: UserInputFormProps) {
  return (
    <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-8 mb-12">
      <form onSubmit={onSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Location Input */}
          <div className="col-span-full">
            <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
              Property Address
            </label>
            <div className="relative">
              <Home className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                id="address"
                value={preferences.address}
                onChange={(e) => onPreferencesChange({ address: e.target.value })}
                className="pl-10 w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="123 Solar Street, Sunnyville, ST 12345"
                required
              />
            </div>
          </div>

          {/* Energy Usage */}
          <div>
            <label htmlFor="monthlyUsage" className="block text-sm font-medium text-gray-700 mb-2">
              Monthly Energy Usage (kWh)
            </label>
            <div className="relative">
              <Sun className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="number"
                id="monthlyUsage"
                min="0"
                value={preferences.monthlyUsage}
                onChange={(e) => onPreferencesChange({ monthlyUsage: Number(e.target.value) })}
                className="pl-10 w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="900"
                required
              />
            </div>
          </div>

          {/* Monthly Bill */}
          <div>
            <label htmlFor="monthlyBill" className="block text-sm font-medium text-gray-700 mb-2">
              Average Monthly Bill ($)
            </label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="number"
                id="monthlyBill"
                min="0"
                value={preferences.monthlyBill}
                onChange={(e) => onPreferencesChange({ monthlyBill: Number(e.target.value) })}
                className="pl-10 w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="150"
                required
              />
            </div>
          </div>

          {/* Roof Area */}
          <div>
            <label htmlFor="roofArea" className="block text-sm font-medium text-gray-700 mb-2">
              Available Roof Area (sq ft)
            </label>
            <div className="relative">
              <Ruler className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="number"
                id="roofArea"
                min="0"
                value={preferences.roofArea}
                onChange={(e) => onPreferencesChange({ roofArea: Number(e.target.value) })}
                className="pl-10 w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="800"
                required
              />
            </div>
          </div>

          {/* Budget */}
          <div>
            <label htmlFor="budget" className="block text-sm font-medium text-gray-700 mb-2">
              Maximum Budget ($)
            </label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="number"
                id="budget"
                min="0"
                value={preferences.budget}
                onChange={(e) => onPreferencesChange({ budget: Number(e.target.value) })}
                className="pl-10 w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="25000"
                required
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
        >
          {loading ? (
            <span className="flex items-center">
              Calculating...
              <Calculator className="ml-2 animate-spin" size={20} />
            </span>
          ) : (
            <span className="flex items-center">
              Calculate Solar Potential
              <ArrowRight className="ml-2" size={20} />
            </span>
          )}
        </button>
      </form>
    </div>
  );
}