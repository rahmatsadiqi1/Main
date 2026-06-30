'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Header from '../components/Header';
import { Booking } from '../types';
import { getBookings, cancelBooking } from '../lib/bookings';

const MONTH_NAMES = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const DAY_NAMES = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];

function formatReadableDate(dateStr: string) {
  const [y, m, d] = dateStr.split('-').map(Number);
  const date = new Date(y, m - 1, d);
  return `${DAY_NAMES[date.getDay()]} ${d} ${MONTH_NAMES[m - 1]} ${y}`;
}

function isUpcoming(dateStr: string) {
  const [y, m, d] = dateStr.split('-').map(Number);
  const date = new Date(y, m - 1, d);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return date >= today;
}

export default function MyBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [filter, setFilter] = useState<'upcoming' | 'all'>('upcoming');
  const [cancelId, setCancelId] = useState<string | null>(null);

  useEffect(() => {
    setBookings(getBookings());
  }, []);

  const handleCancel = (id: string) => {
    cancelBooking(id);
    setBookings(getBookings());
    setCancelId(null);
  };

  const displayed = bookings
    .filter((b) => filter === 'all' || (isUpcoming(b.date) && b.status === 'confirmed'))
    .sort((a, b) => a.date.localeCompare(b.date));

  return (
    <div className="min-h-screen bg-[#f0f7ff]">
      <Header />

      <main className="max-w-3xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-[#1a5f7a]">My Bookings</h2>
            <p className="text-gray-500 text-sm">Manage your appointments at Sadiqi Medical Centre</p>
          </div>
          <Link
            href="/"
            className="px-5 py-2.5 bg-[#1a5f7a] text-white rounded-xl text-sm font-semibold hover:bg-[#155068] transition-colors"
          >
            + New Booking
          </Link>
        </div>

        {/* Filter tabs */}
        <div className="flex gap-2 mb-4">
          {(['upcoming', 'all'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                filter === f
                  ? 'bg-[#1a5f7a] text-white'
                  : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
              }`}
            >
              {f === 'upcoming' ? 'Upcoming' : 'All Bookings'}
            </button>
          ))}
        </div>

        {displayed.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center">
            <p className="text-gray-400 text-4xl mb-3">📅</p>
            <p className="text-gray-600 font-medium">No bookings found</p>
            <p className="text-gray-400 text-sm mt-1">
              {filter === 'upcoming' ? 'You have no upcoming appointments.' : 'You have not made any bookings yet.'}
            </p>
            <Link
              href="/"
              className="inline-block mt-4 px-6 py-3 bg-[#1a5f7a] text-white rounded-xl text-sm font-semibold hover:bg-[#155068] transition-colors"
            >
              Book an Appointment
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {displayed.map((b) => (
              <div
                key={b.id}
                className={`bg-white rounded-2xl border p-5 shadow-sm ${
                  b.status === 'cancelled' ? 'border-gray-100 opacity-60' : 'border-gray-100'
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex gap-4">
                    {/* Date badge */}
                    <div className="bg-[#e8f4fd] rounded-xl px-3 py-2 text-center min-w-[56px]">
                      <p className="text-xs font-semibold text-[#1a5f7a]">
                        {b.date.split('-')[2]}
                      </p>
                      <p className="text-xs text-[#2980b9]">
                        {MONTH_NAMES[parseInt(b.date.split('-')[1]) - 1]}
                      </p>
                    </div>
                    <div>
                      <p className="font-bold text-gray-800">{b.treatmentName}</p>
                      <p className="text-sm text-gray-500 mt-0.5">{formatReadableDate(b.date)} · {b.time}</p>
                      <p className="text-xs text-gray-400 mt-1">Ref: {b.id}</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span
                      className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                        b.status === 'confirmed'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-gray-100 text-gray-500'
                      }`}
                    >
                      {b.status === 'confirmed' ? 'Confirmed' : 'Cancelled'}
                    </span>
                    {b.status === 'confirmed' && isUpcoming(b.date) && (
                      <button
                        onClick={() => setCancelId(b.id)}
                        className="text-xs text-red-500 hover:text-red-700 font-medium"
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </div>
                {b.notes && (
                  <p className="mt-3 text-xs text-gray-500 bg-gray-50 rounded-lg px-3 py-2">
                    <span className="font-medium">Notes:</span> {b.notes}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Cancel confirm modal */}
        {cancelId && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
            <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-xl">
              <h3 className="font-bold text-lg text-gray-800 mb-2">Cancel Appointment?</h3>
              <p className="text-gray-500 text-sm mb-6">
                Are you sure you want to cancel this appointment? This action cannot be undone.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setCancelId(null)}
                  className="flex-1 py-3 border-2 border-gray-200 rounded-xl font-semibold text-gray-600 hover:bg-gray-50 transition-colors"
                >
                  Keep It
                </button>
                <button
                  onClick={() => handleCancel(cancelId)}
                  className="flex-1 py-3 bg-red-500 text-white rounded-xl font-semibold hover:bg-red-600 transition-colors"
                >
                  Yes, Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        <footer className="text-center text-xs text-gray-400 mt-8 pb-4">
          <p>Sadiqi Medical Centre · Open 7 Days a Week</p>
        </footer>
      </main>
    </div>
  );
}
