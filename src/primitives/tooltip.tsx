import * as React from 'react';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import { cn } from '../lib/cn';

const TooltipProvider = TooltipPrimitive.Provider;
const Tooltip = TooltipPrimitive.Root;
const TooltipTrigger = TooltipPrimitive.Trigger;

const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <TooltipPrimitive.Content
    ref={ref}
    sideOffset={sideOffset}
    className={cn(
      'mxp-z-50 mxp-overflow-hidden mxp-rounded-md mxp-border mxp-bg-popover mxp-px-3 mxp-py-1.5 mxp-text-sm mxp-text-popover-foreground mxp-shadow-md mxp-animate-in mxp-fade-in-0 mxp-zoom-in-95 data-[state=closed]:mxp-animate-out data-[state=closed]:mxp-fade-out-0 data-[state=closed]:mxp-zoom-out-95 data-[side=bottom]:mxp-slide-in-from-top-2 data-[side=left]:mxp-slide-in-from-right-2 data-[side=right]:mxp-slide-in-from-left-2 data-[side=top]:mxp-slide-in-from-bottom-2',
      className
    )}
    {...props}
  />
));
TooltipContent.displayName = TooltipPrimitive.Content.displayName;

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider };
