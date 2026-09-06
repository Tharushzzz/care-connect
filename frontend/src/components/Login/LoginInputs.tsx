import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Eye, EyeOff, AlertCircle, Loader2 } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

const LoginInputs: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { login, loading } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }

    const result = await login(email, password);

    if (result.success && result.user) {
      // Role-based redirection
      if (result.user.role === 'admin') {
        navigate('/');
      } else if (result.user.role === 'caregiver') {
        navigate('/caregiver');
      } else {
        navigate('/');
      }
    } else {
      setError(result.error || 'Failed to sign in. Please check your credentials.');
    }
  };

  return (
    <div className="flex flex-col justify-center w-full lg:max-w-lg space-y-6">
      {/* Back button */}
      <div>
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-[#475467] hover:text-[#0D182B] transition-colors"
        >
          <ArrowLeft className="w-4 h-4 text-[#475467]" />
          <span>Back to Home</span>
        </Link>
      </div>

      {/* Heading */}
      <div className="space-y-1.5">
        <h1 className="text-4xl sm:text-5xl font-bold text-[#0D182B] tracking-tight">
          Welcome back
        </h1>
        <p className="text-sm sm:text-base text-[#475467]">
          Don't have an account?{' '}
          <Link to="/signup" className="text-[#0686CD] hover:underline font-semibold">
            Create a new account
          </Link>
        </p>
      </div>

      {/* Error Message Alert */}
      {error && (
        <div className="flex items-start gap-3 p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 animate-in fade-in duration-200">
          <AlertCircle className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
          <div className="text-sm font-medium">{error}</div>
        </div>
      )}

      {/* Form Fields */}
      <form onSubmit={handleLogin} className="space-y-5 pt-2">
        {/* Email / Phone Number */}
        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-[#344054]">
            Email or Phone number
          </label>
          <input
            type="text"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (error) setError(null);
            }}
            placeholder="Enter your email or phone number"
            required
            disabled={loading}
            className="w-full h-12 px-4 border border-[#D0D5DD] rounded-xl sm:rounded-2xl text-base text-[#101828] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0686CD]/30 focus:border-[#0686CD] transition-all disabled:bg-gray-50 disabled:cursor-not-allowed"
          />
        </div>

        {/* Password */}
        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-[#344054]">
            Password
          </label>
          <div className="relative flex items-center">
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (error) setError(null);
              }}
              placeholder="Enter your password"
              required
              disabled={loading}
              className="w-full h-12 pl-4 pr-11 border border-[#D0D5DD] rounded-xl sm:rounded-2xl text-base text-[#101828] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0686CD]/30 focus:border-[#0686CD] transition-all disabled:bg-gray-50 disabled:cursor-not-allowed"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              disabled={loading}
              className="absolute right-3.5 text-gray-500 hover:text-gray-700 cursor-pointer focus:outline-none"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? (
                <EyeOff className="w-5 h-5 text-[#667085]" />
              ) : (
                <Eye className="w-5 h-5 text-[#667085]" />
              )}
            </button>
          </div>
        </div>

        {/* Checkbox & Forgot Password */}
        <div className="flex items-center justify-between pt-1">
          <label className="flex items-center gap-2.5 cursor-pointer">
            <input
              type="checkbox"
              id="rememberMe"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              disabled={loading}
              className="w-4 h-4 rounded border-gray-300 text-[#0686CD] focus:ring-[#0686CD] cursor-pointer"
            />
            <span className="text-sm font-medium text-[#344054]">Remember me</span>
          </label>
          <Link
            to="/forgot-password"
            className="text-sm font-medium text-[#0686CD] hover:underline"
          >
            Forgot your password?
          </Link>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full h-12 bg-[#0686CD] hover:bg-[#0071A8] disabled:bg-[#0686CD]/70 text-white font-semibold text-base rounded-xl sm:rounded-2xl shadow-sm transition-colors cursor-pointer disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Signing in...</span>
            </>
          ) : (
            <span>Sign in</span>
          )}
        </button>

        {/* Divider */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-[#EAECF0]" />
          </div>
          <div className="relative flex justify-center text-xs sm:text-sm">
            <span className="px-3 bg-white text-[#667085] font-normal">Or continue with</span>
          </div>
        </div>

        {/* Social Buttons */}
        <div className="grid grid-cols-2 gap-3.5">
          <button
            type="button"
            className="w-full h-12 border border-[#D0D5DD] rounded-xl sm:rounded-2xl bg-white hover:bg-gray-50 flex items-center justify-center transition-colors cursor-pointer"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
          </button>

          <button
            type="button"
            className="w-full h-12 border border-[#D0D5DD] rounded-xl sm:rounded-2xl bg-white hover:bg-gray-50 flex items-center justify-center transition-colors cursor-pointer"
          >
            <svg className="w-5 h-5 fill-[#1877F2]" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginInputs;
