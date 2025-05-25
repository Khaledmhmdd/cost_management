import React from 'react';
import { CostEntry } from '../../types';
import { Card, CardContent } from '../ui/Card';
import { Edit, Trash2 } from 'lucide-react';

interface CostEntryCardProps {
  costEntry: CostEntry;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export const CostEntryCard: React.FC<CostEntryCardProps> = ({
  costEntry,
  onEdit,
  onDelete
}) => {
  const { id, category, amount, date, description } = costEntry;
  
  // Format date
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });

  // Format amount as currency
  const formattedAmount = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount);

  return (
    <Card className="hover:shadow-lg transition-shadow duration-300">
      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="text-lg font-medium text-gray-900">{category}</h3>
              <span className="text-sm text-gray-500">{formattedDate}</span>
            </div>
            <p className="mt-1 text-gray-600 line-clamp-2">{description}</p>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-lg font-semibold text-gray-900">{formattedAmount}</span>
            <div className="flex mt-2 space-x-1">
              <button 
                onClick={() => onEdit(id)}
                className="p-1 text-gray-400 hover:text-emerald-600 rounded"
                aria-label="Edit cost entry"
              >
                <Edit size={16} />
              </button>
              <button 
                onClick={() => onDelete(id)}
                className="p-1 text-gray-400 hover:text-red-600 rounded"
                aria-label="Delete cost entry"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};