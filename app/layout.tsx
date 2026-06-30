import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Sadiqi Medical Centre – Book an Appointment',
  description: 'Book your appointment at Sadiqi Medical Centre. Available 7 days a week.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#f0f7ff]">{children}</body>
    </html>
  );
}
