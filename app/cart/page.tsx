'use client';

import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { ProductPlaceholder } from '@/components/ProductCard';

export default function CartPage() {
  const { items, removeItem, updateQuantity, subtotal, clearCart } = useCart();

  const shipping = subtotal >= 75 ? 0 : 9.99;
  const tax = subtotal * 0.05; // 5% GST
  const total = subtotal + shipping + tax;

  const handleCheckout = async () => {
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      }
    } catch {
      // Stripe not configured in dev
    }
  };

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <svg width="64" height="72" viewBox="0 0 32 36" fill="none" className="mx-auto mb-6 opacity-20" aria-hidden="true">
          <path d="M16 0L0 6V16.5C0 25.6 6.84 34.12 16 36C25.16 34.12 32 25.6 32 16.5V6L16 0Z" fill="#1A1A2E"/>
        </svg>
        <h1 className="text-2xl font-bold mb-2">Your cart is empty.</h1>
        <p className="text-gray-500 mb-6">Looks like you haven&apos;t added anything yet.</p>
        <Link
          href="/shop"
          className="inline-block bg-mcg-orange text-white px-8 py-3 rounded-full font-semibold hover:bg-orange-600 transition-colors"
        >
          Browse the Store
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Line Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div
              key={`${item.productId}-${item.size}-${item.color}`}
              className="flex gap-4 p-4 bg-white rounded-xl border border-gray-100"
            >
              <div className="w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden">
                <ProductPlaceholder name={item.name} size={96} />
              </div>
              <div className="flex-1 min-w-0">
                <Link href={`/products/${item.slug}`} className="font-medium hover:text-mcg-orange transition-colors">
                  {item.name}
                </Link>
                <p className="text-sm text-gray-500 mt-0.5">
                  {[item.size, item.color].filter(Boolean).join(' / ')}
                </p>
                <div className="flex items-center gap-3 mt-3">
                  <div className="flex items-center border border-gray-300 rounded-lg">
                    <button
                      onClick={() => updateQuantity(item.productId, item.quantity - 1, item.size, item.color)}
                      aria-label="Decrease quantity"
                      className="w-8 h-8 flex items-center justify-center text-sm hover:bg-gray-50"
                    >
                      −
                    </button>
                    <span className="w-8 h-8 flex items-center justify-center text-sm font-medium border-x border-gray-300">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.productId, item.quantity + 1, item.size, item.color)}
                      aria-label="Increase quantity"
                      className="w-8 h-8 flex items-center justify-center text-sm hover:bg-gray-50"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
              <div className="text-right flex flex-col justify-between">
                <button
                  onClick={() => removeItem(item.productId, item.size, item.color)}
                  aria-label={`Remove ${item.name}`}
                  className="text-gray-300 hover:text-red-500 transition-colors self-end"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                  </svg>
                </button>
                <p className="font-semibold text-mcg-charcoal">${(item.price * item.quantity).toFixed(2)}</p>
              </div>
            </div>
          ))}
          <button
            onClick={clearCart}
            className="text-sm text-gray-400 hover:text-red-500 transition-colors"
          >
            Clear Cart
          </button>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-gray-50 rounded-xl p-6 sticky top-24">
            <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span className="font-medium">
                  {shipping === 0 ? (
                    <span className="text-mcg-teal">Free</span>
                  ) : (
                    `$${shipping.toFixed(2)}`
                  )}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">GST (5%)</span>
                <span className="font-medium">${tax.toFixed(2)}</span>
              </div>
              <hr className="my-2" />
              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span>${total.toFixed(2)} CAD</span>
              </div>
            </div>
            {subtotal < 75 && (
              <p className="text-xs text-mcg-teal mt-3">
                Add ${(75 - subtotal).toFixed(2)} more for free shipping!
              </p>
            )}
            <button
              onClick={handleCheckout}
              className="w-full mt-6 bg-mcg-orange text-white py-3.5 rounded-full font-semibold hover:bg-orange-600 transition-colors"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
