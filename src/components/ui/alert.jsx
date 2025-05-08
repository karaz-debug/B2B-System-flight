import React from 'react';
import { cn } from '@/lib/utils';

const Alert = React.forwardRef(({
  className,
  variant = 'default',
  ...props
}, ref) => {
  const variantStyles = {
    default: 'bg-gray-100 text-gray-800',
    destructive: 'bg-red-100 text-red-800',
    warning: 'bg-yellow-100 text-yellow-800',
    success: 'bg-green-100 text-green-800',
    info: 'bg-blue-100 text-blue-800',
  };

  return (
    <div
      ref={ref}
      role="alert"
      className={cn(
        "rounded-md p-4 mb-4 border",
        variant === 'default' && 'border-gray-200',
        variant === 'destructive' && 'border-red-200',
        variant === 'warning' && 'border-yellow-200',
        variant === 'success' && 'border-green-200', 
        variant === 'info' && 'border-blue-200',
        variantStyles[variant],
        className
      )}
      {...props}
    />
  );
});

Alert.displayName = 'Alert';

const AlertTitle = React.forwardRef(({
  className,
  ...props
}, ref) => (
  <h5
    ref={ref}
    className={cn("font-medium mb-1", className)}
    {...props}
  />
));

AlertTitle.displayName = 'AlertTitle';

const AlertDescription = React.forwardRef(({
  className,
  ...props
}, ref) => (
  <div
    ref={ref}
    className={cn("text-sm", className)}
    {...props}
  />
));

AlertDescription.displayName = 'AlertDescription';

export { Alert, AlertTitle, AlertDescription };