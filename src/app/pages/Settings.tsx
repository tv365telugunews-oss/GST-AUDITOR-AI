import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft } from 'lucide-react';
import { Switch } from '../components/ui/switch';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../components/ui/dialog';
import { Label } from '../components/ui/label';
import { toast } from 'sonner';

export default function Settings() {
  const navigate = useNavigate();
  const [taxRateDialog, setTaxRateDialog] = useState(false);
  const [defaultTaxRate, setDefaultTaxRate] = useState('18%');

  const handleTaxRateChange = (rate: string) => {
    setDefaultTaxRate(rate);
    setTaxRateDialog(false);
    toast.success('Tax Rate Updated', {
      description: `Default tax rate changed to ${rate}`,
    });
  };

  const handleDataAction = (action: string) => {
    if (action === 'delete') {
      toast.error('Delete Account', {
        description: 'This action requires confirmation. Please contact support.',
      });
    } else if (action === 'export') {
      toast.success('Data Export', {
        description: 'Your data export has been initiated. You will receive an email shortly.',
      });
    } else if (action === 'clear') {
      toast.success('Cache Cleared', {
        description: 'Cache has been cleared successfully.',
      });
    }
  };

  return (
    <div className="pb-20 bg-[#F9FAFB] min-h-screen">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-md mx-auto px-4 py-4 flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 rounded-full">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-xl font-semibold">Settings</h1>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 py-6">
        {/* General Settings */}
        <div className="mb-6">
          <h2 className="font-semibold text-lg mb-3 text-gray-700">General</h2>
          <div className="bg-white rounded-xl shadow-sm p-4 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">Auto-generate Invoice Numbers</p>
                <p className="text-sm text-gray-600">Automatic numbering for new invoices</p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <div>
                <p className="font-medium text-gray-900">Auto-save Drafts</p>
                <p className="text-sm text-gray-600">Save incomplete invoices automatically</p>
              </div>
              <Switch defaultChecked />
            </div>
          </div>
        </div>

        {/* Tax Settings */}
        <div className="mb-6">
          <h2 className="font-semibold text-lg mb-3 text-gray-700">Tax Settings</h2>
          <div className="bg-white rounded-xl shadow-sm p-4 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">Default Tax Rate</p>
                <p className="text-sm text-gray-600">{defaultTaxRate} GST</p>
              </div>
              <button 
                onClick={() => setTaxRateDialog(true)}
                className="text-[#1B4B8C] text-sm font-medium hover:underline"
              >
                Change
              </button>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <div>
                <p className="font-medium text-gray-900">Include Tax in Prices</p>
                <p className="text-sm text-gray-600">Show tax-inclusive prices</p>
              </div>
              <Switch />
            </div>
          </div>
        </div>

        {/* E-Invoice Settings */}
        <div className="mb-6">
          <h2 className="font-semibold text-lg mb-3 text-gray-700">E-Invoice</h2>
          <div className="bg-white rounded-xl shadow-sm p-4 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">Auto-generate E-Invoice</p>
                <p className="text-sm text-gray-600">Generate IRN for all invoices</p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <div>
                <p className="font-medium text-gray-900">E-Way Bill Alerts</p>
                <p className="text-sm text-gray-600">Notify before expiry</p>
              </div>
              <Switch defaultChecked />
            </div>
          </div>
        </div>

        {/* Data & Privacy */}
        <div className="mb-6">
          <h2 className="font-semibold text-lg mb-3 text-gray-700">Data & Privacy</h2>
          <div className="bg-white rounded-xl shadow-sm p-4 space-y-4">
            <button 
              onClick={() => handleDataAction('export')}
              className="w-full text-left hover:bg-gray-50 -m-4 p-4 rounded-xl transition-colors"
            >
              <p className="font-medium text-gray-900">Export Data</p>
              <p className="text-sm text-gray-600">Download all your data</p>
            </button>

            <button 
              onClick={() => handleDataAction('clear')}
              className="w-full text-left pt-4 border-t border-gray-100 hover:bg-gray-50 -mx-4 px-4 rounded-xl transition-colors"
            >
              <p className="font-medium text-gray-900">Clear Cache</p>
              <p className="text-sm text-gray-600">Free up storage space</p>
            </button>

            <button 
              onClick={() => handleDataAction('delete')}
              className="w-full text-left pt-4 border-t border-gray-100 hover:bg-red-50 -mx-4 px-4 rounded-xl transition-colors"
            >
              <p className="font-medium text-red-600">Delete Account</p>
              <p className="text-sm text-gray-600">Permanently delete your account</p>
            </button>
          </div>
        </div>
      </div>

      {/* Tax Rate Dialog */}
      <Dialog open={taxRateDialog} onOpenChange={setTaxRateDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Change Default Tax Rate</DialogTitle>
            <DialogDescription>
              Select the default GST rate for new invoices
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-2">
            {['0%', '5%', '12%', '18%', '28%'].map((rate) => (
              <button
                key={rate}
                onClick={() => handleTaxRateChange(rate)}
                className={`w-full p-3 border-2 rounded-lg text-left font-medium transition-colors ${
                  defaultTaxRate === rate
                    ? 'border-[#1B4B8C] bg-blue-50 text-[#1B4B8C]'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                {rate} GST
              </button>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}