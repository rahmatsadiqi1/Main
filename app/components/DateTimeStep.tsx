'use client';

import { useState, useEffect } from 'react';
import { TIME_SLOTS, Treatment } from '../types';
import { getBookedSlots } from '../lib/bookings';

function getNext30Days() {
  const days = [];
  const today = new Date();
  for (let i = 0; i < 30; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    days.push(d);
  }
  return days;
}

const DAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function formatDate(d: Date) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

export default function DateTimeStep({
  treatment,
  selectedDate,
  selectedTime,
  onDateSelect,
  onTimeSelect,
  onNext,
  onBack,
}: {
  treatment: Treatment;
  selectedDate: string;
  selectedTime: string;
  onDateSelect: (d: string) => void;
  onTimeSelect: (t: string) => void;
  onNext: () => void;
  onBack: () => void;
}) {
  const [bookedSlots, setBookedSlots] = useState<string[]>([]);
  const days = getNext30Days();

  useEffect(() => {
    if (selectedDate) {
      setBookedSlots(getBookedSlots(selectedDate));
    }
  }, [selectedDate]);

  return (
    <div>
      <h2 className="text-xl font-bold text-[#1a5f7a] mb-1">Choose Date & Time</h2>
      <p className="text-gray-500 text-sm mb-6">
        Booking for: <span className="font-medium text-gray-700">{treatment.name}</span> ({treatment.duration} min)
      </p>

      {/* Date picker */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-gray-600 mb-3">Select Date</h3>
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin">
          {days.map((d) => {
            const key = formatDate(d);
            const isSelected = key === selectedDate;
            return (
              <button
                key={key}
                onClick={() => { onDateSelect(key); onTimeSelect(''); }}
                className={`flex-shrink-0 flex flex-col items-center px-4 py-3 rounded-xl border-2 transition-all min-w-[70px] ${
                  isSelected
                    ? 'border-[#1a5f7a] bg-[#1a5f7a] text-white'
                    : 'border-gray-100 bg-white hover:border-[#1a5f7a]/40'
                }`}
              >
                <span className={`text-xs font-medium ${isSelected ? 'text-blue-200' : 'text-gray-400'}`}>
                  {DAY_NAMES[d.getDay()]}
                </span>
                <span className="text-lg font-bold my-0.5">{d.getDate()}</span>
                <span className={`text-xs ${isSelected ? 'text-blue-200' : 'text-gray-400'}`}>
                  {MONTH_NAMES[d.getMonth()]}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Time slots */}
      {selectedDate && (
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-gray-600 mb-3">Select Time</h3>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2">
            {TIME_SLOTS.map((slot) => {
              const booked = bookedSlots.includes(slot);
              const isSelected = slot === selectedTime;
              return (
                <button
                  key={slot}
                  onClick={() => !booked && onTimeSelect(slot)}
                  disabled={booked}
                  className={`py-2 px-3 rounded-lg text-sm font-medium border-2 transition-all ${
                    booked
                      ? 'border-gray-100 bg-gray-50 text-gray-300 cursor-not-allowed'
                      : isSelected
                      ? 'border-[#1a5f7a] bg-[#1a5f7a] text-white'
                      : 'border-gray-200 bg-white hover:border-[#1a5f7a]/50 text-gray-700'
                  }`}
                >
                  {slot}
                </button>
              );
            })}
          </div>
          <p className="text-xs text-gray-400 mt-2">Grey slots are already booked</p>
        </div>
      )}

      <div className="flex justify-between mt-6">
        <button onClick={onBack} className="px-6 py-3 border-2 border-gray-200 rounded-xl font-semibold text-gray-600 hover:bg-gray-50 transition-colors">
          ← Back
        </button>
        <button
          onClick={onNext}
          disabled={!selectedDate || !selectedTime}
          className="px-8 py-3 bg-[#1a5f7a] text-white rounded-xl font-semibold disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#155068] transition-colors"
        >
          Next: Your Details →
        </button>
      </div>
    </div>
  );
}
