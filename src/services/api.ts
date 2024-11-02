const API_KEY = 'PGyPJlEuoWU8FeQyPRjPHEnigZ7TKFUl7zM2EMql';
const BASE_URL = 'https://developer.nrel.gov/api';
// const GOOGLE_API_KEY = 'AIzaSyBSYrO9G1mYJsU7UFufBsbm8e7PBNE2r9U'

export async function getSolarResource(address: string) {
  const response = await fetch(
    `${BASE_URL}/solar/solar_resource/v1.json?api_key=${API_KEY}&address=${encodeURIComponent(address)}`
  );
  if (!response.ok) throw new Error('Failed to fetch solar resource data');
  return response.json();
}

// export interface GoogleSolarResponse {
//   name: string;
//   center: {
//     latitude: number;
//     longitude: number;
//   };
//   solarPotential: {
//     maxArrayPanelsCount: number;
//     maxArrayAreaMeters2: number;
//     maxSunshineHoursPerYear: number;
//     carbonOffsetFactorKgPerMwh: number;
//     panelCapacityWatts: number;
//     solarPanelConfigs: Array<{
//       panelsCount: number;
//       yearlyEnergyDcKwh: number;
//       roofSegmentSummaries: Array<{
//         pitchDegrees: number;
//         azimuthDegrees: number;
//         panelsCount: number;
//         yearlyEnergyDcKwh: number;
//         segmentIndex: number;
//       }>;
//     }>;
//     financialAnalyses: Array<{
//       monthlyBill: {
//         currencyCode: string;
//         units: string;
//       };
//       panelConfigIndex: number;
//       financialDetails?: {
//         initialAcKwhPerYear: number;
//         solarPercentage: number;
//         percentageExportedToGrid: number;
//       };
//       cashPurchaseSavings?: {
//         outOfPocketCost: {
//           currencyCode: string;
//           units: string;
//         };
//         paybackYears: number;
//         savings: {
//           savingsYear1: {
//             currencyCode: string;
//             units: string;
//           };
//           savingsYear20: {
//             currencyCode: string;
//             units: string;
//           };
//         };
//       };
//     }>;
//   };
// }

// export async function getGoogleSolarData(latitude: number, longitude: number) {
//   const response = await fetch(
//     `https://solar.googleapis.com/v1/buildingInsights:findClosest?key=${GOOGLE_API_KEY}&location.latitude=${latitude}&location.longitude=${longitude}`
//   );
//   if (!response.ok) throw new Error('Failed to fetch Google Solar data');
//   return response.json();
// }

export async function getPVWattsData(address: string) {
  const params = new URLSearchParams({
    api_key: API_KEY,
    address: address,
    system_capacity: '4',
    module_type: '0',
    losses: '14',
    array_type: '1',
    tilt: '20',
    azimuth: '180',
    timeframe: 'monthly'
  });

  const response = await fetch(
    `${BASE_URL}/pvwatts/v8.json?${params.toString()}`
  );
  if (!response.ok) throw new Error('Failed to fetch PVWatts data');
  return response.json();
}

export function calculateEnvironmentalImpact(annualProduction: number) {
  // EPA estimates 0.709 kg CO2 per kWh
  const co2ReductionKg = annualProduction * 0.709;
  const co2ReductionTons = co2ReductionKg / 907.18; // Convert kg to tons
  
  // EPA estimates 0.0165 acre of forest absorbs 1 ton of CO2
  const treesEquivalent = Math.round(co2ReductionTons * 16.5);
  
  return {
    co2Reduction: Number(co2ReductionTons.toFixed(1)),
    treesEquivalent
  };
}