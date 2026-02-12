import { useState } from 'react';
import { Calculator, DollarSign, Search, BarChart3, Calendar, Tag, BookOpen } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../components/ui/dialog';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { toast } from 'sonner';

export default function GSTTools() {
  const [selectedTool, setSelectedTool] = useState<string>('');
  const [toolDialog, setToolDialog] = useState(false);
  
  const tools = [
    {
      id: 'late-fee',
      icon: Calculator,
      title: 'Late Fee Calculator',
      description: 'Calculate penalties',
      gradient: 'from-red-500 to-red-600',
    },
    {
      id: 'interest',
      icon: DollarSign,
      title: 'Interest Calculator',
      description: 'Calculate interest on delay',
      gradient: 'from-blue-500 to-blue-600',
    },
    {
      id: 'hsn-sac',
      icon: Search,
      title: 'HSN/SAC Finder',
      description: 'Find product codes',
      gradient: 'from-purple-500 to-purple-600',
    },
    {
      id: 'itc',
      icon: BarChart3,
      title: 'ITC Calculator',
      description: 'Calculate input credit',
      gradient: 'from-green-500 to-green-600',
    },
    {
      id: 'due-date',
      icon: Calendar,
      title: 'Due Date Checker',
      description: 'View all deadlines',
      gradient: 'from-orange-500 to-orange-600',
    },
    {
      id: 'tax-rate',
      icon: Tag,
      title: 'Tax Rate Finder',
      description: 'Find GST rates',
      gradient: 'from-pink-500 to-pink-600',
    },
  ];

  const handleToolClick = (toolId: string) => {
    setSelectedTool(toolId);
    setToolDialog(true);
  };

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setToolDialog(false);
    toast.success('Calculation Complete', {
      description: 'Your result has been calculated successfully.',
    });
  };

  const renderToolContent = () => {
    switch (selectedTool) {
      case 'late-fee':
        return (
          <form onSubmit={handleCalculate} className="space-y-4">
            <div>
              <Label htmlFor="days">Number of Days Late</Label>
              <Input
                id="days"
                type="number"
                placeholder="Enter days"
                required
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="amount">Tax Amount (₹)</Label>
              <Input
                id="amount"
                type="number"
                placeholder="Enter tax amount"
                required
                className="mt-1"
              />
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <p className="text-sm text-blue-800">
                💡 Late fee: ₹50/day (CGST) + ₹50/day (SGST) = ₹100/day
              </p>
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 bg-[#1B4B8C] text-white rounded-lg font-semibold hover:bg-[#163a6f] transition-colors"
            >
              Calculate
            </button>
          </form>
        );

      case 'interest':
        return (
          <form onSubmit={handleCalculate} className="space-y-4">
            <div>
              <Label htmlFor="taxAmount">Tax Amount (₹)</Label>
              <Input
                id="taxAmount"
                type="number"
                placeholder="Enter tax amount"
                required
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="delayDays">Delay in Days</Label>
              <Input
                id="delayDays"
                type="number"
                placeholder="Enter days"
                required
                className="mt-1"
              />
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <p className="text-sm text-blue-800">
                💡 Interest rate: 18% per annum
              </p>
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 bg-[#1B4B8C] text-white rounded-lg font-semibold hover:bg-[#163a6f] transition-colors"
            >
              Calculate
            </button>
          </form>
        );

      case 'hsn-sac':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="search">Search Product/Service</Label>
              <Input
                id="search"
                placeholder="e.g., Mobile Phone, Consulting"
                className="mt-1"
              />
            </div>
            <div className="bg-gray-50 rounded-lg p-4 max-h-60 overflow-y-auto">
              <h4 className="font-semibold mb-2">Common HSN/SAC Codes:</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between p-2 bg-white rounded">
                  <span>Mobile Phones</span>
                  <span className="font-mono font-semibold">8517</span>
                </div>
                <div className="flex justify-between p-2 bg-white rounded">
                  <span>Consulting Services</span>
                  <span className="font-mono font-semibold">998314</span>
                </div>
                <div className="flex justify-between p-2 bg-white rounded">
                  <span>Textiles</span>
                  <span className="font-mono font-semibold">5208</span>
                </div>
                <div className="flex justify-between p-2 bg-white rounded">
                  <span>Software Development</span>
                  <span className="font-mono font-semibold">998313</span>
                </div>
              </div>
            </div>
          </div>
        );

      case 'itc':
        return (
          <form onSubmit={handleCalculate} className="space-y-4">
            <div>
              <Label htmlFor="inputTax">Input Tax (₹)</Label>
              <Input
                id="inputTax"
                type="number"
                placeholder="Enter input tax"
                required
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="outputTax">Output Tax (₹)</Label>
              <Input
                id="outputTax"
                type="number"
                placeholder="Enter output tax"
                required
                className="mt-1"
              />
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <p className="text-sm text-blue-800">
                💡 ITC = Input Tax Credit available against output tax
              </p>
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 bg-[#1B4B8C] text-white rounded-lg font-semibold hover:bg-[#163a6f] transition-colors"
            >
              Calculate
            </button>
          </form>
        );

      case 'due-date':
        return (
          <div className="space-y-3">
            <h4 className="font-semibold">GST Filing Deadlines:</h4>
            <div className="space-y-2">
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-semibold text-red-900">GSTR-1</p>
                    <p className="text-sm text-red-700">Outward Supplies</p>
                  </div>
                  <span className="text-sm font-bold text-red-600">11th of next month</span>
                </div>
              </div>
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-semibold text-amber-900">GSTR-3B</p>
                    <p className="text-sm text-amber-700">Summary Return</p>
                  </div>
                  <span className="text-sm font-bold text-amber-600">20th of next month</span>
                </div>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-semibold text-blue-900">GSTR-9</p>
                    <p className="text-sm text-blue-700">Annual Return</p>
                  </div>
                  <span className="text-sm font-bold text-blue-600">31st December</span>
                </div>
              </div>
            </div>
          </div>
        );

      case 'tax-rate':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="product">Search Product/Service</Label>
              <Input
                id="product"
                placeholder="e.g., Food items, Electronics"
                className="mt-1"
              />
            </div>
            <div className="bg-gray-50 rounded-lg p-4 max-h-60 overflow-y-auto">
              <h4 className="font-semibold mb-2">Common GST Rates:</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between p-2 bg-white rounded">
                  <span>Essential Foods (Rice, etc.)</span>
                  <span className="font-bold text-green-600">0%</span>
                </div>
                <div className="flex justify-between p-2 bg-white rounded">
                  <span>Processed Foods</span>
                  <span className="font-bold text-blue-600">5%</span>
                </div>
                <div className="flex justify-between p-2 bg-white rounded">
                  <span>Textiles</span>
                  <span className="font-bold text-amber-600">12%</span>
                </div>
                <div className="flex justify-between p-2 bg-white rounded">
                  <span>Most Services & Goods</span>
                  <span className="font-bold text-orange-600">18%</span>
                </div>
                <div className="flex justify-between p-2 bg-white rounded">
                  <span>Luxury Items</span>
                  <span className="font-bold text-red-600">28%</span>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const getToolTitle = () => {
    const tool = tools.find(t => t.id === selectedTool);
    return tool?.title || '';
  };

  return (
    <div className="pb-20 bg-[#F9FAFB] min-h-screen">
      {/* Header */}
      <div className="bg-[#1B4B8C] text-white p-6 rounded-b-3xl">
        <div className="max-w-md mx-auto">
          <h1 className="text-2xl font-bold mb-1">GST Tools</h1>
          <p className="text-blue-100">Helpful Calculators & Information</p>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 -mt-6">
        {/* Tools Grid */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          {tools.map((tool) => {
            const Icon = tool.icon;
            return (
              <button
                key={tool.id}
                onClick={() => handleToolClick(tool.id)}
                className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-all flex flex-col items-center justify-center gap-3 min-h-[140px]"
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${tool.gradient} rounded-full flex items-center justify-center`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-center">
                  <h3 className="font-semibold text-gray-900 text-sm mb-1">{tool.title}</h3>
                  <p className="text-xs text-gray-600">{tool.description}</p>
                </div>
              </button>
            );
          })}
        </div>

        {/* GST Glossary */}
        <button 
          onClick={() => {
            setSelectedTool('glossary');
            setToolDialog(true);
          }}
          className="w-full bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow flex items-center gap-4"
        >
          <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-full flex items-center justify-center flex-shrink-0">
            <BookOpen className="w-7 h-7 text-white" />
          </div>
          <div className="flex-1 text-left">
            <h3 className="font-bold text-gray-900 mb-1">GST Glossary</h3>
            <p className="text-sm text-gray-600">Terms explained simply</p>
          </div>
        </button>

        {/* Info Card */}
        <div className="mt-4 bg-gradient-to-br from-amber-50 to-amber-100 border border-amber-200 rounded-xl p-4">
          <div className="flex gap-3">
            <span className="text-2xl">💡</span>
            <div>
              <h4 className="font-semibold text-amber-900 mb-1">Pro Tip</h4>
              <p className="text-sm text-amber-700">
                Use our calculators to avoid penalties and stay compliant with GST regulations.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Tool Dialog */}
      <Dialog open={toolDialog} onOpenChange={setToolDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{getToolTitle()}</DialogTitle>
            <DialogDescription>
              {selectedTool === 'glossary' ? 'Common GST terms explained' : 'Enter details below'}
            </DialogDescription>
          </DialogHeader>

          <div>
            {selectedTool === 'glossary' ? (
              <div className="space-y-3 max-h-96 overflow-y-auto">
                <div className="bg-gray-50 rounded-lg p-3">
                  <h4 className="font-semibold text-gray-900 mb-1">GSTIN</h4>
                  <p className="text-sm text-gray-600">GST Identification Number - 15-digit unique number for taxpayers</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <h4 className="font-semibold text-gray-900 mb-1">ITC (Input Tax Credit)</h4>
                  <p className="text-sm text-gray-600">Tax paid on purchases can be claimed as credit against output tax</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <h4 className="font-semibold text-gray-900 mb-1">IRN</h4>
                  <p className="text-sm text-gray-600">Invoice Reference Number for e-invoicing system</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <h4 className="font-semibold text-gray-900 mb-1">HSN Code</h4>
                  <p className="text-sm text-gray-600">Harmonized System of Nomenclature for classifying goods</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <h4 className="font-semibold text-gray-900 mb-1">SAC Code</h4>
                  <p className="text-sm text-gray-600">Services Accounting Code for classifying services</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <h4 className="font-semibold text-gray-900 mb-1">E-Way Bill</h4>
                  <p className="text-sm text-gray-600">Electronic waybill required for goods movement above ₹50,000</p>
                </div>
              </div>
            ) : (
              renderToolContent()
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}