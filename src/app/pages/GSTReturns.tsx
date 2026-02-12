import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { FileText, ChevronRight, Calendar } from 'lucide-react';
import { StatusBadge } from '../components/StatusBadge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../components/ui/dialog';
import { toast } from 'sonner';

export default function GSTReturns() {
  const navigate = useNavigate();
  const [filingDialog, setFilingDialog] = useState(false);
  const [selectedReturn, setSelectedReturn] = useState<string>('');
  
  const returns = [
    {
      id: 'gstr1',
      title: 'GSTR-1',
      description: 'Outward Supplies',
      dueDate: '11th March',
      daysLeft: 2,
      status: 'urgent' as const,
      statusText: 'Pending',
      icon: '📋',
    },
    {
      id: 'gstr3b',
      title: 'GSTR-3B',
      description: 'Monthly Summary & Payment',
      dueDate: '20th March',
      daysLeft: 8,
      status: 'warning' as const,
      statusText: 'Not Started',
      icon: '📊',
    },
    {
      id: 'gstr9',
      title: 'GSTR-9',
      description: 'Annual Return',
      dueDate: '31st December',
      daysLeft: 293,
      status: 'success' as const,
      statusText: 'Filed',
      icon: '📑',
    },
  ];

  const handleFileNow = (returnId: string, returnTitle: string) => {
    setSelectedReturn(returnTitle);
    setFilingDialog(true);
  };

  const handleFilingSubmit = () => {
    setFilingDialog(false);
    toast.success('Filing Initiated', {
      description: `${selectedReturn} filing process has been started. You will be notified once completed.`,
    });
  };

  const handleGetAIHelp = () => {
    toast.info('AI Assistant', {
      description: 'Opening AI assistant to help with GST return filing...',
    });
    // In a real app, this would open the AI chat interface
    setTimeout(() => {
      navigate('/');
      // Trigger AI assistant opening
    }, 500);
  };

  return (
    <div className="pb-20 bg-[#F9FAFB] min-h-screen">
      {/* Header */}
      <div className="bg-[#1B4B8C] text-white p-6 rounded-b-3xl">
        <div className="max-w-md mx-auto">
          <h1 className="text-2xl font-bold mb-1">GST Returns</h1>
          <p className="text-blue-100">File Your Returns on Time</p>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 -mt-6">
        {/* Monthly Returns */}
        <div className="mb-6">
          <h2 className="font-semibold text-lg mb-3 text-gray-700">Monthly Returns</h2>
          <div className="space-y-3">
            {returns.slice(0, 2).map((returnItem) => (
              <Link
                key={returnItem.id}
                to={`/returns/${returnItem.id}`}
                className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow block"
              >
                <div className="flex items-start gap-4">
                  <div className="text-4xl">{returnItem.icon}</div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-bold text-lg text-gray-900">{returnItem.title}</h3>
                        <p className="text-sm text-gray-600">{returnItem.description}</p>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0" />
                    </div>

                    <div className="flex items-center gap-2 mb-2">
                      <Calendar className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-600">Due: {returnItem.dueDate}</span>
                      {returnItem.daysLeft <= 7 && (
                        <span className={`text-xs font-semibold ${
                          returnItem.daysLeft <= 2 ? 'text-red-600' : 'text-amber-600'
                        }`}>
                          ({returnItem.daysLeft} days left)
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600">Status:</span>
                      <StatusBadge status={returnItem.status} text={returnItem.statusText} icon={false} />
                    </div>

                    {returnItem.status === 'urgent' && (
                      <button 
                        onClick={() => handleFileNow(returnItem.id, returnItem.title)}
                        className="mt-3 w-full bg-[#FF6B35] text-white py-2 rounded-lg font-semibold hover:bg-[#e5572a] transition-colors"
                      >
                        File Now
                      </button>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Quarterly/Annual Returns */}
        <div className="mb-6">
          <h2 className="font-semibold text-lg mb-3 text-gray-700">Annual Returns</h2>
          <div className="space-y-3">
            {returns.slice(2).map((returnItem) => (
              <Link
                key={returnItem.id}
                to={`/returns/${returnItem.id}`}
                className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow block"
              >
                <div className="flex items-start gap-4">
                  <div className="text-4xl">{returnItem.icon}</div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-bold text-lg text-gray-900">{returnItem.title}</h3>
                        <p className="text-sm text-gray-600">{returnItem.description}</p>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0" />
                    </div>

                    <div className="flex items-center gap-2 mb-2">
                      <Calendar className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-600">Due: {returnItem.dueDate}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600">Status:</span>
                      <StatusBadge status={returnItem.status} text={returnItem.statusText} icon={false} />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Help Card */}
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 rounded-xl p-4">
          <h3 className="font-semibold text-purple-900 mb-2">Need Help Filing?</h3>
          <p className="text-sm text-purple-700 mb-3">
            Our AI assistant can guide you through the filing process step by step.
          </p>
          <button 
            onClick={handleGetAIHelp}
            className="w-full bg-purple-600 text-white py-2 rounded-lg font-medium hover:bg-purple-700 transition-colors"
          >
            Get Help from AI
          </button>
        </div>
      </div>

      {/* Filing Dialog */}
      <Dialog open={filingDialog} onOpenChange={setFilingDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>File {selectedReturn}</DialogTitle>
            <DialogDescription>
              Review your details before filing
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-semibold text-blue-900 mb-2">Summary</h4>
              {selectedReturn === 'GSTR-1' && (
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-blue-700">Total Invoices:</span>
                    <span className="font-medium">4</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-700">Taxable Value:</span>
                    <span className="font-medium">₹50,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-700">Total Tax:</span>
                    <span className="font-medium">₹9,000</span>
                  </div>
                </div>
              )}
              {selectedReturn === 'GSTR-3B' && (
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-blue-700">Output Tax:</span>
                    <span className="font-medium">₹9,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-700">Input Tax Credit:</span>
                    <span className="font-medium">₹7,200</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-700">Net Tax Payable:</span>
                    <span className="font-medium font-bold">₹1,800</span>
                  </div>
                </div>
              )}
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
              <p className="text-sm text-amber-800">
                ⚠️ Please ensure all invoice details are accurate before filing. Once filed, changes cannot be made.
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setFilingDialog(false)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleFilingSubmit}
                className="flex-1 px-4 py-2 bg-[#1B4B8C] text-white rounded-lg font-semibold hover:bg-[#163a6f] transition-colors"
              >
                Proceed to File
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}