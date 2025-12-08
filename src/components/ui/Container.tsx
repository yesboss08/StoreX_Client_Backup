import React from 'react';

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  center?: boolean;
}

const getSizeClasses = (size: ContainerProps['size']): string => {
  const sizes = {
    sm: 'max-w-2xl',
    md: 'max-w-4xl',
    lg: 'max-w-6xl',
    xl: 'max-w-7xl',
    full: 'max-w-full',
  };
  return sizes[size || 'lg'];
};

export const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ className = '', size = 'lg', center = true, children, ...props }, ref) => {
    const baseClasses = 'w-full px-4 sm:px-6 lg:px-8';
    const centerClasses = center ? 'mx-auto' : '';
    const classes = `${baseClasses} ${getSizeClasses(size)} ${centerClasses} ${className}`;

    return (
      <div className={classes} ref={ref} {...props}>
        {children}
      </div>
    );
  }
);

Container.displayName = 'Container';