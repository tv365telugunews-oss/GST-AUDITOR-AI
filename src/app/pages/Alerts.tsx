import { Link } from 'react-router';
import { AlertCircle, Clock, CheckCircle2, ChevronRight } from 'lucide-react';

export default function Alerts() {
  const alerts = {
    urgent: [
      {
        title: 'GSTR-1 Filing',
        description: 'Due in 2 days',
        penalty: 'Late fee: ₹200/day',
        link: '/returns/gstr1',
      },
      {
        title: 'E-Way Bill Expiry',
        description: '2 bills expiring today',
        penalty: 'Generate new bills immediately',
        link: '/sales',
      },
    ],
    upcoming: [
      {
        title: 'GSTR-3B Filing',
        description: 'Due in 8 days',
        penalty: '',
        link: '/returns/gstr3b',
      },
      {
        title: 'Invoice IRN Missing',
        description: '3 invoices without IRN',
        penalty: 'Generate IRN before filing',
        link: '/sales',
      },
      {
        title: 'Input Tax Credit',
        description: 'Verify purchases for ITC',
        penalty: '',
        link: '/purchases',
      },
    ],
    completed: [
      {
        title: 'GSTR-1 - January',
        description: 'Filed on 10th Feb',
        link: '/returns',
      },
      {
        title: 'All Invoices IRN Generated',
        description: 'Completed on 8th Feb',
        link: '/sales',
      },
      {
        title: 'Payment Reconciliation',
        description: 'Completed on 5th Feb',
        link: '/reports',
      },
    ],
  };

  return (
    <div className="pb-20 bg-[#F9FAFB] min-h-screen">
      {/* Header */}
      <div className="bg-[#1B4B8C] text-white p-6 rounded-b-3xl">
        <div className="max-w-md mx-auto">
          <h1 className="text-2xl font-bold mb-1">Alerts & Due Dates</h1>
          <p className="text-blue-100">Stay Compliant</p>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 -mt-6">
        {/* Urgent Alerts */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            <h2 className="font-semibold text-lg text-red-600">Urgent ({alerts.urgent.length})</h2>
          </div>
          <div className="space-y-3">
            {alerts.urgent.map((alert, index) => (
              <Link
                key={index}
                to={alert.link}
                className="bg-white border-l-4 border-red-500 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow block"
              >
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-1">
                      <h3 className="font-bold text-gray-900">{alert.title}</h3>
                      <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0" />
                    </div>
                    <p className="text-sm text-gray-600 mb-1">{alert.description}</p>
                    {alert.penalty && (
                      <p className="text-sm text-red-600 font-medium">{alert.penalty}</p>
                    )}
                    <button className="mt-3 px-4 py-2 bg-red-500 text-white rounded-lg font-medium text-sm hover:bg-red-600 transition-colors">
                      Act Now
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Upcoming Alerts */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <Clock className="w-5 h-5 text-amber-600" />
            <h2 className="font-semibold text-lg text-amber-600">Upcoming ({alerts.upcoming.length})</h2>
          </div>
          <div className="space-y-3">
            {alerts.upcoming.map((alert, index) => (
              <Link
                key={index}
                to={alert.link}
                className="bg-white border-l-4 border-amber-400 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow block"
              >
                <div className="flex items-start gap-3">
                  <Clock className="w-6 h-6 text-amber-500 flex-shrink-0 mt-1" />
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-1">
                      <h3 className="font-bold text-gray-900">{alert.title}</h3>
                      <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0" />
                    </div>
                    <p className="text-sm text-gray-600 mb-1">{alert.description}</p>
                    {alert.penalty && (
                      <p className="text-sm text-amber-600">{alert.penalty}</p>
                    )}
                    <button className="mt-3 px-4 py-2 bg-amber-100 text-amber-700 rounded-lg font-medium text-sm hover:bg-amber-200 transition-colors">
                      Prepare
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Completed */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <CheckCircle2 className="w-5 h-5 text-green-600" />
            <h2 className="font-semibold text-lg text-green-600">Completed ({alerts.completed.length})</h2>
          </div>
          <div className="space-y-3">
            {alerts.completed.map((alert, index) => (
              <Link
                key={index}
                to={alert.link}
                className="bg-white border-l-4 border-green-400 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow block opacity-75"
              >
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-1">
                      <h3 className="font-bold text-gray-900">{alert.title}</h3>
                      <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0" />
                    </div>
                    <p className="text-sm text-gray-600">{alert.description}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
