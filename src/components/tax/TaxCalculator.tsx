import React from 'react';
import { Select } from '../ui/Select';

interface TaxCalculatorProps {
  amount: number;
  region: string;
  onRegionChange: (region: string) => void;
}

const TAX_RATES: Record<string, number> = {
  US: 0.07,
  EU: 0.20,
  UAE: 0.05,
  OTHER: 0.10,
};

export const TaxCalculator: React.FC<TaxCalculatorProps> = ({
  amount,
  region,
  onRegionChange,
}) => {
  const taxRate = TAX_RATES[region] || TAX_RATES.OTHER;
  const taxAmount = amount * taxRate;
  const total = amount + taxAmount;

  return (
    <div className="space-y-4 p-4 border rounded-md bg-gray-50">
      <div>
        <label className="block text-sm font-medium mb-1">Tax Region</label>
        <Select
          value={region}
          onChange={(e) => onRegionChange(e.target.value)}
          options={[
            { value: 'US', label: 'United States' },
            { value: 'EU', label: 'European Union' },
            { value: 'UAE', label: 'UAE' },
            { value: 'OTHER', label: 'Other Regions' },
          ]}
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-gray-500">Tax Rate</p>
          <p className="font-medium">{(taxRate * 100).toFixed(1)}%</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Tax Amount</p>
          <p className="font-medium">${taxAmount.toFixed(2)}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Total</p>
          <p className="font-medium">${total.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
};
