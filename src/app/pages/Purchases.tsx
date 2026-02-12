import { Link } from 'react-router';
import { Plus, ShoppingCart, ChevronDown } from 'lucide-react';
import { StatusBadge } from '../components/StatusBadge';

export default function Purchases() {
  const purchases = [
    {
      id: 'PUR-001',
      date: '12 Feb',
      vendor: 'Wholesale Suppliers Ltd',
      amount: 10000,
      gst: 1800,
      status: 'completed' as const,
    },
    {
      id: 'PUR-002',
      date: '10 Feb',
      vendor: 'Raw Materials Corp',
      amount: 25000,
      gst: 4500,
      status: 'completed' as const,
    },
    {
      id: 'PUR-003',
      date: '08 Feb',
      vendor: 'Office Supplies Inc',
      amount: 5000,
      gst: 900,
      status: 'completed' as const,
    },
  ];

  const totalPurchases = purchases.reduce((sum, pur) => sum + pur.amount, 0);
  const totalGST = purchases.reduce((sum, pur) => sum + pur.gst, 0);

  return (
    <div className="pb-20 bg-[#F9FAFB] min-h-screen">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-md mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-3">
            <h1 className="text-xl font-semibold">Purchase Invoices</h1>
          </div>
          <Link
            to="/purchases/add"
            className="w-full bg-[#10B981] text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-[#059669] transition-colors"
          >
            <Plus className="w-5 h-5" />
            Add Purchase
          </Link>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 py-4">
        {/* Month Selector */}
        <div className="mb-4">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
            <span className="font-medium">February 2026</span>
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>

        {/* Purchase List */}
        <div className="space-y-3 mb-4">
          {purchases.map((purchase) => (
            <div
              key={purchase.id}
              className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-gray-900">{purchase.id}</span>
                    <span className="text-sm text-gray-500">| {purchase.date}</span>
                  </div>
                  <p className="text-sm text-gray-600">{purchase.vendor}</p>
                </div>
                <StatusBadge status="success" text="Verified" icon={false} />
              </div>

              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="text-xs text-gray-500">Amount</p>
                  <p className="text-lg font-bold text-gray-900">
                    ₹{purchase.amount.toLocaleString('en-IN')}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-500">Input GST</p>
                  <p className="font-semibold text-[#10B981]">
                    ₹{purchase.gst.toLocaleString('en-IN')}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 pt-3 border-t border-gray-100">
                <button className="flex-1 py-2 text-sm font-medium text-[#10B981] bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
                  View Details
                </button>
                <button className="flex-1 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="bg-gradient-to-br from-[#10B981] to-[#059669] text-white rounded-xl p-5 shadow-lg">
          <h3 className="text-sm font-medium mb-3 opacity-90">Monthly Summary</h3>
          <div className="flex justify-between items-center mb-2">
            <span className="text-base">Total Purchases</span>
            <span className="text-2xl font-bold">₹{totalPurchases.toLocaleString('en-IN')}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-base">Total Input GST</span>
            <span className="text-xl font-bold">₹{totalGST.toLocaleString('en-IN')}</span>
          </div>
        </div>

        {/* Info Card */}
        <div className="mt-4 bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex gap-3">
            <ShoppingCart className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-blue-900 mb-1">Input Tax Credit (ITC)</h4>
              <p className="text-sm text-blue-700">
                You can claim ₹{totalGST.toLocaleString('en-IN')} as input tax credit this month.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
