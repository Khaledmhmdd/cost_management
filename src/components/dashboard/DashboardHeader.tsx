import React from 'react';
import { CircleDollarSign } from 'lucide-react';

export const DashboardHeader: React.FC = () => {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <CircleDollarSign className="h-8 w-8 text-emerald-600" />
            <h1 className="ml-2 text-xl font-semibold text-gray-900">Cost Management</h1>
          </div>
        </div>
      </div>
    </header>
  );
};