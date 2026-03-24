import * as React from 'react';
import { cn } from '../lib/cn';

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<'input'>>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'mxp-flex mxp-h-10 mxp-w-full mxp-rounded-md mxp-border mxp-border-input mxp-bg-background mxp-px-3 mxp-py-2 mxp-text-sm mxp-ring-offset-background file:mxp-border-0 file:mxp-bg-transparent file:mxp-text-sm file:mxp-font-medium placeholder:mxp-text-muted-foreground focus-visible:mxp-outline-none focus-visible:mxp-ring-2 focus-visible:mxp-ring-ring focus-visible:mxp-ring-offset-2 disabled:mxp-cursor-not-allowed disabled:mxp-opacity-50',
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = 'Input';

export { Input };
