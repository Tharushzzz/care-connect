import React, { useState, useEffect } from 'react';
import { Camera, User, Mail, Phone, MapPin, CheckCircle, Trash2, Loader2, AlertCircle } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { uploadToCloudinary } from '../../utils/cloudinary';

export const Profile: React.FC = () => {
  const { user, updateProfile } = useAuth();

  // Form states initialized with signup/authenticated user data
  const [firstName, setFirstName] = useState(
    user?.firstName || (user?.name ? user.name.split(' ')[0] : '')
  );
  const [lastName, setLastName] = useState(
    user?.lastName || (user?.name ? user.name.split(' ').slice(1).join(' ') : '')
  );
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [address, setAddress] = useState('123 Care Lane');
  const [city, setCity] = useState('San Francisco');
  const [state, setState] = useState('CA');
  const [zipCode, setZipCode] = useState('94102');
  const [aboutMe, setAboutMe] = useState(
    user?.bio ||
      'Compassionate family member looking for reliable, high-quality care for my loved ones.'
  );

  const [avatar, setAvatar] = useState<string | null>(user?.avatar || null);
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);
  const [avatarError, setAvatarError] = useState<string | null>(null);
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  // Synchronize when authenticated user changes or loads
  useEffect(() => {
    if (user) {
      if (user.firstName) {
        setFirstName(user.firstName);
      } else if (user.name) {
        setFirstName(user.name.split(' ')[0] || '');
      }
      if (user.lastName) {
        setLastName(user.lastName);
      } else if (user.name) {
        setLastName(user.name.split(' ').slice(1).join(' ') || '');
      }
      if (user.email) setEmail(user.email);
      if (user.phone !== undefined) setPhone(user.phone || '');
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
    setAvatarError(null);
  };

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Immediate preview
    const localPreview = URL.createObjectURL(file);
    setAvatar(localPreview);
    setIsUploadingAvatar(true);
    setAvatarError(null);

    try {
      const uploadedUrl = await uploadToCloudinary(file);
      setAvatar(uploadedUrl);
    } catch (err: unknown) {
      console.error('Cloudinary upload error:', err);
      const errMsg = err instanceof Error ? err.message : 'Photo upload failed';
      setAvatarError(errMsg);
      setAvatar(user?.avatar || null);
    } finally {
      setIsUploadingAvatar(false);
    }
  };

  const displayName =
    (firstName || lastName)
      ? `${firstName} ${lastName}`.trim()
      : (user?.name || `${user?.firstName || ''} ${user?.lastName || ''}`.trim() || 'User Profile');

  const getInitials = () => {
    const f = firstName?.trim() || '';
    const l = lastName?.trim() || '';
    if (f && l) {
      return `${f.charAt(0)}${l.charAt(0)}`.toUpperCase();
    }
    if (f) return f.slice(0, 2).toUpperCase();
    if (user?.name) {
      const parts = user.name.trim().split(' ');
      return parts.length > 1
        ? `${parts[0][0]}${parts[1][0]}`.toUpperCase()
        : parts[0].slice(0, 2).toUpperCase();
    }
    return 'U';
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

              {/* Uploading Spinner Overlay */}
              {isUploadingAvatar && (
                <div className="absolute inset-0 bg-black/40 rounded-full flex flex-col items-center justify-center text-white backdrop-blur-[1px]">
                  <Loader2 className="w-6 h-6 animate-spin" />
                  <span className="text-[10px] font-semibold mt-1">Uploading...</span>
                </div>
              )}

              <label
                htmlFor="avatar-upload"
                className="absolute bottom-0 right-0 p-2 bg-[#0686CD] hover:bg-[#0071A8] text-white rounded-full cursor-pointer shadow-md transition-colors disabled:pointer-events-none"
                title="Upload Photo"
              >
                <Camera className="w-4 h-4" />
                <input
                  type="file"
                  id="avatar-upload"
                  accept="image/*"
                  disabled={isUploadingAvatar}
                  onChange={handleAvatarChange}
                  className="hidden"
                />
              </label>
            </div>

            <div className="text-center sm:text-left space-y-2.5">
              <h3 className="text-base font-bold text-[#0D182B] capitalize">{displayName}</h3>
              <p className="text-xs text-gray-500">Allowed formats: JPG, PNG, WebP. Max size 10MB</p>
              
              {avatarError && (
                <div className="flex items-center gap-1.5 text-xs font-medium text-rose-600 bg-rose-50 border border-rose-100 px-2.5 py-1 rounded-lg">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{avatarError}</span>
                </div>
              )}

              <div className="flex justify-center sm:justify-start gap-2">
                <label
                  htmlFor="avatar-upload-btn"
                  className={`px-4 py-2 bg-[#EAF5FC] hover:bg-[#D4EAFA] text-[#0686CD] text-xs font-semibold rounded-xl transition-all cursor-pointer inline-flex items-center gap-1.5 ${
                    isUploadingAvatar ? 'opacity-60 pointer-events-none' : ''
                  }`}
                >
                  {isUploadingAvatar ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Uploading...</span>
                    </>
                  ) : (
                    'Upload New'
                  )}
                  <input
                    type="file"
                    id="avatar-upload-btn"
                    accept="image/*"
                    disabled={isUploadingAvatar}
                    onChange={handleAvatarChange}
                    className="hidden"
                  />
                </label>
                {avatar && !isUploadingAvatar && (
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
              disabled={isUploadingAvatar}
              className="px-6 py-3 bg-[#0686CD] hover:bg-[#0071A8] disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-semibold rounded-xl shadow-md transition-all cursor-pointer text-center flex items-center gap-2"
            >
              {isUploadingAvatar ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Uploading photo...</span>
                </>
              ) : (
                'Save Changes'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
