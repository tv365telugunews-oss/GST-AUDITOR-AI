import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'sonner';
import { CheckCircle, CreditCard, Building2, Smartphone, ArrowLeft, Shield } from 'lucide-react';

export default function SubscriptionGateway() {
  const navigate = useNavigate();
  const { user, updateSubscription } = useAuth();
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'upi' | 'netbanking'>('upi');
  const [loading, setLoading] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
    upiId: '',
    bankName: '',
  });

  const basePrice = 3000;
  const gstRate = 0.18;
  const gstAmount = basePrice * gstRate;
  const totalAmount = basePrice + gstAmount;

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate payment processing
    setTimeout(() => {
      // Calculate subscription end date (1 year from now)
      const endDate = new Date();
      endDate.setFullYear(endDate.getFullYear() + 1);
      const endDateStr = endDate.toISOString().split('T')[0];

      // Update user subscription
      updateSubscription('active', endDateStr);

      toast.success('Payment successful! Welcome to GST Auditor AI 🎉');
      setLoading(false);
      navigate('/');
    }, 2000);
  };

  if (!user) {
    navigate('/auth?mode=login');
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1B4B8C] to-[#0F2D54]">
      <div className="px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate(-1)}
            className="text-white/70 hover:text-white flex items-center gap-2 mb-6"
          >
            <ArrowLeft className="size-5" />
            <span>Back</span>
          </button>
          <h1 className="text-3xl font-bold text-white mb-2">
            Complete Your Subscription
          </h1>
          <p className="text-white/70">One payment. One year of complete GST peace.</p>
        </div>

        {/* Subscription Card */}
        <div className="bg-white rounded-2xl p-6 mb-6 shadow-xl">
          <div className="flex items-center justify-between mb-4 pb-4 border-b">
            <div>
              <h2 className="text-xl font-bold text-[#1B4B8C]">Annual Plan</h2>
              <p className="text-sm text-gray-600">All features included</p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-[#1B4B8C]">₹{basePrice.toLocaleString()}</div>
              <div className="text-sm text-gray-600">+ ₹{gstAmount.toFixed(0)} GST</div>
            </div>
          </div>

          {/* Features */}
          <div className="space-y-3 mb-4">
            {[
              'Unlimited GST Returns',
              'E-Invoice & IRN Generation',
              'E-Way Bill Generation',
              'GST Tools & Calculators',
              'Smart Due Date Alerts',
              'PDF Report Downloads',
              'AI GST Assistant',
              'Priority Support',
            ].map((feature, index) => (
              <div key={index} className="flex items-center gap-3">
                <CheckCircle className="size-5 text-green-600 flex-shrink-0" />
                <span className="text-gray-700">{feature}</span>
              </div>
            ))}
          </div>

          {/* Total */}
          <div className="bg-[#1B4B8C]/5 rounded-xl p-4 border border-[#1B4B8C]/10">
            <div className="flex items-center justify-between text-lg font-bold text-[#1B4B8C]">
              <span>Total Amount</span>
              <span>₹{totalAmount.toFixed(0)}</span>
            </div>
            <p className="text-xs text-gray-600 mt-1">Valid for 365 days from activation</p>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="bg-white rounded-2xl p-6 mb-6 shadow-xl">
          <h3 className="font-bold text-[#1B4B8C] mb-4">Select Payment Method</h3>
          
          <div className="space-y-3 mb-6">
            <button
              onClick={() => setPaymentMethod('upi')}
              className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all ${
                paymentMethod === 'upi'
                  ? 'border-[#FF6B35] bg-[#FF6B35]/5'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <Smartphone className="size-6 text-[#1B4B8C]" />
              <div className="flex-1 text-left">
                <div className="font-semibold text-[#1B4B8C]">UPI</div>
                <div className="text-sm text-gray-600">PhonePe, Google Pay, Paytm</div>
              </div>
              {paymentMethod === 'upi' && (
                <CheckCircle className="size-6 text-[#FF6B35]" />
              )}
            </button>

            <button
              onClick={() => setPaymentMethod('card')}
              className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all ${
                paymentMethod === 'card'
                  ? 'border-[#FF6B35] bg-[#FF6B35]/5'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <CreditCard className="size-6 text-[#1B4B8C]" />
              <div className="flex-1 text-left">
                <div className="font-semibold text-[#1B4B8C]">Credit/Debit Card</div>
                <div className="text-sm text-gray-600">Visa, Mastercard, RuPay</div>
              </div>
              {paymentMethod === 'card' && (
                <CheckCircle className="size-6 text-[#FF6B35]" />
              )}
            </button>

            <button
              onClick={() => setPaymentMethod('netbanking')}
              className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all ${
                paymentMethod === 'netbanking'
                  ? 'border-[#FF6B35] bg-[#FF6B35]/5'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <Building2 className="size-6 text-[#1B4B8C]" />
              <div className="flex-1 text-left">
                <div className="font-semibold text-[#1B4B8C]">Net Banking</div>
                <div className="text-sm text-gray-600">All major banks</div>
              </div>
              {paymentMethod === 'netbanking' && (
                <CheckCircle className="size-6 text-[#FF6B35]" />
              )}
            </button>
          </div>

          {/* Payment Form */}
          <form onSubmit={handlePayment} className="space-y-4">
            {paymentMethod === 'card' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Card Number
                  </label>
                  <input
                    type="text"
                    required
                    maxLength={19}
                    value={paymentDetails.cardNumber}
                    onChange={(e) => setPaymentDetails({ ...paymentDetails, cardNumber: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#FF6B35] focus:outline-none"
                    placeholder="1234 5678 9012 3456"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cardholder Name
                  </label>
                  <input
                    type="text"
                    required
                    value={paymentDetails.cardName}
                    onChange={(e) => setPaymentDetails({ ...paymentDetails, cardName: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#FF6B35] focus:outline-none"
                    placeholder="Name on card"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Expiry Date
                    </label>
                    <input
                      type="text"
                      required
                      maxLength={5}
                      value={paymentDetails.expiryDate}
                      onChange={(e) => setPaymentDetails({ ...paymentDetails, expiryDate: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#FF6B35] focus:outline-none"
                      placeholder="MM/YY"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      CVV
                    </label>
                    <input
                      type="text"
                      required
                      maxLength={3}
                      value={paymentDetails.cvv}
                      onChange={(e) => setPaymentDetails({ ...paymentDetails, cvv: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#FF6B35] focus:outline-none"
                      placeholder="123"
                    />
                  </div>
                </div>
              </>
            )}

            {paymentMethod === 'upi' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  UPI ID
                </label>
                <input
                  type="text"
                  required
                  value={paymentDetails.upiId}
                  onChange={(e) => setPaymentDetails({ ...paymentDetails, upiId: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#FF6B35] focus:outline-none"
                  placeholder="yourname@paytm"
                />
              </div>
            )}

            {paymentMethod === 'netbanking' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Bank
                </label>
                <select
                  required
                  value={paymentDetails.bankName}
                  onChange={(e) => setPaymentDetails({ ...paymentDetails, bankName: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#FF6B35] focus:outline-none"
                >
                  <option value="">Choose your bank</option>
                  <option value="sbi">State Bank of India</option>
                  <option value="hdfc">HDFC Bank</option>
                  <option value="icici">ICICI Bank</option>
                  <option value="axis">Axis Bank</option>
                  <option value="pnb">Punjab National Bank</option>
                  <option value="other">Other Banks</option>
                </select>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#FF6B35] text-white py-4 rounded-xl font-semibold text-lg shadow-lg hover:bg-[#FF8C5A] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Processing Payment...' : `Pay ₹${totalAmount.toFixed(0)}`}
            </button>
          </form>
        </div>

        {/* Security Notice */}
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
          <div className="flex items-start gap-3 text-white">
            <Shield className="size-5 flex-shrink-0 mt-0.5" />
            <div className="text-sm">
              <p className="font-medium mb-1">100% Secure Payment</p>
              <p className="text-white/70">
                Your payment information is encrypted and secure. We never store your card details.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 text-center text-sm text-white/50">
          <p>
            By proceeding, you agree to our{' '}
            <button
              onClick={() => window.open('/terms', '_blank')}
              className="text-[#FF6B35] underline"
            >
              Terms & Conditions
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
