import React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'outlined';
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

const getVariantClasses = (variant: CardProps['variant']): string => {
  const variants = {
    default: 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700',
    elevated: 'bg-white dark:bg-gray-800 shadow-soft hover:shadow-soft-lg border border-gray-100 dark:border-gray-700',
    outlined: 'bg-transparent border-2 border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500',
  };
  return variants[variant || 'default'];
};

const getPaddingClasses = (padding: CardProps['padding']): string => {
  const paddings = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };
  return paddings[padding || 'md'];
};

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className = '', variant = 'default', padding = 'md', children, ...props }, ref) => {
    const baseClasses = 'rounded-xl transition-all duration-200';
    const classes = `${baseClasses} ${getVariantClasses(variant)} ${getPaddingClasses(padding)} ${className}`;

    return (
      <div className={classes} ref={ref} {...props}>
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

export const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className = '', children, ...props }, ref) => {
    return (
      <div className={`flex flex-col space-y-1.5 ${className}`} ref={ref} {...props}>
        {children}
      </div>
    );
  }
);

CardHeader.displayName = 'CardHeader';

export const CardTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className = '', children, ...props }, ref) => {
    return (
      <h3 className={`text-lg font-semibold leading-none tracking-tight text-gray-900 dark:text-gray-100 ${className}`} ref={ref} {...props}>
        {children}
      </h3>
    );
  }
);

CardTitle.displayName = 'CardTitle';

export const CardDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className = '', children, ...props }, ref) => {
    return (
      <p className={`text-sm text-gray-600 dark:text-gray-400 ${className}`} ref={ref} {...props}>
        {children}
      </p>
    );
  }
);

CardDescription.displayName = 'CardDescription';

export const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className = '', children, ...props }, ref) => {
    return (
      <div className={`pt-0 ${className}`} ref={ref} {...props}>
        {children}
      </div>
    );
  }
);

CardContent.displayName = 'CardContent';

export const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className = '', children, ...props }, ref) => {
    return (
      <div className={`flex items-center pt-0 ${className}`} ref={ref} {...props}>
        {children}
      </div>
    );
  }
);

CardFooter.displayName = 'CardFooter';