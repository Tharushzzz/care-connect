import React from 'react';
import { ChevronLeft, CheckCircle2 } from 'lucide-react';

export interface Step3PaymentProps {
  cardName: string;
  setCardName: (val: string) => void;
  cardNumber: string;
  setCardNumber: (val: string) => void;
  cardExpiry: string;
  setCardExpiry: (val: string) => void;
  cardCvc: string;
  setCardCvc: (val: string) => void;
  onPrev: () => void;
  onNext: () => void;
}

export const Step3Payment: React.FC<Step3PaymentProps> = ({
  cardName,
  setCardName,
  cardNumber,
  setCardNumber,
  cardExpiry,
  setCardExpiry,
  cardCvc,
  setCardCvc,
  onPrev,
  onNext,
}) => {
  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="border-b border-[#EEF4FA] pb-4">
        <h2 className="text-xl font-bold text-[#0D182B]">
          Payment Information
        </h2>
        <p className="text-xs text-gray-500 mt-1">
          Enter your card details to confirm the booking.
        </p>
      </div>

      {/* Card Inputs */}
      <div className="space-y-4 pt-2">
        <div className="space-y-1.5">
          <label className="block text-xs font-semibold text-gray-600">
            Cardholder Name
          </label>
          <input
            type="text"
            value={cardName}
            onChange={(e) => setCardName(e.target.value)}
            placeholder="Cardholder Name"
            className="w-full h-11 px-4 rounded-xl border border-[#D5E3EF] text-sm text-[#0D182B] focus:outline-none focus:ring-2 focus:ring-[#0B8BD8]/30 focus:border-[#0B8BD8] transition-all bg-white"
          />
        </div>

        <div className="space-y-1.5">
          <label className="block text-xs font-semibold text-gray-600">
            Card Number
          </label>
          <input
            type="text"
            inputMode="numeric"
            autoComplete="cc-number"
            value={cardNumber}
            onChange={(e) => {
              const digits = e.target.value.replace(/\D/g, '').slice(0, 16);
              const formatted = digits.match(/.{1,4}/g)?.join(' ') || '';
              setCardNumber(formatted);
            }}
            onKeyDown={(e) => {
              // Allow control keys: backspace, delete, tab, escape, enter, arrows
              if (
                ['Backspace', 'Delete', 'Tab', 'Escape', 'Enter', 'ArrowLeft', 'ArrowRight'].includes(e.key) ||
                (e.ctrlKey || e.metaKey)
              ) {
                return;
              }
              // Prevent non-numeric keys
              if (!/^[0-9]$/.test(e.key)) {
                e.preventDefault();
              }
            }}
            placeholder="•••• •••• •••• 4242"
            maxLength={19}
            className="w-full h-11 px-4 rounded-xl border border-[#D5E3EF] text-sm text-[#0D182B] focus:outline-none focus:ring-2 focus:ring-[#0B8BD8]/30 focus:border-[#0B8BD8] transition-all bg-white"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-gray-600">
              Expiration Date
            </label>
            <input
              type="text"
              inputMode="numeric"
              autoComplete="cc-exp"
              value={cardExpiry}
              onChange={(e) => {
                const digits = e.target.value.replace(/\D/g, '').slice(0, 4);
                if (digits.length > 2) {
                  setCardExpiry(`${digits.slice(0, 2)}/${digits.slice(2)}`);
                } else {
                  setCardExpiry(digits);
                }
              }}
              onKeyDown={(e) => {
                if (
                  ['Backspace', 'Delete', 'Tab', 'Escape', 'Enter', 'ArrowLeft', 'ArrowRight'].includes(e.key) ||
                  (e.ctrlKey || e.metaKey)
                ) {
                  return;
                }
                if (!/^[0-9]$/.test(e.key)) {
                  e.preventDefault();
                }
              }}
              placeholder="MM/YY"
              maxLength={5}
              className="w-full h-11 px-4 rounded-xl border border-[#D5E3EF] text-sm text-[#0D182B] focus:outline-none focus:ring-2 focus:ring-[#0B8BD8]/30 focus:border-[#0B8BD8] transition-all bg-white"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-gray-600">
              CVC Code
            </label>
            <input
              type="text"
              inputMode="numeric"
              autoComplete="cc-csc"
              value={cardCvc}
              onChange={(e) => {
                const digits = e.target.value.replace(/\D/g, '').slice(0, 4);
                setCardCvc(digits);
              }}
              onKeyDown={(e) => {
                if (
                  ['Backspace', 'Delete', 'Tab', 'Escape', 'Enter', 'ArrowLeft', 'ArrowRight'].includes(e.key) ||
                  (e.ctrlKey || e.metaKey)
                ) {
                  return;
                }
                if (!/^[0-9]$/.test(e.key)) {
                  e.preventDefault();
                }
              }}
              placeholder="123"
              maxLength={4}
              className="w-full h-11 px-4 rounded-xl border border-[#D5E3EF] text-sm text-[#0D182B] focus:outline-none focus:ring-2 focus:ring-[#0B8BD8]/30 focus:border-[#0B8BD8] transition-all bg-white"
            />
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
          <span>Back to Review</span>
        </button>

        <button
          type="button"
          onClick={onNext}
          className="px-8 py-2.5 rounded-xl bg-[#0B8BD8] hover:bg-[#0879B6] text-white text-sm font-bold shadow-md transition-colors cursor-pointer flex items-center gap-2"
        >
          <CheckCircle2 className="w-4 h-4" />
          <span>Pay & Confirm Booking (Rs. 57,500.00)</span>
        </button>
      </div>
    </div>
  );
};

export default Step3Payment;