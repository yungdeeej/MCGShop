'use client';

import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { ProductPlaceholder } from '@/components/ProductCard';

export function CartDrawer() {
  const { items, drawerOpen, setDrawerOpen, removeItem, updateQuantity, subtotal, itemCount } = useCart();

  return (
    <>
      {/* Backdrop */}
      {drawerOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-50 transition-opacity"
          onClick={() => setDrawerOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-white z-50 shadow-2xl transition-transform duration-300 ease-in-out ${
          drawerOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        role="dialog"
        aria-label="Shopping cart"
        aria-modal="true"
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b">
            <h2 className="text-lg font-semibold">Your Cart ({itemCount})</h2>
            <button
              onClick={() => setDrawerOpen(false)}
              aria-label="Close cart"
              className="text-gray-400 hover:text-mcg-charcoal transition-colors"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          </div>

          {/* Items */}
          <div className="flex-1 overflow-y-auto px-6 py-4">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <svg width="48" height="54" viewBox="0 0 32 36" fill="none" className="mb-4 opacity-30" aria-hidden="true">
                  <path d="M16 0L0 6V16.5C0 25.6 6.84 34.12 16 36C25.16 34.12 32 25.6 32 16.5V6L16 0Z" fill="#1A1A2E"/>
                </svg>
                <p className="text-gray-500 mb-4">Your cart is empty.</p>
                <Link
                  href="/shop"
                  onClick={() => setDrawerOpen(false)}
                  className="text-mcg-orange font-medium hover:underline"
                >
                  Browse the Store
                </Link>
              </div>
            ) : (
              <ul className="space-y-4">
                {items.map((item) => (
                  <li key={`${item.productId}-${item.size}-${item.color}`} className="flex gap-4">
                    <div className="w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden">
                      <ProductPlaceholder name={item.name} size={80} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{item.name}</p>
                      <p className="text-xs text-gray-500">
                        {[item.size, item.color].filter(Boolean).join(' / ')}
                      </p>
                      <p className="text-sm font-semibold text-mcg-orange mt-1">${(item.price * item.quantity).toFixed(2)}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <button
                          onClick={() => updateQuantity(item.productId, item.quantity - 1, item.size, item.color)}
                          aria-label="Decrease quantity"
                          className="w-6 h-6 rounded border border-gray-300 flex items-center justify-center text-sm hover:border-mcg-orange transition-colors"
                        >
                          -
                        </button>
                        <span className="text-sm w-6 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.productId, item.quantity + 1, item.size, item.color)}
                          aria-label="Increase quantity"
                          className="w-6 h-6 rounded border border-gray-300 flex items-center justify-center text-sm hover:border-mcg-orange transition-colors"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <button
                      onClick={() => removeItem(item.productId, item.size, item.color)}
                      aria-label={`Remove ${item.name} from cart`}
                      className="text-gray-300 hover:text-red-500 transition-colors self-start"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <line x1="18" y1="6" x2="6" y2="18"/>
                        <line x1="6" y1="6" x2="18" y2="18"/>
                      </svg>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="px-6 py-4 border-t">
              <div className="flex items-center justify-between mb-4">
                <span className="font-medium">Subtotal</span>
                <span className="font-semibold text-lg">${subtotal.toFixed(2)} CAD</span>
              </div>
              <Link
                href="/cart"
                onClick={() => setDrawerOpen(false)}
                className="block w-full bg-mcg-orange text-white text-center py-3 rounded-full font-semibold hover:bg-orange-600 transition-colors"
              >
                Checkout
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
