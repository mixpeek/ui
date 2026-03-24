import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '../lib/cn';

const InputGroup = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    role="group"
    data-slot="input-group"
    className={cn(
      'mxp-flex mxp-items-center mxp-rounded-md mxp-border mxp-border-input mxp-bg-background mxp-ring-offset-background focus-within:mxp-ring-2 focus-within:mxp-ring-ring focus-within:mxp-ring-offset-2',
      className
    )}
    {...props}
  />
));
InputGroup.displayName = 'InputGroup';

const inputGroupAddonVariants = cva(
  'mxp-flex mxp-items-center mxp-justify-center mxp-text-muted-foreground',
  {
    variants: {
      align: {
        'inline-start': 'mxp-order-first mxp-pl-3',
        'inline-end': 'mxp-order-last mxp-pr-3',
      },
    },
    defaultVariants: {
      align: 'inline-start',
    },
  }
);

interface InputGroupAddonProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof inputGroupAddonVariants> {}

const InputGroupAddon = React.forwardRef<HTMLDivElement, InputGroupAddonProps>(
  ({ className, align, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="input-group-addon"
      className={cn(inputGroupAddonVariants({ align }), className)}
      {...props}
    />
  )
);
InputGroupAddon.displayName = 'InputGroupAddon';

const InputGroupButton = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => (
  <button
    ref={ref}
    data-slot="input-group-button"
    className={cn(
      'mxp-inline-flex mxp-items-center mxp-justify-center mxp-rounded-none mxp-border-0 mxp-bg-transparent mxp-px-3 mxp-text-sm mxp-text-muted-foreground mxp-transition-colors hover:mxp-text-foreground focus:mxp-outline-none disabled:mxp-pointer-events-none disabled:mxp-opacity-50',
      className
    )}
    {...props}
  />
));
InputGroupButton.displayName = 'InputGroupButton';

const InputGroupText = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement>
>(({ className, ...props }, ref) => (
  <span
    ref={ref}
    data-slot="input-group-text"
    className={cn('mxp-text-sm mxp-text-muted-foreground', className)}
    {...props}
  />
));
InputGroupText.displayName = 'InputGroupText';

const InputGroupInput = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, ...props }, ref) => (
  <input
    ref={ref}
    data-slot="input-group-input"
    className={cn(
      'mxp-flex mxp-h-10 mxp-w-full mxp-flex-1 mxp-bg-transparent mxp-px-3 mxp-py-2 mxp-text-sm mxp-outline-none placeholder:mxp-text-muted-foreground disabled:mxp-cursor-not-allowed disabled:mxp-opacity-50',
      className
    )}
    {...props}
  />
));
InputGroupInput.displayName = 'InputGroupInput';

const InputGroupTextarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => (
  <textarea
    ref={ref}
    data-slot="input-group-textarea"
    className={cn(
      'mxp-flex mxp-min-h-[80px] mxp-w-full mxp-flex-1 mxp-bg-transparent mxp-px-3 mxp-py-2 mxp-text-sm mxp-outline-none placeholder:mxp-text-muted-foreground disabled:mxp-cursor-not-allowed disabled:mxp-opacity-50',
      className
    )}
    {...props}
  />
));
InputGroupTextarea.displayName = 'InputGroupTextarea';

export {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupText,
  InputGroupInput,
  InputGroupTextarea,
};
