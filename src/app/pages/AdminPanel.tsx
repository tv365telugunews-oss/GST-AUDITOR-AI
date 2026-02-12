import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../contexts/AuthContext';
import {
  Users,
  TrendingUp,
  IndianRupee,
  AlertCircle,
  CheckCircle,
  XCircle,
  Search,
  Calendar,
  FileText,
  Settings,
  LogOut,
} from 'lucide-react';
import { toast } from 'sonner';

interface AdminUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  businessName: string;
  gstin: string;
  subscriptionStatus: 'active' | 'expired' | 'pending';
  subscriptionEndDate?: string;
  registeredDate: string;
}

export default function AdminPanel() {
  const navigate = useNavigate();
  const { user, isAdmin, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<'dashboard' | 'users' | 'payments'>('dashboard');
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'expired' | 'pending'>('all');

  useEffect(() => {
    if (!isAdmin) {
      navigate('/');
      return;
    }

    // Load users from localStorage
    const loadedUsers = JSON.parse(localStorage.getItem('gst_auditor_users') || '[]');
    const usersWithDates = loadedUsers.map((u: any) => ({
      ...u,
      registeredDate: u.registeredDate || '2026-02-01',
    }));
    setUsers(usersWithDates);
  }, [isAdmin, navigate]);

  const stats = {
    totalUsers: users.length,
    activeSubscriptions: users.filter((u) => u.subscriptionStatus === 'active').length,
    pendingPayments: users.filter((u) => u.subscriptionStatus === 'pending').length,
    revenue: users.filter((u) => u.subscriptionStatus === 'active').length * 3540, // 3000 + GST
  };

  const filteredUsers = users.filter((u) => {
    const matchesSearch =
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.businessName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.gstin.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesFilter = filterStatus === 'all' || u.subscriptionStatus === filterStatus;

    return matchesSearch && matchesFilter;
  });

  const handleUpdateSubscription = (userId: string, status: 'active' | 'expired' | 'pending') => {
    const updatedUsers = users.map((u) => {
      if (u.id === userId) {
        const endDate =
          status === 'active'
            ? new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
            : undefined;
        return { ...u, subscriptionStatus: status, subscriptionEndDate: endDate };
      }
      return u;
    });

    setUsers(updatedUsers);
    localStorage.setItem('gst_auditor_users', JSON.stringify(updatedUsers));
    toast.success(`Subscription ${status} for user`);
  };

  const handleDeleteUser = (userId: string) => {
    if (confirm('Are you sure you want to delete this user?')) {
      const updatedUsers = users.filter((u) => u.id !== userId);
      setUsers(updatedUsers);
      localStorage.setItem('gst_auditor_users', JSON.stringify(updatedUsers));
      toast.success('User deleted successfully');
    }
  };

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-[#1B4B8C] text-white px-6 py-6 sticky top-0 z-10">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold">Admin Panel</h1>
            <p className="text-white/70 text-sm">GST Auditor AI Management</p>
          </div>
          <button
            onClick={() => {
              logout();
              navigate('/welcome');
              toast.success('Logged out successfully');
            }}
            className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg hover:bg-white/20 transition-all flex items-center gap-2"
          >
            <LogOut className="size-4" />
            <span className="text-sm">Logout</span>
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`flex-1 py-3 rounded-lg font-medium transition-all ${
              activeTab === 'dashboard'
                ? 'bg-white text-[#1B4B8C]'
                : 'bg-white/10 hover:bg-white/20'
            }`}
          >
            Dashboard
          </button>
          <button
            onClick={() => setActiveTab('users')}
            className={`flex-1 py-3 rounded-lg font-medium transition-all ${
              activeTab === 'users' ? 'bg-white text-[#1B4B8C]' : 'bg-white/10 hover:bg-white/20'
            }`}
          >
            Users
          </button>
          <button
            onClick={() => setActiveTab('payments')}
            className={`flex-1 py-3 rounded-lg font-medium transition-all ${
              activeTab === 'payments'
                ? 'bg-white text-[#1B4B8C]'
                : 'bg-white/10 hover:bg-white/20'
            }`}
          >
            Payments
          </button>
        </div>
      </div>

      <div className="px-6 py-6">
        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div className="space-y-4">
            {/* Stats Cards */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white rounded-xl p-4 shadow-sm">
                <div className="flex items-center gap-3 mb-2">
                  <Users className="size-8 text-[#1B4B8C]" />
                  <div>
                    <div className="text-2xl font-bold text-[#1B4B8C]">
                      {stats.totalUsers}
                    </div>
                    <div className="text-sm text-gray-600">Total Users</div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-4 shadow-sm">
                <div className="flex items-center gap-3 mb-2">
                  <CheckCircle className="size-8 text-green-600" />
                  <div>
                    <div className="text-2xl font-bold text-green-600">
                      {stats.activeSubscriptions}
                    </div>
                    <div className="text-sm text-gray-600">Active</div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-4 shadow-sm">
                <div className="flex items-center gap-3 mb-2">
                  <AlertCircle className="size-8 text-yellow-600" />
                  <div>
                    <div className="text-2xl font-bold text-yellow-600">
                      {stats.pendingPayments}
                    </div>
                    <div className="text-sm text-gray-600">Pending</div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-4 shadow-sm">
                <div className="flex items-center gap-3 mb-2">
                  <IndianRupee className="size-8 text-[#FF6B35]" />
                  <div>
                    <div className="text-2xl font-bold text-[#FF6B35]">
                      ₹{stats.revenue.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-600">Revenue</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <h3 className="font-bold text-[#1B4B8C] mb-4 flex items-center gap-2">
                <TrendingUp className="size-5" />
                Recent Activity
              </h3>
              <div className="space-y-3">
                {users.slice(0, 5).map((user) => (
                  <div
                    key={user.id}
                    className="flex items-center justify-between py-2 border-b last:border-0"
                  >
                    <div>
                      <div className="font-medium text-gray-900">{user.name}</div>
                      <div className="text-sm text-gray-600">{user.email}</div>
                    </div>
                    <div
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        user.subscriptionStatus === 'active'
                          ? 'bg-green-100 text-green-700'
                          : user.subscriptionStatus === 'pending'
                          ? 'bg-yellow-100 text-yellow-700'
                          : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {user.subscriptionStatus}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Users Tab */}
        {activeTab === 'users' && (
          <div className="space-y-4">
            {/* Search and Filter */}
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <div className="relative mb-3">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search users..."
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:border-[#1B4B8C] focus:outline-none"
                />
              </div>
              <div className="flex gap-2">
                {(['all', 'active', 'pending', 'expired'] as const).map((status) => (
                  <button
                    key={status}
                    onClick={() => setFilterStatus(status)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      filterStatus === status
                        ? 'bg-[#1B4B8C] text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Users List */}
            <div className="space-y-3">
              {filteredUsers.map((user) => (
                <div key={user.id} className="bg-white rounded-xl p-4 shadow-sm">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="font-bold text-[#1B4B8C]">{user.name}</div>
                      <div className="text-sm text-gray-600">{user.email}</div>
                      <div className="text-sm text-gray-600">{user.phone}</div>
                    </div>
                    <div
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        user.subscriptionStatus === 'active'
                          ? 'bg-green-100 text-green-700'
                          : user.subscriptionStatus === 'pending'
                          ? 'bg-yellow-100 text-yellow-700'
                          : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {user.subscriptionStatus}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm mb-3">
                    <div>
                      <span className="text-gray-500">Business:</span>{' '}
                      <span className="font-medium">{user.businessName}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">GSTIN:</span>{' '}
                      <span className="font-medium">{user.gstin}</span>
                    </div>
                    {user.subscriptionEndDate && (
                      <div className="col-span-2">
                        <span className="text-gray-500">Expires:</span>{' '}
                        <span className="font-medium">
                          {new Date(user.subscriptionEndDate).toLocaleDateString('en-IN')}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleUpdateSubscription(user.id, 'active')}
                      className="flex-1 bg-green-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition-all"
                    >
                      Activate
                    </button>
                    <button
                      onClick={() => handleUpdateSubscription(user.id, 'expired')}
                      className="flex-1 bg-red-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-red-700 transition-all"
                    >
                      Expire
                    </button>
                    <button
                      onClick={() => handleDeleteUser(user.id)}
                      className="px-4 bg-gray-200 text-gray-700 py-2 rounded-lg text-sm font-medium hover:bg-gray-300 transition-all"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
              {filteredUsers.length === 0 && (
                <div className="bg-white rounded-xl p-8 text-center shadow-sm">
                  <Users className="size-12 mx-auto text-gray-400 mb-3" />
                  <p className="text-gray-600">No users found</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Payments Tab */}
        {activeTab === 'payments' && (
          <div className="space-y-4">
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <h3 className="font-bold text-[#1B4B8C] mb-4 flex items-center gap-2">
                <IndianRupee className="size-5" />
                Payment Summary
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between py-2 border-b">
                  <span className="text-gray-600">Total Revenue</span>
                  <span className="font-bold text-[#1B4B8C]">
                    ₹{stats.revenue.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center justify-between py-2 border-b">
                  <span className="text-gray-600">Active Subscriptions</span>
                  <span className="font-bold text-green-600">{stats.activeSubscriptions}</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b">
                  <span className="text-gray-600">Pending Payments</span>
                  <span className="font-bold text-yellow-600">{stats.pendingPayments}</span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="text-gray-600">Average per User</span>
                  <span className="font-bold text-[#FF6B35]">₹3,540</span>
                </div>
              </div>
            </div>

            {/* Recent Payments */}
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <h3 className="font-bold text-[#1B4B8C] mb-4">Recent Payments</h3>
              <div className="space-y-3">
                {users
                  .filter((u) => u.subscriptionStatus === 'active')
                  .map((user) => (
                    <div
                      key={user.id}
                      className="flex items-center justify-between py-2 border-b last:border-0"
                    >
                      <div>
                        <div className="font-medium text-gray-900">{user.name}</div>
                        <div className="text-sm text-gray-600">{user.email}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-green-600">₹3,540</div>
                        <div className="text-xs text-gray-500">Paid</div>
                      </div>
                    </div>
                  ))}
                {stats.activeSubscriptions === 0 && (
                  <div className="text-center py-8 text-gray-500">No payments yet</div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
