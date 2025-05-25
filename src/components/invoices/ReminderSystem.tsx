import React from 'react';
import { Card, CardHeader, CardContent } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { Bell } from 'lucide-react';
import { Invoice, Client, Notification } from '../../types';
import { generateReminder } from '../../utils/invoiceReminder';

interface ReminderSystemProps {
  invoices: Invoice[];
  clients: Client[];
  onSendReminder: (notifications: Notification[]) => void;
}

export const ReminderSystem: React.FC<ReminderSystemProps> = ({
  invoices,
  clients,
  onSendReminder,
}) => {
  const getPendingReminders = () => {
    const reminders: { invoice: Invoice; notifications: Notification[] }[] = [];

    invoices.forEach((invoice) => {
      if (invoice.status === 'sent' || invoice.status === 'overdue') {
        const client = clients.find((c) => c.id === invoice.clientId);
        if (client) {
          const notifications = generateReminder({
            invoiceId: invoice.id,
            dueDate: invoice.dueDate,
            clientContact: {
              email: client.email,
              phone: client.phone,
            },
            
          });

          if (notifications.length > 0) {
            reminders.push({ invoice, notifications });
          }
        }
      }
    });

    return reminders;
  };

  const pendingReminders = getPendingReminders();

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium">Pending Reminders</h3>
          <Badge variant="warning">{pendingReminders.length}</Badge>
        </div>
      </CardHeader>
      <CardContent>
        {pendingReminders.length > 0 ? (
          <div className="space-y-4">
            {pendingReminders.map(({ invoice, notifications }) => (
              <div
                key={invoice.id}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div>
                  <p className="font-medium">Invoice {invoice.id}</p>
                  <p className="text-sm text-gray-500">
                    Due: {new Date(invoice.dueDate).toLocaleDateString()}
                  </p>
                </div>
                <Button
                  size="sm"
                  onClick ={() => onSendReminder(notifications)}
                  icon={<Bell size={16} />}
                >
                  Send Reminder
                </Button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 py-4">No pending reminders</p>
        )}
      </CardContent>
    </Card>
  );
};
