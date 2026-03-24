import * as React from 'react';
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import { Check, ChevronRight, Circle } from 'lucide-react';
import { cn } from '../lib/cn';

const DropdownMenu = DropdownMenuPrimitive.Root;
const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;
const DropdownMenuGroup = DropdownMenuPrimitive.Group;
const DropdownMenuPortal = DropdownMenuPrimitive.Portal;
const DropdownMenuSub = DropdownMenuPrimitive.Sub;
const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup;

const DropdownMenuSubTrigger = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubTrigger>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubTrigger> & { inset?: boolean }
>(({ className, inset, children, ...props }, ref) => (
  <DropdownMenuPrimitive.SubTrigger
    ref={ref}
    className={cn(
      'mxp-flex mxp-cursor-default mxp-select-none mxp-items-center mxp-rounded-sm mxp-px-2 mxp-py-1.5 mxp-text-sm mxp-outline-none focus:mxp-bg-accent data-[state=open]:mxp-bg-accent',
      inset && 'mxp-pl-8',
      className
    )}
    {...props}
  >
    {children}
    <ChevronRight className="mxp-ml-auto mxp-h-4 mxp-w-4" />
  </DropdownMenuPrimitive.SubTrigger>
));
DropdownMenuSubTrigger.displayName = DropdownMenuPrimitive.SubTrigger.displayName;

const DropdownMenuSubContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubContent>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubContent>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.SubContent
    ref={ref}
    className={cn(
      'mxp-z-50 mxp-min-w-[8rem] mxp-overflow-hidden mxp-rounded-md mxp-border mxp-bg-popover mxp-p-1 mxp-text-popover-foreground mxp-shadow-lg data-[state=open]:mxp-animate-in data-[state=closed]:mxp-animate-out data-[state=closed]:mxp-fade-out-0 data-[state=open]:mxp-fade-in-0 data-[state=closed]:mxp-zoom-out-95 data-[state=open]:mxp-zoom-in-95 data-[side=bottom]:mxp-slide-in-from-top-2 data-[side=left]:mxp-slide-in-from-right-2 data-[side=right]:mxp-slide-in-from-left-2 data-[side=top]:mxp-slide-in-from-bottom-2',
      className
    )}
    {...props}
  />
));
DropdownMenuSubContent.displayName = DropdownMenuPrimitive.SubContent.displayName;

const DropdownMenuContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <DropdownMenuPrimitive.Portal>
    <DropdownMenuPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        'mxp-z-50 mxp-min-w-[8rem] mxp-overflow-hidden mxp-rounded-md mxp-border mxp-bg-popover mxp-p-1 mxp-text-popover-foreground mxp-shadow-md data-[state=open]:mxp-animate-in data-[state=closed]:mxp-animate-out data-[state=closed]:mxp-fade-out-0 data-[state=open]:mxp-fade-in-0 data-[state=closed]:mxp-zoom-out-95 data-[state=open]:mxp-zoom-in-95 data-[side=bottom]:mxp-slide-in-from-top-2 data-[side=left]:mxp-slide-in-from-right-2 data-[side=right]:mxp-slide-in-from-left-2 data-[side=top]:mxp-slide-in-from-bottom-2',
        className
      )}
      {...props}
    />
  </DropdownMenuPrimitive.Portal>
));
DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName;

const DropdownMenuItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item> & { inset?: boolean }
>(({ className, inset, ...props }, ref) => (
  <DropdownMenuPrimitive.Item
    ref={ref}
    className={cn(
      'mxp-relative mxp-flex mxp-cursor-default mxp-select-none mxp-items-center mxp-rounded-sm mxp-px-2 mxp-py-1.5 mxp-text-sm mxp-outline-none mxp-transition-colors focus:mxp-bg-accent focus:mxp-text-accent-foreground data-[disabled]:mxp-pointer-events-none data-[disabled]:mxp-opacity-50',
      inset && 'mxp-pl-8',
      className
    )}
    {...props}
  />
));
DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName;

const DropdownMenuCheckboxItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.CheckboxItem>
>(({ className, children, checked, ...props }, ref) => (
  <DropdownMenuPrimitive.CheckboxItem
    ref={ref}
    className={cn(
      'mxp-relative mxp-flex mxp-cursor-default mxp-select-none mxp-items-center mxp-rounded-sm mxp-py-1.5 mxp-pl-8 mxp-pr-2 mxp-text-sm mxp-outline-none mxp-transition-colors focus:mxp-bg-accent focus:mxp-text-accent-foreground data-[disabled]:mxp-pointer-events-none data-[disabled]:mxp-opacity-50',
      className
    )}
    checked={checked}
    {...props}
  >
    <span className="mxp-absolute mxp-left-2 mxp-flex mxp-h-3.5 mxp-w-3.5 mxp-items-center mxp-justify-center">
      <DropdownMenuPrimitive.ItemIndicator>
        <Check className="mxp-h-4 mxp-w-4" />
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.CheckboxItem>
));
DropdownMenuCheckboxItem.displayName = DropdownMenuPrimitive.CheckboxItem.displayName;

const DropdownMenuRadioItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.RadioItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.RadioItem>
>(({ className, children, ...props }, ref) => (
  <DropdownMenuPrimitive.RadioItem
    ref={ref}
    className={cn(
      'mxp-relative mxp-flex mxp-cursor-default mxp-select-none mxp-items-center mxp-rounded-sm mxp-py-1.5 mxp-pl-8 mxp-pr-2 mxp-text-sm mxp-outline-none mxp-transition-colors focus:mxp-bg-accent focus:mxp-text-accent-foreground data-[disabled]:mxp-pointer-events-none data-[disabled]:mxp-opacity-50',
      className
    )}
    {...props}
  >
    <span className="mxp-absolute mxp-left-2 mxp-flex mxp-h-3.5 mxp-w-3.5 mxp-items-center mxp-justify-center">
      <DropdownMenuPrimitive.ItemIndicator>
        <Circle className="mxp-h-2 mxp-w-2 mxp-fill-current" />
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.RadioItem>
));
DropdownMenuRadioItem.displayName = DropdownMenuPrimitive.RadioItem.displayName;

const DropdownMenuLabel = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Label> & { inset?: boolean }
>(({ className, inset, ...props }, ref) => (
  <DropdownMenuPrimitive.Label ref={ref} className={cn('mxp-px-2 mxp-py-1.5 mxp-text-sm mxp-font-semibold', inset && 'mxp-pl-8', className)} {...props} />
));
DropdownMenuLabel.displayName = DropdownMenuPrimitive.Label.displayName;

const DropdownMenuSeparator = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.Separator ref={ref} className={cn('mxp--mx-1 mxp-my-1 mxp-h-px mxp-bg-muted', className)} {...props} />
));
DropdownMenuSeparator.displayName = DropdownMenuPrimitive.Separator.displayName;

const DropdownMenuShortcut = ({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) => (
  <span className={cn('mxp-ml-auto mxp-text-xs mxp-tracking-widest mxp-opacity-60', className)} {...props} />
);
DropdownMenuShortcut.displayName = 'DropdownMenuShortcut';

export {
  DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuCheckboxItem, DropdownMenuRadioItem, DropdownMenuLabel,
  DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuGroup, DropdownMenuPortal,
  DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuRadioGroup,
};
