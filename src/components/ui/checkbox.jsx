import React from 'react';
import { cn } from '@/lib/utils';

const Checkbox = React.forwardRef(({
  className,
  checked,
  onChange,
  ...props
}, ref) => {
  return (
    <div className="flex items-center">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className={cn(
          "h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary",
          className
        )}
        ref={ref}
        {...props}
      />
    </div>
  );
});

Checkbox.displayName = 'Checkbox';

export { Checkbox };