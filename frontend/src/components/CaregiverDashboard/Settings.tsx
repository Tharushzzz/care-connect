import React, { useState } from 'react';
import {
  Bell,
  Shield,
  CreditCard,
  Trash2,
  CheckCircle2,
  Plus,
  X
} from 'lucide-react';

export const CaregiverSettings: React.FC = () => {
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [smsAlerts, setSmsAlerts] = useState(false);
  const [marketingEmails, setMarketingEmails] = useState(false);
  const [bookingReminders, setBookingReminders] = useState(true);

  const [currentPassword, setCurrentPassword] = useState('password123');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState(false);
  const [showAddPaymentModal, setShowAddPaymentModal] = useState(false);

  const handleUpdatePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPassword) return;
    setPasswordSuccess(true);
    setTimeout(() => {
      setPasswordSuccess(false);
      setNewPassword('');
      setConfirmPassword('');
    }, 2500);
  };

  const handleDeleteAccount = () => {
    if (confirm('Are you sure you want to delete your caregiver account? This action cannot be undone.')) {
      alert('Account deletion requested. You will be redirected.');
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
          Account Settings
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Manage your security, notifications, and billing.
        </p>
      </div>

      {/* Card 1: Notifications */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs p-6 space-y-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
            <Bell className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-slate-900">Notifications</h2>
            <p className="text-xs text-slate-500">Choose how you want to be contacted.</p>
          </div>
        </div>

        <div className="divide-y divide-slate-100 pt-2">
          {/* Email Alerts */}
          <div className="py-3 flex items-center justify-between gap-4">
            <div>
              <div className="text-xs font-bold text-slate-900">Email Alerts</div>
              <div className="text-xs text-slate-500">Receive updates related to email alerts.</div>
            </div>
            <button
              type="button"
              onClick={() => setEmailAlerts(!emailAlerts)}
              className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors cursor-pointer ${
                emailAlerts ? 'bg-[#0D9488]' : 'bg-slate-200'
              }`}
            >
              <div
                className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                  emailAlerts ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* SMS Alerts */}
          <div className="py-3 flex items-center justify-between gap-4">
            <div>
              <div className="text-xs font-bold text-slate-900">SMS Alerts</div>
              <div className="text-xs text-slate-500">Receive updates related to sms alerts.</div>
            </div>
            <button
              type="button"
              onClick={() => setSmsAlerts(!smsAlerts)}
              className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors cursor-pointer ${
                smsAlerts ? 'bg-[#0D9488]' : 'bg-slate-200'
              }`}
            >
              <div
                className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                  smsAlerts ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Marketing Emails */}
          <div className="py-3 flex items-center justify-between gap-4">
            <div>
              <div className="text-xs font-bold text-slate-900">Marketing Emails</div>
              <div className="text-xs text-slate-500">Receive updates related to marketing emails.</div>
            </div>
            <button
              type="button"
              onClick={() => setMarketingEmails(!marketingEmails)}
              className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors cursor-pointer ${
                marketingEmails ? 'bg-[#0D9488]' : 'bg-slate-200'
              }`}
            >
              <div
                className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                  marketingEmails ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Booking Reminders */}
          <div className="py-3 flex items-center justify-between gap-4">
            <div>
              <div className="text-xs font-bold text-slate-900">Booking Reminders</div>
              <div className="text-xs text-slate-500">Receive updates related to booking reminders.</div>
            </div>
            <button
              type="button"
              onClick={() => setBookingReminders(!bookingReminders)}
              className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors cursor-pointer ${
                bookingReminders ? 'bg-[#0D9488]' : 'bg-slate-200'
              }`}
            >
              <div
                className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                  bookingReminders ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Card 2: Security */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs p-6 space-y-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-slate-900">Security</h2>
            <p className="text-xs text-slate-500">Update your password and secure your account.</p>
          </div>
        </div>

        <form onSubmit={handleUpdatePassword} className="space-y-4 pt-2">
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">Current Password</label>
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full sm:w-1/2 px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-teal-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">New Password</label>
              <input
                type="password"
                placeholder="••••••••"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-teal-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">Confirm New Password</label>
              <input
                type="password"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-teal-500"
              />
            </div>
          </div>

          {passwordSuccess && (
            <div className="p-3 bg-emerald-50 text-emerald-700 rounded-xl text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>Password updated successfully!</span>
            </div>
          )}

          <div className="pt-2">
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-[#0284C7] hover:bg-[#0369A1] text-white text-xs sm:text-sm font-semibold transition-all shadow-xs cursor-pointer"
            >
              Update Password
            </button>
          </div>
        </form>
      </div>

      {/* Card 3: Payment Methods */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs p-6 space-y-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
            <CreditCard className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-slate-900">Payment Methods</h2>
            <p className="text-xs text-slate-500">Manage your saved credit cards and billing history.</p>
          </div>
        </div>

        <div className="p-4 rounded-xl border border-slate-200 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-1 rounded bg-slate-200 text-slate-800 font-extrabold text-[10px] tracking-wider">
              VISA
            </span>
            <div>
              <div className="text-xs font-bold text-slate-900">Visa ending in 4242</div>
              <div className="text-[11px] text-slate-400">Expires: 12/28</div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => alert('Editing payment method...')}
            className="px-3 py-1 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100 text-xs font-semibold transition-colors"
          >
            Edit
          </button>
        </div>

        <div>
          <button
            type="button"
            onClick={() => setShowAddPaymentModal(true)}
            className="px-4 py-2 rounded-xl border border-teal-600 text-teal-700 hover:bg-teal-50 text-xs font-semibold transition-all inline-flex items-center gap-1.5 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add New Payment Method</span>
          </button>
        </div>
      </div>

      {/* Card 4: Danger Zone */}
      <div className="bg-rose-50/40 rounded-2xl border border-rose-200 p-6 space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center shrink-0">
            <Trash2 className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-rose-700">Danger Zone</h2>
            <p className="text-xs text-rose-500">Irreversible account actions.</p>
          </div>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="text-xs font-bold text-slate-900">Delete Account</div>
            <p className="text-xs text-slate-500">
              Once you delete your account, there is no going back. Please be certain.
            </p>
          </div>

          <button
            type="button"
            onClick={handleDeleteAccount}
            className="px-4 py-2 rounded-xl border border-rose-500 text-rose-600 hover:bg-rose-100 text-xs font-semibold transition-colors shrink-0 cursor-pointer"
          >
            Delete Account
          </button>
        </div>
      </div>

      {/* Add Payment Modal */}
      {showAddPaymentModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4 animate-in fade-in zoom-in-95 duration-200 relative">
            <button
              onClick={() => setShowAddPaymentModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-base font-bold text-slate-900">Add Payment Method</h3>
            <p className="text-xs text-slate-500">Add a debit or credit card for instant payouts.</p>
            <form onSubmit={(e) => { e.preventDefault(); setShowAddPaymentModal(false); }} className="space-y-3 pt-2">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Card Number</label>
                <input
                  type="text"
                  inputMode="numeric"
                  placeholder="4000 1234 5678 9010"
                  maxLength={19}
                  onChange={(e) => {
                    const digits = e.target.value.replace(/\D/g, '').slice(0, 16);
                    e.target.value = digits.match(/.{1,4}/g)?.join(' ') || '';
                  }}
                  onKeyDown={(e) => {
                    if (['Backspace', 'Delete', 'Tab', 'Escape', 'Enter', 'ArrowLeft', 'ArrowRight'].includes(e.key) || e.ctrlKey || e.metaKey) return;
                    if (!/^[0-9]$/.test(e.key)) e.preventDefault();
                  }}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-teal-500"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Expiry</label>
                  <input
                    type="text"
                    inputMode="numeric"
                    placeholder="MM/YY"
                    maxLength={5}
                    onChange={(e) => {
                      const digits = e.target.value.replace(/\D/g, '').slice(0, 4);
                      e.target.value = digits.length > 2 ? `${digits.slice(0, 2)}/${digits.slice(2)}` : digits;
                    }}
                    onKeyDown={(e) => {
                      if (['Backspace', 'Delete', 'Tab', 'Escape', 'Enter', 'ArrowLeft', 'ArrowRight'].includes(e.key) || e.ctrlKey || e.metaKey) return;
                      if (!/^[0-9]$/.test(e.key)) e.preventDefault();
                    }}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-teal-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">CVC</label>
                  <input
                    type="text"
                    inputMode="numeric"
                    placeholder="123"
                    maxLength={4}
                    onChange={(e) => {
                      e.target.value = e.target.value.replace(/\D/g, '').slice(0, 4);
                    }}
                    onKeyDown={(e) => {
                      if (['Backspace', 'Delete', 'Tab', 'Escape', 'Enter', 'ArrowLeft', 'ArrowRight'].includes(e.key) || e.ctrlKey || e.metaKey) return;
                      if (!/^[0-9]$/.test(e.key)) e.preventDefault();
                    }}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-teal-500"
                    required
                  />
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddPaymentModal(false)}
                  className="flex-1 py-2 rounded-xl border border-slate-300 text-slate-700 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 rounded-xl bg-[#0D9488] hover:bg-[#0b7970] text-white text-xs font-semibold"
                >
                  Save Card
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CaregiverSettings;
