import React, { createContext, useContext, useState } from 'react';
import { cn } from '@/lib/utils';

const TabsContext = createContext({
  selectedTab: null,
  setSelectedTab: () => {},
});

const Tabs = React.forwardRef(
  ({ className, defaultValue, children, ...props }, ref) => {
    const [selectedTab, setSelectedTab] = useState(defaultValue);

    return (
      <TabsContext.Provider value={{ selectedTab, setSelectedTab }}>
        <div 
          ref={ref} 
          className={cn('', className)} 
          {...props}
        >
          {children}
        </div>
      </TabsContext.Provider>
    );
  }
);

Tabs.displayName = 'Tabs';

const TabsList = React.forwardRef(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'inline-flex h-10 items-center justify-center rounded-md bg-gray-100 p-1',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

TabsList.displayName = 'TabsList';

const TabsTrigger = React.forwardRef(
  ({ className, value, children, ...props }, ref) => {
    const { selectedTab, setSelectedTab } = useContext(TabsContext);
    const isSelected = selectedTab === value;

    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium transition-all',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
          'disabled:pointer-events-none disabled:opacity-50',
          isSelected
            ? 'bg-white text-primary shadow-sm'
            : 'text-gray-600 hover:text-gray-900',
          className
        )}
        onClick={() => setSelectedTab(value)}
        {...props}
      >
        {children}
      </button>
    );
  }
);

TabsTrigger.displayName = 'TabsTrigger';

const TabsContent = React.forwardRef(
  ({ className, value, children, ...props }, ref) => {
    const { selectedTab } = useContext(TabsContext);
    const isSelected = selectedTab === value;

    if (!isSelected) return null;

    return (
      <div
        ref={ref}
        className={cn(
          'mt-2 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

TabsContent.displayName = 'TabsContent';

export { Tabs, TabsList, TabsTrigger, TabsContent };
