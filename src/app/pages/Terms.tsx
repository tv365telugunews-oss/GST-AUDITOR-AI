import { useNavigate } from 'react-router';
import { ArrowLeft, FileText } from 'lucide-react';

export default function Terms() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-[#1B4B8C] text-white px-6 py-6">
        <button
          onClick={() => navigate(-1)}
          className="text-white/70 hover:text-white flex items-center gap-2 mb-4"
        >
          <ArrowLeft className="size-5" />
          <span>Back</span>
        </button>
        <div className="flex items-center gap-3">
          <FileText className="size-8" />
          <div>
            <h1 className="text-2xl font-bold">Terms and Conditions</h1>
            <p className="text-white/70 text-sm">GST Auditor AI</p>
          </div>
        </div>
      </div>

      <div className="px-6 py-8 max-w-3xl mx-auto">
        <div className="bg-white rounded-2xl p-6 shadow-sm space-y-6">
          <div>
            <p className="text-gray-600 mb-4">
              <strong>Effective Date:</strong> February 12, 2026
            </p>
            <p className="text-gray-700">
              These Terms and Conditions ("Terms") govern the use of the GST AUDITOR AI mobile
              application and web platform ("App", "Service") operated by:
            </p>
            <div className="bg-blue-50 rounded-lg p-4 mt-4">
              <p className="font-semibold text-[#1B4B8C]">www.gsttoday.com</p>
              <p className="text-gray-700">Email: gsttodaytv99@gmail.com</p>
            </div>
            <p className="text-gray-700 mt-4">
              By using this App, you agree to these Terms. If you do not agree, please do not use
              the App.
            </p>
          </div>

          <div className="border-t pt-6">
            <h2 className="text-xl font-bold text-[#1B4B8C] mb-3 flex items-center gap-2">
              <span className="text-2xl">1️⃣</span> Nature of Service
            </h2>
            <p className="text-gray-700 mb-3">
              GST AUDITOR AI is a GST compliance assistance software designed to:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>Generate GST reports</li>
              <li>Assist in GST return preparation</li>
              <li>Generate E-invoices & IRN</li>
              <li>Generate E-Way Bills</li>
              <li>Provide GST tools and calculators</li>
              <li>Provide due date alerts and reminders</li>
            </ul>
            <p className="text-gray-700 mt-3 font-medium">
              The App does not act as a Chartered Accountant, legal advisor, or government
              authority.
            </p>
          </div>

          <div className="border-t pt-6">
            <h2 className="text-xl font-bold text-[#1B4B8C] mb-3 flex items-center gap-2">
              <span className="text-2xl">2️⃣</span> No Professional Advice
            </h2>
            <ul className="space-y-2 text-gray-700">
              <li>• The App provides automated GST calculations and compliance tools.</li>
              <li>• The information generated is for assistance purposes only.</li>
              <li>• Users are responsible for verifying data before filing.</li>
              <li>
                • The developer is not responsible for incorrect filings, penalties, interest, or
                notices received due to incorrect data entered by the user.
              </li>
              <li>• Users are advised to consult a qualified tax professional when required.</li>
            </ul>
          </div>

          <div className="border-t pt-6">
            <h2 className="text-xl font-bold text-[#1B4B8C] mb-3 flex items-center gap-2">
              <span className="text-2xl">3️⃣</span> User Responsibilities
            </h2>
            <p className="text-gray-700 mb-3">Users agree that:</p>
            <ul className="space-y-2 text-gray-700">
              <li>• All data entered must be accurate and truthful.</li>
              <li>• GSTIN, invoice details, and tax values must be correct.</li>
              <li>• Filing returns remains the sole responsibility of the user.</li>
              <li>• The App does not guarantee acceptance of returns by GST Portal.</li>
              <li>• Incorrect information entered by users is entirely their responsibility.</li>
            </ul>
          </div>

          <div className="border-t pt-6">
            <h2 className="text-xl font-bold text-[#1B4B8C] mb-3 flex items-center gap-2">
              <span className="text-2xl">4️⃣</span> E-Invoice & E-Way Bill Disclaimer
            </h2>
            <ul className="space-y-2 text-gray-700">
              <li>• IRN and E-Way Bill generation depend on GSTN / NIC systems.</li>
              <li className="font-medium">The App is not responsible for:</li>
              <li className="ml-6">- Government server downtime</li>
              <li className="ml-6">- API failures</li>
              <li className="ml-6">- Rejected IRN due to incorrect details</li>
              <li>• Once IRN is generated, invoices cannot be edited as per GST law.</li>
            </ul>
          </div>

          <div className="border-t pt-6">
            <h2 className="text-xl font-bold text-[#1B4B8C] mb-3 flex items-center gap-2">
              <span className="text-2xl">5️⃣</span> GST API Integration & Filing Disclaimer
            </h2>
            
            <h3 className="font-semibold text-gray-800 mb-2 mt-4">1️⃣ Role as Application Service Provider (ASP)</h3>
            <ul className="space-y-2 text-gray-700 mb-4">
              <li>• GST AUDITOR AI operates as an Application Service Provider (ASP) and facilitates GST return preparation and submission through authorized GST Suvidha Providers (GSPs).</li>
              <li>• The App is not a government entity and is not affiliated with the Goods and Services Tax Network (GSTN) or the Government of India.</li>
            </ul>

            <h3 className="font-semibold text-gray-800 mb-2 mt-4">2️⃣ Filing Subject to GSTN Approval</h3>
            <ul className="space-y-2 text-gray-700 mb-4">
              <li>• All GST return submissions, E-Invoice generation (IRN), and E-Way Bill generation made through the App are subject to validation, acceptance, and approval by the GSTN system.</li>
              <li>• GST AUDITOR AI does not guarantee acceptance, processing, or approval of any return or submission by GSTN.</li>
              <li>• The final status of any filing shall be determined solely by the GSTN portal.</li>
            </ul>

            <h3 className="font-semibold text-gray-800 mb-2 mt-4">3️⃣ No Guarantee of GST Portal Uptime</h3>
            <p className="text-gray-700 mb-2">GST filing, IRN generation, and E-Way Bill services depend on the availability and operational status of:</p>
            <ul className="space-y-2 text-gray-700 mb-3 ml-4">
              <li>• GSTN systems</li>
              <li>• NIC systems</li>
              <li>• Authorized GSP infrastructure</li>
            </ul>
            <p className="text-gray-700 mb-2 font-medium">GST AUDITOR AI shall not be held responsible for:</p>
            <ul className="space-y-2 text-gray-700 mb-4 ml-4">
              <li>• GST portal downtime</li>
              <li>• API failures</li>
              <li>• Server unavailability</li>
              <li>• Delayed acknowledgments</li>
              <li>• Government system maintenance</li>
            </ul>

            <h3 className="font-semibold text-gray-800 mb-2 mt-4">4️⃣ User Responsibility for Data Accuracy</h3>
            <p className="text-gray-700 mb-2">Users are solely responsible for:</p>
            <ul className="space-y-2 text-gray-700 mb-3 ml-4">
              <li>• Accuracy of invoice data</li>
              <li>• Correct GSTIN details</li>
              <li>• Tax calculations entered</li>
              <li>• Selection of return period</li>
              <li>• Final verification before submission</li>
            </ul>
            <ul className="space-y-2 text-gray-700 mb-4">
              <li>• GST AUDITOR AI does not verify the legal correctness of user-entered data.</li>
              <li>• Any penalties, interest, notices, or legal consequences arising from incorrect data submission shall be the sole responsibility of the user.</li>
            </ul>

            <h3 className="font-semibold text-gray-800 mb-2 mt-4">5️⃣ Limitation of Liability</h3>
            <p className="text-gray-700 mb-2">
              Under no circumstances shall GST AUDITOR AI or its owner, <strong>Kasturi Gopala Krishna</strong>, be liable for:
            </p>
            <ul className="space-y-2 text-gray-700 mb-3 ml-4">
              <li>• Rejected filings</li>
              <li>• GST penalties</li>
              <li>• Interest or late fees</li>
              <li>• Loss of input tax credit</li>
              <li>• Business losses due to portal downtime</li>
            </ul>
            <p className="text-gray-700 font-medium">The App functions as a compliance facilitation platform only.</p>
          </div>

          <div className="border-t pt-6">
            <h2 className="text-xl font-bold text-[#1B4B8C] mb-3 flex items-center gap-2">
              <span className="text-2xl">6️⃣</span> Due Date Alerts Disclaimer
            </h2>
            <ul className="space-y-2 text-gray-700">
              <li>• Due dates are generated based on standard GST rules.</li>
              <li>• Government notifications may change deadlines.</li>
              <li>• Users must independently verify deadlines from official GST portal.</li>
              <li>• The App is not responsible for missed deadlines.</li>
            </ul>
          </div>

          <div className="border-t pt-6">
            <h2 className="text-xl font-bold text-[#1B4B8C] mb-3 flex items-center gap-2">
              <span className="text-2xl">7️⃣</span> Limitation of Liability
            </h2>
            <p className="text-gray-700 mb-3">
              Under no circumstances shall <strong>Kasturi Gopala Krishna</strong> be liable for:
            </p>
            <ul className="space-y-2 text-gray-700 ml-4">
              <li>• GST penalties</li>
              <li>• Interest</li>
              <li>• Late fees</li>
              <li>• Business losses</li>
              <li>• Government notices</li>
              <li>• Data entry mistakes by users</li>
            </ul>
            <p className="text-gray-700 mt-3 font-medium">
              The App is provided on an "AS IS" and "AS AVAILABLE" basis.
            </p>
          </div>

          <div className="border-t pt-6">
            <h2 className="text-xl font-bold text-[#1B4B8C] mb-3 flex items-center gap-2">
              <span className="text-2xl">8️⃣</span> Data Security
            </h2>
            <ul className="space-y-2 text-gray-700">
              <li>• The App uses reasonable security measures.</li>
              <li>• However, no online system is 100% secure.</li>
              <li>• Users are responsible for safeguarding login credentials.</li>
              <li className="font-medium">The developer is not responsible for breaches caused by:</li>
              <li className="ml-6">- Weak passwords</li>
              <li className="ml-6">- Sharing credentials</li>
              <li className="ml-6">- User negligence</li>
            </ul>
          </div>

          <div className="border-t pt-6">
            <h2 className="text-xl font-bold text-[#1B4B8C] mb-3 flex items-center gap-2">
              <span className="text-2xl">9️⃣</span> Data Usage
            </h2>
            <p className="text-gray-700 mb-3">User data is used for:</p>
            <ul className="space-y-2 text-gray-700 ml-4">
              <li>• GST report generation</li>
              <li>• Compliance processing</li>
              <li>• Notifications and alerts</li>
            </ul>
            <p className="text-gray-700 mt-3 font-medium">
              The App does not sell personal data to third parties.
            </p>
          </div>

          <div className="border-t pt-6">
            <h2 className="text-xl font-bold text-[#1B4B8C] mb-3 flex items-center gap-2">
              <span className="text-2xl">🔟</span> Service Availability
            </h2>
            <p className="text-gray-700 mb-3">We reserve the right to:</p>
            <ul className="space-y-2 text-gray-700 ml-4">
              <li>• Modify features</li>
              <li>• Suspend accounts</li>
              <li>• Update compliance modules</li>
              <li>• Temporarily disable services for maintenance</li>
            </ul>
            <p className="text-gray-700 mt-3">Without prior notice.</p>
          </div>

          <div className="border-t pt-6">
            <h2 className="text-xl font-bold text-[#1B4B8C] mb-3 flex items-center gap-2">
              <span className="text-2xl">1️⃣1️⃣</span> Subscription & Payments
            </h2>
            <ul className="space-y-2 text-gray-700">
              <li>• Subscription fees are non-refundable.</li>
              <li>• Failure to pay may result in service suspension.</li>
              <li>• Taxes applicable on subscription will be charged separately.</li>
            </ul>
          </div>

          <div className="border-t pt-6">
            <h2 className="text-xl font-bold text-[#1B4B8C] mb-3 flex items-center gap-2">
              <span className="text-2xl">1️⃣2️⃣</span> Account Suspension
            </h2>
            <p className="text-gray-700 mb-3">We may suspend accounts if:</p>
            <ul className="space-y-2 text-gray-700 ml-4">
              <li>• Fraudulent activity detected</li>
              <li>• Misuse of system</li>
              <li>• Illegal usage</li>
              <li>• Violation of these Terms</li>
            </ul>
          </div>

          <div className="border-t pt-6">
            <h2 className="text-xl font-bold text-[#1B4B8C] mb-3 flex items-center gap-2">
              <span className="text-2xl">1️⃣3️⃣</span> Intellectual Property
            </h2>
            <p className="text-gray-700">
              All content, branding, software design, and AI features belong to:
            </p>
            <p className="text-gray-700 font-semibold mt-2">
              GST AUDITOR AI / www.gsttoday.com
            </p>
            <p className="text-gray-700 mt-2">
              Unauthorized copying or redistribution is prohibited.
            </p>
          </div>

          <div className="border-t pt-6">
            <h2 className="text-xl font-bold text-[#1B4B8C] mb-3 flex items-center gap-2">
              <span className="text-2xl">1️⃣4️⃣</span> Governing Law
            </h2>
            <ul className="space-y-2 text-gray-700">
              <li>• These Terms shall be governed by the laws of India.</li>
              <li>• Any disputes shall be subject to jurisdiction of courts in India.</li>
            </ul>
          </div>

          <div className="border-t pt-6">
            <h2 className="text-xl font-bold text-[#1B4B8C] mb-3 flex items-center gap-2">
              <span className="text-2xl">1️⃣5️⃣</span> Contact Information
            </h2>
            <p className="text-gray-700 mb-3">For support or legal inquiries:</p>
            <div className="bg-blue-50 rounded-lg p-4">
              <p className="font-semibold text-[#1B4B8C]">www.gsttoday.com</p>
              <p className="text-gray-700">Email: gsttodaytv99@gmail.com</p>
            </div>
          </div>

          <div className="border-t pt-6 bg-yellow-50 rounded-lg p-4">
            <p className="text-sm text-gray-600 text-center">
              Last Updated: February 12, 2026
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}