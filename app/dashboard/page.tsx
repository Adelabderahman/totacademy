'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function DashboardRedirectPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/studio');
  }, [router]);

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center">
      <div className="w-10 h-10 border-4 border-primary-blue border-t-transparent rounded-full animate-spin mb-4" />
      <p className="text-slate-600 font-semibold">جاري التوجيه إلى لوحة التحكم...</p>
    </div>
  );
}
