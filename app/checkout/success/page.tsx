'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function SuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');

  return (
    <div className="max-w-lg mx-auto px-4 py-20 text-center">
      {/* Checkmark */}
      <div className="w-20 h-20 bg-mcg-teal rounded-full flex items-center justify-center mx-auto mb-8">
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <polyline points="20 6 9 17 4 12"/>
        </svg>
      </div>

      <h1 className="text-3xl font-bold text-mcg-charcoal mb-3">Order Confirmed!</h1>
      <p className="text-gray-600 mb-2">
        Thank you for your purchase. Your MCG merchandise is on its way!
      </p>
      {sessionId && (
        <p className="text-sm text-gray-400 mb-8">
          Order reference: {sessionId.slice(0, 20)}...
        </p>
      )}

      <Link
        href="/shop"
        className="inline-block bg-mcg-orange text-white px-8 py-3 rounded-full font-semibold hover:bg-orange-600 transition-colors"
      >
        Continue Shopping
      </Link>
    </div>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={
      <div className="max-w-lg mx-auto px-4 py-20 text-center">
        <p className="text-gray-500">Loading order details...</p>
      </div>
    }>
      <SuccessContent />
    </Suspense>
  );
}
