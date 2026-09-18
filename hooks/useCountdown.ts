'use client';

import { useState, useEffect } from 'react';

export interface CountdownResult {
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
  isEnded: boolean;
}

export function useCountdown(targetDate: string): CountdownResult {
  const [countdown, setCountdown] = useState<CountdownResult>(() => {
    const target = new Date(targetDate).getTime();
    const distance = target - Date.now();
    if (isNaN(target) || distance <= 0) {
      return { days: '00', hours: '00', minutes: '00', seconds: '00', isEnded: true };
    }
    const days = Math.floor(distance / 86400000);
    const hours = Math.floor((distance % 86400000) / 3600000);
    const minutes = Math.floor((distance % 3600000) / 60000);
    const seconds = Math.floor((distance % 60000) / 1000);

    return {
      days: String(days).padStart(2, '0'),
      hours: String(hours).padStart(2, '0'),
      minutes: String(minutes).padStart(2, '0'),
      seconds: String(seconds).padStart(2, '0'),
      isEnded: false,
    };
  });

  useEffect(() => {
    const target = new Date(targetDate).getTime();
    if (isNaN(target)) {
      setCountdown({ days: '00', hours: '00', minutes: '00', seconds: '00', isEnded: true });
      return;
    }

    const calculate = () => {
      const distance = target - Date.now();
      if (distance <= 0) {
        setCountdown({ days: '00', hours: '00', minutes: '00', seconds: '00', isEnded: true });
        return false;
      }

      const days = Math.floor(distance / 86400000);
      const hours = Math.floor((distance % 86400000) / 3600000);
      const minutes = Math.floor((distance % 3600000) / 60000);
      const seconds = Math.floor((distance % 60000) / 1000);

      setCountdown({
        days: String(days).padStart(2, '0'),
        hours: String(hours).padStart(2, '0'),
        minutes: String(minutes).padStart(2, '0'),
        seconds: String(seconds).padStart(2, '0'),
        isEnded: false,
      });
      return true;
    };

    calculate();
    const timer = setInterval(() => {
      const active = calculate();
      if (!active) {
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return countdown;
}
