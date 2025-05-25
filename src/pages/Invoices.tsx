import React, { useState } from 'react';
import { InvoicesList } from '../components/invoices/InvoicesList';
import { InvoiceForm } from '../components/invoices/InvoiceForm';
import { InvoiceDetail } from '../components/invoices/InvoiceDetail';
import { ReminderSystem } from '../components/invoices/ReminderSystem';
import { Invoice, Notification } from '../types';
import { mockInvoices, mockClients, getClientById } from '../data/mockData';

export const Invoices: React.FC = () => {
  const [invoices, setInvoices] = useState<Invoice[]>(mockInvoices);
  const [viewMode, setViewMode] = useState<'list' | 'form' | 'detail'>('list');
  const [currentInvoice, setCurrentInvoice] = useState<Invoice | undefined>(undefined);

  const handleAddNew = () => {
    setCurrentInvoice(undefined);
    setViewMode('form');
  };

  const handleView = (id: string) => {
    const invoiceToView = invoices.find(invoice => invoice.id === id);
    if (invoiceToView) {
      setCurrentInvoice(invoiceToView);
      setViewMode('detail');
    }
  };

  const handleEdit = (id: string) => {
    const invoiceToEdit = invoices.find(invoice => invoice.id === id);
    if (invoiceToEdit) {
      setCurrentInvoice(invoiceToEdit);
      setViewMode('form');
    }
  };

  const handleDelete = (id: string) => {
    setInvoices(invoices.filter(invoice => invoice.id !== id));
  };

  const handleSend = (id: string) => {
    // Update invoice status to 'sent'
    setInvoices(invoices.map(invoice => 
      invoice.id === id 
        ? { ...invoice, status: 'sent' } 
        : invoice
    ));
  };

  const handleSubmit = (invoiceData: Partial<Invoice>) => {
    if (currentInvoice) {
      // Update existing invoice
      setInvoices(invoices.map(invoice => 
        invoice.id === currentInvoice.id 
          ? { ...invoice, ...invoiceData } 
          : invoice
      ));
    } else {
      // Add new invoice with generated ID
      const newInvoice: Invoice = {
        id: `INV-${new Date().getFullYear()}-${String(invoices.length + 1).padStart(3, '0')}`,
        clientId: invoiceData.clientId || '',
        items: invoiceData.items || [],
        issueDate: invoiceData.issueDate || '',
        dueDate: invoiceData.dueDate || '',
        status: 'draft',
        subtotal: invoiceData.subtotal || 0,
        taxRate: invoiceData.taxRate || 0,
        taxAmount: invoiceData.taxAmount || 0,
        discount: invoiceData.discount || 0,
        total: invoiceData.total || 0,
        notes: invoiceData.notes
      };
      setInvoices([newInvoice, ...invoices]);
    }
    setViewMode('list');
  };

  const handleCancel = () => {
    setViewMode('list');
    setCurrentInvoice(undefined);
  };

  const handleSendReminder = (notifications: Notification[]) => {
    // In a real app, you would integrate with your notification service here
    console.log('Sending reminders:', notifications);
    
    // Simulate sending notifications
    notifications.forEach(notification => {
      alert(`${notification.type} reminder sent to ${notification.recipient}: ${notification.message}`);
    });
  };

  return (
    <div className="p-6 space-y-6">
      {viewMode === 'list' && (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <InvoicesList
                invoices={invoices}
                clients={mockClients}
                onAddNew={handleAddNew}
                onView={handleView}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onSend={handleSend}
              />
            </div>
            <div>
              <ReminderSystem
                invoices={invoices}
                clients={mockClients}
                onSendReminder={handleSendReminder}
              />
            </div>
          </div>
        </>
      )}
      
      {viewMode === 'form' && (
        <InvoiceForm
          key={currentInvoice?.id || 'new'} // Add key for proper re-rendering
          clients={mockClients || []}        // Ensure clients is never undefined
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          initialData={currentInvoice}
        />
      )}
      
      {viewMode === 'detail' && currentInvoice && (
        <InvoiceDetail
          key={currentInvoice.id}           // Add key for proper re-rendering
          invoice={currentInvoice}
          client={getClientById(currentInvoice.clientId) ?? mockClients[0]} // Use nullish coalescing
          onEdit={(id: string) => handleEdit(id)}
          onBack={handleCancel}
          onSend={currentInvoice.status === 'draft' ? 
            (id: string) => handleSend(id) : 
            undefined}
        />
      )}
    </div>
  );
};