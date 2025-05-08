import React from 'react';
import { cn } from '@/lib/utils';

const FormField = React.forwardRef(({
  className,
  ...props
}, ref) => {
  return (
    <div
      ref={ref}
      className={cn("space-y-1.5 mb-4", className)}
      {...props}
    />
  );
});

FormField.displayName = 'FormField';

const FormLabel = React.forwardRef(({
  className,
  ...props
}, ref) => {
  return (
    <label
      ref={ref}
      className={cn(
        "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
        className
      )}
      {...props}
    />
  );
});

FormLabel.displayName = 'FormLabel';

const FormDescription = React.forwardRef(({
  className,
  ...props
}, ref) => {
  return (
    <p
      ref={ref}
      className={cn("text-xs text-gray-500 mt-1", className)}
      {...props}
    />
  );
});

FormDescription.displayName = 'FormDescription';

const FormMessage = React.forwardRef(({
  className,
  children,
  ...props
}, ref) => {
  return (
    <p
      ref={ref}
      className={cn("text-sm font-medium text-red-500 mt-1", className)}
      {...props}
    >
      {children}
    </p>
  );
});

FormMessage.displayName = 'FormMessage';

export {
  FormField,
  FormLabel,
  FormDescription,
  FormMessage,
};