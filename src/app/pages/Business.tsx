import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, Building2, FileText, MapPin } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../components/ui/dialog';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { toast } from 'sonner';

export default function Business() {
  const navigate = useNavigate();
  const [editDialog, setEditDialog] = useState(false);
  const [business, setBusiness] = useState({
    name: 'Kumar Traders',
    gstin: '27XXXXX1234X1ZX',
    pan: 'XXXXX1234X',
    address: '123 Market Street, Andheri East, Mumbai, Maharashtra - 400069',
    category: 'Wholesale Trading',
    registrationType: 'Regular',
  });

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    setBusiness({
      name: formData.get('name') as string,
      gstin: formData.get('gstin') as string,
      pan: formData.get('pan') as string,
      address: formData.get('address') as string,
      category: formData.get('category') as string,
      registrationType: formData.get('registrationType') as string,
    });
    setEditDialog(false);
    toast.success('Business Details Updated', {
      description: 'Your business information has been updated successfully.',
    });
  };

  return (
    <div className="pb-20 bg-[#F9FAFB] min-h-screen">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-md mx-auto px-4 py-4 flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 rounded-full">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-xl font-semibold">Business Details</h1>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 py-6">
        {/* Business Info */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-4 space-y-4">
          <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
            <Building2 className="w-5 h-5 text-gray-500" />
            <div className="flex-1">
              <p className="text-xs text-gray-500">Business Name</p>
              <p className="font-medium text-gray-900">{business.name}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
            <FileText className="w-5 h-5 text-gray-500" />
            <div className="flex-1">
              <p className="text-xs text-gray-500">GSTIN</p>
              <p className="font-medium text-gray-900">{business.gstin}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
            <FileText className="w-5 h-5 text-gray-500" />
            <div className="flex-1">
              <p className="text-xs text-gray-500">PAN</p>
              <p className="font-medium text-gray-900">{business.pan}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <MapPin className="w-5 h-5 text-gray-500" />
            <div className="flex-1">
              <p className="text-xs text-gray-500">Business Address</p>
              <p className="font-medium text-gray-900">{business.address}</p>
            </div>
          </div>
        </div>

        {/* Business Type */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-4">
          <h3 className="font-semibold text-gray-900 mb-3">Business Type</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Category</span>
              <span className="font-medium">{business.category}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Registration Type</span>
              <span className="font-medium">{business.registrationType}</span>
            </div>
          </div>
        </div>

        <button 
          onClick={() => setEditDialog(true)}
          className="w-full bg-[#1B4B8C] text-white py-3 rounded-xl font-semibold hover:bg-[#163a6f] transition-colors"
        >
          Edit Business Details
        </button>
      </div>

      {/* Edit Business Dialog */}
      <Dialog open={editDialog} onOpenChange={setEditDialog}>
        <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Business Details</DialogTitle>
            <DialogDescription>
              Update your business information
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleEditSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name">Business Name</Label>
              <Input
                id="name"
                name="name"
                defaultValue={business.name}
                required
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="gstin">GSTIN</Label>
              <Input
                id="gstin"
                name="gstin"
                defaultValue={business.gstin}
                required
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="pan">PAN</Label>
              <Input
                id="pan"
                name="pan"
                defaultValue={business.pan}
                required
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="address">Business Address</Label>
              <Input
                id="address"
                name="address"
                defaultValue={business.address}
                required
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="category">Business Category</Label>
              <Input
                id="category"
                name="category"
                defaultValue={business.category}
                required
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="registrationType">Registration Type</Label>
              <select
                id="registrationType"
                name="registrationType"
                defaultValue={business.registrationType}
                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1B4B8C]"
              >
                <option value="Regular">Regular</option>
                <option value="Composition">Composition</option>
                <option value="Casual">Casual</option>
              </select>
            </div>
            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => setEditDialog(false)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 px-4 py-2 bg-[#1B4B8C] text-white rounded-lg font-semibold hover:bg-[#163a6f] transition-colors"
              >
                Save Changes
              </button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}