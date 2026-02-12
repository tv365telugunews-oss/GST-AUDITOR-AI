import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, Check, CreditCard, Building, User } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../components/ui/dialog';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { toast } from 'sonner';

export default function Subscription() {
  const navigate = useNavigate();
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'upi' | 'netbanking'>('card');
  const [processing, setProcessing] = useState(false);

  const features = [
    'Unlimited Invoice Generation',
    'E-Invoice & E-Way Bill',
    'GST Returns Filing (GSTR-1, 3B, 9)',
    'AI-Powered Compliance Assistant',
    'Automated Tax Calculations',
    'IRN Generation',
    'PDF Reports & Downloads',
    'HSN/SAC Code Finder',
    'Late Fee & Interest Calculator',
    'Priority Email Support',
    'Data Export & Backup',
    'Multi-Device Access',
  ];

  const handleSubscribe = () => {
    setShowPaymentDialog(true);
  };

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    setProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      setProcessing(false);
      setShowPaymentDialog(false);
      toast.success('Payment Successful!', {
        description: 'Your annual subscription is now active. Welcome to GST Auditor AI Pro!',
      });
      // Navigate to dashboard after successful payment
      setTimeout(() => {
        navigate('/');
      }, 2000);
    }, 2000);
  };

  return (
    <div className="pb-20 bg-[#F9FAFB] min-h-screen">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-md mx-auto px-4 py-4 flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 rounded-full">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-xl font-semibold">Subscription</h1>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 py-6">
        {/* Pricing Card */}
        <div className="bg-gradient-to-br from-[#1B4B8C] to-[#2a5fa8] text-white rounded-2xl p-8 mb-6 shadow-xl">
          <div className="text-center mb-6">
            <div className="inline-block bg-[#FF6B35] px-4 py-1 rounded-full text-sm font-semibold mb-4">
              Annual Subscription
            </div>
            <h2 className="text-5xl font-bold mb-2">₹3,000</h2>
            <p className="text-blue-100 text-lg">per year</p>
            <p className="text-sm text-blue-200 mt-2">That's just ₹250/month!</p>
          </div>

          <button
            onClick={handleSubscribe}
            className="w-full bg-[#FF6B35] text-white py-4 rounded-xl font-bold text-lg hover:bg-[#e5572a] transition-colors shadow-lg"
          >
            Subscribe Now
          </button>
        </div>

        {/* Features List */}
        <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
          <h3 className="font-bold text-xl text-gray-900 mb-4">What You Get</h3>
          <div className="space-y-3">
            {features.map((feature, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-4 h-4 text-green-600" />
                </div>
                <span className="text-gray-700">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Trust Badges */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-2xl">🔒</span>
            <div>
              <h4 className="font-semibold text-blue-900">Secure Payment</h4>
              <p className="text-sm text-blue-700">256-bit SSL encrypted transactions</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-2xl">💯</span>
            <div>
              <h4 className="font-semibold text-blue-900">Money-Back Guarantee</h4>
              <p className="text-sm text-blue-700">30-day full refund policy</p>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Dialog */}
      <Dialog open={showPaymentDialog} onOpenChange={setShowPaymentDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Complete Your Payment</DialogTitle>
            <DialogDescription>
              Annual subscription - ₹3,000 (incl. GST)
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handlePayment} className="space-y-4">
            {/* Payment Method Selection */}
            <div>
              <Label>Payment Method</Label>
              <div className="grid grid-cols-3 gap-2 mt-2">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-3 border-2 rounded-lg flex flex-col items-center gap-2 transition-colors ${
                    paymentMethod === 'card'
                      ? 'border-[#1B4B8C] bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <CreditCard className="w-5 h-5" />
                  <span className="text-xs font-medium">Card</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('upi')}
                  className={`p-3 border-2 rounded-lg flex flex-col items-center gap-2 transition-colors ${
                    paymentMethod === 'upi'
                      ? 'border-[#1B4B8C] bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <span className="text-xl">📱</span>
                  <span className="text-xs font-medium">UPI</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('netbanking')}
                  className={`p-3 border-2 rounded-lg flex flex-col items-center gap-2 transition-colors ${
                    paymentMethod === 'netbanking'
                      ? 'border-[#1B4B8C] bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <Building className="w-5 h-5" />
                  <span className="text-xs font-medium">Bank</span>
                </button>
              </div>
            </div>

            {/* Card Payment Form */}
            {paymentMethod === 'card' && (
              <>
                <div>
                  <Label htmlFor="cardName">Cardholder Name</Label>
                  <Input
                    id="cardName"
                    placeholder="Name on card"
                    required
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="cardNumber">Card Number</Label>
                  <Input
                    id="cardNumber"
                    placeholder="1234 5678 9012 3456"
                    required
                    maxLength={19}
                    className="mt-1"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="expiry">Expiry Date</Label>
                    <Input
                      id="expiry"
                      placeholder="MM/YY"
                      required
                      maxLength={5}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="cvv">CVV</Label>
                    <Input
                      id="cvv"
                      placeholder="123"
                      required
                      maxLength={3}
                      type="password"
                      className="mt-1"
                    />
                  </div>
                </div>
              </>
            )}

            {/* UPI Payment Form */}
            {paymentMethod === 'upi' && (
              <div>
                <Label htmlFor="upiId">UPI ID</Label>
                <Input
                  id="upiId"
                  placeholder="yourname@upi"
                  required
                  className="mt-1"
                />
              </div>
            )}

            {/* Net Banking Form */}
            {paymentMethod === 'netbanking' && (
              <div>
                <Label htmlFor="bank">Select Bank</Label>
                <select
                  id="bank"
                  required
                  className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1B4B8C]"
                >
                  <option value="">Select your bank</option>
                  <option value="sbi">State Bank of India</option>
                  <option value="hdfc">HDFC Bank</option>
                  <option value="icici">ICICI Bank</option>
                  <option value="axis">Axis Bank</option>
                  <option value="kotak">Kotak Mahindra Bank</option>
                  <option value="pnb">Punjab National Bank</option>
                </select>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={processing}
              className="w-full bg-[#1B4B8C] text-white py-3 rounded-lg font-semibold hover:bg-[#163a6f] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {processing ? 'Processing...' : 'Pay ₹3,000'}
            </button>

            <p className="text-xs text-gray-500 text-center">
              By completing this purchase, you agree to our Terms of Service and Privacy Policy.
            </p>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
