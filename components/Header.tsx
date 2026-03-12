'use client';

import Link from 'next/link';
import { useCart } from '@/context/CartContext';

function MCGShield() {
  return (
    <svg width="32" height="36" viewBox="0 0 32 36" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M16 0L0 6V16.5C0 25.6 6.84 34.12 16 36C25.16 34.12 32 25.6 32 16.5V6L16 0Z" fill="#E8751A"/>
      <path d="M16 2L2 7.2V16.5C2 24.48 8.12 32.04 16 33.96C23.88 32.04 30 24.48 30 16.5V7.2L16 2Z" fill="#1A1A2E"/>
      <text x="16" y="22" textAnchor="middle" fill="white" fontSize="11" fontWeight="700" fontFamily="Inter, sans-serif">MCG</text>
    </svg>
  );
}

export function Header() {
  const { itemCount, setDrawerOpen } = useCart();

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <MCGShield />
            <span className="text-xl font-bold text-mcg-charcoal group-hover:text-mcg-orange transition-colors">
              MCG
            </span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-sm font-medium text-mcg-charcoal hover:text-mcg-orange transition-colors">
              Home
            </Link>
            <Link href="/shop" className="text-sm font-medium text-mcg-charcoal hover:text-mcg-orange transition-colors">
              Shop
            </Link>
            <Link href="/graduation" className="text-sm font-medium text-mcg-charcoal hover:text-mcg-orange transition-colors">
              Graduation
            </Link>
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-4">
            {/* Search icon */}
            <button aria-label="Search products" className="text-mcg-charcoal hover:text-mcg-orange transition-colors">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="11" cy="11" r="8"/>
                <path d="M21 21l-4.35-4.35"/>
              </svg>
            </button>

            {/* Cart icon */}
            <button
              aria-label={`Cart with ${itemCount} items`}
              onClick={() => setDrawerOpen(true)}
              className="relative text-mcg-charcoal hover:text-mcg-orange transition-colors"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
                <line x1="3" y1="6" x2="21" y2="6"/>
                <path d="M16 10a4 4 0 01-8 0"/>
              </svg>
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-mcg-orange text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </button>

            {/* Mobile menu button */}
            <Link href="/shop" className="md:hidden text-mcg-charcoal hover:text-mcg-orange transition-colors" aria-label="Menu">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="3" y1="12" x2="21" y2="12"/>
                <line x1="3" y1="6" x2="21" y2="6"/>
                <line x1="3" y1="18" x2="21" y2="18"/>
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
