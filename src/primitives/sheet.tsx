import * as SheetPrimitive from '@radix-ui/react-dialog';
import { cva, type VariantProps } from 'class-variance-authority';
import { X } from 'lucide-react';
import * as React from 'react';

import { cn } from '../lib/cn';

const Sheet = SheetPrimitive.Root;

const SheetTrigger = SheetPrimitive.Trigger;

const SheetClose = SheetPrimitive.Close;

const SheetPortal = SheetPrimitive.Portal;

const SheetOverlay = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Overlay
    className={cn(
      'mxp-fixed mxp-inset-0 mxp-z-50 mxp-bg-black/80 data-[state=open]:mxp-animate-in data-[state=closed]:mxp-animate-out data-[state=closed]:mxp-fade-out-0 data-[state=open]:mxp-fade-in-0',
      className
    )}
    {...props}
    ref={ref}
  />
));
SheetOverlay.displayName = SheetPrimitive.Overlay.displayName;

const sheetVariants = cva(
  'mxp-fixed mxp-z-50 mxp-gap-4 mxp-bg-background mxp-p-6 mxp-shadow-lg mxp-transition mxp-ease-in-out data-[state=open]:mxp-animate-in data-[state=closed]:mxp-animate-out data-[state=closed]:mxp-duration-300 data-[state=open]:mxp-duration-500',
  {
    variants: {
      side: {
        top: 'mxp-inset-x-0 mxp-top-0 mxp-border-b data-[state=closed]:mxp-slide-out-to-top data-[state=open]:mxp-slide-in-from-top',
        bottom:
          'mxp-inset-x-0 mxp-bottom-0 mxp-border-t data-[state=closed]:mxp-slide-out-to-bottom data-[state=open]:mxp-slide-in-from-bottom',
        left: 'mxp-inset-y-0 mxp-left-0 mxp-h-full mxp-w-3/4 mxp-border-r data-[state=closed]:mxp-slide-out-to-left data-[state=open]:mxp-slide-in-from-left sm:mxp-max-w-sm',
        right:
          'mxp-inset-y-0 mxp-right-0 mxp-h-full mxp-w-3/4 mxp-border-l data-[state=closed]:mxp-slide-out-to-right data-[state=open]:mxp-slide-in-from-right sm:mxp-max-w-sm',
      },
    },
    defaultVariants: {
      side: 'right',
    },
  }
);

interface SheetContentProps
  extends React.ComponentPropsWithoutRef<typeof SheetPrimitive.Content>,
    VariantProps<typeof sheetVariants> {}

const SheetContent = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Content>,
  SheetContentProps
>(({ side = 'right', className, children, ...props }, ref) => (
  <SheetPortal>
    <SheetOverlay />
    <SheetPrimitive.Content
      ref={ref}
      className={cn(sheetVariants({ side }), className)}
      {...props}
    >
      {children}
      <SheetPrimitive.Close className="mxp-absolute mxp-right-4 mxp-top-4 mxp-rounded-sm mxp-opacity-70 mxp-ring-offset-background mxp-transition-opacity hover:mxp-opacity-100 focus:mxp-outline-none focus:mxp-ring-2 focus:mxp-ring-ring focus:mxp-ring-offset-2 disabled:mxp-pointer-events-none data-[state=open]:mxp-bg-secondary">
        <X className="mxp-h-4 mxp-w-4" />
        <span className="mxp-sr-only">Close</span>
      </SheetPrimitive.Close>
    </SheetPrimitive.Content>
  </SheetPortal>
));
SheetContent.displayName = SheetPrimitive.Content.displayName;

const SheetHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      'mxp-flex mxp-flex-col mxp-space-y-2 mxp-text-center sm:mxp-text-left',
      className
    )}
    {...props}
  />
);
SheetHeader.displayName = 'SheetHeader';

const SheetFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      'mxp-flex mxp-flex-col-reverse sm:mxp-flex-row sm:mxp-justify-end sm:mxp-space-x-2',
      className
    )}
    {...props}
  />
);
SheetFooter.displayName = 'SheetFooter';

const SheetTitle = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Title>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Title
    ref={ref}
    className={cn('mxp-text-lg mxp-font-semibold mxp-text-foreground', className)}
    {...props}
  />
));
SheetTitle.displayName = SheetPrimitive.Title.displayName;

const SheetDescription = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Description>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Description
    ref={ref}
    className={cn('mxp-text-sm mxp-text-muted-foreground', className)}
    {...props}
  />
));
SheetDescription.displayName = SheetPrimitive.Description.displayName;

export {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetOverlay,
  SheetPortal,
  SheetTitle,
  SheetTrigger,
};
