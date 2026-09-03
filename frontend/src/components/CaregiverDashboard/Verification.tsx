import React, { useState } from 'react';
import {
  Shield,
  ShieldCheck,
  FileText,
  Lock,
  AlertCircle,
  CheckCircle2,
  Clock,
  UploadCloud,
  Check
} from 'lucide-react';

type StepId = 'identity' | 'background' | 'rn' | 'cpr';

export const CaregiverVerification: React.FC = () => {
  const [activeStep, setActiveStep] = useState<StepId>('background');
  const [uploadedCPR, setUploadedCPR] = useState<string | null>(null);

  const steps = [
    {
      id: 'identity' as StepId,
      name: 'Identity Check',
      icon: FileText,
      status: 'completed',
      statusIcon: CheckCircle2,
      statusColor: 'text-emerald-500'
    },
    {
      id: 'background' as StepId,
      name: 'Background Check',
      icon: Shield,
      status: 'completed',
      statusIcon: CheckCircle2,
      statusColor: 'text-emerald-500'
    },
    {
      id: 'rn' as StepId,
      name: 'RN/LPN License',
      icon: Lock,
      status: 'pending',
      statusIcon: Clock,
      statusColor: 'text-amber-500'
    },
    {
      id: 'cpr' as StepId,
      name: 'CPR / First Aid',
      icon: AlertCircle,
      status: 'required',
      statusDot: 'bg-blue-500'
    }
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
          Trust & Verification
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Complete your background checks and credential verifications to build trust with families.
        </p>
      </div>

      {/* Hero Progress Banner */}
      <div className="bg-[#0A3D37] text-white rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm border border-[#08332E]">
        <div className="flex items-center gap-4">
          <div className="w-11 h-11 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-6 h-6 text-teal-300" />
          </div>
          <div>
            <h2 className="text-base font-bold text-white">Profile Verification Status</h2>
            <p className="text-xs text-teal-100/75 mt-0.5">
              Complete all steps to earn the Verified Badge on your public profile.
            </p>
          </div>
        </div>

        <div className="text-left sm:text-right border-t sm:border-t-0 pt-3 sm:pt-0 border-white/10 shrink-0">
          <div className="text-2xl sm:text-3xl font-extrabold text-white">2/4</div>
          <div className="text-[10px] font-bold uppercase tracking-wider text-teal-300">
            STEPS COMPLETED
          </div>
        </div>
      </div>

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        {/* Left Column: Steps List */}
        <div className="md:col-span-5 space-y-2">
          {steps.map((step) => {
            const Icon = step.icon;
            const isSelected = activeStep === step.id;
            const StatusIcon = step.statusIcon;

            return (
              <button
                key={step.id}
                onClick={() => setActiveStep(step.id)}
                className={`w-full p-4 rounded-2xl flex items-center justify-between text-left transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-white border-2 border-teal-500 shadow-sm text-teal-950 font-semibold'
                    : 'bg-white/60 hover:bg-white border border-slate-200 text-slate-700 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    className={`w-4.5 h-4.5 ${
                      isSelected ? 'text-[#0D9488]' : 'text-slate-400'
                    }`}
                  />
                  <span className="text-sm">{step.name}</span>
                </div>

                <div>
                  {StatusIcon ? (
                    <StatusIcon className={`w-4.5 h-4.5 ${step.statusColor}`} />
                  ) : step.statusDot ? (
                    <span className={`block w-2 h-2 rounded-full ${step.statusDot}`} />
                  ) : null}
                </div>
              </button>
            );
          })}
        </div>

        {/* Right Column: Step Detail Card */}
        <div className="md:col-span-7 bg-white rounded-2xl border border-slate-200/80 shadow-2xs p-6 sm:p-7">
          {/* 1. Identity Check */}
          {activeStep === 'identity' && (
            <div className="space-y-6">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="text-base font-bold text-slate-900">Identity Check</h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Government-issued ID and biometric facial verification.
                  </p>
                </div>
                <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-semibold px-2.5 py-0.5 rounded-full inline-flex items-center gap-1">
                  <Check className="w-3 h-3" />
                  <span>Cleared</span>
                </span>
              </div>

              <div className="border border-slate-100 rounded-2xl p-6 text-center space-y-3 bg-slate-50/50">
                <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h4 className="text-sm font-bold text-slate-900">Identity Verified</h4>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Your Sri Lankan National Identity Card (NIC) and live selfie check were verified successfully.
                </p>
                <div className="text-[11px] text-slate-400 pt-2">
                  Verified on: Aug 12, 2026
                </div>
              </div>
            </div>
          )}

          {/* 2. Background Check (Screen 6) */}
          {activeStep === 'background' && (
            <div className="space-y-6">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="text-base font-bold text-slate-900">Criminal Background Check</h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    National and county-level background screening.
                  </p>
                </div>
                <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-semibold px-2.5 py-0.5 rounded-full inline-flex items-center gap-1">
                  <Check className="w-3 h-3" />
                  <span>Cleared</span>
                </span>
              </div>

              <div className="border border-slate-100 rounded-2xl p-8 text-center space-y-3 bg-slate-50/40">
                <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
                  <ShieldCheck className="w-8 h-8" />
                </div>
                <h4 className="text-base font-bold text-slate-900">Check completed successfully</h4>
                <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
                  Your background check is clear and valid for 12 months. Your profile displays a "Background Checked" badge.
                </p>
                <div className="text-[11px] text-slate-400 pt-3">
                  Valid until: Oct 15, 2027
                </div>
              </div>
            </div>
          )}

          {/* 3. RN/LPN License (Screen 7) */}
          {activeStep === 'rn' && (
            <div className="space-y-6">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="text-base font-bold text-slate-900">Professional License</h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    We are currently verifying your nursing license with the Sri Lanka Nursing Council (SLNC).
                  </p>
                </div>
                <span className="bg-amber-50 text-amber-700 border border-amber-200 text-xs font-semibold px-2.5 py-0.5 rounded-full inline-flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span>Pending Review</span>
                </span>
              </div>

              <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-5 space-y-1.5">
                <div className="flex items-center gap-2 text-xs font-bold text-amber-900">
                  <Clock className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>Verification in progress</span>
                </div>
                <p className="text-xs text-amber-800 leading-relaxed pl-6">
                  This usually takes 1-2 business days. We will notify you once your RN license is verified and added to your public profile.
                </p>
              </div>
            </div>
          )}

          {/* 4. CPR / First Aid (Screen 8) */}
          {activeStep === 'cpr' && (
            <div className="space-y-6">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="text-base font-bold text-slate-900">CPR / First Aid Certification</h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Upload a valid BLS, CPR, or First Aid certificate.
                  </p>
                </div>
                <span className="bg-blue-50 text-blue-700 border border-blue-200 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                  Required
                </span>
              </div>

              <div className="border-2 border-dashed border-slate-200 rounded-2xl p-8 text-center space-y-3 bg-slate-50/40 hover:bg-slate-50 transition-colors">
                <div className="w-14 h-14 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mx-auto">
                  <UploadCloud className="w-7 h-7" />
                </div>
                <h4 className="text-sm font-bold text-slate-900">Click to upload document</h4>
                <p className="text-xs text-slate-500 max-w-xs mx-auto leading-relaxed">
                  Please upload a clear photo or PDF of your current CPR/First Aid certification card.
                </p>

                <div className="pt-2">
                  <label className="inline-block px-6 py-2.5 rounded-full bg-[#0D9488] hover:bg-[#0b7970] text-white text-xs font-semibold shadow-xs cursor-pointer transition-colors">
                    {uploadedCPR ? 'Change File' : 'Select File'}
                    <input
                      type="file"
                      accept=".pdf,image/*"
                      className="hidden"
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          setUploadedCPR(e.target.files[0].name);
                        }
                      }}
                    />
                  </label>
                </div>

                {uploadedCPR && (
                  <div className="p-3 bg-emerald-50 text-emerald-700 rounded-xl text-xs font-semibold inline-flex items-center gap-1.5 mt-2">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Uploaded: {uploadedCPR}</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CaregiverVerification;
