import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '../lib/cn';

const Empty = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    data-slot="empty"
    className={cn(
      'mxp-flex mxp-flex-col mxp-items-center mxp-justify-center mxp-gap-4 mxp-p-8 mxp-text-center',
      className
    )}
    {...props}
  />
));
Empty.displayName = 'Empty';

const emptyMediaVariants = cva(
  'mxp-flex mxp-items-center mxp-justify-center mxp-text-muted-foreground',
  {
    variants: {
      variant: {
        default: 'mxp-size-12',
        icon: 'mxp-size-10 mxp-rounded-full mxp-bg-muted mxp-p-2.5',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

const EmptyMedia = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof emptyMediaVariants>
>(({ className, variant, ...props }, ref) => (
  <div
    ref={ref}
    data-slot="empty-media"
    className={cn(emptyMediaVariants({ variant }), className)}
    {...props}
  />
));
EmptyMedia.displayName = 'EmptyMedia';

const EmptyHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    data-slot="empty-header"
    className={cn('mxp-flex mxp-flex-col mxp-items-center mxp-gap-1', className)}
    {...props}
  />
));
EmptyHeader.displayName = 'EmptyHeader';

const EmptyTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    data-slot="empty-title"
    className={cn('mxp-text-lg mxp-font-semibold mxp-tracking-tight', className)}
    {...props}
  />
));
EmptyTitle.displayName = 'EmptyTitle';

const EmptyDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    data-slot="empty-description"
    className={cn('mxp-text-sm mxp-text-muted-foreground', className)}
    {...props}
  />
));
EmptyDescription.displayName = 'EmptyDescription';

const EmptyContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    data-slot="empty-content"
    className={cn('mxp-flex mxp-flex-col mxp-items-center mxp-gap-2', className)}
    {...props}
  />
));
EmptyContent.displayName = 'EmptyContent';

export { Empty, EmptyMedia, EmptyHeader, EmptyTitle, EmptyDescription, EmptyContent };
