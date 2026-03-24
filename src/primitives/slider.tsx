import * as React from 'react';
import * as SliderPrimitive from '@radix-ui/react-slider';
import { cn } from '../lib/cn';

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn('mxp-relative mxp-flex mxp-w-full mxp-touch-none mxp-select-none mxp-items-center', className)}
    {...props}
  >
    <SliderPrimitive.Track className="mxp-relative mxp-h-2 mxp-w-full mxp-grow mxp-overflow-hidden mxp-rounded-full mxp-bg-secondary">
      <SliderPrimitive.Range className="mxp-absolute mxp-h-full mxp-bg-primary" />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb className="mxp-block mxp-h-5 mxp-w-5 mxp-rounded-full mxp-border-2 mxp-border-primary mxp-bg-background mxp-ring-offset-background mxp-transition-colors focus-visible:mxp-outline-none focus-visible:mxp-ring-2 focus-visible:mxp-ring-ring focus-visible:mxp-ring-offset-2 disabled:mxp-pointer-events-none disabled:mxp-opacity-50" />
  </SliderPrimitive.Root>
));
Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };
