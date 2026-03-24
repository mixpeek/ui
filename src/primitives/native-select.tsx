import * as React from 'react';
import { ChevronDown } from 'lucide-react';

import { cn } from '../lib/cn';

const NativeSelect = React.forwardRef<
  HTMLSelectElement,
  React.ComponentPropsWithoutRef<'select'> & {
    size?: 'default' | 'sm';
  }
>(({ className, size = 'default', children, ...props }, ref) => (
  <div className="mxp-relative">
    <select
      ref={ref}
      className={cn(
        'mxp-flex mxp-w-full mxp-appearance-none mxp-rounded-md mxp-border mxp-border-input mxp-bg-background mxp-pr-8 mxp-text-sm mxp-ring-offset-background focus:mxp-outline-none focus:mxp-ring-2 focus:mxp-ring-ring focus:mxp-ring-offset-2 disabled:mxp-cursor-not-allowed disabled:mxp-opacity-50',
        size === 'default' ? 'mxp-h-10 mxp-px-3 mxp-py-2' : 'mxp-h-9 mxp-px-2 mxp-py-1',
        className
      )}
      {...props}
    >
      {children}
    </select>
    <ChevronDown className="mxp-pointer-events-none mxp-absolute mxp-right-2 mxp-top-1/2 mxp-h-4 mxp-w-4 mxp--translate-y-1/2 mxp-text-muted-foreground" />
  </div>
));
NativeSelect.displayName = 'NativeSelect';

const NativeSelectOption = React.forwardRef<
  HTMLOptionElement,
  React.ComponentPropsWithoutRef<'option'>
>(({ ...props }, ref) => <option ref={ref} {...props} />);
NativeSelectOption.displayName = 'NativeSelectOption';

const NativeSelectOptGroup = React.forwardRef<
  HTMLOptGroupElement,
  React.ComponentPropsWithoutRef<'optgroup'>
>(({ ...props }, ref) => <optgroup ref={ref} {...props} />);
NativeSelectOptGroup.displayName = 'NativeSelectOptGroup';

export { NativeSelect, NativeSelectOption, NativeSelectOptGroup };
