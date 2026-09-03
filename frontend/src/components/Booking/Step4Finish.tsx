import React from 'react';
import { Link } from 'react-router-dom';
import { Check, ArrowRight } from 'lucide-react';
import type { Caregiver } from '../../../config/Caregivers';

export interface Step4FinishProps {
  bookingRef: string;
  selectedCaregiver: Caregiver;
  startDate: string;
  endDate: string;
  streetAddress: string;
  city: string;
}

export const Step4Finish: React.FC<Step4FinishProps> = ({
  bookingRef,
  selectedCaregiver,
  startDate,
  endDate,
  streetAddress,
  city,
}) => {
  return (
    <div className="text-center py-8 space-y-6 animate-in zoom-in-95 duration-300">
      <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center ring-8 ring-emerald-50 shadow-xs">
        <Check className="w-10 h-10 stroke-[3]" />
      </div>

      <div className="space-y-2">
        <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#EAF5FC] text-[#0B8BD8] border border-[#D2E6F5]">
          Ref: {bookingRef || '#BK-749102'}
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0D182B]">
          Care Consultation Confirmed!
        </h2>
        <p className="text-sm text-gray-600 max-w-md mx-auto">
          Thank you! Your care request has been sent to <span className="font-bold text-[#0D182B]">{selectedCaregiver.name}</span>. You will receive a confirmation SMS and email shortly.
        </p>
      </div>

      <div className="max-w-md mx-auto p-4 rounded-2xl bg-[#F9FBFE] border border-[#E3EDF6] text-left text-xs space-y-2 text-gray-700">
        <div className="flex justify-between">
          <span className="font-semibold text-gray-400">Caregiver:</span>
          <span className="font-bold text-[#0D182B]">{selectedCaregiver.name}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold text-gray-400">Dates:</span>
          <span className="font-bold text-[#0D182B]">{startDate} to {endDate}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold text-gray-400">Location:</span>
          <span className="font-bold text-[#0D182B]">{streetAddress}, {city}</span>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
        <Link
          to="/find-caregivers"
          onClick={() => window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })}
          className="w-full sm:w-auto px-6 py-2.5 rounded-xl border border-[#D0D5DD] bg-white text-sm font-bold text-[#344054] hover:bg-gray-50 transition-colors text-center"
        >
          Find More Caregivers
        </Link>

        <Link
          to="/"
          onClick={() => window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })}
          className="w-full sm:w-auto px-8 py-2.5 rounded-xl bg-[#0B3B60] hover:bg-[#0B8BD8] text-white text-sm font-bold shadow-xs transition-colors text-center inline-flex items-center justify-center gap-2"
        >
          <span>Return to Home</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
};

export default Step4Finish;
