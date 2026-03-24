import * as React from 'react';
import * as SwitchPrimitives from '@radix-ui/react-switch';
import { cn } from '../lib/cn';

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({ className, ...props }, ref) => (
  <SwitchPrimitives.Root
    className={cn(
      'mxp-peer mxp-inline-flex mxp-h-[24px] mxp-w-[44px] mxp-shrink-0 mxp-cursor-pointer mxp-items-center mxp-rounded-full mxp-border-2 mxp-border-transparent mxp-transition-colors focus-visible:mxp-outline-none focus-visible:mxp-ring-2 focus-visible:mxp-ring-ring focus-visible:mxp-ring-offset-2 focus-visible:mxp-ring-offset-background disabled:mxp-cursor-not-allowed disabled:mxp-opacity-50 data-[state=checked]:mxp-bg-primary data-[state=unchecked]:mxp-bg-input',
      className
    )}
    {...props}
    ref={ref}
  >
    <SwitchPrimitives.Thumb
      className={cn(
        'mxp-pointer-events-none mxp-block mxp-h-5 mxp-w-5 mxp-rounded-full mxp-bg-background mxp-shadow-lg mxp-ring-0 mxp-transition-transform data-[state=checked]:mxp-translate-x-5 data-[state=unchecked]:mxp-translate-x-0'
      )}
    />
  </SwitchPrimitives.Root>
));
Switch.displayName = SwitchPrimitives.Root.displayName;

export { Switch };
