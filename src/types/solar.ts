export interface UserPreferences {
    address: string;
    monthlyUsage: number;
    monthlyBill: number;
    roofArea: number;
    budget: number;
    roofTilt?: number;
    roofAzimuth?: number;
    electricityRate?: number;
    annualUsageIncrease?: number;
  }
  
  export interface SolarData {
    monthlyProduction: number[];
    annualProduction: number;
    systemSize: number;
    installationCost: number;
    federalTaxCredit: number;
    netCost: number;
    numberOfPanels: number;
    paybackPeriod: number;
    savingsPerYear: number;
    totalSavings25Years: number;
    environmentalImpact: {
      co2Reduction: number;
      treesEquivalent: number;
      carsOffRoad: number;
    };
    roiPercentage: number;
    monthlyComparison: {
      withSolar: number[];
      withoutSolar: number[];
    };
    yearlyProjections: {
      year: number;
      withSolar: number;
      withoutSolar: number;
      savings: number;
      cumulativeSavings: number;
    }[];
    annualSavings: number; // Add this if it's different from savingsPerYear
    lifetimeSavings: number; // Or set this to totalSavings25Years if it's the same
    configurations: Array<{
        systemSize: number;
        panels: number;
        cost: number;
        savings: number;
    }>;
  }
  
  export interface PVWattsResponse {
    outputs: {
      ac_monthly: number[];
      ac_annual: number;
      solrad_annual: number;
      capacity_factor: number;
    };
  }
  
  export interface SolarResourceResponse {
    outputs: {
      avg_dni: {
        annual: number;
        monthly: Record<string, number>;
      };
      avg_ghi: {
        annual: number;
        monthly: Record<string, number>;
      };
    };
  }
