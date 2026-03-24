import * as React from 'react';
import * as ProgressPrimitive from '@radix-ui/react-progress';
import { cn } from '../lib/cn';

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
>(({ className, value, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn('mxp-relative mxp-h-4 mxp-w-full mxp-overflow-hidden mxp-rounded-full mxp-bg-secondary', className)}
    {...props}
  >
    <ProgressPrimitive.Indicator
      className="mxp-h-full mxp-w-full mxp-flex-1 mxp-bg-primary mxp-transition-all"
      style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
    />
  </ProgressPrimitive.Root>
));
Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress };
