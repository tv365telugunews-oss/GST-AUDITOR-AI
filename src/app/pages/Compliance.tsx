import { useNavigate } from 'react-router';
import { ArrowLeft, CheckCircle2, AlertCircle, Shield } from 'lucide-react';
import { StatusBadge } from '../components/StatusBadge';

export default function Compliance() {
  const navigate = useNavigate();

  const complianceItems = [
    { title: 'GSTR-1 Filing', status: 'pending', dueDate: '11th March' },
    { title: 'GSTR-3B Filing', status: 'pending', dueDate: '20th March' },
    { title: 'E-Invoice Generation', status: 'compliant', detail: 'All invoices have IRN' },
    { title: 'E-Way Bills', status: 'warning', detail: '2 bills expiring soon' },
    { title: 'Input Tax Credit', status: 'compliant', detail: 'All purchases verified' },
  ];

  return (
    <div className="pb-20 bg-[#F9FAFB] min-h-screen">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-md mx-auto px-4 py-4 flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 rounded-full">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-xl font-semibold">Compliance Status</h1>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 py-6">
        {/* Overall Status */}
        <div className="bg-gradient-to-br from-[#1B4B8C] to-[#2a5fa8] text-white rounded-xl p-6 mb-6 text-center">
          <Shield className="w-16 h-16 mx-auto mb-3" />
          <h2 className="text-2xl font-bold mb-2">85% Compliant</h2>
          <p className="text-blue-100">2 actions needed to reach 100%</p>
        </div>

        {/* Compliance Checklist */}
        <div className="space-y-3">
          {complianceItems.map((item, index) => (
            <div key={index} className="bg-white rounded-xl p-4 shadow-sm">
              <div className="flex items-start gap-3">
                {item.status === 'compliant' ? (
                  <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                ) : (
                  <AlertCircle className="w-6 h-6 text-amber-500 flex-shrink-0 mt-1" />
                )}
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
                  {item.dueDate && (
                    <p className="text-sm text-gray-600 mb-2">Due: {item.dueDate}</p>
                  )}
                  {item.detail && (
                    <p className="text-sm text-gray-600 mb-2">{item.detail}</p>
                  )}
                  <StatusBadge
                    status={item.status === 'compliant' ? 'success' : item.status === 'pending' ? 'warning' : 'urgent'}
                    text={item.status === 'compliant' ? 'Compliant' : item.status === 'pending' ? 'Pending' : 'Action Required'}
                    icon={false}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
