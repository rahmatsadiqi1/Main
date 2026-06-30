'use client';

import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-[#1a5f7a] text-white shadow-lg">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-9 h-9 bg-white rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-[#1a5f7a] font-bold text-base">S</span>
          </div>
          <div className="min-w-0">
            <h1 className="font-bold text-sm sm:text-base leading-tight truncate">Sadiqi Medical Centre</h1>
            <p className="text-blue-200 text-xs hidden sm:block">Open 7 Days a Week</p>
          </div>
        </div>
        <nav className="flex items-center gap-3 sm:gap-5 text-sm flex-shrink-0">
          <Link href="/" className="hover:text-blue-200 transition-colors">Book</Link>
          <Link href="/my-bookings" className="hover:text-blue-200 transition-colors whitespace-nowrap">My Bookings</Link>
          <Link href="/admin" className="hover:text-blue-200 transition-colors text-blue-300">Admin</Link>
        </nav>
      </div>
    </header>
  );
}
