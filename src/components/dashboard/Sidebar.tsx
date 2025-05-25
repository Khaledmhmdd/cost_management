import React from 'react';
import { 
  CircleDollarSign, 
  FileText,
  PieChart, 
} from 'lucide-react';

interface SidebarItemProps {
  icon: React.ReactNode;
  text: string;
  isActive?: boolean;
  onClick?: () => void;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ icon, text, isActive = false, onClick }) => {
  return (
    <li>
      <button
        onClick={onClick}
        className={`flex items-center w-full px-3 py-2 text-sm font-medium rounded-md ${
          isActive 
            ? 'bg-blue-800 text-white' 
            : 'text-gray-300 hover:bg-blue-700 hover:text-white'
        }`}
      >
        <span className="mr-3">{icon}</span>
        {text}
      </button>
    </li>
  );
};

interface SidebarProps {
  activeItem: string;
  onNavigate: (item: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeItem, onNavigate }) => {
  const menuItems = [
    { id: 'dashboard', icon: <PieChart size={20} />, text: 'Dashboard' },
    { id: 'costs', icon: <CircleDollarSign size={20} />, text: 'Costs' },
    { id: 'invoices', icon: <FileText size={20} />, text: 'Invoices' },
  ];

  return (
    <aside className="w-64 h-screen bg-blue-900 text-white">
      <div className="flex items-center justify-center h-16 border-b border-blue-700">
        <CircleDollarSign className="h-8 w-8" />
        <h2 className="ml-2 text-xl font-bold">FinanceFlow</h2>
      </div>
      <nav className="mt-5">
        <ul className="space-y-2 px-2">
          {menuItems.map((item) => (
            <SidebarItem
              key={item.id}
              icon={item.icon}
              text={item.text}
              isActive={activeItem === item.id}
              onClick={() => onNavigate(item.id)}
            />
          ))}
        </ul>
      </nav>
    </aside>
  );
};