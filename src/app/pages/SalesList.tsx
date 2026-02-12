import { useState } from 'react';
import { Link } from 'react-router';
import { Plus, Filter, ChevronDown, Eye, Edit, Trash2, FileText, Truck } from 'lucide-react';
import { StatusBadge } from '../components/StatusBadge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../components/ui/dialog';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { toast } from 'sonner';

export default function SalesList() {
  const [selectedMonth, setSelectedMonth] = useState('February 2026');
  const [editDialog, setEditDialog] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<any>(null);
  const [eInvoiceDialog, setEInvoiceDialog] = useState(false);
  const [eWayBillDialog, setEWayBillDialog] = useState(false);
  
  const [invoices, setInvoices] = useState([
    {
      id: 'INV-001',
      date: '12 Feb',
      customer: 'ABC Traders',
      amount: 1180,
      gst: 180,
      hasIRN: true,
      hasEWayBill: false,
    },
    {
      id: 'INV-002',
      date: '11 Feb',
      customer: 'XYZ Corp',
      amount: 5900,
      gst: 900,
      hasIRN: false,
      hasEWayBill: false,
    },
    {
      id: 'INV-003',
      date: '10 Feb',
      customer: 'Kumar Enterprises',
      amount: 23600,
      gst: 3600,
      hasIRN: true,
      hasEWayBill: true,
    },
    {
      id: 'INV-004',
      date: '09 Feb',
      customer: 'Sharma & Co',
      amount: 11800,
      gst: 1800,
      hasIRN: true,
      hasEWayBill: false,
    },
  ]);

  const totalSales = invoices.reduce((sum, inv) => sum + inv.amount, 0);
  const totalGST = invoices.reduce((sum, inv) => sum + inv.gst, 0);

  const handleView = (invoice: any) => {
    toast.info('Invoice Details', {
      description: `Viewing details for ${invoice.id}`,
    });
  };

  const handleEdit = (invoice: any) => {
    setSelectedInvoice(invoice);
    setEditDialog(true);
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEditDialog(false);
    toast.success('Invoice Updated', {
      description: `${selectedInvoice?.id} has been updated successfully.`,
    });
  };

  const handleGenerateIRN = (invoice: any) => {
    setSelectedInvoice(invoice);
    setEInvoiceDialog(true);
  };

  const handleIRNGenerate = () => {
    setEInvoiceDialog(false);
    // Update invoice to have IRN
    setInvoices(invoices.map(inv => 
      inv.id === selectedInvoice?.id ? { ...inv, hasIRN: true } : inv
    ));
    toast.success('IRN Generated', {
      description: `E-Invoice IRN generated successfully for ${selectedInvoice?.id}`,
    });
  };

  const handleGenerateEWayBill = (invoice: any) => {
    setSelectedInvoice(invoice);
    setEWayBillDialog(true);
  };

  const handleEWayBillGenerate = () => {
    setEWayBillDialog(false);
    // Update invoice to have E-Way Bill
    setInvoices(invoices.map(inv => 
      inv.id === selectedInvoice?.id ? { ...inv, hasEWayBill: true } : inv
    ));
    toast.success('E-Way Bill Generated', {
      description: `E-Way Bill generated successfully for ${selectedInvoice?.id}`,
    });
  };

  return (
    <div className="pb-20 bg-[#F9FAFB] min-h-screen">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-md mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-3">
            <h1 className="text-xl font-semibold">Sales Invoices</h1>
            <div className="flex items-center gap-2">
              <button className="p-2 hover:bg-gray-100 rounded-full">
                <Filter className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
          <Link
            to="/sales/add"
            className="w-full bg-[#1B4B8C] text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-[#163a6f] transition-colors"
          >
            <Plus className="w-5 h-5" />
            New Sale
          </Link>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 py-4">
        {/* Month Selector */}
        <div className="mb-4">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
            <span className="font-medium">{selectedMonth}</span>
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>

        {/* Invoice List */}
        <div className="space-y-3 mb-4">
          {invoices.map((invoice) => (
            <div
              key={invoice.id}
              className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-gray-900">{invoice.id}</span>
                    <span className="text-sm text-gray-500">| {invoice.date}</span>
                  </div>
                  <p className="text-sm text-gray-600">{invoice.customer}</p>
                </div>
                <div className="flex gap-1">
                  {invoice.hasIRN ? (
                    <StatusBadge status="success" text="IRN" icon={false} />
                  ) : (
                    <StatusBadge status="warning" text="No IRN" icon={false} />
                  )}
                  {invoice.hasEWayBill && (
                    <span className="text-xs">🚚</span>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="text-xs text-gray-500">Amount</p>
                  <p className="text-lg font-bold text-gray-900">
                    ₹{invoice.amount.toLocaleString('en-IN')}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-500">GST</p>
                  <p className="font-semibold text-[#1B4B8C]">
                    ₹{invoice.gst.toLocaleString('en-IN')}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 pt-3 border-t border-gray-100">
                <button 
                  onClick={() => handleView(invoice)}
                  className="flex-1 py-2 text-sm font-medium text-[#1B4B8C] bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors flex items-center justify-center gap-1"
                >
                  <Eye className="w-4 h-4" />
                  View
                </button>
                <button 
                  onClick={() => handleEdit(invoice)}
                  className="flex-1 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center gap-1"
                >
                  <Edit className="w-4 h-4" />
                  Edit
                </button>
                {!invoice.hasIRN && (
                  <button 
                    onClick={() => handleGenerateIRN(invoice)}
                    className="flex-1 py-2 text-sm font-medium text-[#FF6B35] bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors"
                  >
                    Generate IRN
                  </button>
                )}
              </div>

              {/* E-Invoice and E-Way Bill Section */}
              {invoice.hasIRN && (
                <div className="flex gap-2 pt-2">
                  <button 
                    onClick={() => handleGenerateIRN(invoice)}
                    className="flex-1 py-2 text-sm font-medium text-blue-700 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors flex items-center justify-center gap-1"
                  >
                    <FileText className="w-4 h-4" />
                    View E-Invoice
                  </button>
                  {!invoice.hasEWayBill && (
                    <button 
                      onClick={() => handleGenerateEWayBill(invoice)}
                      className="flex-1 py-2 text-sm font-medium text-green-700 bg-green-50 rounded-lg hover:bg-green-100 transition-colors flex items-center justify-center gap-1"
                    >
                      <Truck className="w-4 h-4" />
                      E-Way Bill
                    </button>
                  )}
                  {invoice.hasEWayBill && (
                    <button 
                      onClick={() => handleGenerateEWayBill(invoice)}
                      className="flex-1 py-2 text-sm font-medium text-green-700 bg-green-50 rounded-lg hover:bg-green-100 transition-colors flex items-center justify-center gap-1"
                    >
                      <Truck className="w-4 h-4" />
                      View E-Way
                    </button>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="bg-gradient-to-br from-[#1B4B8C] to-[#2a5fa8] text-white rounded-xl p-5 shadow-lg">
          <h3 className="text-sm font-medium mb-3 opacity-90">Monthly Summary</h3>
          <div className="flex justify-between items-center mb-2">
            <span className="text-base">Total Sales</span>
            <span className="text-2xl font-bold">₹{totalSales.toLocaleString('en-IN')}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-base">Total GST</span>
            <span className="text-xl font-bold">₹{totalGST.toLocaleString('en-IN')}</span>
          </div>
        </div>
      </div>

      {/* Edit Invoice Dialog */}
      <Dialog open={editDialog} onOpenChange={setEditDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Invoice</DialogTitle>
            <DialogDescription>
              Update invoice details for {selectedInvoice?.id}
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleEditSubmit} className="space-y-4">
            <div>
              <Label htmlFor="customer">Customer Name</Label>
              <Input
                id="customer"
                defaultValue={selectedInvoice?.customer}
                required
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="amount">Amount (₹)</Label>
              <Input
                id="amount"
                type="number"
                defaultValue={selectedInvoice?.amount}
                required
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="gst">GST (₹)</Label>
              <Input
                id="gst"
                type="number"
                defaultValue={selectedInvoice?.gst}
                required
                className="mt-1"
              />
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

      {/* E-Invoice Dialog */}
      <Dialog open={eInvoiceDialog} onOpenChange={setEInvoiceDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>E-Invoice (IRN)</DialogTitle>
            <DialogDescription>
              {selectedInvoice?.hasIRN ? 'View E-Invoice Details' : 'Generate E-Invoice for'} {selectedInvoice?.id}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            {selectedInvoice?.hasIRN ? (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h4 className="font-semibold text-green-900 mb-2">IRN Generated</h4>
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="text-green-700">IRN:</span>
                    <p className="font-mono text-xs mt-1 bg-white p-2 rounded">
                      1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef
                    </p>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-green-700">ACK No:</span>
                    <span className="font-medium">112023456789012</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-green-700">ACK Date:</span>
                    <span className="font-medium">12-02-2026 14:30</span>
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                  <h4 className="font-semibold text-blue-900 mb-2">Invoice Details</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-blue-700">Customer:</span>
                      <span className="font-medium">{selectedInvoice?.customer}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-blue-700">Amount:</span>
                      <span className="font-medium">₹{selectedInvoice?.amount?.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-blue-700">GST:</span>
                      <span className="font-medium">₹{selectedInvoice?.gst?.toLocaleString('en-IN')}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mb-4">
                  <p className="text-sm text-amber-800">
                    ℹ️ E-Invoice will be generated and registered on GST portal.
                  </p>
                </div>

                <button
                  onClick={handleIRNGenerate}
                  className="w-full px-4 py-2 bg-[#1B4B8C] text-white rounded-lg font-semibold hover:bg-[#163a6f] transition-colors"
                >
                  Generate E-Invoice
                </button>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* E-Way Bill Dialog */}
      <Dialog open={eWayBillDialog} onOpenChange={setEWayBillDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>E-Way Bill</DialogTitle>
            <DialogDescription>
              {selectedInvoice?.hasEWayBill ? 'View E-Way Bill Details' : 'Generate E-Way Bill for'} {selectedInvoice?.id}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            {selectedInvoice?.hasEWayBill ? (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h4 className="font-semibold text-green-900 mb-2">E-Way Bill Generated</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-green-700">E-Way Bill No:</span>
                    <span className="font-medium">351234567890</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-green-700">Valid Until:</span>
                    <span className="font-medium">15-02-2026</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-green-700">Distance:</span>
                    <span className="font-medium">350 km</span>
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                  <h4 className="font-semibold text-blue-900 mb-2">Transport Details</h4>
                  <div className="space-y-3">
                    <div>
                      <Label htmlFor="distance">Distance (km)</Label>
                      <Input
                        id="distance"
                        type="number"
                        placeholder="Enter distance"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="vehicle">Vehicle Number</Label>
                      <Input
                        id="vehicle"
                        placeholder="e.g., MH02AB1234"
                        className="mt-1"
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mb-4">
                  <p className="text-sm text-amber-800">
                    ℹ️ Required for goods transportation above ₹50,000
                  </p>
                </div>

                <button
                  onClick={handleEWayBillGenerate}
                  className="w-full px-4 py-2 bg-[#1B4B8C] text-white rounded-lg font-semibold hover:bg-[#163a6f] transition-colors"
                >
                  Generate E-Way Bill
                </button>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}