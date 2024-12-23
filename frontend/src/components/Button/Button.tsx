import React from 'react';
import { LucideIcon } from 'lucide-react';

const mergeClasses = (...classes: (string | undefined)[]): string => {
  return classes.filter(Boolean).join(' ');
};

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';
type IconPosition = 'left' | 'right';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  icon?: LucideIcon;
  variant?: ButtonVariant;
  size?: ButtonSize;
  iconPosition?: IconPosition;
  className?: string;
}

const Button = ({
  children,
  icon: Icon,
  variant = 'primary',
  size = 'md',
  className,
  iconPosition = 'left',
  ...props
}: ButtonProps) => {
  const baseStyles =
    'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50';

  const variants: Record<ButtonVariant, string> = {
    primary:
      'bg-blue-600 text-white hover:bg-blue-700 focus-visible:ring-blue-600',
    secondary:
      'bg-gray-100 text-gray-900 hover:bg-gray-200 focus-visible:ring-gray-500',
    outline:
      'border border-gray-300 bg-transparent hover:bg-gray-100 focus-visible:ring-gray-500',
    ghost: 'hover:bg-gray-100 hover:text-gray-900 focus-visible:ring-gray-500',
  };

  const sizes: Record<ButtonSize, string> = {
    sm: 'h-8 px-3 text-sm',
    md: 'h-10 px-4 text-base',
    lg: 'h-12 px-6 text-lg',
  };

  const iconSizes: Record<ButtonSize, number> = {
    sm: 16,
    md: 20,
    lg: 24,
  };

  const iconSpacing: Record<ButtonSize, string> = {
    sm: 'gap-1.5',
    md: 'gap-2',
    lg: 'gap-3',
  };

  return (
    <button
      className={mergeClasses(
        baseStyles,
        variants[variant],
        sizes[size],
        iconSpacing[size],
        className
      )}
      {...props}
    >
      {Icon && iconPosition === 'left' && (
        <Icon size={iconSizes[size]} className={children ? '' : 'm-0'} />
      )}
      {children}
      {Icon && iconPosition === 'right' && (
        <Icon size={iconSizes[size]} className={children ? '' : 'm-0'} />
      )}
    </button>
  );
};

export default Button;
