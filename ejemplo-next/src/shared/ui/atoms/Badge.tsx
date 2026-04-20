interface BadgeProps {
  label: string;
  color?: string;
  variant?: 'solid' | 'outline';
}

export function Badge({ label, color = '#6b7280', variant = 'solid' }: BadgeProps) {
  const style =
    variant === 'solid'
      ? { backgroundColor: color, color: '#fff' }
      : { border: `1px solid ${color}`, color };

  return (
    <span
      style={style}
      className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium"
    >
      {label}
    </span>
  );
}
