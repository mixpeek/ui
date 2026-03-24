import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '../lib/cn';
import { Separator } from './separator';

const itemVariants = cva(
  'mxp-flex mxp-items-start mxp-gap-3 mxp-rounded-md mxp-p-3',
  {
    variants: {
      variant: {
        default: '',
        outline: 'mxp-border',
        muted: 'mxp-bg-muted/50',
      },
      size: {
        default: 'mxp-p-3',
        sm: 'mxp-p-2',
        xs: 'mxp-p-1.5 mxp-gap-2',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

interface ItemProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof itemVariants> {}

const Item = React.forwardRef<HTMLDivElement, ItemProps>(
  ({ className, variant, size, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="item"
      className={cn(itemVariants({ variant, size }), className)}
      {...props}
    />
  )
);
Item.displayName = 'Item';

const itemMediaVariants = cva(
  'mxp-flex mxp-shrink-0 mxp-items-center mxp-justify-center mxp-text-muted-foreground',
  {
    variants: {
      variant: {
        default: 'mxp-size-10',
        icon: 'mxp-size-8 mxp-rounded-md mxp-bg-muted mxp-p-1.5',
        image: 'mxp-size-10 mxp-overflow-hidden mxp-rounded-md',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

interface ItemMediaProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof itemMediaVariants> {}

const ItemMedia = React.forwardRef<HTMLDivElement, ItemMediaProps>(
  ({ className, variant, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="item-media"
      className={cn(itemMediaVariants({ variant }), className)}
      {...props}
    />
  )
);
ItemMedia.displayName = 'ItemMedia';

const ItemContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    data-slot="item-content"
    className={cn('mxp-flex mxp-min-w-0 mxp-flex-1 mxp-flex-col mxp-gap-0.5', className)}
    {...props}
  />
));
ItemContent.displayName = 'ItemContent';

const ItemHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    data-slot="item-header"
    className={cn('mxp-flex mxp-items-center mxp-gap-2', className)}
    {...props}
  />
));
ItemHeader.displayName = 'ItemHeader';

const ItemTitle = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    data-slot="item-title"
    className={cn('mxp-text-sm mxp-font-medium mxp-leading-none', className)}
    {...props}
  />
));
ItemTitle.displayName = 'ItemTitle';

const ItemDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    data-slot="item-description"
    className={cn('mxp-text-sm mxp-text-muted-foreground', className)}
    {...props}
  />
));
ItemDescription.displayName = 'ItemDescription';

const ItemFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    data-slot="item-footer"
    className={cn('mxp-flex mxp-items-center mxp-gap-2 mxp-pt-1', className)}
    {...props}
  />
));
ItemFooter.displayName = 'ItemFooter';

const ItemActions = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    data-slot="item-actions"
    className={cn('mxp-ml-auto mxp-flex mxp-shrink-0 mxp-items-center mxp-gap-1', className)}
    {...props}
  />
));
ItemActions.displayName = 'ItemActions';

const ItemGroup = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    role="list"
    data-slot="item-group"
    className={cn('mxp-flex mxp-flex-col', className)}
    {...props}
  />
));
ItemGroup.displayName = 'ItemGroup';

const ItemSeparator = React.forwardRef<
  React.ElementRef<typeof Separator>,
  React.ComponentPropsWithoutRef<typeof Separator>
>(({ className, ...props }, ref) => (
  <Separator
    ref={ref}
    data-slot="item-separator"
    className={cn('mxp-my-0', className)}
    {...props}
  />
));
ItemSeparator.displayName = 'ItemSeparator';

export {
  Item,
  ItemMedia,
  ItemContent,
  ItemHeader,
  ItemTitle,
  ItemDescription,
  ItemFooter,
  ItemActions,
  ItemGroup,
  ItemSeparator,
  itemVariants,
};
