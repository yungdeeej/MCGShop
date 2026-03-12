'use client';

const colorMap: Record<string, string> = {
  Charcoal: '#333333',
  Orange: '#E8751A',
  Navy: '#1A1A4E',
  White: '#FFFFFF',
  Teal: '#2AAA8A',
  Natural: '#F5F0E8',
  'Black/Gold': '#1A1A1A',
  'Navy/Silver': '#1A1A4E',
};

interface ColorSwatchProps {
  colors: string[];
  selected: string;
  onChange: (color: string) => void;
}

export function ColorSwatch({ colors, selected, onChange }: ColorSwatchProps) {
  return (
    <div className="flex gap-3">
      {colors.map((color) => (
        <button
          key={color}
          onClick={() => onChange(color)}
          className={`w-7 h-7 rounded-full transition-all ${
            selected === color
              ? 'ring-2 ring-offset-2 ring-mcg-orange'
              : 'ring-1 ring-gray-300 hover:ring-gray-400'
          }`}
          style={{ backgroundColor: colorMap[color] || '#cccccc' }}
          aria-label={`Select color ${color}`}
          aria-pressed={selected === color}
          title={color}
        />
      ))}
    </div>
  );
}
