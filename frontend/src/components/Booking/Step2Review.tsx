import React from 'react';
import { ChevronLeft, ChevronRight, ShieldCheck } from 'lucide-react';
import type { Caregiver } from '../../../config/Caregivers';

export interface Step2ReviewProps {
  selectedCaregiver: Caregiver;
  serviceType: 'elderly' | 'child' | 'special';
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  streetAddress: string;
  city: string;
  zipCode: string;
  selectedRequirements: string[];
  additionalNotes: string;
  onPrev: () => void;
  onNext: () => void;
}

export const Step2Review: React.FC<Step2ReviewProps> = ({
  selectedCaregiver,
  serviceType,
  startDate,
  endDate,
  startTime,
  endTime,
  streetAddress,
  city,
  zipCode,
  selectedRequirements,
  additionalNotes,
  onPrev,
  onNext,
}) => {
  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="border-b border-[#EEF4FA] pb-4">
        <h2 className="text-xl font-bold text-[#0D182B]">Review Booking Summary</h2>
        <p className="text-xs text-gray-500 mt-1">Please double check your request details before proceeding to payment.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Column: Details */}
        <div className="space-y-4 bg-[#F9FBFE] p-5 rounded-2xl border border-[#E3EDF6]">
          <div className="space-y-1">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Service Selected</span>
            <p className="text-sm font-bold text-[#0D182B] capitalize">{serviceType} Care</p>
          </div>

          <div className="space-y-1">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Dates & Time</span>
            <p className="text-sm font-medium text-[#0D182B]">
              {startDate} to {endDate || startDate}
            </p>
            <p className="text-xs text-gray-500">{startTime} - {endTime}</p>
          </div>

          <div className="space-y-1">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Location</span>
            <p className="text-sm font-medium text-[#0D182B]">{streetAddress}, {city} {zipCode}</p>
          </div>

          <div className="space-y-1">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Requirements</span>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {selectedRequirements.map((req) => (
                <span key={req} className="px-2.5 py-1 rounded-md text-[11px] font-semibold bg-white border border-[#DCEAF5] text-[#0B8BD8]">
                  {req}
                </span>
              ))}
            </div>
          </div>

          {additionalNotes && (
            <div className="space-y-1 pt-2 border-t border-[#E3EDF6]">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Notes</span>
              <p className="text-xs text-gray-600 italic">"{additionalNotes}"</p>
            </div>
          )}
        </div>

        {/* Right Column: Pricing Summary */}
        <div className="bg-gradient-to-br from-[#F5FAFE] to-[#EAF4FD] p-6 rounded-2xl border border-[#DCECF8] flex flex-col justify-between">
          <div className="space-y-4">
            <h3 className="text-base font-bold text-[#0D182B] border-b border-[#D7E8F5] pb-3">
              Price Breakdown
            </h3>

            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex justify-between">
                <span>Caregiver Hourly Rate</span>
                <span className="font-semibold text-[#0D182B]">{selectedCaregiver.rate}</span>
              </div>
              <div className="flex justify-between">
                <span>Estimated Hours (2 Days)</span>
                <span className="font-semibold text-[#0D182B]">16 hrs</span>
              </div>
              <div className="flex justify-between">
                <span>Service & Platform Fee</span>
                <span className="font-semibold text-[#0D182B]">Rs. 1,500.00</span>
              </div>
            </div>

            <div className="pt-4 border-t border-[#D7E8F5] flex justify-between items-center">
              <span className="text-base font-bold text-[#0D182B]">Total Due</span>
              <span className="text-2xl font-extrabold text-[#0B8BD8]">Rs. 57,500.00</span>
            </div>
          </div>

          <div className="mt-6 p-3 rounded-xl bg-white/80 border border-[#D6E6F5] text-xs text-gray-600 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-500 shrink-0" />
            <span>Cancel anytime up to 24 hours before start date with full refund guarantee.</span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-between pt-4 border-t border-[#EEF4FA]">
        <button
          type="button"
          onClick={onPrev}
          className="px-6 py-2.5 rounded-xl border border-[#D0D5DD] bg-white text-sm font-bold text-[#344054] hover:bg-gray-50 transition-colors cursor-pointer flex items-center gap-2"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Back to Service</span>
        </button>

        <button
          type="button"
          onClick={onNext}
          className="px-8 py-2.5 rounded-xl bg-[#0B3B60] hover:bg-[#0B8BD8] text-white text-sm font-bold shadow-xs transition-colors cursor-pointer flex items-center gap-2"
        >
          <span>Proceed to Payment</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default Step2Review;
