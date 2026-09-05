import React, { useState, useEffect } from 'react';
import { Camera, User, Mail, Phone, MapPin, CheckCircle, Trash2 } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

export const Profile: React.FC = () => {
  const { user, updateProfile } = useAuth();

  // Form states initialized with signup/authenticated user data
  const [firstName, setFirstName] = useState(
    user?.firstName || (user?.name ? user.name.split(' ')[0] : 'Eleanor')
  );
  const [lastName, setLastName] = useState(
    user?.lastName || (user?.name ? user.name.split(' ').slice(1).join(' ') : 'Vance')
  );
  const [email, setEmail] = useState(user?.email || 'eleanor@example.com');
  const [phone, setPhone] = useState(user?.phone || '0712554567');
  const [address, setAddress] = useState('123 Care Lane');
  const [city, setCity] = useState('San Francisco');
  const [state, setState] = useState('CA');
  const [zipCode, setZipCode] = useState('94102');
  const [aboutMe, setAboutMe] = useState(
    user?.bio ||
      'Compassionate family member looking for reliable, high-quality care for my loved ones.'
  );

  const [avatar, setAvatar] = useState<string | null>(user?.avatar || null);
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  // Synchronize when authenticated user changes or loads
  useEffect(() => {
    if (user) {
      if (user.firstName) setFirstName(user.firstName);
      if (user.lastName) setLastName(user.lastName);
      if (user.email) setEmail(user.email);
      if (user.phone) setPhone(user.phone);
      if (user.avatar) setAvatar(user.avatar);
      if (user.bio) setAboutMe(user.bio);
    }
  }, [user]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateProfile({
      firstName,
      lastName,
      email,
      phone,
      avatar: avatar || '',
      bio: aboutMe,
    });
    setShowSuccessToast(true);
    setTimeout(() => {
      setShowSuccessToast(false);
    }, 4000);
  };

  const handleRemoveAvatar = () => {
    setAvatar(null);
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const getInitials = () => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto space-y-6">
      {/* Toast Alert */}
      {showSuccessToast && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl p-4 flex items-center gap-3 shadow-md animate-in fade-in slide-in-from-top-4 duration-300">
          <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0" />
          <div className="text-sm font-semibold">Changes saved successfully! Your profile has been updated.</div>
        </div>
      )}

      {/* Profile settings card */}
      <div className="bg-white rounded-3xl border border-[#E4EDF5] shadow-xs overflow-hidden">
        <form onSubmit={handleSave} className="p-6 sm:p-8 space-y-6 sm:space-y-8">
          
          {/* Avatar Area */}
          <div className="flex flex-col sm:flex-row items-center gap-6 pb-6 border-b border-gray-100">
            <div className="relative">
              {avatar ? (
                <img
                  src={avatar}
                  alt="Profile Avatar"
                  className="w-24 h-24 rounded-full object-cover ring-4 ring-[#EAF5FC] shadow-sm"
                />
              ) : (
                <div className="w-24 h-24 rounded-full bg-[#EAF5FC] text-[#0686CD] flex items-center justify-center font-bold text-2xl ring-4 ring-[#EAF5FC] shadow-sm uppercase">
                  {getInitials()}
                </div>
              )}
              <label
                htmlFor="avatar-upload"
                className="absolute bottom-0 right-0 p-2 bg-[#0686CD] hover:bg-[#0071A8] text-white rounded-full cursor-pointer shadow-md transition-colors"
                title="Upload Photo"
              >
                <Camera className="w-4 h-4" />
                <input
                  type="file"
                  id="avatar-upload"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  className="hidden"
                />
              </label>
            </div>

            <div className="text-center sm:text-left space-y-2.5">
              <h3 className="text-base font-bold text-[#0D182B]">Eleanor Vance</h3>
              <p className="text-xs text-gray-500">Allowed formats: JPG, PNG. Max size 2MB</p>
              <div className="flex justify-center sm:justify-start gap-2">
                <label
                  htmlFor="avatar-upload-btn"
                  className="px-4 py-2 bg-[#EAF5FC] hover:bg-[#D4EAFA] text-[#0686CD] text-xs font-semibold rounded-xl transition-all cursor-pointer inline-block"
                >
                  Upload New
                  <input
                    type="file"
                    id="avatar-upload-btn"
                    accept="image/*"
                    onChange={handleAvatarChange}
                    className="hidden"
                  />
                </label>
                {avatar && (
                  <button
                    type="button"
                    onClick={handleRemoveAvatar}
                    className="px-4 py-2 border border-rose-100 hover:bg-rose-50 text-rose-600 text-xs font-semibold rounded-xl transition-all cursor-pointer flex items-center gap-1.5"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    Remove
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Form grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-sm">
            {/* First Name */}
            <div className="space-y-1.5">
              <label className="block text-sm font-semibold text-gray-600">First Name</label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-gray-400" />
                <input
                  type="text"
                  required
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="Enter first name"
                  className="w-full pl-10 pr-4 py-3 border border-[#D0D5DD] rounded-xl placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0686CD]/30 focus:border-[#0686CD] transition-all bg-[#F9FBFE]"
                />
              </div>
            </div>

            {/* Last Name */}
            <div className="space-y-1.5">
              <label className="block text-sm font-semibold text-gray-600">Last Name</label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-gray-400" />
                <input
                  type="text"
                  required
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Enter last name"
                  className="w-full pl-10 pr-4 py-3 border border-[#D0D5DD] rounded-xl placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0686CD]/30 focus:border-[#0686CD] transition-all bg-[#F9FBFE]"
                />
              </div>
            </div>

            {/* Email Address */}
            <div className="space-y-1.5">
              <label className="block text-sm font-semibold text-gray-600">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-gray-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter email address"
                  className="w-full pl-10 pr-4 py-3 border border-[#D0D5DD] rounded-xl placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0686CD]/30 focus:border-[#0686CD] transition-all bg-[#F9FBFE]"
                />
              </div>
            </div>

            {/* Phone Number */}
            <div className="space-y-1.5">
              <label className="block text-sm font-semibold text-gray-600">Phone Number</label>
              <div className="relative">
                <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-gray-400" />
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Enter phone number"
                  className="w-full pl-10 pr-4 py-3 border border-[#D0D5DD] rounded-xl placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0686CD]/30 focus:border-[#0686CD] transition-all bg-[#F9FBFE]"
                />
              </div>
            </div>

            {/* Street Address */}
            <div className="sm:col-span-2 space-y-1.5">
              <label className="block text-sm font-semibold text-gray-600">Street Address</label>
              <div className="relative">
                <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-gray-400" />
                <input
                  type="text"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Enter street address"
                  className="w-full pl-10 pr-4 py-3 border border-[#D0D5DD] rounded-xl placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0686CD]/30 focus:border-[#0686CD] transition-all bg-[#F9FBFE]"
                />
              </div>
            </div>

            {/* City */}
            <div className="space-y-1.5">
              <label className="block text-sm font-semibold text-gray-600">City</label>
              <input
                type="text"
                required
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Enter city"
                className="w-full px-4 py-3 border border-[#D0D5DD] rounded-xl placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0686CD]/30 focus:border-[#0686CD] transition-all bg-[#F9FBFE]"
              />
            </div>

            {/* State & Zip */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block text-sm font-semibold text-gray-600">State</label>
                <input
                  type="text"
                  required
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  placeholder="State"
                  className="w-full px-4 py-3 border border-[#D0D5DD] rounded-xl placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0686CD]/30 focus:border-[#0686CD] transition-all bg-[#F9FBFE]"
                />
              </div>
              <div className="space-y-1.5">
                <label className="block text-sm font-semibold text-gray-600">ZIP Code</label>
                <input
                  type="text"
                  required
                  value={zipCode}
                  onChange={(e) => setZipCode(e.target.value)}
                  placeholder="ZIP"
                  className="w-full px-4 py-3 border border-[#D0D5DD] rounded-xl placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0686CD]/30 focus:border-[#0686CD] transition-all bg-[#F9FBFE]"
                />
              </div>
            </div>

            {/* About Me */}
            <div className="sm:col-span-2 space-y-1.5">
              <label className="block text-sm font-semibold text-gray-600">About Me</label>
              <textarea
                value={aboutMe}
                onChange={(e) => setAboutMe(e.target.value)}
                placeholder="Write something about yourself..."
                rows={4}
                className="w-full px-4 py-3 border border-[#D0D5DD] rounded-xl placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0686CD]/30 focus:border-[#0686CD] transition-all bg-[#F9FBFE] resize-none"
              />
            </div>
          </div>

          {/* Action Button */}
          <div className="flex justify-end pt-4 border-t border-gray-100">
            <button
              type="submit"
              className="px-6 py-3 bg-[#0686CD] hover:bg-[#0071A8] text-white text-sm font-semibold rounded-xl shadow-md transition-all cursor-pointer text-center"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
