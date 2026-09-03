import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Eye, EyeOff, Heart, User } from 'lucide-react';

const SignupInputs: React.FC = () => {
  const location = useLocation();
  const initialRole = location.state?.role || 'family';
  const [role, setRole] = useState<'family' | 'caregiver'>(initialRole);
  const [showPassword, setShowPassword] = useState(false);
  
  // Form fields
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [title, setTitle] = useState('');
  const [experience, setExperience] = useState('');
  const [hourlyRate, setHourlyRate] = useState('');
  const [bio, setBio] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const navigate = useNavigate();

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    // mock signup - navigate to home for now
    navigate('/');
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
          Create an account
        </h1>
        <p className="text-sm sm:text-base text-[#475467]">
          Already have an account?{' '}
          <Link to="/login" className="text-[#0686CD] hover:underline font-semibold">
            Sign in instead
          </Link>
        </p>
      </div>

      {/* Role Toggle Buttons */}
      <div className="space-y-2 pt-2">
        <label className="block text-sm font-medium text-[#344054]">
          I am looking to...
        </label>
        <div className="flex gap-4">
          <button
            type="button"
            onClick={() => setRole('family')}
            className={`flex-1 flex items-center justify-center py-2.5 px-4 text-sm font-medium rounded-xl border transition-all cursor-pointer ${
              role === 'family' 
                ? 'border-[#0686CD] text-[#0686CD] bg-[#F0F9FF]' 
                : 'border-[#D0D5DD] text-[#344054] hover:bg-gray-50'
            }`}
          >
            <Heart className="w-4 h-4 mr-2" />
            Hire Care
          </button>
          <button
            type="button"
            onClick={() => setRole('caregiver')}
            className={`flex-1 flex items-center justify-center py-2.5 px-4 text-sm font-medium rounded-xl border transition-all cursor-pointer ${
              role === 'caregiver' 
                ? 'border-[#0686CD] text-[#0686CD] bg-[#F0F9FF]' 
                : 'border-[#D0D5DD] text-[#344054] hover:bg-gray-50'
            }`}
          >
            <User className="w-4 h-4 mr-2" />
            Find Work
          </button>
        </div>
      </div>

      {/* Form Fields */}
      <form onSubmit={handleSignup} className="space-y-4 pt-2">
        {/* Name fields */}
        <div className="flex gap-4">
          <div className="space-y-1.5 flex-1">
            <label className="block text-sm font-medium text-[#344054]">
              First name
            </label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full h-11 px-4 border border-[#D0D5DD] rounded-xl text-sm text-[#101828] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0686CD]/30 focus:border-[#0686CD] transition-all"
              required
            />
          </div>
          <div className="space-y-1.5 flex-1">
            <label className="block text-sm font-medium text-[#344054]">
              Last name
            </label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full h-11 px-4 border border-[#D0D5DD] rounded-xl text-sm text-[#101828] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0686CD]/30 focus:border-[#0686CD] transition-all"
              required
            />
          </div>
        </div>

        {/* Email */}
        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-[#344054]">
            Email address
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full h-11 px-4 border border-[#D0D5DD] rounded-xl text-sm text-[#101828] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0686CD]/30 focus:border-[#0686CD] transition-all"
            required
          />
        </div>

        {/* Conditional Caregiver Fields */}
        {role === 'caregiver' && (
          <div className="space-y-4 pt-2">
            <div>
              <h3 className="text-sm font-bold text-[#344054]">Caregiver Profile Details</h3>
            </div>
            
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-[#344054]">
                Professional Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Registered Nurse (RN)"
                className="w-full h-11 px-4 border border-[#D0D5DD] rounded-xl text-sm text-[#101828] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0686CD]/30 focus:border-[#0686CD] transition-all"
                required={role === 'caregiver'}
              />
            </div>

            <div className="flex gap-4">
              <div className="space-y-1.5 flex-1">
                <label className="block text-sm font-medium text-[#344054]">
                  Years of Experience
                </label>
                <input
                  type="number"
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                  className="w-full h-11 px-4 border border-[#D0D5DD] rounded-xl text-sm text-[#101828] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0686CD]/30 focus:border-[#0686CD] transition-all"
                  required={role === 'caregiver'}
                />
              </div>
              <div className="space-y-1.5 flex-1">
                <label className="block text-sm font-medium text-[#344054]">
                  Hourly Rate ($)
                </label>
                <input
                  type="number"
                  value={hourlyRate}
                  onChange={(e) => setHourlyRate(e.target.value)}
                  className="w-full h-11 px-4 border border-[#D0D5DD] rounded-xl text-sm text-[#101828] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0686CD]/30 focus:border-[#0686CD] transition-all"
                  required={role === 'caregiver'}
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-[#344054]">
                Professional Bio
              </label>
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Briefly describe your experience and specialties..."
                className="w-full min-h-[100px] p-4 border border-[#D0D5DD] rounded-xl text-sm text-[#101828] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0686CD]/30 focus:border-[#0686CD] transition-all resize-y"
                required={role === 'caregiver'}
              />
            </div>
          </div>
        )}

        {/* Password */}
        <div className="space-y-1.5 pt-2">
          <label className="block text-sm font-medium text-[#344054]">
            Password
          </label>
          <div className="relative flex items-center">
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full h-11 pl-4 pr-11 border border-[#D0D5DD] rounded-xl text-sm text-[#101828] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0686CD]/30 focus:border-[#0686CD] transition-all"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3.5 text-gray-500 hover:text-gray-700 cursor-pointer focus:outline-none"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? (
                <EyeOff className="w-4 h-4 text-[#667085]" />
              ) : (
                <Eye className="w-4 h-4 text-[#667085]" />
              )}
            </button>
          </div>
        </div>

        {/* Confirm Password */}
        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-[#344054]">
            Confirm Password
          </label>
          <input
            type={showPassword ? 'text' : 'password'}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full h-11 px-4 border border-[#D0D5DD] rounded-xl text-sm text-[#101828] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0686CD]/30 focus:border-[#0686CD] transition-all"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full h-11 mt-6 bg-[#0686CD] hover:bg-[#0071A8] text-white font-semibold text-sm rounded-xl shadow-sm transition-colors cursor-pointer flex items-center justify-center"
        >
          Create Account
        </button>

        {/* Terms text */}
        <div className="pt-3 text-center">
          <p className="text-[13px] text-[#667085]">
            By clicking "Create Account", you agree to our{' '}
            <Link to="/terms" className="text-[#0686CD] hover:underline">Terms of Service</Link>
            {' '}and{' '}
            <Link to="/privacy" className="text-[#0686CD] hover:underline">Privacy Policy</Link>.
          </p>
        </div>
      </form>
    </div>
  );
};

export default SignupInputs;
