import { useNavigate } from 'react-router';
import { ArrowLeft, Bell, Settings } from 'lucide-react';
import { Switch } from '../components/ui/switch';
import { toast } from 'sonner';

export default function Notifications() {
  const navigate = useNavigate();

  const handleNotificationClick = (title: string, route?: string) => {
    toast.info(title, {
      description: 'Opening details...',
    });
    if (route) {
      setTimeout(() => navigate(route), 500);
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
          <h1 className="text-xl font-semibold">Notifications</h1>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 py-6">
        {/* Recent Notifications */}
        <div className="mb-6">
          <h2 className="font-semibold text-lg mb-3 text-gray-700">Recent</h2>
          <div className="space-y-3">
            <button 
              onClick={() => handleNotificationClick('GSTR-1 Due Soon', '/returns')}
              className="w-full bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow text-left"
            >
              <div className="flex gap-3">
                <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Bell className="w-5 h-5 text-red-600" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">GSTR-1 Due Soon</p>
                  <p className="text-sm text-gray-600">File your GSTR-1 return by 11th March</p>
                  <p className="text-xs text-gray-500 mt-1">2 hours ago</p>
                </div>
              </div>
            </button>

            <button 
              onClick={() => handleNotificationClick('New Invoice Added', '/sales')}
              className="w-full bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow text-left"
            >
              <div className="flex gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Bell className="w-5 h-5 text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">New Invoice Added</p>
                  <p className="text-sm text-gray-600">Invoice INV-004 created successfully</p>
                  <p className="text-xs text-gray-500 mt-1">5 hours ago</p>
                </div>
              </div>
            </button>

            <button 
              onClick={() => handleNotificationClick('GSTR-3B Filed', '/returns')}
              className="w-full bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow text-left"
            >
              <div className="flex gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Bell className="w-5 h-5 text-green-600" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">GSTR-3B Filed</p>
                  <p className="text-sm text-gray-600">Your GSTR-3B for January has been filed</p>
                  <p className="text-xs text-gray-500 mt-1">1 day ago</p>
                </div>
              </div>
            </button>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="mb-6">
          <h2 className="font-semibold text-lg mb-3 text-gray-700">Settings</h2>
          <div className="bg-white rounded-xl shadow-sm p-4 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">Due Date Reminders</p>
                <p className="text-sm text-gray-600">Get notified before deadlines</p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <div>
                <p className="font-medium text-gray-900">Invoice Updates</p>
                <p className="text-sm text-gray-600">Notifications for new invoices</p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <div>
                <p className="font-medium text-gray-900">Compliance Alerts</p>
                <p className="text-sm text-gray-600">Important GST compliance updates</p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <div>
                <p className="font-medium text-gray-900">AI Suggestions</p>
                <p className="text-sm text-gray-600">Smart recommendations</p>
              </div>
              <Switch defaultChecked />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}