import React from 'react';
import { Sun } from 'lucide-react';

export function Header() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-800 mix-blend-multiply" />
      </div>
      <div className="relative max-w-7xl mx-auto">
        <div className="text-center">
          <Sun className="h-16 w-16 mx-auto mb-4 text-blue-400" />
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl mb-4">
            Solar Savings Insights DashBoard
          </h1>
          <p className="max-w-3xl mx-auto text-xl text-blue-100">
            Discover your solar potentials, payback period, and environmental impact with our advanced calculator.
            Make informed decisions about your solar investment.
          </p>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          className="w-full h-12 text-white"
          preserveAspectRatio="none"
          viewBox="0 0 1440 74"
          fill="currentColor"
        >
          <path d="M0,0 C240,70 480,70 720,30 C960,-10 1200,-10 1440,30 L1440,74 L0,74 Z" />
        </svg>
      </div>
    </div>
  );
}