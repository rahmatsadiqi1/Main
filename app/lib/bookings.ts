import { Booking } from '../types';

const STORAGE_KEY = 'sadiqi_bookings';

export function getBookings(): Booking[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveBooking(booking: Booking): void {
  const bookings = getBookings();
  bookings.push(booking);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings));
}

export function cancelBooking(id: string): void {
  const bookings = getBookings();
  const updated = bookings.map((b) =>
    b.id === id ? { ...b, status: 'cancelled' as const } : b
  );
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
}

export function getBookedSlots(date: string): string[] {
  const bookings = getBookings();
  return bookings
    .filter((b) => b.date === date && b.status === 'confirmed')
    .map((b) => b.time);
}

export function generateId(): string {
  return `SMC-${Date.now()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;
}
