'use client';

import { Booking } from '../types';

const MONTH_NAMES = ['January','February','March','April','May','June','July','August','September','October','November','December'];
const DAY_NAMES = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];

function formatReadableDate(dateStr: string) {
  const [y, m, d] = dateStr.split('-').map(Number);
  const date = new Date(y, m - 1, d);
  return `${DAY_NAMES[date.getDay()]}, ${d} ${MONTH_NAMES[m - 1]} ${y}`;
}

export default function SuccessScreen({ booking, onBookAnother }: { booking: Booking; onBookAnother: () => void }) {
  return (
    <div className="text-center py-6">
      <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <span className="text-4xl">✓</span>
      </div>
      <h2 className="text-2xl font-bold text-green-700 mb-2">Booking Confirmed!</h2>
      <p className="text-gray-500 mb-6">Your appointment has been successfully booked at Sadiqi Medical Centre.</p>

      <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm text-left max-w-sm mx-auto mb-6">
        <div className="text-center mb-4 pb-4 border-b border-gray-100">
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Booking Reference</span>
          <p className="text-xl font-bold text-[#1a5f7a] mt-1 font-mono">{booking.id}</p>
        </div>
        <div className="space-y-3 text-sm">
          {[
            { label: 'Treatment', value: booking.treatmentName },
            { label: 'Date', value: formatReadableDate(booking.date) },
            { label: 'Time', value: booking.time },
            { label: 'Patient', value: booking.patientName },
            { label: 'Phone', value: booking.patientPhone },
          ].map(({ label, value }) => (
            <div key={label} className="flex justify-between">
              <span className="text-gray-500">{label}</span>
              <span className="font-semibold text-gray-800 text-right">{value}</span>
            </div>
          ))}
        </div>
        <div className="mt-4 pt-4 border-t border-gray-100 text-xs text-gray-400 text-center">
          Please arrive 10 minutes early · Sadiqi Medical Centre, Leyton
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <button
          onClick={onBookAnother}
          className="px-8 py-3 bg-[#1a5f7a] text-white rounded-xl font-semibold hover:bg-[#155068] transition-colors"
        >
          Book Another Appointment
        </button>
        <a
          href="/my-bookings"
          className="px-8 py-3 border-2 border-[#1a5f7a] text-[#1a5f7a] rounded-xl font-semibold hover:bg-[#e8f4fd] transition-colors"
        >
          View My Bookings
        </a>
        <button
          onClick={() => window.print()}
          className="px-8 py-3 border-2 border-gray-200 text-gray-600 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
        >
          🖨 Print Confirmation
        </button>
      </div>
    </div>
  );
}
