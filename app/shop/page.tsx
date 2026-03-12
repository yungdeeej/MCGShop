'use client';

import { useState, useMemo } from 'react';
import { products } from '@/lib/products';
import { ProductGrid } from '@/components/ProductGrid';
import { Product } from '@/types';

const allCategories: Product['category'][] = ['Wearables', 'Clinical Wear', 'Keepsakes', 'Accessories', 'Bundles'];
const allPrograms: NonNullable<Product['program']>[] = ['Healthcare', 'Business', 'Architecture', 'Massage Therapy'];
const priceRanges = [
  { label: 'Under $35', min: 0, max: 35 },
  { label: '$35 – $65', min: 35, max: 65 },
  { label: '$65 – $100', min: 65, max: 100 },
  { label: 'Over $100', min: 100, max: Infinity },
];

type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'newest';

export default function ShopPage() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedPrograms, setSelectedPrograms] = useState<string[]>([]);
  const [selectedPriceRange, setSelectedPriceRange] = useState<number | null>(null);
  const [sort, setSort] = useState<SortOption>('featured');
  const [filtersOpen, setFiltersOpen] = useState(false);

  const toggleCategory = (cat: string) => {
    setSelectedCategories(prev =>
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );
  };

  const toggleProgram = (prog: string) => {
    setSelectedPrograms(prev =>
      prev.includes(prog) ? prev.filter(p => p !== prog) : [...prev, prog]
    );
  };

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (selectedCategories.length > 0) {
      result = result.filter(p => selectedCategories.includes(p.category));
    }
    if (selectedPrograms.length > 0) {
      result = result.filter(p => p.program && selectedPrograms.includes(p.program));
    }
    if (selectedPriceRange !== null) {
      const range = priceRanges[selectedPriceRange];
      result = result.filter(p => p.price >= range.min && p.price < range.max);
    }

    switch (sort) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        result.reverse();
        break;
      case 'featured':
      default:
        result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        break;
    }

    return result;
  }, [selectedCategories, selectedPrograms, selectedPriceRange, sort]);

  const FilterSidebar = () => (
    <div className="space-y-8">
      {/* Category */}
      <div>
        <h3 className="text-sm font-semibold uppercase tracking-wider mb-3">Category</h3>
        <div className="space-y-2">
          {allCategories.map(cat => (
            <label key={cat} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedCategories.includes(cat)}
                onChange={() => toggleCategory(cat)}
                className="rounded border-gray-300 text-mcg-orange focus:ring-mcg-orange"
              />
              <span className="text-sm">{cat}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Program */}
      <div>
        <h3 className="text-sm font-semibold uppercase tracking-wider mb-3">Program</h3>
        <div className="space-y-2">
          {allPrograms.map(prog => (
            <label key={prog} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedPrograms.includes(prog)}
                onChange={() => toggleProgram(prog)}
                className="rounded border-gray-300 text-mcg-orange focus:ring-mcg-orange"
              />
              <span className="text-sm">{prog}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price */}
      <div>
        <h3 className="text-sm font-semibold uppercase tracking-wider mb-3">Price</h3>
        <div className="space-y-2">
          {priceRanges.map((range, idx) => (
            <label key={range.label} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="price"
                checked={selectedPriceRange === idx}
                onChange={() => setSelectedPriceRange(selectedPriceRange === idx ? null : idx)}
                className="border-gray-300 text-mcg-orange focus:ring-mcg-orange"
              />
              <span className="text-sm">{range.label}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold">All Products</h1>
        <div className="flex items-center gap-4">
          {/* Mobile filter toggle */}
          <button
            onClick={() => setFiltersOpen(!filtersOpen)}
            className="lg:hidden text-sm font-medium text-mcg-charcoal border border-gray-300 px-4 py-2 rounded-lg hover:border-mcg-orange transition-colors"
            aria-label="Toggle filters"
          >
            Filters
          </button>
          {/* Sort */}
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortOption)}
            className="text-sm border border-gray-300 rounded-lg px-3 py-2 focus:ring-mcg-orange focus:border-mcg-orange"
            aria-label="Sort products"
          >
            <option value="featured">Featured</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="newest">Newest</option>
          </select>
        </div>
      </div>

      <div className="flex gap-10">
        {/* Desktop sidebar */}
        <aside className="hidden lg:block w-56 flex-shrink-0">
          <FilterSidebar />
        </aside>

        {/* Mobile filter drawer */}
        {filtersOpen && (
          <div className="lg:hidden fixed inset-0 z-50 bg-black/40" onClick={() => setFiltersOpen(false)}>
            <div className="absolute left-0 top-0 h-full w-72 bg-white p-6 overflow-y-auto" onClick={e => e.stopPropagation()}>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold">Filters</h2>
                <button onClick={() => setFiltersOpen(false)} aria-label="Close filters" className="text-gray-400 hover:text-mcg-charcoal">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                  </svg>
                </button>
              </div>
              <FilterSidebar />
            </div>
          </div>
        )}

        {/* Product grid */}
        <div className="flex-1">
          {filteredProducts.length === 0 ? (
            <p className="text-center text-gray-500 py-20">No products match your filters.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map(product => (
                <div key={product.id}>
                  <ProductGrid products={[product]} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
