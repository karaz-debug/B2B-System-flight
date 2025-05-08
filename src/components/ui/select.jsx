import React from 'react';
import { cn } from '@/lib/utils';

const Select = React.forwardRef(({
  className,
  children,
  ...props
}, ref) => {
  return (
    <select
      className={cn(
        "flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      ref={ref}
      {...props}
    >
      {children}
    </select>
  );
});

Select.displayName = 'Select';

const SelectOption = React.forwardRef(({
  className,
  ...props
}, ref) => {
  return (
    <option
      className={cn("", className)}
      ref={ref}
      {...props}
    />
  );
});

SelectOption.displayName = 'SelectOption';

export { Select, SelectOption };