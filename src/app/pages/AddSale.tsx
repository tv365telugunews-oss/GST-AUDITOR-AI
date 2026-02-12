import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, Plus, Calendar } from 'lucide-react';
import { Switch } from '../components/ui/switch';
import { toast } from 'sonner';

export default function AddSale() {
  const navigate = useNavigate();
  const [generateEInvoice, setGenerateEInvoice] = useState(true);
  const [generateEWayBill, setGenerateEWayBill] = useState(false);
  
  const [formData, setFormData] = useState({
    customer: '',
    invoiceNumber: 'INV-AUTO-' + Date.now(),
    date: new Date().toISOString().split('T')[0],
    items: [
      { name: '', hsn: '', quantity: 1, rate: 0 }
    ]
  });

  const calculateTax = () => {
    const taxableAmount = formData.items.reduce((sum, item) => sum + (item.quantity * item.rate), 0);
    const cgst = taxableAmount * 0.09;
    const sgst = taxableAmount * 0.09;
    const total = taxableAmount + cgst + sgst;
    return { taxableAmount, cgst, sgst, total };
  };

  const addItem = () => {
    setFormData({
      ...formData,
      items: [...formData.items, { name: '', hsn: '', quantity: 1, rate: 0 }]
    });
  };

  const updateItem = (index: number, field: string, value: any) => {
    const newItems = [...formData.items];
    newItems[index] = { ...newItems[index], [field]: value };
    setFormData({ ...formData, items: newItems });
  };

  const handleSave = () => {
    toast.success('Invoice saved successfully!');
    navigate('/sales');
  };

  const tax = calculateTax();

  return (
    <div className="pb-20 bg-[#F9FAFB] min-h-screen">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-md mx-auto px-4 py-4 flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 rounded-full">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-xl font-semibold">Add Sale Invoice</h1>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 py-6 space-y-4">
        {/* Customer Details */}
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <h3 className="font-semibold mb-3">Customer Details</h3>
          <div>
            <label className="block text-sm text-gray-600 mb-2">Select Customer</label>
            <select
              value={formData.customer}
              onChange={(e) => setFormData({ ...formData, customer: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1B4B8C] focus:border-transparent"
            >
              <option value="">Select or Create New</option>
              <option value="ABC Traders">ABC Traders</option>
              <option value="XYZ Corp">XYZ Corp</option>
              <option value="Kumar Enterprises">Kumar Enterprises</option>
            </select>
          </div>
        </div>

        {/* Invoice Details */}
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <h3 className="font-semibold mb-3">Invoice Details</h3>
          <div className="space-y-3">
            <div>
              <label className="block text-sm text-gray-600 mb-2">Invoice Number</label>
              <input
                type="text"
                value={formData.invoiceNumber}
                onChange={(e) => setFormData({ ...formData, invoiceNumber: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#1B4B8C]"
                placeholder="Auto-generated"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-2">Date</label>
              <div className="relative">
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1B4B8C]"
                />
                <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>

        {/* Items */}
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <h3 className="font-semibold mb-3">Items</h3>
          <div className="space-y-4">
            {formData.items.map((item, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4 space-y-3">
                <input
                  type="text"
                  placeholder="Item Name"
                  value={item.name}
                  onChange={(e) => updateItem(index, 'name', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1B4B8C]"
                />
                <input
                  type="text"
                  placeholder="HSN Code (e.g., 4907)"
                  value={item.hsn}
                  onChange={(e) => updateItem(index, 'hsn', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1B4B8C]"
                />
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">Quantity</label>
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) => updateItem(index, 'quantity', parseInt(e.target.value) || 0)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1B4B8C]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">Rate (₹)</label>
                    <input
                      type="number"
                      value={item.rate}
                      onChange={(e) => updateItem(index, 'rate', parseFloat(e.target.value) || 0)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1B4B8C]"
                    />
                  </div>
                </div>
              </div>
            ))}
            <button
              onClick={addItem}
              className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-[#1B4B8C] font-medium flex items-center justify-center gap-2 hover:bg-blue-50 transition-colors"
            >
              <Plus className="w-5 h-5" />
              Add Another Item
            </button>
          </div>
        </div>

        {/* Tax Calculation */}
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 shadow-sm">
          <h3 className="font-semibold mb-3">Tax Calculation (Auto)</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-700">Taxable Amount</span>
              <span className="font-semibold">₹{tax.taxableAmount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-700">CGST (9%)</span>
              <span className="font-semibold">₹{tax.cgst.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-700">SGST (9%)</span>
              <span className="font-semibold">₹{tax.sgst.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
            </div>
            <div className="border-t-2 border-blue-300 pt-2 mt-2">
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold text-gray-900">Total Amount</span>
                <span className="text-2xl font-bold text-[#1B4B8C]">
                  ₹{tax.total.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* E-Invoice & E-Way Bill Options */}
        <div className="bg-white rounded-xl p-4 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-medium">Generate E-Invoice & IRN</span>
            </div>
            <Switch checked={generateEInvoice} onCheckedChange={setGenerateEInvoice} />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-medium">Generate E-Way Bill</span>
            </div>
            <Switch checked={generateEWayBill} onCheckedChange={setGenerateEWayBill} />
          </div>
        </div>

        {/* Save Button */}
        <button
          onClick={handleSave}
          className="w-full bg-[#1B4B8C] text-white py-4 rounded-xl font-semibold shadow-lg hover:bg-[#163a6f] transition-colors flex items-center justify-center gap-2 sticky bottom-20"
        >
          💾 Save Invoice
        </button>
      </div>
    </div>
  );
}
