import React from 'react';
import { cn } from '@/lib/utils';

const Card = ({ className, ...props }) => {
  return (
    <div
      className={cn("bg-white rounded-lg border border-gray-200 shadow-sm", className)}
      {...props}
    />
  );
};

const CardHeader = ({ className, ...props }) => {
  return (
    <div
      className={cn("flex flex-col space-y-1.5 p-6", className)}
      {...props}
    />
  );
};

const CardTitle = ({ className, ...props }) => {
  return (
    <h3
      className={cn("font-semibold text-lg text-gray-900", className)}
      {...props}
    />
  );
};

const CardDescription = ({ className, ...props }) => {
  return (
    <p
      className={cn("text-sm text-gray-500", className)}
      {...props}
    />
  );
};

const CardContent = ({ className, ...props }) => {
  return (
    <div
      className={cn("p-6 pt-0", className)}
      {...props}
    />
  );
};

const CardFooter = ({ className, ...props }) => {
  return (
    <div
      className={cn("flex items-center p-6 pt-0", className)}
      {...props}
    />
  );
};

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter };