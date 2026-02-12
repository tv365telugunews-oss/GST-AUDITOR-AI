import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  businessName: string;
  gstin: string;
  role: 'user' | 'admin';
  subscriptionStatus: 'active' | 'expired' | 'pending';
  subscriptionEndDate?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (data: RegisterData) => Promise<boolean>;
  logout: () => void;
  updateSubscription: (status: 'active' | 'expired' | 'pending', endDate?: string) => void;
}

interface RegisterData {
  name: string;
  email: string;
  phone: string;
  password: string;
  businessName: string;
  gstin: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  // Load user from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('gst_auditor_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Mock login - check for admin credentials
    if (email === 'admin@gsttoday.com' && password === 'admin123') {
      const adminUser: User = {
        id: 'admin-1',
        name: 'Admin User',
        email: 'admin@gsttoday.com',
        phone: '+91 9876543210',
        businessName: 'GST Auditor Admin',
        gstin: 'ADMIN123456789',
        role: 'admin',
        subscriptionStatus: 'active',
        subscriptionEndDate: '2027-12-31',
      };
      setUser(adminUser);
      localStorage.setItem('gst_auditor_user', JSON.stringify(adminUser));
      return true;
    }

    // Check for existing users in localStorage
    const users = JSON.parse(localStorage.getItem('gst_auditor_users') || '[]');
    const foundUser = users.find((u: any) => u.email === email && u.password === password);
    
    if (foundUser) {
      const { password: _, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      localStorage.setItem('gst_auditor_user', JSON.stringify(userWithoutPassword));
      return true;
    }

    return false;
  };

  const register = async (data: RegisterData): Promise<boolean> => {
    try {
      // Get existing users
      const users = JSON.parse(localStorage.getItem('gst_auditor_users') || '[]');
      
      // Check if email already exists
      if (users.some((u: any) => u.email === data.email)) {
        return false;
      }

      // Create new user
      const newUser = {
        id: `user-${Date.now()}`,
        ...data,
        role: 'user' as const,
        subscriptionStatus: 'pending' as const,
      };

      // Save to users array
      users.push(newUser);
      localStorage.setItem('gst_auditor_users', JSON.stringify(users));

      return true;
    } catch (error) {
      console.error('Registration error:', error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('gst_auditor_user');
  };

  const updateSubscription = (status: 'active' | 'expired' | 'pending', endDate?: string) => {
    if (user) {
      const updatedUser = {
        ...user,
        subscriptionStatus: status,
        subscriptionEndDate: endDate,
      };
      setUser(updatedUser);
      localStorage.setItem('gst_auditor_user', JSON.stringify(updatedUser));

      // Update in users array
      const users = JSON.parse(localStorage.getItem('gst_auditor_users') || '[]');
      const userIndex = users.findIndex((u: any) => u.id === user.id);
      if (userIndex !== -1) {
        users[userIndex] = { ...users[userIndex], subscriptionStatus: status, subscriptionEndDate: endDate };
        localStorage.setItem('gst_auditor_users', JSON.stringify(users));
      }
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isAdmin: user?.role === 'admin',
        login,
        register,
        logout,
        updateSubscription,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
