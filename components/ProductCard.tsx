'use client';

import Link from 'next/link';
import { Product } from '@/types';
import { Badge } from '@/components/Badge';
import { useCart } from '@/context/CartContext';

const gradients: Record<string, string> = {
  'mcg-grad-hoodie': 'from-[#E8751A] to-[#1A1A2E]',
  'mcg-classic-tee': 'from-[#1A1A2E] to-[#2AAA8A]',
  'mcg-scrubs': 'from-[#2AAA8A] to-[#1A1A4E]',
  'mcg-diploma-frame': 'from-[#1A1A2E] to-[#E8751A]',
  'mcg-tumbler': 'from-[#E8751A] to-[#2AAA8A]',
  'mcg-grad-bundle': 'from-[#2AAA8A] to-[#E8751A]',
  'mcg-tote': 'from-[#1A1A2E] to-[#2AAA8A]',
  'mcg-backpack': 'from-[#1A1A2E] to-[#E8751A]',
};

export function ProductPlaceholder({ name, size = 300, slug }: { name: string; size?: number; slug?: string }) {
  const gradient = slug ? gradients[slug] || 'from-[#E8751A] to-[#1A1A2E]' : 'from-[#E8751A] to-[#1A1A2E]';

  return (
    <div
      className={`w-full aspect-square bg-gradient-to-br ${gradient} flex flex-col items-center justify-center p-4`}
      style={{ maxWidth: size, maxHeight: size }}
    >
      <svg width="32" height="36" viewBox="0 0 32 36" fill="none" className="mb-3 opacity-80" aria-hidden="true">
        <path d="M16 0L0 6V16.5C0 25.6 6.84 34.12 16 36C25.16 34.12 32 25.6 32 16.5V6L16 0Z" fill="rgba(255,255,255,0.2)"/>
        <path d="M16 2L2 7.2V16.5C2 24.48 8.12 32.04 16 33.96C23.88 32.04 30 24.48 30 16.5V7.2L16 2Z" fill="rgba(255,255,255,0.1)"/>
        <text x="16" y="22" textAnchor="middle" fill="white" fontSize="11" fontWeight="700" fontFamily="Inter, sans-serif">MCG</text>
      </svg>
      <p className="text-white text-center text-sm font-medium leading-tight">{name}</p>
    </div>
  );
}

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      price: product.price,
      quantity: 1,
      size: product.sizes?.[0],
      color: product.colors?.[0],
    });
  };

  return (
    <Link href={`/products/${product.slug}`} className="group block">
      <div className="rounded-xl overflow-hidden bg-gray-50 transition-all duration-200 group-hover:scale-[1.02] group-hover:shadow-lg">
        {/* Image */}
        <div className="relative aspect-square overflow-hidden">
          <ProductPlaceholder name={product.name} slug={product.slug} />
          {product.program && (
            <div className="absolute top-3 left-3">
              <Badge program={product.program} />
            </div>
          )}
          <button
            onClick={handleQuickAdd}
            className="absolute bottom-0 left-0 right-0 bg-mcg-orange text-white text-sm font-semibold py-3 opacity-0 group-hover:opacity-100 md:opacity-0 opacity-100 md:group-hover:opacity-100 transition-opacity"
            aria-label={`Add ${product.name} to cart`}
          >
            Add to Cart
          </button>
        </div>
        {/* Info */}
        <div className="p-4">
          <h3 className="text-sm font-medium text-mcg-charcoal truncate">{product.name}</h3>
          <p className="text-mcg-orange font-bold mt-1">${product.price.toFixed(2)}</p>
        </div>
      </div>
    </Link>
  );
}
