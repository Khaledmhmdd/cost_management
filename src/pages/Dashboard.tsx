import React from 'react';
import { FinancialOverview } from '../components/dashboard/FinancialOverview';
import { mockCostEntries, mockInvoices } from '../data/mockData';

export const Dashboard: React.FC = () => {
  return (
    <div className="p-6">
      <FinancialOverview 
        costEntries={mockCostEntries}
        invoices={mockInvoices}
      />
    </div>
  );
};