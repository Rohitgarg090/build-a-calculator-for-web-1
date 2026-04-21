import React from 'react';

type BadgeVariant = 'default' | 'success' | 'warning' | 'error' | 'primary';

interface BadgeProps {
  variant?: BadgeVariant;
  children: React.ReactNode;
  className?: string;
  dot?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const variantStyles: Record<BadgeVariant, { bg: string; text: string; border: string; dot: string }> = {
  default: {
    bg: 'rgba(46, 46, 51, 0.6)',
    text: '#a1a1aa',
    border: '#2e2e33',
    dot: '#71717a',
  },
  primary: {
    bg: 'rgba(99, 102, 241, 0.15)',
    text: '#a78bfa',
    border: 'rgba(99, 102, 241, 0.3)',
    dot: '#6366f1',
  },
  success: {
    bg: 'rgba(34, 197, 94, 0.12)',
    text: '#4ade80',
    border: 'rgba(34, 197, 94, 0.25)',
    dot: '#22c55e',
  },
  warning: {
    bg: 'rgba(245, 158, 11, 0.12)',
    text: '#fbbf24',
    border: 'rgba(245, 158, 11, 0.25)',
    dot: '#f59e0b',
  },
  error: {
    bg: 'rgba(239, 68, 68, 0.12)',
    text: '#f87171',
    border: 'rgba(239, 68, 68, 0.25)',
    dot: '#ef4444',
  },
};

const sizeStyles = {
  sm: {
    padding: '2px 8px',
    fontSize: '10px',
    dotSize: '5px',
    borderRadius: '4px',
    gap: '4px',
    fontWeight: '600',
    letterSpacing: '0.04em',
  },
  md: {
    padding: '3px 10px',
    fontSize: '11px',
    dotSize: '6px',
    borderRadius: '6px',
    gap: '5px',
    fontWeight: '600',
    letterSpacing: '0.04em',
  },
  lg: {
    padding: '5px 14px',
    fontSize: '13px',
    dotSize: '7px',
    borderRadius: '8px',
    gap: '6px',
    fontWeight: '600',
    letterSpacing: '0.03em',
  },
};

const Badge: React.FC<BadgeProps> = ({
  variant = 'default',
  children,
  className = '',
  dot = false,
  size = 'md',
}) => {
  const colors = variantStyles[variant];
  const sizing = sizeStyles[size];

  return (
    <span
      className={className}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: sizing.gap,
        padding: sizing.padding,
        fontSize: sizing.fontSize,
        fontWeight: sizing.fontWeight,
        letterSpacing: sizing.letterSpacing,
        lineHeight: '1.4',
        fontFamily: 'inherit',
        color: colors.text,
        backgroundColor: colors.bg,
        border: `1px solid ${colors.border}`,
        borderRadius: sizing.borderRadius,
        whiteSpace: 'nowrap',
        userSelect: 'none',
        verticalAlign: 'middle',
        textTransform: 'uppercase',
        transition: 'opacity 0.15s ease',
        backdropFilter: 'blur(4px)',
        WebkitBackdropFilter: 'blur(4px)',
      }}
    >
      {dot && (
        <span
          style={{
            display: 'inline-block',
            width: sizing.dotSize,
            height: sizing.dotSize,
            borderRadius: '50%',
            backgroundColor: colors.dot,
            flexShrink: 0,
            boxShadow: `0 0 6px ${colors.dot}`,
            animation: variant !== 'default' ? 'badgePulse 2s ease-in-out infinite' : 'none',
          }}
        />
      )}
      {children}
      <style>{`
        @keyframes badgePulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </span>
  );
};

export type { BadgeVariant, BadgeProps };
export default Badge;