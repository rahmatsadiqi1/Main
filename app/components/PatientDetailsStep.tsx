'use client';

import { useState } from 'react';

export interface PatientDetails {
  patientName: string;
  patientEmail: string;
  patientPhone: string;
  dateOfBirth: string;
  notes: string;
}

export default function PatientDetailsStep({
  details,
  onChange,
  onNext,
  onBack,
}: {
  details: PatientDetails;
  onChange: (d: PatientDetails) => void;
  onNext: () => void;
  onBack: () => void;
}) {
  const [errors, setErrors] = useState<Partial<PatientDetails>>({});

  const set = (field: keyof PatientDetails, value: string) => {
    onChange({ ...details, [field]: value });
    if (errors[field]) setErrors({ ...errors, [field]: '' });
  };

  const validate = () => {
    const e: Partial<PatientDetails> = {};
    if (!details.patientName.trim()) e.patientName = 'Full name is required';
    if (!details.patientEmail.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(details.patientEmail))
      e.patientEmail = 'A valid email is required';
    if (!details.patientPhone.trim() || !/^\+?[\d\s\-()]{8,}$/.test(details.patientPhone))
      e.patientPhone = 'A valid phone number is required';
    if (!details.dateOfBirth) e.dateOfBirth = 'Date of birth is required';
    return e;
  };

  const handleNext = () => {
    const e = validate();
    if (Object.keys(e).length > 0) { setErrors(e); return; }
    onNext();
  };

  const Field = ({
    label, field, type = 'text', placeholder,
  }: { label: string; field: keyof PatientDetails; type?: string; placeholder?: string }) => (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-1">{label}</label>
      <input
        type={type}
        value={details[field]}
        onChange={(e) => set(field, e.target.value)}
        placeholder={placeholder}
        className={`w-full border-2 rounded-xl px-4 py-3 text-sm outline-none transition-colors ${
          errors[field]
            ? 'border-red-400 focus:border-red-500'
            : 'border-gray-200 focus:border-[#1a5f7a]'
        }`}
      />
      {errors[field] && <p className="text-red-500 text-xs mt-1">{errors[field]}</p>}
    </div>
  );

  return (
    <div>
      <h2 className="text-xl font-bold text-[#1a5f7a] mb-1">Your Details</h2>
      <p className="text-gray-500 text-sm mb-6">Please enter your details so we can confirm your appointment.</p>

      <div className="grid gap-4">
        <Field label="Full Name *" field="patientName" placeholder="e.g. Jane Smith" />
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Email Address *" field="patientEmail" type="email" placeholder="jane@example.com" />
          <Field label="Phone Number *" field="patientPhone" type="tel" placeholder="+61 4xx xxx xxx" />
        </div>
        <Field label="Date of Birth *" field="dateOfBirth" type="date" />
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Additional Notes (optional)</label>
          <textarea
            value={details.notes}
            onChange={(e) => set('notes', e.target.value)}
            placeholder="Any specific concerns or information for your doctor..."
            rows={3}
            className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-sm outline-none transition-colors focus:border-[#1a5f7a] resize-none"
          />
        </div>
      </div>

      <div className="flex justify-between mt-6">
        <button onClick={onBack} className="px-6 py-3 border-2 border-gray-200 rounded-xl font-semibold text-gray-600 hover:bg-gray-50 transition-colors">
          ← Back
        </button>
        <button
          onClick={handleNext}
          className="px-8 py-3 bg-[#1a5f7a] text-white rounded-xl font-semibold hover:bg-[#155068] transition-colors"
        >
          Next: Confirm →
        </button>
      </div>
    </div>
  );
}
