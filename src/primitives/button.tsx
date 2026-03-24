import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../lib/cn';

const buttonVariants = cva(
  'mxp-inline-flex mxp-items-center mxp-justify-center mxp-gap-2 mxp-whitespace-nowrap mxp-rounded-md mxp-text-sm mxp-font-medium mxp-ring-offset-background mxp-transition-colors focus-visible:mxp-outline-none focus-visible:mxp-ring-2 focus-visible:mxp-ring-ring focus-visible:mxp-ring-offset-2 disabled:mxp-pointer-events-none disabled:mxp-opacity-50 [&_svg]:mxp-pointer-events-none [&_svg]:mxp-size-4 [&_svg]:mxp-shrink-0',
  {
    variants: {
      variant: {
        default: 'mxp-bg-primary mxp-text-primary-foreground hover:mxp-bg-primary/90',
        destructive: 'mxp-bg-destructive mxp-text-destructive-foreground hover:mxp-bg-destructive/90',
        outline: 'mxp-border mxp-border-input mxp-bg-background hover:mxp-bg-accent hover:mxp-text-accent-foreground',
        secondary: 'mxp-bg-secondary mxp-text-secondary-foreground hover:mxp-bg-secondary/80',
        ghost: 'hover:mxp-bg-accent hover:mxp-text-accent-foreground',
        link: 'mxp-text-primary mxp-underline-offset-4 hover:mxp-underline',
      },
      size: {
        default: 'mxp-h-10 mxp-px-4 mxp-py-2',
        sm: 'mxp-h-9 mxp-rounded-md mxp-px-3',
        lg: 'mxp-h-11 mxp-rounded-md mxp-px-8',
        icon: 'mxp-h-10 mxp-w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
