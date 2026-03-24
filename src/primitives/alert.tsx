import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../lib/cn';

const alertVariants = cva(
  'mxp-relative mxp-w-full mxp-rounded-lg mxp-border mxp-p-4 [&>svg~*]:mxp-pl-7 [&>svg+div]:mxp-translate-y-[-3px] [&>svg]:mxp-absolute [&>svg]:mxp-left-4 [&>svg]:mxp-top-4 [&>svg]:mxp-text-foreground',
  {
    variants: {
      variant: {
        default: 'mxp-bg-background mxp-text-foreground',
        destructive: 'mxp-border-destructive/50 mxp-text-destructive dark:mxp-border-destructive [&>svg]:mxp-text-destructive',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

const Alert = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants>>(
  ({ className, variant, ...props }, ref) => (
    <div ref={ref} role="alert" className={cn(alertVariants({ variant }), className)} {...props} />
  )
);
Alert.displayName = 'Alert';

const AlertTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h5 ref={ref} className={cn('mxp-mb-1 mxp-font-medium mxp-leading-none mxp-tracking-tight', className)} {...props} />
  )
);
AlertTitle.displayName = 'AlertTitle';

const AlertDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('mxp-text-sm [&_p]:mxp-leading-relaxed', className)} {...props} />
  )
);
AlertDescription.displayName = 'AlertDescription';

export { Alert, AlertTitle, AlertDescription };
