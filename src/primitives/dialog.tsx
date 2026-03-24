import * as React from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import { cn } from '../lib/cn';

const Dialog = DialogPrimitive.Root;
const DialogTrigger = DialogPrimitive.Trigger;
const DialogPortal = DialogPrimitive.Portal;
const DialogClose = DialogPrimitive.Close;

const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      'mxp-fixed mxp-inset-0 mxp-z-50 mxp-bg-black/80 data-[state=open]:mxp-animate-in data-[state=closed]:mxp-animate-out data-[state=closed]:mxp-fade-out-0 data-[state=open]:mxp-fade-in-0',
      className
    )}
    {...props}
  />
));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        'mxp-fixed mxp-left-[50%] mxp-top-[50%] mxp-z-50 mxp-grid mxp-w-full mxp-max-w-lg mxp-translate-x-[-50%] mxp-translate-y-[-50%] mxp-gap-4 mxp-border mxp-bg-background mxp-p-6 mxp-shadow-lg mxp-duration-200 data-[state=open]:mxp-animate-in data-[state=closed]:mxp-animate-out data-[state=closed]:mxp-fade-out-0 data-[state=open]:mxp-fade-in-0 data-[state=closed]:mxp-zoom-out-95 data-[state=open]:mxp-zoom-in-95 data-[state=closed]:mxp-slide-out-to-left-1/2 data-[state=closed]:mxp-slide-out-to-top-[48%] data-[state=open]:mxp-slide-in-from-left-1/2 data-[state=open]:mxp-slide-in-from-top-[48%] mxp-rounded-lg',
        className
      )}
      {...props}
    >
      {children}
      <DialogPrimitive.Close className="mxp-absolute mxp-right-4 mxp-top-4 mxp-rounded-sm mxp-opacity-70 mxp-ring-offset-background mxp-transition-opacity hover:mxp-opacity-100 focus:mxp-outline-none focus:mxp-ring-2 focus:mxp-ring-ring focus:mxp-ring-offset-2 disabled:mxp-pointer-events-none data-[state=open]:mxp-bg-accent data-[state=open]:mxp-text-muted-foreground">
        <X className="mxp-h-4 mxp-w-4" />
        <span className="mxp-sr-only">Close</span>
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </DialogPortal>
));
DialogContent.displayName = DialogPrimitive.Content.displayName;

const DialogHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('mxp-flex mxp-flex-col mxp-space-y-1.5 mxp-text-center sm:mxp-text-left', className)} {...props} />
);
DialogHeader.displayName = 'DialogHeader';

const DialogFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('mxp-flex mxp-flex-col-reverse sm:mxp-flex-row sm:mxp-justify-end sm:mxp-space-x-2', className)} {...props} />
);
DialogFooter.displayName = 'DialogFooter';

const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title ref={ref} className={cn('mxp-text-lg mxp-font-semibold mxp-leading-none mxp-tracking-tight', className)} {...props} />
));
DialogTitle.displayName = DialogPrimitive.Title.displayName;

const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description ref={ref} className={cn('mxp-text-sm mxp-text-muted-foreground', className)} {...props} />
));
DialogDescription.displayName = DialogPrimitive.Description.displayName;

export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogClose,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
};
