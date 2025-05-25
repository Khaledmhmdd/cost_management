import React from 'react';
import { Invoice, Client, InvoiceItem } from '../../types';
import { Card, CardHeader, CardContent, CardFooter } from '../ui/Card';
import { Button } from '../ui/Button';
import { StatusBadge } from '../StatusBadge';
import { Printer, Download, Send, Edit } from 'lucide-react';

interface InvoiceDetailProps {
  invoice: Invoice;
  client: Client;
  onEdit: (id: string) => void;
  onBack: () => void;
  onSend?: (id: string) => void;
}

export const InvoiceDetail: React.FC<InvoiceDetailProps> = ({
  invoice,
  client,
  onEdit,
  onBack,
  onSend
}) => {
  const {
    id,
    items,
    issueDate,
    dueDate,
    status,
    subtotal,
    taxRate,
    taxAmount,
    discount,
    total,
    notes
  } = invoice;

  // Format dates
  const formattedIssueDate = new Date(issueDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
  const formattedDueDate = new Date(dueDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <Button variant="outline" onClick={onBack}>
          Back to Invoices
        </Button>
        <div className="flex space-x-2">
          {status === 'draft' && onSend && (
            <Button 
              variant="secondary" 
              icon={<Send size={16} />}
              onClick={() => onSend(id)}
            >
              Send
            </Button>
          )}
          <Button 
            variant="outline" 
            icon={<Edit size={16} />}
            onClick={() => onEdit(id)}
          >
            Edit
          </Button>
          <Button 
            variant="outline" 
            icon={<Download size={16} />}
          >
            Download
          </Button>
          <Button 
            variant="outline" 
            icon={<Printer size={16} />}
            onClick={handlePrint}
          >
            Print
          </Button>
        </div>
      </div>

      <Card className="max-w-4xl mx-auto">
        <CardHeader className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Invoice {id}</h2>
            <div className="mt-1">
              <StatusBadge status={status} />
            </div>
          </div>
          <div className="mt-4 sm:mt-0 text-right">
            <p className="text-sm text-gray-500">Issue Date: {formattedIssueDate}</p>
            <p className="text-sm text-gray-500">Due Date: {formattedDueDate}</p>
          </div>
        </CardHeader>

        <CardContent className="p-6 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-1">From</h3>
              <p className="font-medium">Your Company Name</p>
              <p>123 Business Street</p>
              <p>San Francisco, CA 94107</p>
              <p>contact@yourcompany.com</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-1">Bill To</h3>
              <p className="font-medium">{client.name}</p>
              <p>{client.address}</p>
              <p>{client.email}</p>
              <p>{client.phone}</p>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3">Invoice Items</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Item
                    </th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Quantity
                    </th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Unit Price
                    </th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {items.map((item, index) => (
                    <tr key={index}>
                      <td className="px-4 py-3 text-sm text-gray-900">
                        {item.name}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900 text-right">
                        {item.quantity}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900 text-right">
                        {formatCurrency(item.unitPrice)}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900 text-right">
                        {formatCurrency(item.quantity * item.unitPrice)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="flex justify-end">
            <div className="w-full max-w-xs">
              <div className="flex justify-between py-2">
                <span className="text-sm text-gray-600">Subtotal:</span>
                <span className="text-sm font-medium">{formatCurrency(subtotal)}</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-sm text-gray-600">Tax ({(taxRate * 100).toFixed(0)}%):</span>
                <span className="text-sm font-medium">{formatCurrency(taxAmount)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between py-2">
                  <span className="text-sm text-gray-600">Discount:</span>
                  <span className="text-sm font-medium">-{formatCurrency(discount)}</span>
                </div>
              )}
              <div className="flex justify-between py-2 border-t border-gray-200">
                <span className="text-base font-medium">Total:</span>
                <span className="text-base font-bold">{formatCurrency(total)}</span>
              </div>
            </div>
          </div>

          {notes && (
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-1">Notes</h3>
              <p className="text-sm text-gray-700">{notes}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};