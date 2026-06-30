'use client';

import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-[#1a5f7a] text-white shadow-lg">
      <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
            <span className="text-[#1a5f7a] font-bold text-lg">S</span>
          </div>
          <div>
            <h1 className="font-bold text-lg leading-tight">Sadiqi Medical Centre</h1>
            <p className="text-blue-200 text-xs">Open 7 Days a Week</p>
          </div>
        </div>
        <nav className="flex gap-4 text-sm">
          <Link href="/" className="hover:text-blue-200 transition-colors">Book</Link>
          <Link href="/my-bookings" className="hover:text-blue-200 transition-colors">My Bookings</Link>
        </nav>
      </div>
    </header>
  );
}
