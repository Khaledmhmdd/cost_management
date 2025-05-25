import React, { useState } from 'react';
import { CostEntry } from '../../types';
import { CostEntryCard } from './CostEntryCard';
import { Button } from '../ui/Button';
import { Plus, Filter } from 'lucide-react';

interface CostsListProps {
  costEntries: CostEntry[];
  onAddNew: () => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export const CostsList: React.FC<CostsListProps> = ({
  costEntries,
  onAddNew,
  onEdit,
  onDelete
}) => {
  const [filterCategory, setFilterCategory] = useState<string>('');
  
  // Get unique categories
  const categories = ['All', ...new Set(costEntries.map(entry => entry.category))];
  
  // Filter entries by category
  const filteredEntries = filterCategory === '' || filterCategory === 'All'
    ? costEntries
    : costEntries.filter(entry => entry.category === filterCategory);

  // Calculate total
  const total = filteredEntries.reduce((sum, entry) => sum + entry.amount, 0);
  const formattedTotal = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(total);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Cost Entries</h2>
          <p className="text-gray-600">Total: {formattedTotal}</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative">
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 rounded-md"
            >
              <option value="">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <Filter size={16} />
            </div>
          </div>
          <Button 
            onClick={onAddNew}
            icon={<Plus size={16} />}
          >
            Add New
          </Button>
        </div>
      </div>
      
      {filteredEntries.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredEntries.map(entry => (
            <CostEntryCard
              key={entry.id}
              costEntry={entry}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-500">No cost entries found.</p>
          <Button 
            onClick={onAddNew}
            variant="outline"
            className="mt-4"
            icon={<Plus size={16} />}
          >
            Add Your First Cost Entry
          </Button>
        </div>
      )}
    </div>
  );
};