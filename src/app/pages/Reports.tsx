import { Download, Share2, FileText, ShoppingCart, BarChart3 } from 'lucide-react';
import { 
  generateMonthlySummaryPDF, 
  generateSalesReportPDF, 
  generatePurchaseReportPDF, 
  generateGSTRReportPDF, 
  generateAnnualTaxSummaryPDF 
} from '../utils/pdfGenerator';
import { toast } from 'sonner';

export default function Reports() {
  const reports = [
    {
      icon: BarChart3,
      title: 'Monthly GST Summary',
      period: 'February 2026',
      gradient: 'from-blue-500 to-blue-600',
      downloadHandler: () => generateMonthlySummaryPDF('February 2026'),
    },
    {
      icon: FileText,
      title: 'Sales Report',
      period: 'February 2026',
      gradient: 'from-purple-500 to-purple-600',
      downloadHandler: () => generateSalesReportPDF('February 2026'),
    },
    {
      icon: ShoppingCart,
      title: 'Purchase Report',
      period: 'February 2026',
      gradient: 'from-green-500 to-green-600',
      downloadHandler: () => generatePurchaseReportPDF('February 2026'),
    },
    {
      icon: FileText,
      title: 'GSTR-1 Summary',
      period: 'January 2026',
      gradient: 'from-orange-500 to-orange-600',
      downloadHandler: () => generateGSTRReportPDF('GSTR-1', 'January 2026'),
    },
    {
      icon: FileText,
      title: 'GSTR-3B Summary',
      period: 'January 2026',
      gradient: 'from-pink-500 to-pink-600',
      downloadHandler: () => generateGSTRReportPDF('GSTR-3B', 'January 2026'),
    },
    {
      icon: BarChart3,
      title: 'Annual Tax Summary',
      period: 'FY 2025-26',
      gradient: 'from-indigo-500 to-indigo-600',
      downloadHandler: () => generateAnnualTaxSummaryPDF('FY 2025-26'),
    },
  ];

  const handleDownload = (downloadHandler: () => void, title: string) => {
    try {
      downloadHandler();
      toast.success('Download Started', {
        description: `${title} is being downloaded...`,
      });
    } catch (error) {
      toast.error('Download Failed', {
        description: 'There was an error generating the PDF. Please try again.',
      });
    }
  };

  const handleShare = (title: string) => {
    toast.info('Share Feature', {
      description: `Sharing options for ${title} will open here.`,
    });
  };

  return (
    <div className="pb-20 bg-[#F9FAFB] min-h-screen">
      {/* Header */}
      <div className="bg-[#1B4B8C] text-white p-6 rounded-b-3xl">
        <div className="max-w-md mx-auto">
          <h1 className="text-2xl font-bold mb-1">Reports</h1>
          <p className="text-blue-100">Download Your Reports</p>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 -mt-6">
        {/* Reports List */}
        <div className="space-y-4 mb-4">
          {reports.map((report, index) => {
            const Icon = report.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-start gap-4">
                  <div className={`w-14 h-14 bg-gradient-to-br ${report.gradient} rounded-xl flex items-center justify-center flex-shrink-0`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 mb-1">{report.title}</h3>
                    <p className="text-sm text-gray-600 mb-3">{report.period}</p>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => handleDownload(report.downloadHandler, report.title)}
                        className="flex-1 py-2 px-3 bg-[#1B4B8C] text-white rounded-lg font-medium text-sm flex items-center justify-center gap-2 hover:bg-[#163a6f] transition-colors"
                      >
                        <Download className="w-4 h-4" />
                        Download PDF
                      </button>
                      <button 
                        onClick={() => handleShare(report.title)}
                        className="py-2 px-3 bg-gray-100 text-gray-700 rounded-lg font-medium text-sm flex items-center justify-center hover:bg-gray-200 transition-colors"
                      >
                        <Share2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick Stats */}
        <div className="bg-gradient-to-br from-[#1B4B8C] to-[#2a5fa8] text-white rounded-xl p-5 shadow-lg mb-4">
          <h3 className="font-semibold mb-4">This Month at a Glance</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm opacity-90 mb-1">Total Sales</p>
              <p className="text-2xl font-bold">₹50,000</p>
            </div>
            <div>
              <p className="text-sm opacity-90 mb-1">Total Purchases</p>
              <p className="text-2xl font-bold">₹40,000</p>
            </div>
            <div>
              <p className="text-sm opacity-90 mb-1">Output GST</p>
              <p className="text-xl font-bold">₹9,000</p>
            </div>
            <div>
              <p className="text-sm opacity-90 mb-1">Input GST</p>
              <p className="text-xl font-bold">₹7,200</p>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-blue-400">
            <div className="flex justify-between items-center">
              <span className="font-medium">GST Payable</span>
              <span className="text-2xl font-bold">₹1,800</span>
            </div>
          </div>
        </div>

        {/* Info Card */}
        <div className="bg-purple-50 border border-purple-200 rounded-xl p-4">
          <div className="flex gap-3">
            <span className="text-2xl">📊</span>
            <div>
              <h4 className="font-semibold text-purple-900 mb-1">Custom Reports</h4>
              <p className="text-sm text-purple-700">
                Need a custom report? Our AI can generate detailed reports based on your specific needs.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}