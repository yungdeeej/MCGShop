'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { products } from '@/lib/products';
import { useCart } from '@/context/CartContext';
import { ProductPlaceholder } from '@/components/ProductCard';
import { SizeSelector } from '@/components/SizeSelector';
import { ColorSwatch } from '@/components/ColorSwatch';
import { Badge } from '@/components/Badge';
import { ProductGrid } from '@/components/ProductGrid';

const tabNames = ['Description', 'Size Guide', 'Care Instructions', 'Shipping & Returns'];
const tabStaticContent: Record<number, string> = {
  1: 'Our apparel follows standard North American sizing. S fits chest 34-36", M fits 38-40", L fits 42-44", XL fits 46-48", XXL fits 50-52". For a relaxed fit, we recommend sizing up. Clinical scrubs run true to size for ease of movement during practice.',
  2: 'Machine wash cold with like colors. Tumble dry low or hang dry for best results. Do not bleach. Iron on low if needed — avoid direct contact with printed areas. For clinical scrubs, wash after each use at 60°C for optimal hygiene.',
  3: 'Free shipping on all orders over $75 CAD within Canada. Standard shipping (5-7 business days) is $9.99. Express shipping available at checkout. Returns accepted within 30 days of delivery — items must be unworn with original tags attached. Graduation bundles are final sale.',
};

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const product = products.find(p => p.slug === slug);
  const { addItem } = useCart();

  const [selectedSize, setSelectedSize] = useState(product?.sizes?.[0] || '');
  const [selectedColor, setSelectedColor] = useState(product?.colors?.[0] || '');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState(0);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
        <Link href="/shop" className="text-mcg-orange font-medium hover:underline">
          Back to Shop
        </Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    addItem({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      price: product.price,
      quantity,
      size: selectedSize || undefined,
      color: selectedColor || undefined,
    });
  };

  const handleBuyNow = async () => {
    const items = [{
      productId: product.id,
      slug: product.slug,
      name: product.name,
      price: product.price,
      quantity,
      size: selectedSize || undefined,
      color: selectedColor || undefined,
    }];

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

  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-8" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-mcg-orange">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/shop" className="hover:text-mcg-orange">Shop</Link>
        <span className="mx-2">/</span>
        <span className="text-mcg-charcoal">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-14">
        {/* Left: Image — 60% */}
        <div className="lg:col-span-3">
          <div className="rounded-xl overflow-hidden">
            <ProductPlaceholder name={product.name} slug={product.slug} size={600} />
          </div>
          {/* Color thumbnails */}
          {product.colors && product.colors.length > 1 && (
            <div className="flex gap-3 mt-4">
              {product.colors.map(color => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`w-16 h-16 rounded-lg overflow-hidden border-2 ${
                    selectedColor === color ? 'border-mcg-orange' : 'border-transparent'
                  }`}
                  aria-label={`View ${color} variant`}
                >
                  <ProductPlaceholder name={color} slug={product.slug} size={64} />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Details — 40% */}
        <div className="lg:col-span-2">
          {product.program && (
            <div className="mb-3">
              <Badge program={product.program} />
            </div>
          )}

          <h1 className="text-2xl sm:text-3xl font-bold text-mcg-charcoal">{product.name}</h1>
          <p className="text-2xl font-bold text-mcg-orange mt-2">${product.price.toFixed(2)} CAD</p>
          <p className="text-gray-600 mt-4 leading-relaxed">{product.description}</p>

          {/* Color selector */}
          {product.colors && product.colors.length > 0 && (
            <div className="mt-6">
              <label className="text-sm font-medium text-mcg-charcoal block mb-2">
                Color: <span className="font-normal text-gray-500">{selectedColor}</span>
              </label>
              <ColorSwatch colors={product.colors} selected={selectedColor} onChange={setSelectedColor} />
            </div>
          )}

          {/* Size selector */}
          {product.sizes && product.sizes.length > 0 && product.sizes[0] !== 'One size' && (
            <div className="mt-6">
              <label className="text-sm font-medium text-mcg-charcoal block mb-2">
                Size: <span className="font-normal text-gray-500">{selectedSize}</span>
              </label>
              <SizeSelector sizes={product.sizes} selected={selectedSize} onChange={setSelectedSize} />
            </div>
          )}

          {/* Quantity */}
          <div className="mt-6">
            <label className="text-sm font-medium text-mcg-charcoal block mb-2">Quantity</label>
            <div className="flex items-center gap-0 border border-gray-300 rounded-lg w-fit">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-10 h-10 flex items-center justify-center text-lg hover:bg-gray-50 transition-colors"
                aria-label="Decrease quantity"
              >
                −
              </button>
              <span className="w-12 h-10 flex items-center justify-center text-sm font-medium border-x border-gray-300">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-10 h-10 flex items-center justify-center text-lg hover:bg-gray-50 transition-colors"
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>
          </div>

          {/* CTAs */}
          <div className="mt-8 space-y-3">
            <button
              onClick={handleAddToCart}
              className="w-full bg-mcg-orange text-white py-3.5 rounded-full font-semibold text-lg hover:bg-orange-600 transition-colors"
            >
              Add to Cart
            </button>
            <button
              onClick={handleBuyNow}
              className="w-full bg-mcg-teal text-white py-3.5 rounded-full font-semibold text-lg hover:bg-teal-600 transition-colors"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-16 border-t pt-10">
        <div className="flex gap-6 border-b overflow-x-auto">
          {tabNames.map((name, idx) => (
            <button
              key={name}
              onClick={() => setActiveTab(idx)}
              className={`pb-3 text-sm font-medium whitespace-nowrap transition-colors ${
                activeTab === idx
                  ? 'border-b-2 border-mcg-orange text-mcg-orange'
                  : 'text-gray-500 hover:text-mcg-charcoal'
              }`}
            >
              {name}
            </button>
          ))}
        </div>
        <div className="py-6 text-gray-600 leading-relaxed max-w-3xl">
          {activeTab === 0 ? product.description : tabStaticContent[activeTab]}
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-8">Related Products</h2>
          <ProductGrid products={relatedProducts} />
        </div>
      )}
    </div>
  );
}
