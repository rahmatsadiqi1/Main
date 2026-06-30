'use client';

import { useState, useEffect } from 'react';
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
  return new Date(y, m - 1, d) >= new Date(new Date().toDateString());
}

type Filter = 'all' | 'upcoming' | 'confirmed' | 'cancelled';

export default function AdminPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [filter, setFilter] = useState<Filter>('all');
  const [search, setSearch] = useState('');
  const [cancelId, setCancelId] = useState<string | null>(null);

  useEffect(() => {
    setBookings(getBookings());
  }, []);

  const reload = () => setBookings(getBookings());

  const handleCancel = (id: string) => {
    cancelBooking(id);
    reload();
    setCancelId(null);
  };

  const filtered = bookings
    .filter((b) => {
      if (filter === 'upcoming') return isUpcoming(b.date) && b.status === 'confirmed';
      if (filter === 'confirmed') return b.status === 'confirmed';
      if (filter === 'cancelled') return b.status === 'cancelled';
      return true;
    })
    .filter((b) => {
      if (!search.trim()) return true;
      const s = search.toLowerCase();
      return (
        b.patientName.toLowerCase().includes(s) ||
        b.patientEmail.toLowerCase().includes(s) ||
        b.treatmentName.toLowerCase().includes(s) ||
        b.id.toLowerCase().includes(s)
      );
    })
    .sort((a, b) => a.date.localeCompare(b.date));

  const stats = {
    total: bookings.length,
    confirmed: bookings.filter((b) => b.status === 'confirmed').length,
    upcoming: bookings.filter((b) => isUpcoming(b.date) && b.status === 'confirmed').length,
    cancelled: bookings.filter((b) => b.status === 'cancelled').length,
  };

  const FILTERS: { key: Filter; label: string }[] = [
    { key: 'all', label: 'All' },
    { key: 'upcoming', label: 'Upcoming' },
    { key: 'confirmed', label: 'Confirmed' },
    { key: 'cancelled', label: 'Cancelled' },
  ];

  return (
    <div className="min-h-screen bg-[#f0f7ff]">
      <Header />

      <main className="max-w-5xl mx-auto px-4 py-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-[#1a5f7a]">Admin Dashboard</h2>
          <p className="text-gray-500 text-sm">All patient bookings for Sadiqi Medical Centre</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          {[
            { label: 'Total Bookings', value: stats.total, color: 'text-[#1a5f7a]', bg: 'bg-[#e8f4fd]' },
            { label: 'Confirmed', value: stats.confirmed, color: 'text-green-700', bg: 'bg-green-50' },
            { label: 'Upcoming', value: stats.upcoming, color: 'text-blue-700', bg: 'bg-blue-50' },
            { label: 'Cancelled', value: stats.cancelled, color: 'text-red-600', bg: 'bg-red-50' },
          ].map((s) => (
            <div key={s.label} className={`${s.bg} rounded-2xl p-4`}>
              <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
              <p className="text-xs text-gray-500 mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Search + Filter */}
        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, email, treatment or reference..."
            className="flex-1 border-2 border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#1a5f7a]"
          />
          <div className="flex gap-2">
            {FILTERS.map((f) => (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                className={`px-3 py-2 rounded-xl text-xs font-medium transition-colors ${
                  filter === f.key
                    ? 'bg-[#1a5f7a] text-white'
                    : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        {filtered.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center">
            <p className="text-gray-400 text-3xl mb-2">📋</p>
            <p className="text-gray-500 font-medium">No bookings found</p>
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100">
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Reference</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Patient</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Treatment</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Date & Time</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-4 py-3"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {filtered.map((b) => (
                    <tr key={b.id} className={`hover:bg-gray-50 transition-colors ${b.status === 'cancelled' ? 'opacity-50' : ''}`}>
                      <td className="px-4 py-3 font-mono text-xs text-gray-500">{b.id}</td>
                      <td className="px-4 py-3">
                        <p className="font-semibold text-gray-800">{b.patientName}</p>
                        <p className="text-xs text-gray-400">{b.patientEmail}</p>
                        <p className="text-xs text-gray-400">{b.patientPhone}</p>
                      </td>
                      <td className="px-4 py-3">
                        <p className="font-medium text-gray-700">{b.treatmentName}</p>
                        {b.notes && <p className="text-xs text-gray-400 mt-0.5 max-w-[180px] truncate" title={b.notes}>Note: {b.notes}</p>}
                      </td>
                      <td className="px-4 py-3">
                        <p className="font-medium text-gray-700">{formatReadableDate(b.date)}</p>
                        <p className="text-xs text-gray-400">{b.time}</p>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                          b.status === 'confirmed' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'
                        }`}>
                          {b.status === 'confirmed' ? 'Confirmed' : 'Cancelled'}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right">
                        {b.status === 'confirmed' && (
                          <button
                            onClick={() => setCancelId(b.id)}
                            className="text-xs text-red-400 hover:text-red-600 font-medium"
                          >
                            Cancel
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="px-4 py-3 border-t border-gray-100 text-xs text-gray-400">
              Showing {filtered.length} of {bookings.length} booking{bookings.length !== 1 ? 's' : ''}
            </div>
          </div>
        )}
      </main>

      {cancelId && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-xl">
            <h3 className="font-bold text-lg text-gray-800 mb-2">Cancel Appointment?</h3>
            <p className="text-gray-500 text-sm mb-6">This will cancel the booking and cannot be undone.</p>
            <div className="flex gap-3">
              <button onClick={() => setCancelId(null)} className="flex-1 py-3 border-2 border-gray-200 rounded-xl font-semibold text-gray-600 hover:bg-gray-50 transition-colors">
                Keep It
              </button>
              <button onClick={() => handleCancel(cancelId)} className="flex-1 py-3 bg-red-500 text-white rounded-xl font-semibold hover:bg-red-600 transition-colors">
                Cancel Booking
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
