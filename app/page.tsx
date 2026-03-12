'use client';

import Link from 'next/link';
import { products } from '@/lib/products';
import { ProductGrid } from '@/components/ProductGrid';

const categories = [
  {
    name: 'Wearables',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M20.38 3.46L16 2 12 5 8 2 3.62 3.46A2 2 0 002 5.4V21a1 1 0 001 1h18a1 1 0 001-1V5.4a2 2 0 00-1.62-1.94z"/>
      </svg>
    ),
  },
  {
    name: 'Clinical Wear',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
      </svg>
    ),
  },
  {
    name: 'Keepsakes',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
        <circle cx="8.5" cy="8.5" r="1.5"/>
        <path d="M21 15l-5-5L5 21"/>
      </svg>
    ),
  },
  {
    name: 'Accessories',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
        <circle cx="12" cy="7" r="4"/>
      </svg>
    ),
  },
  {
    name: 'Graduation',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
        <path d="M6 12v5c0 2 3 3 6 3s6-1 6-3v-5"/>
      </svg>
    ),
    href: '/graduation',
  },
];

function StarIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="#E8751A" aria-hidden="true">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
    </svg>
  );
}

export default function HomePage() {
  const featuredProducts = products.filter(p => p.featured);

  return (
    <>
      {/* Hero */}
      <section className="bg-mcg-charcoal text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-36">
          <div className="max-w-2xl">
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold leading-tight">
              Wear Your{' '}
              <span className="relative">
                Achievement
                <span className="absolute -bottom-2 left-0 right-0 h-1.5 bg-mcg-orange rounded-full" />
              </span>
              .
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-gray-300">
              Official MCG Career College Merchandise
            </p>
            <Link
              href="/shop"
              className="inline-block mt-8 bg-mcg-orange text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-orange-600 transition-colors"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </section>

      {/* Category Row */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {categories.map((cat) => (
            <Link
              key={cat.name}
              href={cat.href || `/shop?category=${encodeURIComponent(cat.name)}`}
              className="group flex flex-col items-center gap-3 p-6 bg-white rounded-xl border border-gray-100 hover:shadow-lg hover:border-b-4 hover:border-b-mcg-orange transition-all"
            >
              <div className="text-mcg-charcoal group-hover:text-mcg-orange transition-colors">
                {cat.icon}
              </div>
              <span className="text-sm font-semibold text-mcg-charcoal">{cat.name}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-10">Featured Products</h2>
        <ProductGrid products={featuredProducts} />
      </section>

      {/* Social Proof */}
      <section className="bg-gray-50 py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center gap-1 mb-3">
            {[...Array(5)].map((_, i) => (
              <StarIcon key={i} />
            ))}
          </div>
          <p className="text-xl sm:text-2xl font-semibold text-mcg-charcoal">
            Worn by 1,200+ MCG Graduates
          </p>
        </div>
      </section>
    </>
  );
}
