# 💼 Cost Management SDK - React Implementation

This repository provides a modular set of SDKs and libraries implemented in **React** for handling cost entries, invoice generation/editing, due reminders, and tax calculations. It utilizes **localStorage** for data persistence.

---

## 🧩 Modules Overview

### 1. 🧾 Cost Entry SDK
- **Functionality**: Log individual cost entries with descriptive details.
- **Inputs**:
  - `category` (string)
  - `amount` (number)
  - `date` (ISO string)
  - `description` (string)
- **Outputs**: Cost record object stored in localStorage.

---

### 2. 🧮 Invoice Generation SDK
- **Functionality**: Create invoices with client and service/product details.
- **Inputs**:
  - `clientId` (string)
  - `items[]` (name, quantity, unit price)
  - `tax` (percentage)
  - `discount` (optional)
- **Outputs**: Invoice object with a unique invoice number.

---

### 3. ✏️ Invoice Editing Library
- **Functionality**: Update or correct previously issued invoices.
- **Inputs**:
  - `invoiceId` (string)
  - `updatedItems`, `updatedAmounts`, etc.
- **Outputs**: Modified invoice object persisted in localStorage.

---

### 4. ⏰ Invoice Due Reminder SDK
- **Functionality**: Notify clients about upcoming or overdue invoices.
- **Inputs**:
  - `invoiceId`
  - `dueDate`
  - `clientContact` (email, SMS, etc.)
- **Outputs**: Notification object (simulated alert/email/SMS logic).

---

### 5. 🧾 Tax Calculation Library
- **Functionality**: Auto-calculate tax based on region.
- **Inputs**:
  - `subtotal` (number)
  - `taxRate` (percentage)
  - `region` (string)
- **Outputs**: 
  - `taxAmount`
  - `totalWithTax`

---

## 🚀 Getting Started

### 1. Clone the Repo
```bash
git clone https://github.com/Khaledmhmdd/cost_management.git
cd cost-management-sdk
npm install
npm run dev
