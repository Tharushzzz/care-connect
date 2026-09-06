import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ShieldCheck } from 'lucide-react';
import CaregiversData from '../../config/Caregivers';
import type { Caregiver } from '../../config/Caregivers';
import defaultBookingData from '../../config/Booking';

import BookingStepper from '../components/Booking/BookingStepper';
import Step1Service from '../components/Booking/Step1Service';
import Step2Review from '../components/Booking/Step2Review';
import Step3Payment from '../components/Booking/Step3Payment';
import Step4Finish from '../components/Booking/Step4Finish';
import { useAuth } from '../hooks/useAuth';

export const BookCare: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const caregiverId = id ? parseInt(id, 10) : 1;

  // Selected Caregiver state (initialized with fallback, synced with MongoDB)
  const [selectedCaregiver, setSelectedCaregiver] = useState<Caregiver>(() => {
    return CaregiversData.find((c) => c.id === caregiverId) || CaregiversData[0];
  });

  // Stepper state (1: Service, 2: Review, 3: Payment, 4: Finish)
  const [currentStep, setCurrentStep] = useState<number>(1);

  useEffect(() => {
    fetch(`/api/caregivers/${caregiverId}`)
      .then((res) => {
        if (!res.ok) throw new Error('Caregiver not found');
        return res.json();
      })
      .then((data) => {
        if (data && data.name) setSelectedCaregiver(data);
      })
      .catch((err) => console.log('Using local caregiver fallback:', err));
  }, [caregiverId]);

  const { user } = useAuth();

  // Form State initialized to empty (no default selections)
  const [serviceType, setServiceType] = useState<'elderly' | 'child' | 'special' | ''>(
    defaultBookingData.serviceType || ''
  );
  const [startDate, setStartDate] = useState<string>(defaultBookingData.startDate || '');
  const [endDate, setEndDate] = useState<string>(defaultBookingData.endDate || '');
  const [startTime, setStartTime] = useState<string>(defaultBookingData.startTime || '');
  const [endTime, setEndTime] = useState<string>(defaultBookingData.endTime || '');
  const [selectedRequirements, setSelectedRequirements] = useState<string[]>(
    defaultBookingData.selectedRequirements || []
  );

  const [streetAddress, setStreetAddress] = useState<string>(defaultBookingData.streetAddress || '');
  const [city, setCity] = useState<string>(defaultBookingData.city || '');
  const [zipCode, setZipCode] = useState<string>(defaultBookingData.zipCode || '');
  const [additionalNotes, setAdditionalNotes] = useState<string>(defaultBookingData.additionalNotes || '');

  // Payment Form State
  const [cardNumber, setCardNumber] = useState<string>('');
  const [cardExpiry, setCardExpiry] = useState<string>('');
  const [cardCvc, setCardCvc] = useState<string>('');
  const [cardName, setCardName] = useState<string>(
    user?.name || (user?.firstName ? `${user.firstName} ${user.lastName || ''}`.trim() : '')
  );

  useEffect(() => {
    if (user && !cardName) {
      const fullName = `${user.firstName || ''} ${user.lastName || ''}`.trim() || user.name || '';
      if (fullName) setCardName(fullName);
    }
  }, [user]);

  const [bookingRef, setBookingRef] = useState<string>('');

  const steps = [
    { id: 1, label: 'Service' },
    { id: 2, label: 'Review' },
    { id: 3, label: 'Payment' },
    { id: 4, label: 'Finish' },
  ];

  const toggleRequirement = (reqLabel: string) => {
    if (selectedRequirements.includes(reqLabel)) {
      setSelectedRequirements(selectedRequirements.filter((item) => item !== reqLabel));
    } else {
      setSelectedRequirements([...selectedRequirements, reqLabel]);
    }
  };

  const handleNextStep = async () => {
    if (currentStep === 1) {
      if (!serviceType) {
        alert('Please select a service type before continuing.');
        return;
      }
      if (!startDate) {
        alert('Please select a start date.');
        return;
      }
    }

    if (currentStep === 3) {
      try {
        const token = localStorage.getItem('careconnect_token');
        const mappedService =
          serviceType === 'elderly'
            ? 'Elderly Care'
            : serviceType === 'child'
            ? 'Child Care'
            : serviceType === 'special'
            ? 'Special Needs Care'
            : 'General Care';

        const res = await fetch('/api/bookings', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
          body: JSON.stringify({
            caregiverId: selectedCaregiver.id || caregiverId,
            caregiverName: selectedCaregiver.name,
            caregiverRole: selectedCaregiver.role,
            caregiverAvatar: selectedCaregiver.profileImage,
            serviceType: mappedService,
            startDate,
            endDate,
            startTime,
            endTime,
            totalPrice: 28000.0,
            days: 1,
            notes: `${selectedRequirements.join(', ')} | Address: ${streetAddress}, ${city} ${additionalNotes ? '| Notes: ' + additionalNotes : ''}`,
          }),
        });

        if (res.ok) {
          const createdBooking = await res.json();
          setBookingRef(createdBooking.bookingCode || 'BK-' + Math.floor(100000 + Math.random() * 900000));
        } else {
          setBookingRef('BK-' + Math.floor(100000 + Math.random() * 900000));
        }
      } catch (err) {
        console.error('Error posting booking to MongoDB:', err);
        setBookingRef('BK-' + Math.floor(100000 + Math.random() * 900000));
      }
    }

    if (currentStep < 4) {
      setCurrentStep((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F8FC] py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Page Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#0B3B60]">
            Book Care
          </h1>
          <p className="text-sm sm:text-base text-gray-600 max-w-xl mx-auto">
            Please provide details to ensure we match you with the perfect caregiver.
          </p>
        </div>

        {/* 4-Step Stepper Component */}
        <BookingStepper
          currentStep={currentStep}
          steps={steps}
          onStepClick={(stepId) => setCurrentStep(stepId)}
        />

        {/* Card Container */}
        <div className="bg-white rounded-3xl sm:rounded-4xl border border-[#E3EDF6] p-6 sm:p-10 shadow-xs space-y-8">
          
          {/* Caregiver Mini Info Bar */}
          <div className="p-4 rounded-2xl bg-linear-to-r from-[#F4FAFE] to-[#E9F4FC] border border-[#DCEBF7] flex items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <img
                src={selectedCaregiver.profileImage}
                alt={selectedCaregiver.name}
                className="w-12 h-12 rounded-full object-cover ring-2 ring-white shadow-xs"
              />
              <div>
                <h3 className="font-bold text-sm text-[#0D182B]">{selectedCaregiver.name}</h3>
                <p className="text-xs text-gray-600">{selectedCaregiver.role} • {selectedCaregiver.rate}</p>
              </div>
            </div>
            <span className="inline-flex items-center gap-1 text-xs font-bold text-[#0B8BD8] bg-white px-3 py-1.5 rounded-full border border-[#D2E6F5] shadow-2xs">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              Verified Caregiver
            </span>
          </div>

          {/* STEP 1: SERVICE */}
          {currentStep === 1 && (
            <Step1Service
              serviceType={serviceType}
              setServiceType={setServiceType}
              startDate={startDate}
              setStartDate={setStartDate}
              endDate={endDate}
              setEndDate={setEndDate}
              startTime={startTime}
              setStartTime={setStartTime}
              endTime={endTime}
              setEndTime={setEndTime}
              selectedRequirements={selectedRequirements}
              toggleRequirement={toggleRequirement}
              streetAddress={streetAddress}
              setStreetAddress={setStreetAddress}
              city={city}
              setCity={setCity}
              zipCode={zipCode}
              setZipCode={setZipCode}
              additionalNotes={additionalNotes}
              setAdditionalNotes={setAdditionalNotes}
              onNext={handleNextStep}
            />
          )}

          {/* STEP 2: REVIEW */}
          {currentStep === 2 && (
            <Step2Review
              selectedCaregiver={selectedCaregiver}
              serviceType={serviceType}
              startDate={startDate}
              endDate={endDate}
              startTime={startTime}
              endTime={endTime}
              streetAddress={streetAddress}
              city={city}
              zipCode={zipCode}
              selectedRequirements={selectedRequirements}
              additionalNotes={additionalNotes}
              onPrev={handlePrevStep}
              onNext={handleNextStep}
            />
          )}

          {/* STEP 3: PAYMENT */}
          {currentStep === 3 && (
            <Step3Payment
              cardName={cardName}
              setCardName={setCardName}
              cardNumber={cardNumber}
              setCardNumber={setCardNumber}
              cardExpiry={cardExpiry}
              setCardExpiry={setCardExpiry}
              cardCvc={cardCvc}
              setCardCvc={setCardCvc}
              onPrev={handlePrevStep}
              onNext={handleNextStep}
            />
          )}

          {/* STEP 4: FINISH */}
          {currentStep === 4 && (
            <Step4Finish
              bookingRef={bookingRef}
              selectedCaregiver={selectedCaregiver}
              startDate={startDate}
              endDate={endDate}
              streetAddress={streetAddress}
              city={city}
            />
          )}

        </div>
      </div>
    </div>
  );
};

export default BookCare;
