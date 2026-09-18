import type { Metadata } from 'next';
import { Inter, Tajawal } from 'next/font/google';
import './globals.css';
import './home.css';
import '@/components/tracks/tracks.css';
import { LanguageProvider } from '@/context/LanguageContext';

import { TopBar } from '@/components/layout/TopBar';
import { MainNavbar } from '@/components/layout/MainNavbar';
import { MobileBottomNav } from '@/components/layout/MobileBottomNav';
import { Footer } from '@/components/layout/Footer';

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-inter',
  display: 'swap',
});

const tajawal = Tajawal({
  subsets: ['arabic'],
  weight: ['400', '500', '700', '800'],
  variable: '--font-tajawal',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'TOT Academy - Comprehensive Platform',
  description:
    'Comprehensive training of trainers platform featuring classes, educational paths, events, specializations, trainers directory, and magazine.',
  openGraph: {
    title: 'TOT Academy - Comprehensive Platform',
    description:
      'Comprehensive training of trainers platform featuring classes, educational paths, events, specializations, trainers directory, and magazine.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl" className={`${inter.variable} ${tajawal.variable}`} suppressHydrationWarning>
      <body className="min-h-screen flex flex-col bg-bg-page text-text-dark antialiased">
        <LanguageProvider>
          <TopBar />
          <div className="hidden lg:block w-[95%] max-w-7xl mx-auto px-4">
            <MainNavbar />
          </div>
          <main className="flex-1 w-full">{children}</main>
          <Footer />
          <MobileBottomNav />
        </LanguageProvider>
      </body>
    </html>
  );
}