import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../lib/cn';

const badgeVariants = cva(
  'mxp-inline-flex mxp-items-center mxp-rounded-full mxp-border mxp-px-2.5 mxp-py-0.5 mxp-text-xs mxp-font-semibold mxp-transition-colors focus:mxp-outline-none focus:mxp-ring-2 focus:mxp-ring-ring focus:mxp-ring-offset-2',
  {
    variants: {
      variant: {
        default: 'mxp-border-transparent mxp-bg-primary mxp-text-primary-foreground hover:mxp-bg-primary/80',
        secondary: 'mxp-border-transparent mxp-bg-secondary mxp-text-secondary-foreground hover:mxp-bg-secondary/80',
        destructive: 'mxp-border-transparent mxp-bg-destructive mxp-text-destructive-foreground hover:mxp-bg-destructive/80',
        outline: 'mxp-text-foreground',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
