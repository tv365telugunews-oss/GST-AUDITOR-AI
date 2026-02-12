import { Link } from 'react-router';
import { FileText, ShoppingCart, FileCheck, Truck, Send, Wrench, ChevronRight, AlertCircle } from 'lucide-react';
import { StatusBadge } from '../components/StatusBadge';

export default function Dashboard() {
  const currentMonth = 'February 2026';
  
  const summaryData = {
    outputGST: 50000,
    inputGST: 30000,
    gstPayable: 20000,
  };

  const alerts = [
    { type: 'urgent' as const, icon: '🔴', text: 'GSTR-1 Due in 2 Days', link: '/returns' },
    { type: 'warning' as const, icon: '🟠', text: 'E-Way Bill Expiring Today', link: '/sales' },
    { type: 'warning' as const, icon: '🟡', text: '3 Invoices Missing IRN', link: '/sales' },
  ];

  const quickActions = [
    { icon: FileText, label: 'Add Sale', link: '/sales/add', gradient: 'from-blue-500 to-blue-600' },
    { icon: ShoppingCart, label: 'Add Purchase', link: '/purchases/add', gradient: 'from-green-500 to-green-600' },
    { icon: FileCheck, label: 'Generate E-Invoice', link: '/sales', gradient: 'from-purple-500 to-purple-600' },
    { icon: Truck, label: 'Generate E-Way Bill', link: '/sales', gradient: 'from-orange-500 to-orange-600' },
  ];

  return (
    <div className="pb-20 bg-[#F9FAFB] min-h-screen">
      {/* Header */}
      <div className="bg-[#1B4B8C] text-white p-6 rounded-b-3xl">
        <div className="max-w-md mx-auto">
          <h1 className="text-2xl font-bold mb-1">Good Morning 👋</h1>
          <p className="text-blue-100">Rajesh Kumar</p>
          <p className="text-sm text-blue-200 mt-1">Business: Kumar Traders</p>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 -mt-6">
        {/* Monthly Summary Card */}
        <div className="bg-white rounded-xl shadow-sm p-5 mb-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-lg">This Month Summary</h2>
            <span className="text-xs text-gray-500">{currentMonth}</span>
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Output GST</span>
              <span className="text-lg font-semibold">₹{summaryData.outputGST.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Input GST</span>
              <span className="text-lg font-semibold">₹{summaryData.inputGST.toLocaleString('en-IN')}</span>
            </div>
            <div className="border-t border-gray-200 pt-3 mt-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-900 font-medium">GST Payable</span>
                <span className="text-2xl font-bold text-[#1B4B8C]">
                  ₹{summaryData.gstPayable.toLocaleString('en-IN')}
                </span>
              </div>
            </div>
          </div>

          <Link
            to="/reports"
            className="mt-4 flex items-center justify-center gap-2 text-[#1B4B8C] font-medium py-2 hover:bg-blue-50 rounded-lg transition-colors"
          >
            View Details
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Alerts Section */}
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-3">
            <AlertCircle className="w-5 h-5 text-red-500" />
            <h3 className="font-semibold">Alerts ({alerts.length})</h3>
          </div>
          <div className="space-y-2">
            {alerts.map((alert, index) => (
              <Link
                key={index}
                to={alert.link}
                className="bg-white rounded-xl p-4 flex items-center gap-3 shadow-sm hover:shadow-md transition-shadow"
              >
                <span className="text-2xl">{alert.icon}</span>
                <span className="flex-1 text-sm font-medium text-gray-800">{alert.text}</span>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </Link>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-4">
          <h3 className="font-semibold mb-3">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-3">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <Link
                  key={index}
                  to={action.link}
                  className="bg-white rounded-xl p-4 flex flex-col items-center justify-center gap-3 shadow-sm hover:shadow-md transition-all min-h-[110px]"
                >
                  <div className={`w-12 h-12 bg-gradient-to-br ${action.gradient} rounded-full flex items-center justify-center`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-sm font-medium text-center text-gray-700">{action.label}</span>
                </Link>
              );
            })}
          </div>
        </div>

        {/* File GST Return */}
        <Link
          to="/returns"
          className="bg-[#FF6B35] text-white rounded-xl p-4 flex items-center justify-between shadow-sm hover:shadow-md transition-all mb-4"
        >
          <div className="flex items-center gap-3">
            <Send className="w-6 h-6" />
            <span className="font-semibold">File GST Return</span>
          </div>
          <ChevronRight className="w-5 h-5" />
        </Link>

        {/* GST Tools */}
        <Link
          to="/tools"
          className="bg-white border-2 border-[#1B4B8C] text-[#1B4B8C] rounded-xl p-4 flex items-center justify-between shadow-sm hover:shadow-md transition-all"
        >
          <div className="flex items-center gap-3">
            <Wrench className="w-6 h-6" />
            <span className="font-semibold">GST Tools</span>
          </div>
          <ChevronRight className="w-5 h-5" />
        </Link>
      </div>
    </div>
  );
}
