import React, { useState } from 'react';
import { Sun, DollarSign, Leaf, Clock, TrendingUp, PanelTop,  ClipboardPenLine, BadgeHelp } from 'lucide-react';
import { Header } from '../src/components/Header';
import { UserInputForm } from '../src/components/UserInputForm';
import { MetricCard } from '../src/components/MetricCard';
import { MonthlyChart } from '../src/components/MonthlyChart';
import { EnvironmentalImpact } from '../src/components/EnvironmentalImpact';
// import { GoogleSolarInsights } from '../src/components/GoogleSolarInsights';
// import { getGoogleSolarData } from './services/api';
import { LocationMap } from '../src/components/LocationMap';
import { OptimalConfigurations } from '../src/components/OptimalConfigurations';
import { SavingsComparison } from '../src/components/SavingsComparison';
import { calculateSystemSize, calculateNumberOfPanels, calculateInstallationCost, calculateFederalTaxCredit, calculateNetCost, calculateROI, calculatePaybackPeriod, calculateLifetimeSavings, calculateOptimalConfigurations } from '../src/services/calculations';
import type { UserPreferences, SolarData } from '../src/types/solar';
// import type { GoogleSolarResponse } from './services/api';

const DEFAULT_PREFERENCES: UserPreferences = {
  address: '',
  monthlyUsage: 0,
  monthlyBill: 0,
  roofArea: 0,
  budget: 0
};

function App() {
  const [preferences, setPreferences] = useState<UserPreferences>(DEFAULT_PREFERENCES);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [solarData, setSolarData] = useState<SolarData | null>(null);
  const [selectedConfig, setSelectedConfig] = useState<any>(null);

  const handlePreferencesChange = (newPreferences: Partial<UserPreferences>) => {
    setPreferences(prev => ({ ...prev, ...newPreferences }));
  };

  const calculateSolarPotential = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      
      const systemSize = calculateSystemSize(preferences.monthlyUsage);
      const numberOfPanels = calculateNumberOfPanels(systemSize);
      const installationCost = calculateInstallationCost(systemSize);
      const federalTaxCredit = calculateFederalTaxCredit(installationCost);
      const netCost = calculateNetCost(installationCost);
      const annualSavings = preferences.monthlyBill * 12 * 0.15;
      const lifetimeSavings = calculateLifetimeSavings(annualSavings);
      const roiPercentage = calculateROI(installationCost, annualSavings);
      const paybackPeriod = calculatePaybackPeriod(installationCost, annualSavings);

      const configurations = calculateOptimalConfigurations(
        preferences.monthlyUsage,
        preferences.roofArea,
        preferences.budget
      );

      // Calculate environmental impact
      const annualProduction = preferences.monthlyUsage * 12;
      const co2Reduction = (annualProduction * 0.709) / 907.18; // Convert kg to tons
      const treesEquivalent = Math.round(co2Reduction * 16.5);
      const carsOffRoad = Math.round(co2Reduction * 0.217); // Average car emits 4.6 metric tons per year

      setSolarData({
        systemSize,
        numberOfPanels,
        installationCost,
        federalTaxCredit,
        netCost,
        annualSavings,
        lifetimeSavings,
        roiPercentage,
        paybackPeriod,
        configurations,
        monthlyProduction: [], // Assuming an empty array if no data is available
        annualProduction: 0, // Default to 0 or calculate if possible
        savingsPerYear: annualSavings, // Map if it’s the same as annualSavings
        totalSavings25Years: lifetimeSavings, // Map if it’s the same as lifetimeSavings
        environmentalImpact: {
            co2Reduction, // Default value
            treesEquivalent, // Default value
            carsOffRoad // Default value
        },
        monthlyComparison: {
            withSolar: [],
            withoutSolar: [],
        },
        yearlyProjections: [], 
      });
      
      setSelectedConfig(configurations[1]); // Select the middle (recommended) configuration
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to calculate solar potential');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 py-12">
        <UserInputForm
          preferences={preferences}
          loading={loading}
          onPreferencesChange={handlePreferencesChange}
          onSubmit={calculateSolarPotential}
        />

        {error && (
          <div className="max-w-xl mx-auto mb-8 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
            {error}
          </div>
        )}

        {solarData && (
          <div className="space-y-8">
            <h1 className="text-2xl font-extrabold tracking-tight sm:text-5xl lg:text-4xl mb-4">
            Potential Savings & Pay Back Period
          </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <MetricCard
                title="Recommended System Size"
                value={`${solarData.systemSize.toFixed(1)} kW`}
                description={`${solarData.numberOfPanels} solar panels needed`}
                Icon={Sun}
                iconBgColor="bg-yellow-100"
                iconColor="text-yellow-600"
              />

              <MetricCard
                title="Installation Cost"
                value={`$${solarData.installationCost.toLocaleString()}`}
                description={`Federal Tax Credit: $${solarData.federalTaxCredit.toLocaleString()}`}
                Icon={DollarSign}
                iconBgColor="bg-green-100"
                iconColor="text-green-600"
              />

              <MetricCard
                title="Net Cost"
                value={`$${solarData.netCost.toLocaleString()}`}
                description="After federal tax credit"
                Icon={DollarSign}
                iconBgColor="bg-blue-100"
                iconColor="text-blue-600"
              />

              <MetricCard
                title="Annual Savings"
                value={`$${solarData.annualSavings.toLocaleString()}`}
                description={`$${(solarData.annualSavings / 12).toFixed(0)} monthly savings`}
                Icon={Leaf}
                iconBgColor="bg-emerald-100"
                iconColor="text-emerald-600"
              />

              <MetricCard
                title="25-Year Savings"
                value={`$${solarData.lifetimeSavings.toLocaleString()}`}
                description="Total savings over system lifetime"
                Icon={TrendingUp}
                iconBgColor="bg-purple-100"
                iconColor="text-purple-600"
              />

              <MetricCard
                title="Payback Period"
                value={`${solarData.paybackPeriod.toFixed(1)} years`}
                description={`${solarData.roiPercentage.toFixed(1)}% ROI over 25 years`}
                Icon={Clock}
                iconBgColor="bg-pink-100"
                iconColor="text-pink-600"
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <LocationMap address={preferences.address} />
              {/* <ClipboardPenLine className='gap-1'/> */}
              <SavingsComparison
                monthlyBill={preferences.monthlyBill}
                systemSize={solarData.systemSize}
              />
            </div>
            <OptimalConfigurations
              configurations={solarData.configurations}
              onSelect={setSelectedConfig}
            />

            {/* {selectedConfig && (
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold mb-4">Selected Configuration Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">System Size</p>
                    <p className="text-lg font-semibold">{selectedConfig.systemSize.toFixed(1)} kW</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Number of Panels</p>
                    <p className="text-lg font-semibold">{selectedConfig.panels} panels</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Net Cost</p>
                    <p className="text-lg font-semibold">${selectedConfig.cost.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Lifetime Savings</p>
                    <p className="text-lg font-semibold">${selectedConfig.savings.toLocaleString()}</p>
                  </div>
                </div>
              </div>
            )} */}
            <h1 className="text-2xl font-extrabold tracking-tight sm:text-5xl lg:text-4xl mb-4">
            Environmental Impact
          </h1>
           <EnvironmentalImpact
              environmentalImpact={solarData.environmentalImpact}
              monthlyUsage={preferences.monthlyUsage}
            />
          </div>
        )}
      </main>
    </div>
  );
}

export default App;