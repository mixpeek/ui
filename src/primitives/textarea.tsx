import * as React from 'react';
import { cn } from '../lib/cn';

const Textarea = React.forwardRef<HTMLTextAreaElement, React.ComponentProps<'textarea'>>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          'mxp-flex mxp-min-h-[80px] mxp-w-full mxp-rounded-md mxp-border mxp-border-input mxp-bg-background mxp-px-3 mxp-py-2 mxp-text-sm mxp-ring-offset-background placeholder:mxp-text-muted-foreground focus-visible:mxp-outline-none focus-visible:mxp-ring-2 focus-visible:mxp-ring-ring focus-visible:mxp-ring-offset-2 disabled:mxp-cursor-not-allowed disabled:mxp-opacity-50',
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Textarea.displayName = 'Textarea';

export { Textarea };
