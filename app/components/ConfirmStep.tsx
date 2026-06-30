'use client';

import { useState } from 'react';
import { Treatment } from '../types';
import { PatientDetails } from './PatientDetailsStep';

const MONTH_NAMES = ['January','February','March','April','May','June','July','August','September','October','November','December'];
const DAY_NAMES = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];

function formatReadableDate(dateStr: string) {
  const [y, m, d] = dateStr.split('-').map(Number);
  const date = new Date(y, m - 1, d);
  return `${DAY_NAMES[date.getDay()]}, ${d} ${MONTH_NAMES[m - 1]} ${y}`;
}

function formatDob(dateStr: string) {
  if (!dateStr) return '—';
  const [y, m, d] = dateStr.split('-').map(Number);
  return `${d} ${MONTH_NAMES[m - 1]} ${y}`;
}

export default function ConfirmStep({
  treatment,
  date,
  time,
  details,
  onConfirm,
  onBack,
  loading,
}: {
  treatment: Treatment;
  date: string;
  time: string;
  details: PatientDetails;
  onConfirm: () => void;
  onBack: () => void;
  loading: boolean;
}) {
  const [consented, setConsented] = useState(false);

  const Row = ({ label, value }: { label: string; value: string }) => (
    <div className="flex justify-between py-3 border-b border-gray-100 last:border-0">
      <span className="text-sm text-gray-500">{label}</span>
      <span className="text-sm font-semibold text-gray-800 text-right max-w-[60%] capitalize">{value}</span>
    </div>
  );

  return (
    <div>
      <h2 className="text-xl font-bold text-[#1a5f7a] mb-1">Confirm Appointment</h2>
      <p className="text-gray-500 text-sm mb-6">Please review your details before confirming.</p>

      <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm mb-4">
        <h3 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">Appointment</h3>
        <Row label="Treatment" value={treatment.name} />
        <Row label="Duration" value={`${treatment.duration} minutes`} />
        <Row label="Date" value={formatReadableDate(date)} />
        <Row label="Time" value={time} />
      </div>

      <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm mb-4">
        <h3 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">Patient</h3>
        <Row label="Name" value={details.patientName} />
        <Row label="Email" value={details.patientEmail} />
        <Row label="Phone" value={details.patientPhone} />
        <Row label="Date of Birth" value={formatDob(details.dateOfBirth)} />
        <Row label="Gender" value={details.gender || '—'} />
        <Row label="Patient Type" value={details.isNewPatient === 'new' ? 'New patient' : details.isNewPatient === 'existing' ? 'Existing patient' : '—'} />
        {details.notes && <Row label="Notes" value={details.notes} />}
      </div>

      <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 mb-4 text-sm text-blue-800">
        Please arrive 10 minutes before your appointment. Contact us if you need to reschedule or cancel.
      </div>

      {/* Consent checkbox */}
      <label className="flex items-start gap-3 bg-gray-50 border border-gray-200 rounded-xl p-4 mb-6 cursor-pointer hover:bg-gray-100 transition-colors">
        <input
          type="checkbox"
          checked={consented}
          onChange={(e) => setConsented(e.target.checked)}
          className="mt-0.5 w-4 h-4 accent-[#1a5f7a] flex-shrink-0"
        />
        <span className="text-sm text-gray-700">
          I confirm that the information provided is accurate and I consent to receive treatment at Sadiqi Medical Centre. I understand that a clinician may contact me prior to my appointment.
        </span>
      </label>

      <div className="flex justify-between">
        <button onClick={onBack} disabled={loading} className="px-6 py-3 border-2 border-gray-200 rounded-xl font-semibold text-gray-600 hover:bg-gray-50 transition-colors disabled:opacity-50">
          ← Back
        </button>
        <button
          onClick={onConfirm}
          disabled={loading || !consented}
          className="px-8 py-3 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2"
        >
          {loading ? 'Confirming...' : 'Confirm Booking ✓'}
        </button>
      </div>
    </div>
  );
}
