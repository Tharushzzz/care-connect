import React from 'react';
import {
  Calendar,
  Clock,
  MapPin,
  User,
  Smile,
  HeartPulse,
  Pill,
  Utensils,
  Home as HomeIcon,
  Check,
  ChevronRight,
} from 'lucide-react';
import { CareRequirementsData } from '../../../config/Booking';

export interface Step1ServiceProps {
  serviceType: 'elderly' | 'child' | 'special';
  setServiceType: (type: 'elderly' | 'child' | 'special') => void;
  startDate: string;
  setStartDate: (date: string) => void;
  endDate: string;
  setEndDate: (date: string) => void;
  startTime: string;
  setStartTime: (time: string) => void;
  endTime: string;
  setEndTime: (time: string) => void;
  selectedRequirements: string[];
  toggleRequirement: (req: string) => void;
  streetAddress: string;
  setStreetAddress: (addr: string) => void;
  city: string;
  setCity: (city: string) => void;
  zipCode: string;
  setZipCode: (zip: string) => void;
  additionalNotes: string;
  setAdditionalNotes: (notes: string) => void;
  onNext: () => void;
}

const requirementIconMap: Record<string, React.ElementType> = {
  'Medication Administration': Pill,
  'Mobility Assistance': User,
  'Meal Preparation': Utensils,
  'Companionship': Smile,
  'Light Housekeeping': HomeIcon,
};

export const Step1Service: React.FC<Step1ServiceProps> = ({
  serviceType,
  setServiceType,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  startTime,
  setStartTime,
  endTime,
  setEndTime,
  selectedRequirements,
  toggleRequirement,
  streetAddress,
  setStreetAddress,
  city,
  setCity,
  zipCode,
  setZipCode,
  additionalNotes,
  setAdditionalNotes,
  onNext,
}) => {
  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Section 1: Service Type */}
      <div className="space-y-3">
        <div>
          <h2 className="text-lg font-bold text-[#0D182B]">Service Type</h2>
          <p className="text-xs text-gray-500">Select the primary type of care needed.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
          {/* Elderly Care */}
          <button
            type="button"
            onClick={() => setServiceType('elderly')}
            className={`flex flex-col items-center justify-center p-6 rounded-2xl border-2 transition-all cursor-pointer ${
              serviceType === 'elderly'
                ? 'bg-[#EAF5FC] border-[#0B8BD8] shadow-xs text-[#0B8BD8]'
                : 'bg-white border-[#E2EDF7] text-gray-700 hover:border-[#BCE0F5] hover:bg-[#F9FCFF]'
            }`}
          >
            <User className="w-8 h-8 mb-2" />
            <span className="text-sm font-bold">Elderly Care</span>
          </button>

          {/* Child Care */}
          <button
            type="button"
            onClick={() => setServiceType('child')}
            className={`flex flex-col items-center justify-center p-6 rounded-2xl border-2 transition-all cursor-pointer ${
              serviceType === 'child'
                ? 'bg-[#EAF5FC] border-[#0B8BD8] shadow-xs text-[#0B8BD8]'
                : 'bg-white border-[#E2EDF7] text-gray-700 hover:border-[#BCE0F5] hover:bg-[#F9FCFF]'
            }`}
          >
            <Smile className="w-8 h-8 mb-2" />
            <span className="text-sm font-bold">Child Care</span>
          </button>

          {/* Special Needs */}
          <button
            type="button"
            onClick={() => setServiceType('special')}
            className={`flex flex-col items-center justify-center p-6 rounded-2xl border-2 transition-all cursor-pointer ${
              serviceType === 'special'
                ? 'bg-[#EAF5FC] border-[#0B8BD8] shadow-xs text-[#0B8BD8]'
                : 'bg-white border-[#E2EDF7] text-gray-700 hover:border-[#BCE0F5] hover:bg-[#F9FCFF]'
            }`}
          >
            <HeartPulse className="w-8 h-8 mb-2" />
            <span className="text-sm font-bold">Special Needs</span>
          </button>
        </div>
      </div>

      <div className="border-t border-[#EEF4FA]" />

      {/* Section 2: Date & Time */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-[#0D182B]">Date & Time</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Start Date */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-gray-600">Start Date</label>
            <div className="relative">
              <Calendar className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full h-11 pl-10 pr-4 rounded-xl border border-[#D5E3EF] text-sm text-[#0D182B] focus:outline-none focus:ring-2 focus:ring-[#0B8BD8]/30 focus:border-[#0B8BD8] transition-all bg-white"
              />
            </div>
          </div>

          {/* End Date */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-gray-600">End Date (Optional)</label>
            <div className="relative">
              <Calendar className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full h-11 pl-10 pr-4 rounded-xl border border-[#D5E3EF] text-sm text-[#0D182B] focus:outline-none focus:ring-2 focus:ring-[#0B8BD8]/30 focus:border-[#0B8BD8] transition-all bg-white"
              />
            </div>
          </div>

          {/* Start Time */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-gray-600">Start Time</label>
            <div className="relative">
              <Clock className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="w-full h-11 pl-10 pr-4 rounded-xl border border-[#D5E3EF] text-sm text-[#0D182B] focus:outline-none focus:ring-2 focus:ring-[#0B8BD8]/30 focus:border-[#0B8BD8] transition-all bg-white"
              />
            </div>
          </div>

          {/* End Time */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-gray-600">End Time</label>
            <div className="relative">
              <Clock className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="w-full h-11 pl-10 pr-4 rounded-xl border border-[#D5E3EF] text-sm text-[#0D182B] focus:outline-none focus:ring-2 focus:ring-[#0B8BD8]/30 focus:border-[#0B8BD8] transition-all bg-white"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-[#EEF4FA]" />

      {/* Section 3: Care Requirements */}
      <div className="space-y-3">
        <div>
          <h2 className="text-lg font-bold text-[#0D182B]">Care Requirements</h2>
          <p className="text-xs text-gray-500">Select all that apply to help us find the right match.</p>
        </div>

        <div className="flex flex-wrap gap-2.5 pt-1">
          {CareRequirementsData.map((item) => {
            const isSelected = selectedRequirements.includes(item.label);
            const IconComp = requirementIconMap[item.label] || User;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => toggleRequirement(item.label)}
                className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-semibold border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#EAF5FC] border-[#0B8BD8] text-[#0B8BD8] shadow-2xs'
                    : 'bg-white border-[#D5E3EF] text-gray-700 hover:border-[#0B8BD8]/50 hover:bg-[#F9FCFF]'
                }`}
              >
                <IconComp className="w-3.5 h-3.5" />
                <span>{item.label}</span>
                {isSelected && <Check className="w-3.5 h-3.5 stroke-[2.5]" />}
              </button>
            );
          })}
        </div>
      </div>

      <div className="border-t border-[#EEF4FA]" />

      {/* Section 4: Location */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-[#0D182B]">Location</h2>

        <div className="space-y-3">
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-gray-600">Street Address</label>
            <div className="relative">
              <MapPin className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={streetAddress}
                onChange={(e) => setStreetAddress(e.target.value)}
                placeholder="123 Care Lane"
                className="w-full h-11 pl-10 pr-4 rounded-xl border border-[#D5E3EF] text-sm text-[#0D182B] focus:outline-none focus:ring-2 focus:ring-[#0B8BD8]/30 focus:border-[#0B8BD8] transition-all bg-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-gray-600">City</label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="San Francisco"
                className="w-full h-11 px-4 rounded-xl border border-[#D5E3EF] text-sm text-[#0D182B] focus:outline-none focus:ring-2 focus:ring-[#0B8BD8]/30 focus:border-[#0B8BD8] transition-all bg-white"
              />
            </div>
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-gray-600">ZIP Code</label>
              <input
                type="text"
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value)}
                placeholder="94102"
                className="w-full h-11 px-4 rounded-xl border border-[#D5E3EF] text-sm text-[#0D182B] focus:outline-none focus:ring-2 focus:ring-[#0B8BD8]/30 focus:border-[#0B8BD8] transition-all bg-white"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-[#EEF4FA]" />

      {/* Section 5: Additional Notes */}
      <div className="space-y-2">
        <h2 className="text-lg font-bold text-[#0D182B]">Additional Notes</h2>
        <textarea
          rows={4}
          value={additionalNotes}
          onChange={(e) => setAdditionalNotes(e.target.value)}
          placeholder="Share any specific preferences, routines, or concerns..."
          className="w-full p-4 rounded-2xl border border-[#D5E3EF] text-sm text-[#0D182B] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0B8BD8]/30 focus:border-[#0B8BD8] transition-all bg-white resize-none"
        />
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#EEF4FA]">
        <button
          type="button"
          onClick={() => alert('Draft saved successfully!')}
          className="px-6 py-2.5 rounded-xl border border-[#D0D5DD] bg-white text-sm font-bold text-[#344054] hover:bg-gray-50 transition-colors cursor-pointer"
        >
          Save Draft
        </button>

        <button
          type="button"
          onClick={onNext}
          className="px-8 py-2.5 rounded-xl bg-[#0B3B60] hover:bg-[#0B8BD8] text-white text-sm font-bold shadow-xs transition-colors cursor-pointer flex items-center gap-2"
        >
          <span>Continue to Review</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default Step1Service;
