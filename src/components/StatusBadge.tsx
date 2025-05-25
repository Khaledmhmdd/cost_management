import React from 'react';
import { Badge } from './ui/Badge';

interface StatusBadgeProps {
  status: 'draft' | 'sent' | 'paid' | 'overdue';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const statusMap = {
    draft: { variant: 'default', label: 'Draft' },
    sent: { variant: 'default', label: 'Sent' },
    paid: { variant: 'success', label: 'Paid' },
    overdue: { variant: 'error', label: 'Overdue' }
  };

  const { variant, label } = statusMap[status];

  return (
    <Badge variant={variant as any}>{label}</Badge>
  );
};