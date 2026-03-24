import * as React from 'react';
import * as PopoverPrimitive from '@radix-ui/react-popover';
import { cn } from '../lib/cn';

const Popover = PopoverPrimitive.Root;
const PopoverTrigger = PopoverPrimitive.Trigger;

const PopoverContent = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>
>(({ className, align = 'center', sideOffset = 4, ...props }, ref) => (
  <PopoverPrimitive.Portal>
    <PopoverPrimitive.Content
      ref={ref}
      align={align}
      sideOffset={sideOffset}
      className={cn(
        'mxp-z-50 mxp-w-72 mxp-rounded-md mxp-border mxp-bg-popover mxp-p-4 mxp-text-popover-foreground mxp-shadow-md mxp-outline-none data-[state=open]:mxp-animate-in data-[state=closed]:mxp-animate-out data-[state=closed]:mxp-fade-out-0 data-[state=open]:mxp-fade-in-0 data-[state=closed]:mxp-zoom-out-95 data-[state=open]:mxp-zoom-in-95 data-[side=bottom]:mxp-slide-in-from-top-2 data-[side=left]:mxp-slide-in-from-right-2 data-[side=right]:mxp-slide-in-from-left-2 data-[side=top]:mxp-slide-in-from-bottom-2',
        className
      )}
      {...props}
    />
  </PopoverPrimitive.Portal>
));
PopoverContent.displayName = PopoverPrimitive.Content.displayName;

export { Popover, PopoverTrigger, PopoverContent };
