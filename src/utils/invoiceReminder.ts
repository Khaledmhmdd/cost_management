// ✅ Invoice Due Reminder SDK
// File: src/utils/invoiceReminder.ts

export interface ReminderInput {
  invoiceId: string;
  dueDate: string; // ISO format
  clientContact: {
    email: string;
    phone?: string;
  };
}

export interface Notification {
  id: string;
  invoiceId: string;
  type: 'email' | 'sms' | 'in-app';
  message: string;
  recipient: string;
  sentDate: string;
  method: 'email' | 'sms';
}

export function generateReminder({ invoiceId, dueDate, clientContact }: ReminderInput): Notification[] {
  const now = new Date();
  const due = new Date(dueDate);
  const notifications: Notification[] = [];

  // Generate email notification
  notifications.push({
    id: `not-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    invoiceId: invoiceId,
    type: 'email',
    recipient: clientContact.email,
    message: `Your invoice ${invoiceId} is due on ${dueDate}`,
    sentDate: new Date().toISOString(),
    method: 'email',
  });

  // Generate SMS notification if phone exists
  if (clientContact.phone) {
    notifications.push({
      id: `not-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      invoiceId: invoiceId,
      type: 'sms',
      recipient: clientContact.phone,
      message: `Invoice ${invoiceId} due on ${dueDate}`,
      sentDate: new Date().toISOString(),
      method: 'sms',
    });
  }

  return notifications;
}
