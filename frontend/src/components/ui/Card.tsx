import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  shadow?: 'none' | 'sm' | 'md' | 'lg' | 'glow';
  bordered?: boolean;
  hoverable?: boolean;
  onClick?: () => void;
  as?: React.ElementType;
}

const paddingMap = {
  none: 'p-0',
  sm: 'p-3',
  md: 'p-5',
  lg: 'p-7',
  xl: 'p-10',
};

const shadowMap = {
  none: '',
  sm: 'shadow-sm',
  md: 'shadow-md',
  lg: 'shadow-lg shadow-black/40',
  glow: 'shadow-lg shadow-indigo-500/10',
};

const Card: React.FC<CardProps> = ({
  children,
  className = '',
  padding = 'md',
  shadow = 'md',
  bordered = true,
  hoverable = false,
  onClick,
  as: Tag = 'div',
}) => {
  const base = 'rounded-2xl transition-all duration-200';
  const bg = 'bg-[#1c1c1f]';
  const border = bordered ? 'border border-[#2e2e33]' : '';
  const hover = hoverable
    ? 'hover:border-[#6366f1]/50 hover:shadow-xl hover:shadow-indigo-500/10 hover:-translate-y-0.5 cursor-pointer'
    : '';
  const clickable = onClick ? 'cursor-pointer' : '';

  const classes = [base, bg, border, paddingMap[padding], shadowMap[shadow], hover, clickable, className]
    .filter(Boolean)
    .join(' ');

  return (
    <Tag className={classes} onClick={onClick}>
      {children}
    </Tag>
  );
};

interface CardHeaderProps {
  children: React.ReactNode;
  className?: string;
  divider?: boolean;
}

export const CardHeader: React.FC<CardHeaderProps> = ({
  children,
  className = '',
  divider = false,
}) => {
  const base = 'mb-4';
  const border = divider ? 'pb-4 border-b border-[#2e2e33]' : '';
  return (
    <div className={[base, border, className].filter(Boolean).join(' ')}>
      {children}
    </div>
  );
};

interface CardTitleProps {
  children: React.ReactNode;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const CardTitle: React.FC<CardTitleProps> = ({
  children,
  className = '',
  size = 'md',
}) => {
  const sizeMap = {
    sm: 'text-sm font-semibold',
    md: 'text-base font-semibold',
    lg: 'text-lg font-bold',
  };
  return (
    <h3 className={['text-[#f4f4f5]', sizeMap[size], className].filter(Boolean).join(' ')}>
      {children}
    </h3>
  );
};

interface CardDescriptionProps {
  children: React.ReactNode;
  className?: string;
}

export const CardDescription: React.FC<CardDescriptionProps> = ({
  children,
  className = '',
}) => (
  <p className={['text-sm text-[#f4f4f5]/50 mt-1', className].filter(Boolean).join(' ')}>
    {children}
  </p>
);

interface CardBodyProps {
  children: React.ReactNode;
  className?: string;
}

export const CardBody: React.FC<CardBodyProps> = ({ children, className = '' }) => (
  <div className={['text-[#f4f4f5]/80 text-sm leading-relaxed', className].filter(Boolean).join(' ')}>
    {children}
  </div>
);

interface CardFooterProps {
  children: React.ReactNode;
  className?: string;
  divider?: boolean;
  align?: 'left' | 'center' | 'right' | 'between';
}

export const CardFooter: React.FC<CardFooterProps> = ({
  children,
  className = '',
  divider = false,
  align = 'right',
}) => {
  const alignMap = {
    left: 'justify-start',
    center: 'justify-center',
    right: 'justify-end',
    between: 'justify-between',
  };
  const border = divider ? 'mt-4 pt-4 border-t border-[#2e2e33]' : 'mt-4';
  return (
    <div className={['flex items-center gap-3', alignMap[align], border, className].filter(Boolean).join(' ')}>
      {children}
    </div>
  );
};

interface CardBadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'primary' | 'accent' | 'success' | 'warning' | 'danger';
  className?: string;
}

export const CardBadge: React.FC<CardBadgeProps> = ({
  children,
  variant = 'default',
  className = '',
}) => {
  const variantMap = {
    default: 'bg-[#2e2e33] text-[#f4f4f5]/70',
    primary: 'bg-[#6366f1]/15 text-[#6366f1] border border-[#6366f1]/30',
    accent: 'bg-[#a78bfa]/15 text-[#a78bfa] border border-[#a78bfa]/30',
    success: 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30',
    warning: 'bg-amber-500/15 text-amber-400 border border-amber-500/30',
    danger: 'bg-rose-500/15 text-rose-400 border border-rose-500/30',
  };
  return (
    <span className={['inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium', variantMap[variant], className].filter(Boolean).join(' ')}>
      {children}
    </span>
  );
};

interface CardImageProps {
  src: string;
  alt: string;
  className?: string;
  aspectRatio?: 'auto' | 'square' | 'video' | 'wide';
}

export const CardImage: React.FC<CardImageProps> = ({
  src,
  alt,
  className = '',
  aspectRatio = 'auto',
}) => {
  const ratioMap = {
    auto: '',
    square: 'aspect-square',
    video: 'aspect-video',
    wide: 'aspect-[21/9]',
  };
  return (
    <div className={['overflow-hidden rounded-xl -mx-5 -mt-5 mb-5', ratioMap[aspectRatio], className].filter(Boolean).join(' ')}>
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
      />
    </div>
  );
};

interface CardDividerProps {
  className?: string;
}

export const CardDivider: React.FC<CardDividerProps> = ({ className = '' }) => (
  <hr className={['border-none border-t border-[#2e2e33] my-4', className].filter(Boolean).join(' ')} />
);

interface CardGroupProps {
  children: React.ReactNode;
  className?: string;
  cols?: 1 | 2 | 3 | 4;
  gap?: 'sm' | 'md' | 'lg';
}

export const CardGroup: React.FC<CardGroupProps> = ({
  children,
  className = '',
  cols = 3,
  gap = 'md',
}) => {
  const colsMap = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
  };
  const gapMap = {
    sm: 'gap-3',
    md: 'gap-5',
    lg: 'gap-7',
  };
  return (
    <div className={['grid', colsMap[cols], gapMap[gap], className].filter(Boolean).join(' ')}>
      {children}
    </div>
  );
};

export default Card;