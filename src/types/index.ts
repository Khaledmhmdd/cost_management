export interface CostEntry {
  id: string;
  category: string;
  amount: number;
  date: string;
  description: string;
}

export interface InvoiceItem {
  id: string;
  name: string;
  quantity: number;
  unitPrice: number;
}

export interface Client {
  id: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
}

export interface Invoice {
  id: string;
  clientId: string;
  items: InvoiceItem[];
  issueDate: string;
  dueDate: string;
  status: 'draft' | 'sent' | 'paid' | 'overdue';
  subtotal: number;
  taxRate: number;
  taxAmount: number;
  discount: number;
  total: number;
  notes?: string;
}

export interface TaxSettings {
  region: string;
  rate: number;
}

export interface Notification {
  id: string;
  invoiceId: string;
  type: 'email' | 'sms';
  recipient: string;
  message: string;
  sentDate: string;
  method: 'email' | 'sms';
}