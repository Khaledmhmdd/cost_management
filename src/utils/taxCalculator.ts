// ✅ Tax Calculation Library
// File: src/utils/taxCalculator.ts

export interface TaxInput {
  subtotal: number;
  taxRate: number; // as percentage (e.g., 15 for 15%)
}

export interface TaxResult {
  taxAmount: number;
  total: number;
}

export function calculateTax({ subtotal, taxRate }: TaxInput): TaxResult {
  const taxAmount = parseFloat(((subtotal * taxRate) / 100).toFixed(2));
  const total = parseFloat((subtotal + taxAmount).toFixed(2));
  return { taxAmount, total };
}

type TaxRegion = 'US' | 'EU' | 'UAE' | 'OTHER';

interface TaxConfig {
  rate: number;
  includesVAT: boolean;
}

const TAX_RATES: Record<TaxRegion, TaxConfig> = {
  US: { rate: 0.07, includesVAT: false },
  EU: { rate: 0.20, includesVAT: true },
  UAE: { rate: 0.05, includesVAT: true },
  OTHER: { rate: 0.10, includesVAT: false }
};

export const calculateTaxByRegion = (subtotal: number, region: TaxRegion = 'OTHER') => {
  const config = TAX_RATES[region];
  const taxAmount = subtotal * config.rate;
  const total = subtotal + taxAmount;

  return {
    subtotal,
    taxRate: config.rate,
    taxAmount,
    total,
    region,
    includesVAT: config.includesVAT
  };
};
