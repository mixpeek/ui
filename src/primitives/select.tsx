import * as React from 'react';
import * as SelectPrimitive from '@radix-ui/react-select';
import { Check, ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '../lib/cn';

const Select = SelectPrimitive.Root;
const SelectGroup = SelectPrimitive.Group;
const SelectValue = SelectPrimitive.Value;

const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Trigger
    ref={ref}
    className={cn(
      'mxp-flex mxp-h-10 mxp-w-full mxp-items-center mxp-justify-between mxp-rounded-md mxp-border mxp-border-input mxp-bg-background mxp-px-3 mxp-py-2 mxp-text-sm mxp-ring-offset-background placeholder:mxp-text-muted-foreground focus:mxp-outline-none focus:mxp-ring-2 focus:mxp-ring-ring focus:mxp-ring-offset-2 disabled:mxp-cursor-not-allowed disabled:mxp-opacity-50 [&>span]:mxp-line-clamp-1',
      className
    )}
    {...props}
  >
    {children}
    <SelectPrimitive.Icon asChild>
      <ChevronDown className="mxp-h-4 mxp-w-4 mxp-opacity-50" />
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
));
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;

const SelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, position = 'popper', ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      className={cn(
        'mxp-relative mxp-z-50 mxp-max-h-96 mxp-min-w-[8rem] mxp-overflow-hidden mxp-rounded-md mxp-border mxp-bg-popover mxp-text-popover-foreground mxp-shadow-md data-[state=open]:mxp-animate-in data-[state=closed]:mxp-animate-out data-[state=closed]:mxp-fade-out-0 data-[state=open]:mxp-fade-in-0 data-[state=closed]:mxp-zoom-out-95 data-[state=open]:mxp-zoom-in-95 data-[side=bottom]:mxp-slide-in-from-top-2 data-[side=left]:mxp-slide-in-from-right-2 data-[side=right]:mxp-slide-in-from-left-2 data-[side=top]:mxp-slide-in-from-bottom-2',
        position === 'popper' && 'data-[side=bottom]:mxp-translate-y-1 data-[side=left]:mxp--translate-x-1 data-[side=right]:mxp-translate-x-1 data-[side=top]:mxp--translate-y-1',
        className
      )}
      position={position}
      {...props}
    >
      <SelectPrimitive.ScrollUpButton className="mxp-flex mxp-cursor-default mxp-items-center mxp-justify-center mxp-py-1">
        <ChevronUp className="mxp-h-4 mxp-w-4" />
      </SelectPrimitive.ScrollUpButton>
      <SelectPrimitive.Viewport
        className={cn(
          'mxp-p-1',
          position === 'popper' && 'mxp-h-[var(--radix-select-trigger-height)] mxp-w-full mxp-min-w-[var(--radix-select-trigger-width)]'
        )}
      >
        {children}
      </SelectPrimitive.Viewport>
      <SelectPrimitive.ScrollDownButton className="mxp-flex mxp-cursor-default mxp-items-center mxp-justify-center mxp-py-1">
        <ChevronDown className="mxp-h-4 mxp-w-4" />
      </SelectPrimitive.ScrollDownButton>
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
));
SelectContent.displayName = SelectPrimitive.Content.displayName;

const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(
      'mxp-relative mxp-flex mxp-w-full mxp-cursor-default mxp-select-none mxp-items-center mxp-rounded-sm mxp-py-1.5 mxp-pl-8 mxp-pr-2 mxp-text-sm mxp-outline-none focus:mxp-bg-accent focus:mxp-text-accent-foreground data-[disabled]:mxp-pointer-events-none data-[disabled]:mxp-opacity-50',
      className
    )}
    {...props}
  >
    <span className="mxp-absolute mxp-left-2 mxp-flex mxp-h-3.5 mxp-w-3.5 mxp-items-center mxp-justify-center">
      <SelectPrimitive.ItemIndicator>
        <Check className="mxp-h-4 mxp-w-4" />
      </SelectPrimitive.ItemIndicator>
    </span>
    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
));
SelectItem.displayName = SelectPrimitive.Item.displayName;

const SelectLabel = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Label ref={ref} className={cn('mxp-py-1.5 mxp-pl-8 mxp-pr-2 mxp-text-sm mxp-font-semibold', className)} {...props} />
));
SelectLabel.displayName = SelectPrimitive.Label.displayName;

const SelectSeparator = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator ref={ref} className={cn('mxp--mx-1 mxp-my-1 mxp-h-px mxp-bg-muted', className)} {...props} />
));
SelectSeparator.displayName = SelectPrimitive.Separator.displayName;

export { Select, SelectGroup, SelectValue, SelectTrigger, SelectContent, SelectItem, SelectLabel, SelectSeparator };
