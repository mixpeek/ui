import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '../lib/cn';
import { Separator } from './separator';

const fieldVariants = cva('mxp-flex mxp-gap-2', {
  variants: {
    orientation: {
      vertical: 'mxp-flex-col',
      horizontal: 'mxp-flex-row mxp-items-start',
      responsive: 'mxp-flex-col sm:mxp-flex-row sm:mxp-items-start',
    },
  },
  defaultVariants: {
    orientation: 'vertical',
  },
});

interface FieldProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof fieldVariants> {}

const Field = React.forwardRef<HTMLDivElement, FieldProps>(
  ({ className, orientation, ...props }, ref) => (
    <div
      ref={ref}
      role="group"
      data-slot="field"
      className={cn(fieldVariants({ orientation }), className)}
      {...props}
    />
  )
);
Field.displayName = 'Field';

const FieldSet = React.forwardRef<
  HTMLFieldSetElement,
  React.FieldsetHTMLAttributes<HTMLFieldSetElement>
>(({ className, ...props }, ref) => (
  <fieldset
    ref={ref}
    data-slot="fieldset"
    className={cn('mxp-flex mxp-flex-col mxp-gap-4 mxp-border-0 mxp-p-0', className)}
    {...props}
  />
));
FieldSet.displayName = 'FieldSet';

const FieldLabel = React.forwardRef<
  HTMLLabelElement,
  React.LabelHTMLAttributes<HTMLLabelElement>
>(({ className, ...props }, ref) => (
  <label
    ref={ref}
    data-slot="field-label"
    className={cn(
      'mxp-text-sm mxp-font-medium mxp-leading-none peer-disabled:mxp-cursor-not-allowed peer-disabled:mxp-opacity-70',
      className
    )}
    {...props}
  />
));
FieldLabel.displayName = 'FieldLabel';

const FieldLegend = React.forwardRef<
  HTMLLegendElement,
  React.HTMLAttributes<HTMLLegendElement>
>(({ className, ...props }, ref) => (
  <legend
    ref={ref}
    data-slot="field-legend"
    className={cn('mxp-text-sm mxp-font-medium mxp-leading-none', className)}
    {...props}
  />
));
FieldLegend.displayName = 'FieldLegend';

const FieldDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    data-slot="field-description"
    className={cn('mxp-text-sm mxp-text-muted-foreground', className)}
    {...props}
  />
));
FieldDescription.displayName = 'FieldDescription';

interface FieldErrorProps extends React.HTMLAttributes<HTMLParagraphElement> {
  errors?: string[];
}

const FieldError = React.forwardRef<HTMLParagraphElement, FieldErrorProps>(
  ({ className, errors, children, ...props }, ref) => {
    const messages = errors
      ? [...new Set(errors)].filter(Boolean)
      : children
        ? [children]
        : [];

    if (messages.length === 0) return null;

    return (
      <>
        {messages.map((msg, i) => (
          <p
            key={i}
            ref={i === 0 ? ref : undefined}
            data-slot="field-error"
            className={cn('mxp-text-sm mxp-font-medium mxp-text-destructive', className)}
            {...props}
          >
            {msg}
          </p>
        ))}
      </>
    );
  }
);
FieldError.displayName = 'FieldError';

const FieldGroup = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    data-slot="field-group"
    className={cn('mxp-flex mxp-flex-col mxp-gap-4', className)}
    {...props}
  />
));
FieldGroup.displayName = 'FieldGroup';

const FieldContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    data-slot="field-content"
    className={cn('mxp-flex mxp-flex-1 mxp-flex-col mxp-gap-2', className)}
    {...props}
  />
));
FieldContent.displayName = 'FieldContent';

const FieldTitle = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    data-slot="field-title"
    className={cn('mxp-flex mxp-flex-col mxp-gap-1', className)}
    {...props}
  />
));
FieldTitle.displayName = 'FieldTitle';

interface FieldSeparatorProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: string;
}

const FieldSeparator = React.forwardRef<HTMLDivElement, FieldSeparatorProps>(
  ({ className, label, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="field-separator"
      className={cn('mxp-relative', className)}
      {...props}
    >
      <Separator />
      {label && (
        <span className="mxp-absolute mxp-left-1/2 mxp-top-1/2 mxp--translate-x-1/2 mxp--translate-y-1/2 mxp-bg-background mxp-px-2 mxp-text-xs mxp-text-muted-foreground">
          {label}
        </span>
      )}
    </div>
  )
);
FieldSeparator.displayName = 'FieldSeparator';

export {
  Field,
  FieldSet,
  FieldLabel,
  FieldLegend,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldContent,
  FieldTitle,
  FieldSeparator,
};
