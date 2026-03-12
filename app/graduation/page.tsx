'use client';

import { useState, useEffect } from 'react';
import { products } from '@/lib/products';
import { ProductGrid } from '@/components/ProductGrid';

function useCountdown(targetDate: Date) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const diff = targetDate.getTime() - now;

      if (diff <= 0) {
        clearInterval(timer);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((diff % (1000 * 60)) / 1000),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return timeLeft;
}

export default function GraduationPage() {
  const gradProducts = products.filter(p => p.gradCollection);
  const ceremonyDate = new Date('2025-06-01T00:00:00');
  const countdown = useCountdown(ceremonyDate);

  return (
    <>
      {/* Hero */}
      <section className="bg-mcg-charcoal text-white py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold">
            <span className="gradient-text">Class of 2025</span>
          </h1>
          <p className="mt-4 text-xl sm:text-2xl text-gray-300">
            Celebrate Your Achievement in Style
          </p>

          {/* Countdown */}
          <div className="mt-10 flex items-center justify-center gap-4 sm:gap-8">
            {[
              { label: 'Days', value: countdown.days },
              { label: 'Hours', value: countdown.hours },
              { label: 'Minutes', value: countdown.minutes },
              { label: 'Seconds', value: countdown.seconds },
            ].map((unit) => (
              <div key={unit.label} className="text-center">
                <div className="bg-white/10 rounded-xl px-4 sm:px-6 py-3 sm:py-4">
                  <span className="text-3xl sm:text-4xl font-bold text-mcg-orange">
                    {String(unit.value).padStart(2, '0')}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-gray-400 mt-2 uppercase tracking-wider">{unit.label}</p>
              </div>
            ))}
          </div>

          <p className="mt-6 text-sm text-gray-400">
            SAIT Heritage Hall Ceremony — June 1, 2025
          </p>
        </div>
      </section>

      {/* Pre-order banner */}
      <div className="bg-mcg-orange text-white text-center py-3 px-4">
        <p className="text-sm font-semibold">
          Pre-orders close May 20 — Don&apos;t miss out
        </p>
      </div>

      {/* Grad Product Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-10">Graduation Collection</h2>
        <ProductGrid products={gradProducts} />
      </section>
    </>
  );
}
