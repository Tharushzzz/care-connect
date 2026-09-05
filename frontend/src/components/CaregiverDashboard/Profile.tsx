import React, { useState, useEffect } from 'react';
import {
  Camera,
  Trash2,
  Plus,
  Globe,
  Clock,
  Check,
  CheckCircle2,
  X,
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

interface Certification {
  id: string;
  name: string;
  issuer: string;
  expires: string;
}

export const CaregiverProfile: React.FC = () => {
  const { user, updateProfile } = useAuth();

  const isSarah = user?.email === 'sarah@example.com' || user?.name?.toLowerCase().includes('sarah');
  const [profilePic, setProfilePic] = useState<string>(
    user?.avatar || (isSarah ? 'https://res.cloudinary.com/i7mccbnx/image/upload/v1788630765/Sarah.jpg' : '')
  );
  const [firstName, setFirstName] = useState(
    user?.firstName || (user?.name ? user.name.split(' ')[0] : (isSarah ? 'Sarah' : 'Caregiver'))
  );
  const [lastName, setLastName] = useState(
    user?.lastName || (user?.name ? user.name.split(' ').slice(1).join(' ') : (isSarah ? 'Jenkins' : ''))
  );
  const [email, setEmail] = useState(user?.email || (isSarah ? 'sarah@example.com' : ''));
  const [phone, setPhone] = useState(user?.phone || '0712554568');
  const [location, setLocation] = useState('Colombo, Sri Lanka');
  const [title, setTitle] = useState(user?.title || 'Registered Nurse (RN)');
  const [hourlyRate, setHourlyRate] = useState(
    user?.hourlyRate ? String(user.hourlyRate) : '3500'
  );
  const [experience, setExperience] = useState(
    user?.experience ? String(user.experience) : '5'
  );
  const [bio, setBio] = useState(
    user?.bio ||
      'Dedicated Registered Nurse with experience in senior care and post-operative recovery. Passionate about providing dignified, compassionate care to elderly patients.'
  );

  // Synchronize when authenticated user changes
  useEffect(() => {
    if (user) {
      if (user.firstName) setFirstName(user.firstName);
      if (user.lastName) setLastName(user.lastName);
      if (user.email) setEmail(user.email);
      if (user.phone) setPhone(user.phone);
      if (user.title) setTitle(user.title);
      if (user.hourlyRate) setHourlyRate(String(user.hourlyRate));
      if (user.experience) setExperience(String(user.experience));
      if (user.bio) setBio(user.bio);
      if (user.avatar !== undefined) {
        setProfilePic(user.avatar || '');
      }
    }
  }, [user]);

  const [specialties, setSpecialties] = useState<{ [key: string]: boolean }>({
    'Senior Care': true,
    'Dementia Care': true,
    'Special Needs': false,
    'Post-Surgery': true,
    'Mobility Assistance': true,
    'Medication Management': true,
    'Meal Prep': false,
    'Companionship': false,
    'Hospice Care': false
  });

  const [certifications, setCertifications] = useState<Certification[]>([
    {
      id: '1',
      name: 'Registered Nurse (RN) License',
      issuer: 'Sri Lanka Nursing Council (SLNC)',
      expires: '2028'
    },
    {
      id: '2',
      name: 'Basic Life Support (BLS)',
      issuer: 'American Heart Association',
      expires: '2025'
    }
  ]);

  const [languages, setLanguages] = useState('English, Sinhala, Tamil');
  const [availability, setAvailability] = useState('Full-Time (40+ hrs)');
  const [showAddCertModal, setShowAddCertModal] = useState(false);
  const [newCertName, setNewCertName] = useState('');
  const [newCertIssuer, setNewCertIssuer] = useState('');
  const [newCertExpiry, setNewCertExpiry] = useState('');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const toggleSpecialty = (key: string) => {
    setSpecialties((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const removeCertification = (id: string) => {
    setCertifications((prev) => prev.filter((c) => c.id !== id));
  };

  const handleAddCert = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCertName.trim()) return;
    setCertifications((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        name: newCertName,
        issuer: newCertIssuer || 'State Board',
        expires: newCertExpiry || '2027'
      }
    ]);
    setNewCertName('');
    setNewCertIssuer('');
    setNewCertExpiry('');
    setShowAddCertModal(false);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateProfile({
      firstName,
      lastName,
      email,
      phone,
      title,
      hourlyRate: Number(hourlyRate) || 0,
      experience: Number(experience) || 0,
      bio,
      avatar: profilePic,
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
          Professional Profile
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Manage your public listing, credentials, and availability.
        </p>
      </div>

      {savedSuccess && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl flex items-center gap-2.5 animate-in fade-in duration-200">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span className="text-sm font-semibold">
            Profile changes saved successfully!
          </span>
        </div>
      )}

      {/* Main Profile Card Form */}
      <form onSubmit={handleSave} className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs p-6 sm:p-8 space-y-8">
        {/* 1. Profile Picture Section */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-5 pb-6 border-b border-slate-100">
          <div className="relative w-20 h-20 rounded-full overflow-hidden ring-4 ring-slate-100 shrink-0 flex items-center justify-center bg-teal-100 text-teal-800">
            {profilePic ? (
              <img
                src={profilePic}
                alt="Profile avatar"
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="font-bold text-2xl uppercase">
                {firstName ? firstName.charAt(0) : 'C'}
              </span>
            )}
            <label
              htmlFor="caregiver-avatar-upload"
              className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity cursor-pointer"
            >
              <Camera className="w-5 h-5 text-white" />
              <input
                id="caregiver-avatar-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                      setProfilePic(reader.result as string);
                    };
                    reader.readAsDataURL(e.target.files[0]);
                  }
                }}
              />
            </label>
          </div>

          <div className="space-y-1.5 flex-1">
            <h3 className="text-sm font-bold text-slate-900">Profile Picture</h3>
            <p className="text-xs text-slate-500">
              A clear, professional headshot builds trust with families. If no photo is uploaded, your name initial will be shown.
            </p>
            <div className="flex items-center gap-2.5 pt-1.5">
              <label className="px-3.5 py-1.5 rounded-xl border border-teal-600 text-teal-700 hover:bg-teal-50 text-xs font-semibold cursor-pointer transition-colors">
                Upload New
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      const reader = new FileReader();
                      reader.onloadend = () => {
                        setProfilePic(reader.result as string);
                      };
                      reader.readAsDataURL(e.target.files[0]);
                    }
                  }}
                />
              </label>
              {profilePic && (
                <button
                  type="button"
                  onClick={() => setProfilePic('')}
                  className="px-3.5 py-1.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-semibold transition-colors cursor-pointer"
                >
                  Remove Photo
                </button>
              )}
            </div>
          </div>
        </div>

        {/* 2. BASIC INFORMATION */}
        <div className="space-y-4">
          <h2 className="text-[11px] font-bold text-slate-900 uppercase tracking-wider">
            BASIC INFORMATION
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">First Name</label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm font-medium text-slate-900 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">Last Name</label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm font-medium text-slate-900 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm font-medium text-slate-900 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">Phone Number</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm font-medium text-slate-900 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">
              General Location (City, State)
            </label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm font-medium text-slate-900 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
            />
          </div>
        </div>

        {/* 3. PROFESSIONAL DETAILS */}
        <div className="space-y-4 pt-4 border-t border-slate-100">
          <h2 className="text-[11px] font-bold text-slate-900 uppercase tracking-wider">
            PROFESSIONAL DETAILS
          </h2>

          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">Professional Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm font-medium text-slate-900 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">Hourly Rate (Rs./hr)</label>
              <input
                type="number"
                value={hourlyRate}
                onChange={(e) => setHourlyRate(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm font-medium text-slate-900 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">Years of Experience</label>
              <input
                type="number"
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm font-medium text-slate-900 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">Professional Bio</label>
            <textarea
              rows={4}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm font-medium text-slate-900 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 leading-relaxed"
            />
          </div>
        </div>

        {/* 4. SPECIALTIES & SERVICES */}
        <div className="space-y-4 pt-4 border-t border-slate-100">
          <h2 className="text-[11px] font-bold text-slate-900 uppercase tracking-wider">
            SPECIALTIES & SERVICES
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {Object.entries(specialties).map(([name, checked]) => (
              <label
                key={name}
                onClick={() => toggleSpecialty(name)}
                className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-slate-50 cursor-pointer transition-colors select-none"
              >
                <div
                  className={`w-4.5 h-4.5 rounded flex items-center justify-center transition-all ${
                    checked
                      ? 'bg-[#0D9488] text-white shadow-2xs'
                      : 'border border-slate-300 bg-white'
                  }`}
                >
                  {checked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </div>
                <span className="text-xs font-medium text-slate-700">{name}</span>
              </label>
            ))}
          </div>
        </div>

        {/* 5. CERTIFICATIONS & LICENSES */}
        <div className="space-y-4 pt-4 border-t border-slate-100">
          <div className="flex items-center justify-between">
            <h2 className="text-[11px] font-bold text-slate-900 uppercase tracking-wider">
              CERTIFICATIONS & LICENSES
            </h2>
            <button
              type="button"
              onClick={() => setShowAddCertModal(true)}
              className="px-3 py-1 rounded-xl border border-teal-600 text-teal-700 hover:bg-teal-50 text-xs font-semibold transition-all inline-flex items-center gap-1 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add New</span>
            </button>
          </div>

          <div className="space-y-3">
            {certifications.map((cert) => (
              <div
                key={cert.id}
                className="p-4 rounded-xl border border-slate-200/80 bg-slate-50/50 flex items-center justify-between hover:bg-slate-50 transition-colors"
              >
                <div>
                  <h4 className="text-xs font-bold text-slate-900">{cert.name}</h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    {cert.issuer} • Expires: {cert.expires}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => removeCertification(cert.id)}
                  className="text-slate-400 hover:text-rose-600 p-1.5 rounded-lg hover:bg-rose-50 transition-colors"
                  title="Remove certification"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* 6. ADDITIONAL DETAILS */}
        <div className="space-y-4 pt-4 border-t border-slate-100">
          <h2 className="text-[11px] font-bold text-slate-900 uppercase tracking-wider">
            ADDITIONAL DETAILS
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="flex items-center gap-1.5 text-xs font-medium text-slate-600 mb-1">
                <Globe className="w-3.5 h-3.5 text-slate-400" />
                <span>Languages Spoken</span>
              </label>
              <input
                type="text"
                value={languages}
                onChange={(e) => setLanguages(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm font-medium text-slate-900 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
              />
            </div>

            <div>
              <label className="flex items-center gap-1.5 text-xs font-medium text-slate-600 mb-1">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                <span>General Availability</span>
              </label>
              <input
                type="text"
                value={availability}
                onChange={(e) => setAvailability(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm font-medium text-slate-900 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
              />
            </div>
          </div>
        </div>

        {/* 7. Bottom Actions */}
        <div className="pt-6 border-t border-slate-100 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="px-6 py-2.5 rounded-full border border-slate-300 text-slate-700 hover:bg-slate-50 text-xs sm:text-sm font-semibold transition-all cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2.5 rounded-full bg-[#0D9488] hover:bg-[#0b7970] text-white text-xs sm:text-sm font-semibold transition-all shadow-xs cursor-pointer"
          >
            Save Profile
          </button>
        </div>
      </form>

      {/* Add Certification Modal */}
      {showAddCertModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4 animate-in fade-in zoom-in-95 duration-200 relative">
            <button
              onClick={() => setShowAddCertModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-base font-bold text-slate-900">Add Certification or License</h3>

            <form onSubmit={handleAddCert} className="space-y-4 pt-1">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Certification Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Certified Nursing Assistant (CNA)"
                  value={newCertName}
                  onChange={(e) => setNewCertName(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-teal-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Issuing Organization
                </label>
                <input
                  type="text"
                  placeholder="e.g. Red Cross"
                  value={newCertIssuer}
                  onChange={(e) => setNewCertIssuer(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-teal-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Expiration Year
                </label>
                <input
                  type="text"
                  placeholder="e.g. 2027"
                  value={newCertExpiry}
                  onChange={(e) => setNewCertExpiry(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-teal-500"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddCertModal(false)}
                  className="flex-1 py-2 rounded-xl border border-slate-300 text-slate-700 text-xs font-semibold hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 rounded-xl bg-[#0D9488] hover:bg-[#0b7970] text-white text-xs font-semibold shadow-xs"
                >
                  Add Certification
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CaregiverProfile;
