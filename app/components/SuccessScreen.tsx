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
    <div className="text-center py-8">
      <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <span className="text-4xl">✓</span>
      </div>
      <h2 className="text-2xl font-bold text-green-700 mb-2">Booking Confirmed!</h2>
      <p className="text-gray-500 mb-6">Your appointment has been successfully booked.</p>

      <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm text-left max-w-sm mx-auto mb-6">
        <div className="text-center mb-4">
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Booking Reference</span>
          <p className="text-xl font-bold text-[#1a5f7a] mt-1">{booking.id}</p>
        </div>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-500">Treatment</span>
            <span className="font-semibold">{booking.treatmentName}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Date</span>
            <span className="font-semibold">{formatReadableDate(booking.date)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Time</span>
            <span className="font-semibold">{booking.time}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Patient</span>
            <span className="font-semibold">{booking.patientName}</span>
          </div>
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
      </div>
    </div>
  );
}
