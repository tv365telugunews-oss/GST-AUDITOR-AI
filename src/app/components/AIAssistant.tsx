import { useState } from 'react';
import { Sparkles, X, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);

  const suggestions = [
    {
      icon: '💡',
      text: 'You have 2 invoices without IRN',
      action: 'Fix Now',
      link: '/sales',
    },
    {
      icon: '📅',
      text: 'File GSTR-1 tomorrow to avoid ₹2,000 late fee',
      action: 'File Return',
      link: '/returns',
    },
  ];

  return (
    <>
      {/* Floating Action Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-20 right-4 w-14 h-14 bg-[#FF6B35] rounded-full flex items-center justify-center shadow-lg z-50"
        whileTap={{ scale: 0.95 }}
        animate={{
          boxShadow: [
            '0 10px 30px rgba(255, 107, 53, 0.3)',
            '0 10px 40px rgba(255, 107, 53, 0.5)',
            '0 10px 30px rgba(255, 107, 53, 0.3)',
          ],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <Sparkles className="w-6 h-6 text-white" />
      </motion.button>

      {/* Chat Interface */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40"
              onClick={() => setIsOpen(false)}
            />

            {/* Chat Panel */}
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl z-50 max-w-md mx-auto"
              style={{ maxHeight: '80vh' }}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-200">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-[#FF6B35] rounded-full flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-white" />
                  </div>
                  <h3 className="font-semibold text-lg">AI Assistant</h3>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Content */}
              <div className="p-4 overflow-y-auto" style={{ maxHeight: 'calc(80vh - 140px)' }}>
                <div className="space-y-3">
                  <h4 className="font-medium text-gray-700 mb-3">AI Suggestions</h4>
                  {suggestions.map((suggestion, index) => (
                    <div
                      key={index}
                      className="bg-blue-50 border border-blue-200 rounded-xl p-4"
                    >
                      <div className="flex items-start gap-3">
                        <span className="text-2xl">{suggestion.icon}</span>
                        <div className="flex-1">
                          <p className="text-sm text-gray-700 mb-2">{suggestion.text}</p>
                          <button className="text-[#1B4B8C] text-sm font-medium flex items-center gap-1 hover:gap-2 transition-all">
                            {suggestion.action}
                            <ArrowRight className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6">
                  <h4 className="font-medium text-gray-700 mb-3">Ask Me Anything</h4>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Type your question..."
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1B4B8C] focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
