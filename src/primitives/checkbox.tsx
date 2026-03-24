import * as React from 'react';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { Check } from 'lucide-react';
import { cn } from '../lib/cn';

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      'mxp-peer mxp-h-4 mxp-w-4 mxp-shrink-0 mxp-rounded-sm mxp-border mxp-border-primary mxp-ring-offset-background focus-visible:mxp-outline-none focus-visible:mxp-ring-2 focus-visible:mxp-ring-ring focus-visible:mxp-ring-offset-2 disabled:mxp-cursor-not-allowed disabled:mxp-opacity-50 data-[state=checked]:mxp-bg-primary data-[state=checked]:mxp-text-primary-foreground',
      className
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator className={cn('mxp-flex mxp-items-center mxp-justify-center mxp-text-current')}>
      <Check className="mxp-h-4 mxp-w-4" />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
));
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };
