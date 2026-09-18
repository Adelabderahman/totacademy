'use client';

import React from 'react';
import HeroSection from '@/components/home/HeroSection';
import VmoMobileSection from '@/components/home/VmoMobileSection';
import Part1Essentials from '@/components/home/Part1Essentials';
import Part2Specialists from '@/components/home/Part2Specialists';
import Part3Trainers from '@/components/home/Part3Trainers';
import Part4Registration from '@/components/home/Part4Registration';
import Part5Certificates from '@/components/home/Part5Certificates';
import Part6Partners from '@/components/home/Part6Partners';
import Part7FAQ from '@/components/home/Part7FAQ';
import BackToTop from '@/components/home/BackToTop';

export default function HomePage() {
  return (
    <main className="w-full max-w-[1380px] mx-auto px-2 sm:px-4 pt-4 md:pt-6 pb-20 lg:pb-8">
      {/* 1. Hero Section (Includes Desktop VMO) */}
      <HeroSection />

      {/* 2. Mobile VMO Section (Only visible on mobile/tablet) */}
      <VmoMobileSection />

      {/* 3. Part 1: Essentials */}
      <Part1Essentials />

      {/* 4. Part 2: Specialists */}
      <Part2Specialists />

      {/* 5. Part 3: Elite Trainers */}
      <Part3Trainers />

      {/* 6. Part 4: Registration Portals */}
      <Part4Registration />

      {/* 7. Part 5: Certificates & Accreditations */}
      <Part5Certificates />

      {/* 8. Part 6: Success Partners */}
      <Part6Partners />

      {/* 9. Part 7: FAQ & Advisor + Fullscreen Modal */}
      <Part7FAQ />

      {/* 10. Floating Back to Top Button */}
      <BackToTop />
    </main>
  );
}
