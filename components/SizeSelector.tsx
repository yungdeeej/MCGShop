'use client';

interface SizeSelectorProps {
  sizes: string[];
  selected: string;
  onChange: (size: string) => void;
}

export function SizeSelector({ sizes, selected, onChange }: SizeSelectorProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {sizes.map((size) => (
        <button
          key={size}
          onClick={() => onChange(size)}
          className={`h-9 min-w-[3rem] px-3 rounded-full text-sm font-medium transition-all ${
            selected === size
              ? 'bg-mcg-orange text-white'
              : 'bg-white text-mcg-charcoal border border-gray-300 hover:border-mcg-orange'
          }`}
          aria-label={`Select size ${size}`}
          aria-pressed={selected === size}
        >
          {size}
        </button>
      ))}
    </div>
  );
}
