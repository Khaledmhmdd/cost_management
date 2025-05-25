import React from 'react';
import { Invoice, Client } from '../../types';
import { Card, CardContent } from '../ui/Card';
import { StatusBadge } from '../StatusBadge';
import { Edit, FileText, Trash2, Send } from 'lucide-react';

interface InvoiceCardProps {
  invoice: Invoice;
  client: Client;
  onView: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onSend: (id: string) => void;
}

export const InvoiceCard: React.FC<InvoiceCardProps> = ({
  invoice,
  client,
  onView,
  onEdit,
  onDelete,
  onSend
}) => {
  const { id, issueDate, dueDate, status, total } = invoice;
  
  // Format dates
  const formattedIssueDate = new Date(issueDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
  
  const formattedDueDate = new Date(dueDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });

  // Format amount as currency
  const formattedTotal = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(total);

  return (
    <Card className="hover:shadow-lg transition-shadow duration-300">
      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="text-lg font-medium text-gray-900">{id}</h3>
              <StatusBadge status={status} />
            </div>
            <p className="mt-1 text-gray-600">{client.name}</p>
            <div className="mt-2 text-sm text-gray-500">
              <p>Issued: {formattedIssueDate}</p>
              <p>Due: {formattedDueDate}</p>
            </div>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-lg font-semibold text-gray-900">{formattedTotal}</span>
            <div className="flex mt-2 space-x-1">
              <button 
                onClick={() => onView(id)}
                className="p-1 text-gray-400 hover:text-blue-600 rounded"
                aria-label="View invoice"
              >
                <FileText size={16} />
              </button>
              <button 
                onClick={() => onEdit(id)}
                className="p-1 text-gray-400 hover:text-emerald-600 rounded"
                aria-label="Edit invoice"
              >
                <Edit size={16} />
              </button>
              {status === 'draft' && (
                <button 
                  onClick={() => onSend(id)}
                  className="p-1 text-gray-400 hover:text-blue-600 rounded"
                  aria-label="Send invoice"
                >
                  <Send size={16} />
                </button>
              )}
              <button 
                onClick={() => onDelete(id)}
                className="p-1 text-gray-400 hover:text-red-600 rounded"
                aria-label="Delete invoice"
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