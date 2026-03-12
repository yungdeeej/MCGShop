import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-mcg-charcoal text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <svg width="28" height="32" viewBox="0 0 32 36" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M16 0L0 6V16.5C0 25.6 6.84 34.12 16 36C25.16 34.12 32 25.6 32 16.5V6L16 0Z" fill="#E8751A"/>
                <path d="M16 2L2 7.2V16.5C2 24.48 8.12 32.04 16 33.96C23.88 32.04 30 24.48 30 16.5V7.2L16 2Z" fill="#1A1A2E"/>
                <text x="16" y="22" textAnchor="middle" fill="white" fontSize="11" fontWeight="700" fontFamily="Inter, sans-serif">MCG</text>
              </svg>
              <span className="text-lg font-bold">MCG</span>
            </div>
            <p className="text-sm text-gray-400 mb-6">Developing Leaders, Supporting Community</p>
            <div className="flex gap-4">
              {/* Instagram */}
              <a href="#" aria-label="Follow us on Instagram" className="text-gray-400 hover:text-mcg-orange transition-colors">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                </svg>
              </a>
              {/* Facebook */}
              <a href="#" aria-label="Follow us on Facebook" className="text-gray-400 hover:text-mcg-orange transition-colors">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li><Link href="/shop" className="text-sm text-gray-400 hover:text-mcg-orange transition-colors">All Products</Link></li>
              <li><Link href="/graduation" className="text-sm text-gray-400 hover:text-mcg-orange transition-colors">Graduation Collection</Link></li>
              <li><Link href="/cart" className="text-sm text-gray-400 hover:text-mcg-orange transition-colors">Cart</Link></li>
            </ul>
          </div>

          {/* Programs */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">Programs</h3>
            <ul className="space-y-3">
              <li><span className="text-sm text-gray-400">Healthcare</span></li>
              <li><span className="text-sm text-gray-400">Business</span></li>
              <li><span className="text-sm text-gray-400">Architecture</span></li>
              <li><span className="text-sm text-gray-400">Massage Therapy</span></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">Contact</h3>
            <ul className="space-y-3">
              <li><span className="text-sm text-gray-400">info@mcgcollege.com</span></li>
              <li><span className="text-sm text-gray-400">Calgary, Alberta, Canada</span></li>
              <li><span className="text-sm text-gray-400">Mon – Fri: 9am – 5pm MST</span></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-12 pt-8 text-center">
          <p className="text-sm text-gray-500">&copy; 2025 MCG Career College. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
