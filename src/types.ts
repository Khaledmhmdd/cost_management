export interface CostEntry {
  id: string;
  amount: number;
  description: string;
  date: string;
  region: 'US' | 'EU' | 'UAE' | 'OTHER';
  taxAmount: number;
  total: number;
}
