import React, { useState } from 'react';
import { cn } from '@/lib/utils';

const DatePicker = React.forwardRef(
  ({ className, value, onChange, min, max, placeholder, ...props }, ref) => {
    const [focused, setFocused] = useState(false);

    return (
      <div className={cn('relative', className)}>
        <input
          type="date"
          className={cn(
            'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
            'disabled:cursor-not-allowed disabled:opacity-50',
            className
          )}
          ref={ref}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          min={min}
          max={max}
          {...props}
        />
        {!focused && !value && placeholder && (
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-gray-500 text-sm">
            {placeholder}
          </div>
        )}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 pointer-events-none"
        >
          <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
          <line x1="16" x2="16" y1="2" y2="6" />
          <line x1="8" x2="8" y1="2" y2="6" />
          <line x1="3" x2="21" y1="10" y2="10" />
        </svg>
      </div>
    );
  }
);

DatePicker.displayName = 'DatePicker';

export { DatePicker };
