import { Link } from 'react-router';
import { useAuth } from '../contexts/AuthContext';
import {
  User,
  Building2,
  Settings,
  Bell,
  HelpCircle,
  FileText,
  Shield,
  LogOut,
  ChevronRight,
  CreditCard,
  UserCog,
} from 'lucide-react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router';

export default function More() {
  const { user, isAdmin, logout } = useAuth();
  const navigate = useNavigate();

  const menuSections = [
    {
      title: 'Account',
      items: [
        { icon: User, label: 'Profile', link: '/profile' },
        { icon: Building2, label: 'Business Details', link: '/business' },
        { icon: CreditCard, label: 'Subscription', link: '/subscription', badge: 'Pro' },
        { icon: Bell, label: 'Notifications', link: '/notifications', badge: '3' },
      ],
    },
    {
      title: 'GST',
      items: [
        { icon: FileText, label: 'GST Returns', link: '/returns' },
        { icon: Shield, label: 'Compliance Status', link: '/compliance' },
      ],
    },
    {
      title: 'Support',
      items: [
        { icon: HelpCircle, label: 'Help & Support', link: '/help' },
        { icon: Settings, label: 'Settings', link: '/settings' },
      ],
    },
  ];

  // Add Admin section if user is admin
  if (isAdmin) {
    menuSections.unshift({
      title: 'Administration',
      items: [
        { icon: UserCog, label: 'Admin Panel', link: '/admin' },
      ],
    });
  }

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    navigate('/welcome');
  };

  return (
    <div className="pb-20 bg-[#F9FAFB] min-h-screen">
      {/* Header */}
      <div className="bg-[#1B4B8C] text-white p-6 rounded-b-3xl">
        <div className="max-w-md mx-auto">
          <h1 className="text-2xl font-bold mb-1">More</h1>
          <p className="text-blue-100">Settings & Account</p>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 -mt-6">
        {/* Profile Card */}
        <Link
          to="/profile"
          className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow mb-4 flex items-center gap-4"
        >
          <div className="w-16 h-16 bg-gradient-to-br from-[#1B4B8C] to-[#2a5fa8] rounded-full flex items-center justify-center text-white text-2xl font-bold">
            {user?.name?.substring(0, 2).toUpperCase() || 'RK'}
          </div>
          <div className="flex-1">
            <h2 className="font-bold text-lg text-gray-900">{user?.name || 'Rajesh Kumar'}</h2>
            <p className="text-sm text-gray-600">{user?.businessName || 'Kumar Traders'}</p>
            <p className="text-xs text-gray-500 mt-1">GSTIN: {user?.gstin || '27XXXXX1234X1ZX'}</p>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-400" />
        </Link>

        {/* Menu Sections */}
        {menuSections.map((section, sectionIndex) => (
          <div key={sectionIndex} className="mb-4">
            <h3 className="font-semibold text-gray-700 mb-2 px-2">{section.title}</h3>
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              {section.items.map((item, itemIndex) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={itemIndex}
                    to={item.link}
                    className={`flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors ${
                      itemIndex !== section.items.length - 1 ? 'border-b border-gray-100' : ''
                    }`}
                  >
                    <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                      <Icon className="w-5 h-5 text-gray-700" />
                    </div>
                    <span className="flex-1 font-medium text-gray-900">{item.label}</span>
                    {item.badge && (
                      <span className="px-2 py-1 bg-red-500 text-white text-xs font-semibold rounded-full">
                        {item.badge}
                      </span>
                    )}
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </Link>
                );
              })}
            </div>
          </div>
        ))}

        {/* Version & Logout */}
        <div className="space-y-3 mt-6">
          <button
            onClick={handleLogout}
            className="w-full bg-white border border-red-200 text-red-600 rounded-xl p-4 font-semibold flex items-center justify-center gap-2 hover:bg-red-50 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
          <p className="text-center text-sm text-gray-500">Version 1.0.0</p>
        </div>
      </div>
    </div>
  );
}