interface BadgeProps {
  program: string;
}

const badgeStyles: Record<string, string> = {
  Healthcare: 'bg-mcg-teal text-white',
  Business: 'bg-[#1A1A4E] text-white',
  Architecture: 'bg-mcg-charcoal text-white',
  'Massage Therapy': 'bg-mcg-orange text-white',
};

export function Badge({ program }: BadgeProps) {
  const style = badgeStyles[program] || 'bg-gray-500 text-white';

  return (
    <span className={`inline-block px-2.5 py-1 text-xs font-semibold rounded-md ${style}`}>
      {program}
    </span>
  );
}
