'use client';

import { useState } from 'react';
import Header from './components/Header';
import StepIndicator from './components/StepIndicator';
import TreatmentStep from './components/TreatmentStep';
import DateTimeStep from './components/DateTimeStep';
import PatientDetailsStep, { PatientDetails } from './components/PatientDetailsStep';
import ConfirmStep from './components/ConfirmStep';
import SuccessScreen from './components/SuccessScreen';
import { Treatment, Booking } from './types';
import { saveBooking, generateId } from './lib/bookings';

const EMPTY_DETAILS: PatientDetails = {
  patientName: '',
  patientEmail: '',
  patientPhone: '',
  dateOfBirth: '',
  notes: '',
};

export default function Home() {
  const [step, setStep] = useState(1);
  const [treatment, setTreatment] = useState<Treatment | null>(null);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [details, setDetails] = useState<PatientDetails>(EMPTY_DETAILS);
  const [confirmedBooking, setConfirmedBooking] = useState<Booking | null>(null);
  const [loading, setLoading] = useState(false);

  const handleConfirm = () => {
    if (!treatment) return;
    setLoading(true);
    setTimeout(() => {
      const booking: Booking = {
        id: generateId(),
        patientName: details.patientName,
        patientEmail: details.patientEmail,
        patientPhone: details.patientPhone,
        dateOfBirth: details.dateOfBirth,
        treatmentId: treatment.id,
        treatmentName: treatment.name,
        date,
        time,
        notes: details.notes,
        createdAt: new Date().toISOString(),
        status: 'confirmed',
      };
      saveBooking(booking);
      setConfirmedBooking(booking);
      setLoading(false);
    }, 800);
  };

  const reset = () => {
    setStep(1);
    setTreatment(null);
    setDate('');
    setTime('');
    setDetails(EMPTY_DETAILS);
    setConfirmedBooking(null);
  };

  return (
    <div className="min-h-screen bg-[#f0f7ff]">
      <Header />

      <main className="max-w-3xl mx-auto px-4 py-8">
        {/* Hero banner */}
        {step === 1 && !confirmedBooking && (
          <div className="bg-gradient-to-r from-[#1a5f7a] to-[#2980b9] rounded-2xl p-6 mb-8 text-white">
            <h2 className="text-2xl font-bold mb-1">Book Your Appointment</h2>
            <p className="text-blue-100 text-sm">Sadiqi Medical Centre is open 7 days a week. Book online in under 2 minutes.</p>
            <div className="flex gap-4 mt-4 text-xs">
              <div className="flex items-center gap-1.5 bg-white/10 rounded-full px-3 py-1.5">
                <span>📅</span> Available 7 days
              </div>
              <div className="flex items-center gap-1.5 bg-white/10 rounded-full px-3 py-1.5">
                <span>⏱</span> Same-day slots
              </div>
              <div className="flex items-center gap-1.5 bg-white/10 rounded-full px-3 py-1.5">
                <span>✉</span> Instant confirmation
              </div>
            </div>
          </div>
        )}

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
          {confirmedBooking ? (
            <SuccessScreen booking={confirmedBooking} onBookAnother={reset} />
          ) : (
            <>
              <StepIndicator current={step} />

              {step === 1 && (
                <TreatmentStep
                  selected={treatment}
                  onSelect={setTreatment}
                  onNext={() => setStep(2)}
                />
              )}

              {step === 2 && treatment && (
                <DateTimeStep
                  treatment={treatment}
                  selectedDate={date}
                  selectedTime={time}
                  onDateSelect={setDate}
                  onTimeSelect={setTime}
                  onNext={() => setStep(3)}
                  onBack={() => setStep(1)}
                />
              )}

              {step === 3 && (
                <PatientDetailsStep
                  details={details}
                  onChange={setDetails}
                  onNext={() => setStep(4)}
                  onBack={() => setStep(2)}
                />
              )}

              {step === 4 && treatment && (
                <ConfirmStep
                  treatment={treatment}
                  date={date}
                  time={time}
                  details={details}
                  onConfirm={handleConfirm}
                  onBack={() => setStep(3)}
                  loading={loading}
                />
              )}
            </>
          )}
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-5 mt-6 flex flex-col sm:flex-row gap-4 items-center justify-between text-sm">
          <div className="flex items-center gap-2 text-gray-600">
            <span>📍</span>
            <span>Sadiqi Medical Centre, Leyton, East London</span>
          </div>
          <div className="flex gap-6 text-gray-500">
            <a href="tel:+44" className="hover:text-[#1a5f7a] flex items-center gap-1.5">
              <span>📞</span> Call us
            </a>
            <a href="https://sadiqimedicalcentre.co.uk" target="_blank" rel="noopener noreferrer" className="hover:text-[#1a5f7a] flex items-center gap-1.5">
              <span>🌐</span> Website
            </a>
            <a href="https://www.instagram.com/sadiqimedicalcentre/" target="_blank" rel="noopener noreferrer" className="hover:text-[#1a5f7a] flex items-center gap-1.5">
              <span>📸</span> Instagram
            </a>
          </div>
        </div>
        <footer className="text-center text-xs text-gray-400 mt-4 pb-4">
          <p>Sadiqi Medical Centre · Open 7 Days a Week · Book online or call us</p>
        </footer>
      </main>
    </div>
  );
}
