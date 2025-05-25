import React, { useState } from 'react';
import { Invoice, Client } from '../../types';
import { InvoiceCard } from './InvoiceCard';
import { Button } from '../ui/Button';
import { Plus, Filter } from 'lucide-react';

interface InvoicesListProps {
  invoices: Invoice[];
  clients: Client[];
  onAddNew: () => void;
  onView: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onSend: (id: string) => void;
}

export const InvoicesList: React.FC<InvoicesListProps> = ({
  invoices,
  clients,
  onAddNew,
  onView,
  onEdit,
  onDelete,
  onSend
}) => {
  const [filterStatus, setFilterStatus] = useState<string>('');
  
  // Filter invoices by status
  const filteredInvoices = filterStatus === ''
    ? invoices
    : invoices.filter(invoice => invoice.status === filterStatus);

  // Calculate total
  const total = filteredInvoices.reduce((sum, invoice) => sum + invoice.total, 0);
  const formattedTotal = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(total);

  const getClientById = (clientId: string): Client => {
    return clients.find(client => client.id === clientId) || {
      id: '',
      name: 'Unknown Client',
      email: ''
    };
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Invoices</h2>
          <p className="text-gray-600">Total: {formattedTotal}</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 rounded-md"
            >
              <option value="">All Statuses</option>
              <option value="draft">Draft</option>
              <option value="sent">Sent</option>
              <option value="paid">Paid</option>
              <option value="overdue">Overdue</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <Filter size={16} />
            </div>
          </div>
          <Button 
            onClick={onAddNew}
            icon={<Plus size={16} />}
          >
            New Invoice
          </Button>
        </div>
      </div>
      
      {filteredInvoices.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredInvoices.map(invoice => (
            <InvoiceCard
              key={invoice.id}
              invoice={invoice}
              client={getClientById(invoice.clientId)}
              onView={onView}
              onEdit={onEdit}
              onDelete={onDelete}
              onSend={onSend}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-500">No invoices found.</p>
          <Button 
            onClick={onAddNew}
            variant="outline"
            className="mt-4"
            icon={<Plus size={16} />}
          >
            Create Your First Invoice
          </Button>
        </div>
      )}
    </div>
  );
};