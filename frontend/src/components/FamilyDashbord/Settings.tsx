import React, { useState } from 'react';
import { Eye, EyeOff, ShieldCheck, CreditCard, AlertTriangle, CheckCircle, BellRing } from 'lucide-react';

export const Settings: React.FC = () => {
  // Notifications state
  const [emailNotif, setEmailNotif] = useState(true);
  const [smsNotif, setSmsNotif] = useState(true);
  const [marketingNotif, setMarketingNotif] = useState(false);
  const [pushNotif, setPushNotif] = useState(true);

  // Password state
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPasswordFields, setShowPasswordFields] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const [notifMessage, setNotifMessage] = useState<string | null>(null);
  const [securityMessage, setSecurityMessage] = useState<{ text: string; isError: boolean } | null>(null);

  const handleToggle = (setting: string, val: boolean, setter: (v: boolean) => void) => {
    setter(val);
    setNotifMessage(`Notification preferences for ${setting} updated.`);
    setTimeout(() => setNotifMessage(null), 3000);
  };

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPassword || !newPassword || !confirmPassword) {
      setSecurityMessage({ text: 'All password fields are required.', isError: true });
      return;
    }
    if (newPassword !== confirmPassword) {
      setSecurityMessage({ text: 'New password and confirmation do not match.', isError: true });
      return;
    }
    if (newPassword.length < 4) {
      setSecurityMessage({ text: 'Password must be at least 4 characters long.', isError: true });
      return;
    }

    // Success change password action
    setSecurityMessage({ text: 'Password successfully changed.', isError: false });
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setTimeout(() => setSecurityMessage(null), 4000);
  };

  const handleDeleteAccount = () => {
    if (window.confirm('WARNING: Are you sure you want to delete your account? This action is permanent and cannot be undone.')) {
      alert('Account deletion simulated.');
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto space-y-6">
      
      {/* 1. NOTIFICATIONS CARD */}
      <div className="bg-white rounded-3xl border border-[#E4EDF5] shadow-xs overflow-hidden">
        <div className="p-6 sm:p-8 space-y-6">
          <div className="flex items-start gap-4">
            <div className="p-2.5 bg-[#EAF5FC] text-[#0686CD] rounded-xl shrink-0 mt-0.5">
              <BellRing className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#0D182B]">Notifications</h3>
              <p className="text-xs text-gray-500">Control how you receive updates and alerts.</p>
            </div>
          </div>

          {notifMessage && (
            <div className="bg-emerald-50 border border-emerald-100 text-emerald-800 rounded-xl p-3 text-xs font-semibold animate-in fade-in duration-200">
              {notifMessage}
            </div>
          )}

          <div className="divide-y divide-gray-100">
            {/* Toggle 1: Email */}
            <div className="flex items-center justify-between py-4">
              <div className="space-y-0.5 pr-4">
                <span className="text-sm font-bold text-[#0D182B] block">Email notifications</span>
                <span className="text-xs text-gray-500">Receive booking confirmations and invoices via email</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={emailNotif}
                  onChange={(e) => handleToggle('Email', e.target.checked, setEmailNotif)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#0686CD]" />
              </label>
            </div>

            {/* Toggle 2: SMS */}
            <div className="flex items-center justify-between py-4">
              <div className="space-y-0.5 pr-4">
                <span className="text-sm font-bold text-[#0D182B] block">SMS notifications</span>
                <span className="text-xs text-gray-500">Receive urgent text alerts about your bookings</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={smsNotif}
                  onChange={(e) => handleToggle('SMS', e.target.checked, setSmsNotif)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#0686CD]" />
              </label>
            </div>

            {/* Toggle 3: Marketing */}
            <div className="flex items-center justify-between py-4">
              <div className="space-y-0.5 pr-4">
                <span className="text-sm font-bold text-[#0D182B] block">Marketing emails</span>
                <span className="text-xs text-gray-500">Receive special offers and newsletter updates</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={marketingNotif}
                  onChange={(e) => handleToggle('Marketing', e.target.checked, setMarketingNotif)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#0686CD]" />
              </label>
            </div>

            {/* Toggle 4: Push */}
            <div className="flex items-center justify-between py-4">
              <div className="space-y-0.5 pr-4">
                <span className="text-sm font-bold text-[#0D182B] block">Push notifications</span>
                <span className="text-xs text-gray-500">Receive instant alerts on your device</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={pushNotif}
                  onChange={(e) => handleToggle('Push Notifications', e.target.checked, setPushNotif)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#0686CD]" />
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* 2. SECURITY CARD (Change Password) */}
      <div className="bg-white rounded-3xl border border-[#E4EDF5] shadow-xs overflow-hidden">
        <div className="p-6 sm:p-8 space-y-6">
          <div className="flex items-start gap-4">
            <div className="p-2.5 bg-[#EAF5FC] text-[#0686CD] rounded-xl shrink-0 mt-0.5">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#0D182B]">Security</h3>
              <p className="text-xs text-gray-500">Change your password and manage security keys.</p>
            </div>
          </div>

          {securityMessage && (
            <div
              className={`p-3.5 rounded-xl border text-xs font-semibold flex items-center gap-2.5 animate-in fade-in duration-200 ${
                securityMessage.isError
                  ? 'bg-rose-50 border-rose-100 text-rose-800'
                  : 'bg-emerald-50 border-emerald-100 text-emerald-800'
              }`}
            >
              {securityMessage.isError ? (
                <AlertTriangle className="w-4 h-4 text-rose-500 shrink-0" />
              ) : (
                <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
              )}
              <span>{securityMessage.text}</span>
            </div>
          )}

          <form onSubmit={handlePasswordChange} className="space-y-4 max-w-md">
            {/* Current Password */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider">Current Password</label>
              <div className="relative flex items-center">
                <input
                  type={showPasswordFields.current ? 'text' : 'password'}
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="Enter current password"
                  className="w-full h-11 px-4 pr-11 border border-[#D0D5DD] rounded-xl text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0686CD]/30 focus:border-[#0686CD] transition-all bg-[#F9FBFE]"
                />
                <button
                  type="button"
                  onClick={() => setShowPasswordFields(prev => ({ ...prev, current: !prev.current }))}
                  className="absolute right-3 text-gray-400 hover:text-gray-600 cursor-pointer"
                >
                  {showPasswordFields.current ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* New Password */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider">New Password</label>
              <div className="relative flex items-center">
                <input
                  type={showPasswordFields.new ? 'text' : 'password'}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter new password"
                  className="w-full h-11 px-4 pr-11 border border-[#D0D5DD] rounded-xl text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0686CD]/30 focus:border-[#0686CD] transition-all bg-[#F9FBFE]"
                />
                <button
                  type="button"
                  onClick={() => setShowPasswordFields(prev => ({ ...prev, new: !prev.new }))}
                  className="absolute right-3 text-gray-400 hover:text-gray-600 cursor-pointer"
                >
                  {showPasswordFields.new ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Confirm New Password */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider">Confirm Password</label>
              <div className="relative flex items-center">
                <input
                  type={showPasswordFields.confirm ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm new password"
                  className="w-full h-11 px-4 pr-11 border border-[#D0D5DD] rounded-xl text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0686CD]/30 focus:border-[#0686CD] transition-all bg-[#F9FBFE]"
                />
                <button
                  type="button"
                  onClick={() => setShowPasswordFields(prev => ({ ...prev, confirm: !prev.confirm }))}
                  className="absolute right-3 text-gray-400 hover:text-gray-600 cursor-pointer"
                >
                  {showPasswordFields.confirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="px-5 py-2.5 bg-[#0686CD] hover:bg-[#0071A8] text-white text-xs font-semibold rounded-xl shadow-sm transition-all cursor-pointer inline-flex items-center justify-center mt-2"
            >
              Change Password
            </button>
          </form>
        </div>
      </div>

      {/* 3. PAYMENT METHOD CARD */}
      <div className="bg-white rounded-3xl border border-[#E4EDF5] shadow-xs overflow-hidden">
        <div className="p-6 sm:p-8 space-y-5">
          <div className="flex items-start gap-4">
            <div className="p-2.5 bg-[#EAF5FC] text-[#0686CD] rounded-xl shrink-0 mt-0.5">
              <CreditCard className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#0D182B]">Payment Method</h3>
              <p className="text-xs text-gray-500">Manage your default billing and credit cards.</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border border-[#E4EDF5] rounded-2xl p-4 bg-[#F8FAFC] gap-4">
            <div className="flex items-center gap-3.5">
              {/* Card Icon */}
              <div className="w-12 h-8.5 bg-[#0D182B] text-white rounded-md flex flex-col items-center justify-center font-bold text-[10px] tracking-wider select-none shrink-0 shadow-xs">
                <span>VISA</span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-[#0D182B]">Visa ending in 4242</span>
                  <span className="bg-[#EAF5FC] text-[#0686CD] text-[9px] font-bold px-1.5 py-0.5 rounded-md">
                    Default
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-0.5">Expires 12/28</p>
              </div>
            </div>

            <button
              type="button"
              className="px-4 py-2 border border-[#D0D5DD] hover:border-[#0686CD] hover:bg-[#F4FBFF] text-[#344054] hover:text-[#0686CD] text-xs font-semibold rounded-xl transition-all cursor-pointer shrink-0"
            >
              Update Payment Method
            </button>
          </div>
        </div>
      </div>

      {/* 4. DANGER ZONE CARD */}
      <div className="bg-white rounded-3xl border border-rose-100 shadow-xs overflow-hidden">
        <div className="p-6 sm:p-8 space-y-4">
          <div className="flex items-start gap-4">
            <div className="p-2.5 bg-rose-50 text-rose-500 rounded-xl shrink-0 mt-0.5">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-rose-600">Danger Zone</h3>
              <p className="text-xs text-gray-500">Permanently delete your account and all of your data.</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border border-rose-100/60 rounded-2xl p-4 bg-rose-50/20 gap-4">
            <p className="text-xs text-gray-600 leading-relaxed max-w-xl">
              Deleting your account will remove all care histories, saved caregivers, active bookings, and chats. This action is irreversible.
            </p>
            <button
              type="button"
              onClick={handleDeleteAccount}
              className="px-4 py-2 bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-600 text-xs font-semibold rounded-xl transition-all cursor-pointer shrink-0"
            >
              Delete Account
            </button>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Settings;
