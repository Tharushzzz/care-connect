import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const ResetPasswordInputs: React.FC = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // mock send email
    setSubmitted(true);
  };

  return (
    <div className="flex flex-col justify-center w-full lg:max-w-lg space-y-6">
      {/* Back button */}
      <div>
        <Link
          to="/login"
          className="inline-flex items-center gap-2 text-sm font-medium text-[#475467] hover:text-[#0D182B] transition-colors"
        >
          <ArrowLeft className="w-4 h-4 text-[#475467]" />
          <span>Back to login</span>
        </Link>
      </div>

      {/* Heading */}
      <div className="space-y-1.5">
        <h1 className="text-4xl sm:text-5xl font-bold text-[#0D182B] tracking-tight">
          Reset Password
        </h1>
        <p className="text-sm sm:text-base text-[#475467]">
          Enter your email address and we'll send you a link to reset your password.
        </p>
      </div>

      {submitted ? (
        <div className="p-4 bg-[#E2F1FF] border border-[#0686CD] rounded-xl text-[#0D182B]">
          <p className="text-sm font-medium">Reset link sent!</p>
          <p className="text-sm mt-1">Please check your email inbox for instructions to reset your password.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5 pt-2">
          {/* Email */}
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-[#344054]">
              Email address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full h-12 px-4 border border-[#D0D5DD] rounded-xl sm:rounded-2xl text-base text-[#101828] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0686CD]/30 focus:border-[#0686CD] transition-all"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full h-12 bg-[#0686CD] hover:bg-[#0071A8] text-white font-semibold text-base rounded-xl sm:rounded-2xl shadow-sm transition-colors cursor-pointer flex items-center justify-center"
          >
            Send reset link
          </button>
        </form>
      )}
    </div>
  );
};

export default ResetPasswordInputs;
