const PANEL_WATTAGE = 400; // Standard panel wattage in 2024
const FEDERAL_TAX_CREDIT_RATE = 0.30; // 30% federal tax credit
const ANNUAL_DEGRADATION_RATE = 0.005; // 0.5% annual panel degradation
const ELECTRICITY_RATE_INCREASE = 0.025; // 2.5% annual electricity rate increase

export function calculateSystemSize(monthlyUsage: number): number {
  const dailyUsage = (monthlyUsage * 12) / 365;
  const systemSize = (dailyUsage / (5.5 * 0.8));
  return Math.round(systemSize * 10) / 10;
}

export function calculateNumberOfPanels(systemSize: number): number {
  return Math.ceil((systemSize * 1000) / PANEL_WATTAGE);
}

export function calculateInstallationCost(systemSize: number): number {
  const costPerWatt = 2.77;
  return systemSize * 1000 * costPerWatt;
}

export function calculateFederalTaxCredit(installationCost: number): number {
  return installationCost * FEDERAL_TAX_CREDIT_RATE;
}

export function calculateNetCost(installationCost: number): number {
  return installationCost - calculateFederalTaxCredit(installationCost);
}

export function calculateROI(installationCost: number, annualSavings: number): number {
  const YEARS_OF_OPERATION = 25;
  const totalSavings = calculateLifetimeSavings(annualSavings);
  return ((totalSavings - installationCost) / installationCost) * 100;
}

export function calculatePaybackPeriod(installationCost: number, annualSavings: number): number {
  let cumulativeSavings = 0;
  let years = 0;
  const netCost = calculateNetCost(installationCost);

  while (cumulativeSavings < netCost && years < 25) {
    years++;
    cumulativeSavings += annualSavings * Math.pow(1 + ELECTRICITY_RATE_INCREASE, years - 1);
  }

  return years + (netCost - cumulativeSavings) / (annualSavings * Math.pow(1 + ELECTRICITY_RATE_INCREASE, years));
}

export function calculateLifetimeSavings(annualSavings: number): number {
  let totalSavings = 0;
  for (let year = 0; year < 25; year++) {
    totalSavings += annualSavings * Math.pow(1 + ELECTRICITY_RATE_INCREASE, year);
  }
  return totalSavings;
}

export function validateSystemSize(systemSize: number, roofArea: number): boolean {
  const requiredArea = systemSize * 17.5;
  return requiredArea <= roofArea;
}

export function calculateOptimalConfigurations(monthlyUsage: number, roofArea: number, budget: number): Array<{
  systemSize: number;
  panels: number;
  cost: number;
  savings: number;
  payback: number;
}> {
  const baseSystemSize = calculateSystemSize(monthlyUsage);
  const configurations = [];
  
  // Try different system sizes: 80%, 100%, and 120% of recommended
  const sizeMultipliers = [0.8, 1, 1.2];
  
  for (const multiplier of sizeMultipliers) {
    const size = baseSystemSize * multiplier;
    const panels = calculateNumberOfPanels(size);
    const cost = calculateInstallationCost(size);
    const netCost = calculateNetCost(cost);
    
    if (validateSystemSize(size, roofArea) && netCost <= budget) {
      const annualSavings = (monthlyUsage * 12) * (multiplier) * 0.15; // Assuming $0.15/kWh savings
      configurations.push({
        systemSize: size,
        panels,
        cost: netCost,
        savings: calculateLifetimeSavings(annualSavings),
        payback: calculatePaybackPeriod(cost, annualSavings)
      });
    }
  }
  
  return configurations;
}