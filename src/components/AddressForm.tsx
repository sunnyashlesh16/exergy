import React from 'react';
import { Home, ArrowRight, Calculator } from 'lucide-react';

interface AddressFormProps {
  address: string;
  loading: boolean;
  onAddressChange: (address: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export function AddressForm({ address, loading, onAddressChange, onSubmit }: AddressFormProps) {
  return (
    <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-xl p-8 mb-12">
      <form onSubmit={onSubmit} className="space-y-6">
        <div>
          <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
            Enter Your Address
          </label>
          <div className="relative">
            <Home className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              id="address"
              value={address}
              onChange={(e) => onAddressChange(e.target.value)}
              className="pl-10 w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="123 Solar Street, Sunnyville, ST 12345"
              required
            />
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
              Calculate Savings
              <ArrowRight className="ml-2" size={20} />
            </span>
          )}
        </button>
      </form>
    </div>
  );
}