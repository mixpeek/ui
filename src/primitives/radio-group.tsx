import * as React from 'react';
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import { Circle } from 'lucide-react';

import { cn } from '../lib/cn';

const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Root
      className={cn('mxp-grid mxp-gap-2', className)}
      {...props}
      ref={ref}
    />
  );
});
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName;

const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Item
      ref={ref}
      className={cn(
        'mxp-aspect-square mxp-h-4 mxp-w-4 mxp-rounded-full mxp-border mxp-border-primary mxp-text-primary mxp-ring-offset-background focus:mxp-outline-none focus-visible:mxp-ring-2 focus-visible:mxp-ring-ring focus-visible:mxp-ring-offset-2 disabled:mxp-cursor-not-allowed disabled:mxp-opacity-50',
        className
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator className="mxp-flex mxp-items-center mxp-justify-center">
        <Circle className="mxp-h-2.5 mxp-w-2.5 mxp-fill-current mxp-text-current" />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  );
});
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName;

export { RadioGroup, RadioGroupItem };
