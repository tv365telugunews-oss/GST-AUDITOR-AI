import { useNavigate } from 'react-router';
import { CheckCircle, Sparkles, Shield, Bell, FileText, Calculator, Zap } from 'lucide-react';

export default function Welcome() {
  const navigate = useNavigate();

  const features = [
    {
      icon: FileText,
      title: 'Auto GST Reports',
      description: 'Generate GSTR-1, GSTR-3B instantly',
    },
    {
      icon: Zap,
      title: 'E-Invoice & IRN',
      description: 'Quick E-invoice generation',
    },
    {
      icon: Calculator,
      title: 'GST Calculators',
      description: 'Tax, reverse charge, ITC tools',
    },
    {
      icon: Bell,
      title: 'Smart Alerts',
      description: 'Never miss a filing deadline',
    },
    {
      icon: Shield,
      title: 'Secure & Simple',
      description: 'Bank-level security',
    },
    {
      icon: Sparkles,
      title: 'AI Assistant',
      description: 'Get instant GST help',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1B4B8C] to-[#0F2D54] text-white">
      {/* Hero Section */}
      <div className="px-6 pt-12 pb-8">
        <div className="text-center mb-8">
          <div className="inline-block bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-4">
            <span className="text-sm font-medium">Made for Indian Businesses 🇮🇳</span>
          </div>
          <h1 className="text-4xl font-bold mb-4">
            GST Auditor AI
          </h1>
          <p className="text-xl text-white/90 mb-2">
            India's Simplest GST App
          </p>
          <p className="text-white/70 max-w-md mx-auto">
            "My grandmother should understand GST with this app"
          </p>
        </div>

        {/* Illustration/Image Placeholder */}
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 mb-8 border border-white/10">
          <div className="aspect-video flex items-center justify-center text-white/40">
            <div className="text-center">
              <FileText className="size-20 mx-auto mb-4" />
              <p className="text-sm">Simple. Powerful. Made in India.</p>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/10"
              >
                <Icon className="size-8 mb-2 text-[#FF6B35]" />
                <h3 className="font-semibold text-sm mb-1">{feature.title}</h3>
                <p className="text-xs text-white/70">{feature.description}</p>
              </div>
            );
          })}
        </div>

        {/* Pricing Highlight */}
        <div className="bg-gradient-to-r from-[#FF6B35] to-[#FF8C5A] rounded-2xl p-6 mb-6 text-center shadow-xl">
          <p className="text-sm font-medium mb-2">One Simple Plan</p>
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="text-4xl font-bold">₹3,000</span>
            <span className="text-sm opacity-90">+ GST</span>
          </div>
          <p className="text-sm opacity-90">Per Year • All Features Included</p>
        </div>

        {/* CTA Buttons */}
        <div className="space-y-3">
          <button
            onClick={() => navigate('/auth?mode=register')}
            className="w-full bg-[#FF6B35] text-white py-4 rounded-xl font-semibold text-lg shadow-lg hover:bg-[#FF8C5A] transition-all"
          >
            Get Started Free
          </button>
          <button
            onClick={() => navigate('/auth?mode=login')}
            className="w-full bg-white/10 backdrop-blur-sm text-white py-4 rounded-xl font-semibold border border-white/20 hover:bg-white/20 transition-all"
          >
            I Already Have an Account
          </button>
        </div>

        {/* Trust Indicators */}
        <div className="mt-8 pt-6 border-t border-white/10">
          <div className="flex items-center justify-center gap-6 text-sm text-white/70">
            <div className="flex items-center gap-2">
              <CheckCircle className="size-4" />
              <span>100% Secure</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="size-4" />
              <span>GSTN Approved</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-white/50">
          <button
            onClick={() => navigate('/terms')}
            className="underline hover:text-white/70"
          >
            Terms & Conditions
          </button>
          <p className="mt-2">© 2026 GST Auditor AI</p>
          <p>www.gsttoday.com</p>
        </div>
      </div>
    </div>
  );
}
