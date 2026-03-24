import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '../lib/cn';
import { Separator } from './separator';

const buttonGroupVariants = cva(
  'mxp-inline-flex [&>button]:mxp-rounded-none [&>button]:mxp-border-0 [&>button]:mxp-shadow-none',
  {
    variants: {
      orientation: {
        horizontal:
          'mxp-flex-row mxp-rounded-md mxp-border [&>button:first-child]:mxp-rounded-l-md [&>button:last-child]:mxp-rounded-r-md',
        vertical:
          'mxp-flex-col mxp-rounded-md mxp-border [&>button:first-child]:mxp-rounded-t-md [&>button:last-child]:mxp-rounded-b-md',
      },
    },
    defaultVariants: {
      orientation: 'horizontal',
    },
  }
);

interface ButtonGroupProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof buttonGroupVariants> {}

const ButtonGroup = React.forwardRef<HTMLDivElement, ButtonGroupProps>(
  ({ className, orientation, ...props }, ref) => (
    <div
      ref={ref}
      role="group"
      data-slot="button-group"
      className={cn(buttonGroupVariants({ orientation }), className)}
      {...props}
    />
  )
);
ButtonGroup.displayName = 'ButtonGroup';

const ButtonGroupSeparator = React.forwardRef<
  React.ElementRef<typeof Separator>,
  React.ComponentPropsWithoutRef<typeof Separator>
>(({ className, orientation = 'vertical', ...props }, ref) => (
  <Separator
    ref={ref}
    data-slot="button-group-separator"
    orientation={orientation}
    className={cn(
      orientation === 'vertical' ? 'mxp-h-auto' : 'mxp-w-auto',
      className
    )}
    {...props}
  />
));
ButtonGroupSeparator.displayName = 'ButtonGroupSeparator';

const ButtonGroupText = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement>
>(({ className, ...props }, ref) => (
  <span
    ref={ref}
    data-slot="button-group-text"
    className={cn(
      'mxp-inline-flex mxp-items-center mxp-justify-center mxp-px-3 mxp-text-sm mxp-text-muted-foreground',
      className
    )}
    {...props}
  />
));
ButtonGroupText.displayName = 'ButtonGroupText';

export { ButtonGroup, ButtonGroupSeparator, ButtonGroupText, buttonGroupVariants };
