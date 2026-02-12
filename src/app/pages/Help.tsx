import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, MessageCircle, Book, Phone, Mail, ChevronDown, ChevronUp } from 'lucide-react';
import { toast } from 'sonner';

export default function Help() {
  const navigate = useNavigate();
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);

  const handleAIChat = () => {
    toast.info('AI Assistant', {
      description: 'Opening AI chat assistant...',
    });
    setTimeout(() => navigate('/'), 500);
  };

  const handleContactOption = (option: string) => {
    toast.success('Contact Option', {
      description: `Opening ${option}...`,
    });
  };

  const faqs = [
    {
      question: 'How do I file GSTR-1?',
      answer: 'Navigate to GST Returns, select GSTR-1, review your outward supplies, and click "File Now". Our AI assistant can guide you through each step if you need help.',
    },
    {
      question: 'What is E-Invoice?',
      answer: 'E-Invoice is a system where invoices are electronically authenticated by GSTN for all B2B transactions. It generates a unique Invoice Reference Number (IRN) for each invoice.',
    },
    {
      question: 'How to calculate GST?',
      answer: 'Use our GST calculator in the Tools section to automatically calculate tax. You can also use the formula: GST = (Original Cost × GST%) / 100. Our app auto-calculates GST when you create invoices.',
    },
  ];

  return (
    <div className="pb-20 bg-[#F9FAFB] min-h-screen">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-md mx-auto px-4 py-4 flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 rounded-full">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-xl font-semibold">Help & Support</h1>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 py-6">
        {/* AI Assistant */}
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 rounded-xl p-5 mb-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 bg-[#FF6B35] rounded-full flex items-center justify-center">
              <MessageCircle className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-purple-900">AI Assistant</h3>
              <p className="text-sm text-purple-700">Get instant help</p>
            </div>
          </div>
          <button 
            onClick={handleAIChat}
            className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
          >
            Chat with AI
          </button>
        </div>

        {/* Help Options */}
        <div className="space-y-3 mb-6">
          <button 
            onClick={() => handleContactOption('Knowledge Base')}
            className="w-full bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow flex items-center gap-4"
          >
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <Book className="w-6 h-6 text-blue-600" />
            </div>
            <div className="flex-1 text-left">
              <h3 className="font-semibold text-gray-900">Knowledge Base</h3>
              <p className="text-sm text-gray-600">Browse articles and guides</p>
            </div>
          </button>

          <button 
            onClick={() => handleContactOption('Phone Support')}
            className="w-full bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow flex items-center gap-4"
          >
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <Phone className="w-6 h-6 text-green-600" />
            </div>
            <div className="flex-1 text-left">
              <h3 className="font-semibold text-gray-900">Phone Support</h3>
              <p className="text-sm text-gray-600">1800-XXX-XXXX (Toll Free)</p>
            </div>
          </button>

          <button 
            onClick={() => handleContactOption('Email Support')}
            className="w-full bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow flex items-center gap-4"
          >
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
              <Mail className="w-6 h-6 text-orange-600" />
            </div>
            <div className="flex-1 text-left">
              <h3 className="font-semibold text-gray-900">Email Support</h3>
              <p className="text-sm text-gray-600">support@gstauditor.com</p>
            </div>
          </button>
        </div>

        {/* FAQs */}
        <div>
          <h2 className="font-semibold text-lg mb-3 text-gray-700">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm overflow-hidden">
                <button
                  onClick={() => setExpandedFAQ(expandedFAQ === index ? null : index)}
                  className="w-full p-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <h3 className="font-semibold text-gray-900 pr-4">{faq.question}</h3>
                  {expandedFAQ === index ? (
                    <ChevronUp className="w-5 h-5 text-gray-500 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
                  )}
                </button>
                {expandedFAQ === index && (
                  <div className="px-4 pb-4">
                    <p className="text-sm text-gray-600">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}