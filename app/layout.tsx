import type { Metadata } from 'next';
import './globals.css';
import { AppProvider } from '@/lib/data/store';
import { ShellLayout } from '@/components/navigation/ShellLayout';

export const metadata: Metadata = {
  title: 'CampusLife — Your College Life. All In One Place.',
  description: 'An all-in-one digital platform for college students: attendance simulator, academics, timetable, community, placements, and college life timeline.',
  manifest: '/manifest.json',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no',
  themeColor: '#4F46E5',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-50 text-slate-900 antialiased selection:bg-indigo-500 selection:text-white">
        <AppProvider>
          <ShellLayout>
            {children}
          </ShellLayout>
        </AppProvider>
      </body>
    </html>
  );
}
