import { CostEntry, Invoice, Client, TaxSettings } from '../types';

export const mockClients: Client[] = [
  {
    id: '1',
    name: 'Mostafa',
    email: 'wael06482@gmail.com',
    phone: '(555) 123-4567',
    address: '123 Business Ave, Suite 100, San Francisco, CA 94107'
  },
  {
    id: '2',
    name: 'Globex Industries',
    email: 'accounts@globex.com',
    phone: '(555) 987-6543',
    address: '456 Corporate Blvd, New York, NY 10001'
  },
  {
    id: '3',
    name: 'Stark Enterprises',
    email: 'finance@stark.com',
    phone: '(555) 789-0123',
    address: '789 Innovation Way, Malibu, CA 90265'
  }
];

export const mockCostEntries: CostEntry[] = [
  {
    id: '1',
    category: 'Office Supplies',
    amount: 125.75,
    date: '2025-04-15',
    description: 'Quarterly office supply restock'
  },
  {
    id: '2',
    category: 'Software',
    amount: 499.99,
    date: '2025-04-10',
    description: 'Annual subscription to design software'
  },
  {
    id: '3',
    category: 'Marketing',
    amount: 2500,
    date: '2025-04-05',
    description: 'Trade show booth expenses'
  },
  {
    id: '4',
    category: 'Travel',
    amount: 1250.50,
    date: '2025-04-02',
    description: 'Client meeting travel expenses'
  },
  {
    id: '5',
    category: 'Utilities',
    amount: 350.25,
    date: '2025-03-28',
    description: 'Monthly utility bills'
  }
];

export const mockInvoices: Invoice[] = [
  {
    id: 'INV_1',
    clientId: '1',
    items: [
      { id: '1', name: 'Web Development', quantity: 40, unitPrice: 125 },
      { id: '2', name: 'UI/UX Design', quantity: 20, unitPrice: 150 }
    ],
    issueDate: '2025-04-01',
    dueDate: '2025-05-01',
    status: 'sent',
    subtotal: 8000,
    taxRate: 0.08,
    taxAmount: 640,
    discount: 500,
    total: 8140,
    notes: 'Payment due within 30 days'
  },
  {
    id: 'INV-2',
    clientId: '2',
    items: [
      { id: '1', name: 'Server Maintenance', quantity: 10, unitPrice: 200 },
      { id: '2', name: 'Security Audit', quantity: 1, unitPrice: 3000 }
    ],
    issueDate: '2025-03-15',
    dueDate: '2025-04-15',
    status: 'overdue',
    subtotal: 5000,
    taxRate: 0.08,
    taxAmount: 400,
    discount: 0,
    total: 5400,
    notes: 'Net 30 terms'
  },
  {
    id: 'INV-2025-003',
    clientId: '3',
    items: [
      { id: '1', name: 'Mobile App Development', quantity: 80, unitPrice: 150 }
    ],
    issueDate: '2025-04-10',
    dueDate: '2025-05-10',
    status: 'draft',
    subtotal: 12000,
    taxRate: 0.08,
    taxAmount: 960,
    discount: 1000,
    total: 11960,
    notes: 'Initial app development phase'
  }
];

export const mockTaxSettings: TaxSettings[] = [
  { region: 'California', rate: 0.0725 },
  { region: 'New York', rate: 0.045 },
  { region: 'Texas', rate: 0.0625 },
  { region: 'Florida', rate: 0.06 },
  { region: 'Washington', rate: 0.065 }
];

export const getClientById = (id: string): Client | undefined => {
  return mockClients.find(client => client.id === id);
};

export const getInvoiceById = (id: string): Invoice | undefined => {
  return mockInvoices.find(invoice => invoice.id === id);
};