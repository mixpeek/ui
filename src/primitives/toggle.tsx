import * as React from 'react';
import * as TogglePrimitive from '@radix-ui/react-toggle';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '../lib/cn';

const toggleVariants = cva(
  'mxp-inline-flex mxp-items-center mxp-justify-center mxp-rounded-md mxp-text-sm mxp-font-medium mxp-ring-offset-background mxp-transition-colors hover:mxp-bg-muted hover:mxp-text-muted-foreground focus-visible:mxp-outline-none focus-visible:mxp-ring-2 focus-visible:mxp-ring-ring focus-visible:mxp-ring-offset-2 disabled:mxp-pointer-events-none disabled:mxp-opacity-50 data-[state=on]:mxp-bg-accent data-[state=on]:mxp-text-accent-foreground',
  {
    variants: {
      variant: {
        default: 'mxp-bg-transparent',
        outline:
          'mxp-border mxp-border-input mxp-bg-transparent hover:mxp-bg-accent hover:mxp-text-accent-foreground',
      },
      size: {
        default: 'mxp-h-10 mxp-px-3',
        sm: 'mxp-h-9 mxp-px-2.5',
        lg: 'mxp-h-11 mxp-px-5',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

const Toggle = React.forwardRef<
  React.ElementRef<typeof TogglePrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof TogglePrimitive.Root> &
    VariantProps<typeof toggleVariants>
>(({ className, variant, size, ...props }, ref) => (
  <TogglePrimitive.Root
    ref={ref}
    className={cn(toggleVariants({ variant, size, className }))}
    {...props}
  />
));

Toggle.displayName = TogglePrimitive.Root.displayName;

export { Toggle, toggleVariants };
