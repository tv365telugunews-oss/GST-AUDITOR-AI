import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'sonner';
import { Eye, EyeOff, ArrowLeft } from 'lucide-react';

export default function Auth() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { login, register } = useAuth();
  const [mode, setMode] = useState<'login' | 'register'>(
    (searchParams.get('mode') as 'login' | 'register') || 'login'
  );
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // Login form state
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  // Register form state
  const [registerData, setRegisterData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    businessName: '',
    gstin: '',
    acceptTerms: false,
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const success = await login(loginData.email, loginData.password);
      if (success) {
        toast.success('Login successful!');
        // Check if user needs to complete subscription
        navigate('/');
      } else {
        toast.error('Invalid email or password');
      }
    } catch (error) {
      toast.error('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Validation
    if (registerData.password !== registerData.confirmPassword) {
      toast.error('Passwords do not match');
      setLoading(false);
      return;
    }

    if (!registerData.acceptTerms) {
      toast.error('Please accept the terms and conditions');
      setLoading(false);
      return;
    }

    if (registerData.password.length < 6) {
      toast.error('Password must be at least 6 characters');
      setLoading(false);
      return;
    }

    try {
      const success = await register({
        name: registerData.name,
        email: registerData.email,
        phone: registerData.phone,
        password: registerData.password,
        businessName: registerData.businessName,
        gstin: registerData.gstin,
      });

      if (success) {
        toast.success('Registration successful! Please login.');
        setMode('login');
        setLoginData({ email: registerData.email, password: '' });
      } else {
        toast.error('Email already exists. Please login.');
      }
    } catch (error) {
      toast.error('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1B4B8C] to-[#0F2D54]">
      <div className="px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/welcome')}
            className="text-white/70 hover:text-white flex items-center gap-2 mb-6"
          >
            <ArrowLeft className="size-5" />
            <span>Back</span>
          </button>
          <h1 className="text-3xl font-bold text-white mb-2">
            {mode === 'login' ? 'Welcome Back!' : 'Create Account'}
          </h1>
          <p className="text-white/70">
            {mode === 'login'
              ? 'Login to access your GST dashboard'
              : 'Start your GST journey today'}
          </p>
        </div>

        {/* Mode Toggle */}
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-1 mb-6 flex">
          <button
            onClick={() => setMode('login')}
            className={`flex-1 py-3 rounded-lg font-medium transition-all ${
              mode === 'login'
                ? 'bg-white text-[#1B4B8C]'
                : 'text-white/70 hover:text-white'
            }`}
          >
            Login
          </button>
          <button
            onClick={() => setMode('register')}
            className={`flex-1 py-3 rounded-lg font-medium transition-all ${
              mode === 'register'
                ? 'bg-white text-[#1B4B8C]'
                : 'text-white/70 hover:text-white'
            }`}
          >
            Register
          </button>
        </div>

        {/* Login Form */}
        {mode === 'login' && (
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-white/90 mb-2 text-sm font-medium">
                Email Address
              </label>
              <input
                type="email"
                required
                value={loginData.email}
                onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-[#FF6B35]"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label className="block text-white/90 mb-2 text-sm font-medium">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={loginData.password}
                  onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-[#FF6B35] pr-12"
                  placeholder="Enter password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white"
                >
                  {showPassword ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
                </button>
              </div>
            </div>

            <div className="bg-[#FF6B35]/10 border border-[#FF6B35]/30 rounded-xl p-4 text-sm text-white/90">
              <p className="font-medium mb-1">Demo Credentials:</p>
              <p>Admin: admin@gsttoday.com / admin123</p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#FF6B35] text-white py-4 rounded-xl font-semibold text-lg shadow-lg hover:bg-[#FF8C5A] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>
        )}

        {/* Register Form */}
        {mode === 'register' && (
          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label className="block text-white/90 mb-2 text-sm font-medium">
                Full Name
              </label>
              <input
                type="text"
                required
                value={registerData.name}
                onChange={(e) => setRegisterData({ ...registerData, name: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-[#FF6B35]"
                placeholder="Rajesh Kumar"
              />
            </div>

            <div>
              <label className="block text-white/90 mb-2 text-sm font-medium">
                Email Address
              </label>
              <input
                type="email"
                required
                value={registerData.email}
                onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-[#FF6B35]"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label className="block text-white/90 mb-2 text-sm font-medium">
                Phone Number
              </label>
              <input
                type="tel"
                required
                value={registerData.phone}
                onChange={(e) => setRegisterData({ ...registerData, phone: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-[#FF6B35]"
                placeholder="+91 98765 43210"
              />
            </div>

            <div>
              <label className="block text-white/90 mb-2 text-sm font-medium">
                Business Name
              </label>
              <input
                type="text"
                required
                value={registerData.businessName}
                onChange={(e) => setRegisterData({ ...registerData, businessName: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-[#FF6B35]"
                placeholder="Kumar Enterprises"
              />
            </div>

            <div>
              <label className="block text-white/90 mb-2 text-sm font-medium">
                GSTIN
              </label>
              <input
                type="text"
                required
                pattern="[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}"
                value={registerData.gstin}
                onChange={(e) => setRegisterData({ ...registerData, gstin: e.target.value.toUpperCase() })}
                className="w-full px-4 py-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-[#FF6B35]"
                placeholder="27AAPFU0939F1ZV"
              />
            </div>

            <div>
              <label className="block text-white/90 mb-2 text-sm font-medium">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  minLength={6}
                  value={registerData.password}
                  onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-[#FF6B35] pr-12"
                  placeholder="Min 6 characters"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white"
                >
                  {showPassword ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-white/90 mb-2 text-sm font-medium">
                Confirm Password
              </label>
              <input
                type="password"
                required
                value={registerData.confirmPassword}
                onChange={(e) => setRegisterData({ ...registerData, confirmPassword: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-[#FF6B35]"
                placeholder="Re-enter password"
              />
            </div>

            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                id="terms"
                checked={registerData.acceptTerms}
                onChange={(e) => setRegisterData({ ...registerData, acceptTerms: e.target.checked })}
                className="mt-1 size-4 rounded border-white/20 bg-white/10 text-[#FF6B35] focus:ring-[#FF6B35]"
              />
              <label htmlFor="terms" className="text-sm text-white/90">
                I agree to the{' '}
                <button
                  type="button"
                  onClick={() => window.open('/terms', '_blank')}
                  className="text-[#FF6B35] underline"
                >
                  Terms and Conditions
                </button>
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#FF6B35] text-white py-4 rounded-xl font-semibold text-lg shadow-lg hover:bg-[#FF8C5A] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
