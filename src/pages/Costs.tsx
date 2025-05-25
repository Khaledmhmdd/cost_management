import React, { useState } from 'react';
import { CostsList } from '../components/costs/CostsList';
import { CostEntryForm } from '../components/costs/CostEntryForm';
import { CostEntry } from '../types';
import { mockCostEntries } from '../data/mockData';

export const Costs: React.FC = () => {
  const [costs, setCosts] = useState<CostEntry[]>(mockCostEntries);
  const [showForm, setShowForm] = useState(false);
  const [currentCost, setCurrentCost] = useState<CostEntry | undefined>(undefined);

  const handleAddNew = () => {
    setCurrentCost(undefined);
    setShowForm(true);
  };

  const handleEdit = (id: string) => {
    const costToEdit = costs.find(cost => cost.id === id);
    if (costToEdit) {
      setCurrentCost(costToEdit);
      setShowForm(true);
    }
  };

  const handleDelete = (id: string) => {
    setCosts(costs.filter(cost => cost.id !== id));
  };

  const handleSubmit = (costData: Omit<CostEntry, 'id'>) => {
    if (currentCost) {
      // Update existing cost
      setCosts(costs.map(cost => 
        cost.id === currentCost.id 
          ? { ...cost, ...costData } 
          : cost
      ));
    } else {
      // Add new cost with generated ID
      const newCost: CostEntry = {
        id: `cost-${Date.now()}`,
        ...costData
      };
      setCosts([newCost, ...costs]);
    }
    setShowForm(false);
  };

  const handleCancel = () => {
    setShowForm(false);
    setCurrentCost(undefined);
  };

  return (
    <div className="p-6">
      {showForm ? (
        <CostEntryForm
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          initialData={currentCost}
        />
      ) : (
        <CostsList
          costEntries={costs}
          onAddNew={handleAddNew}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
};