import * as React from 'react';
import * as MenubarPrimitive from '@radix-ui/react-menubar';
import { Check, ChevronRight, Circle } from 'lucide-react';

import { cn } from '../lib/cn';

const MenubarMenu = MenubarPrimitive.Menu;

const MenubarGroup = MenubarPrimitive.Group;

const MenubarPortal = MenubarPrimitive.Portal;

const MenubarSub = MenubarPrimitive.Sub;

const MenubarRadioGroup = MenubarPrimitive.RadioGroup;

const Menubar = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Root>
>(({ className, ...props }, ref) => (
  <MenubarPrimitive.Root
    ref={ref}
    className={cn(
      'mxp-flex mxp-h-10 mxp-items-center mxp-space-x-1 mxp-rounded-md mxp-border mxp-bg-background mxp-p-1',
      className
    )}
    {...props}
  />
));
Menubar.displayName = MenubarPrimitive.Root.displayName;

const MenubarTrigger = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <MenubarPrimitive.Trigger
    ref={ref}
    className={cn(
      'mxp-flex mxp-cursor-default mxp-select-none mxp-items-center mxp-rounded-sm mxp-px-3 mxp-py-1.5 mxp-text-sm mxp-font-medium mxp-outline-none focus:mxp-bg-accent focus:mxp-text-accent-foreground data-[state=open]:mxp-bg-accent data-[state=open]:mxp-text-accent-foreground',
      className
    )}
    {...props}
  />
));
MenubarTrigger.displayName = MenubarPrimitive.Trigger.displayName;

const MenubarSubTrigger = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.SubTrigger>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.SubTrigger> & {
    inset?: boolean;
  }
>(({ className, inset, children, ...props }, ref) => (
  <MenubarPrimitive.SubTrigger
    ref={ref}
    className={cn(
      'mxp-flex mxp-cursor-default mxp-select-none mxp-items-center mxp-rounded-sm mxp-px-2 mxp-py-1.5 mxp-text-sm mxp-outline-none focus:mxp-bg-accent focus:mxp-text-accent-foreground data-[state=open]:mxp-bg-accent data-[state=open]:mxp-text-accent-foreground',
      inset && 'mxp-pl-8',
      className
    )}
    {...props}
  >
    {children}
    <ChevronRight className="mxp-ml-auto mxp-h-4 mxp-w-4" />
  </MenubarPrimitive.SubTrigger>
));
MenubarSubTrigger.displayName = MenubarPrimitive.SubTrigger.displayName;

const MenubarSubContent = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.SubContent>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.SubContent>
>(({ className, ...props }, ref) => (
  <MenubarPrimitive.SubContent
    ref={ref}
    className={cn(
      'mxp-z-50 mxp-min-w-[8rem] mxp-overflow-hidden mxp-rounded-md mxp-border mxp-bg-popover mxp-p-1 mxp-text-popover-foreground data-[state=open]:mxp-animate-in data-[state=closed]:mxp-animate-out data-[state=closed]:mxp-fade-out-0 data-[state=open]:mxp-fade-in-0 data-[state=closed]:mxp-zoom-out-95 data-[state=open]:mxp-zoom-in-95 data-[side=bottom]:mxp-slide-in-from-top-2 data-[side=left]:mxp-slide-in-from-right-2 data-[side=right]:mxp-slide-in-from-left-2 data-[side=top]:mxp-slide-in-from-bottom-2',
      className
    )}
    {...props}
  />
));
MenubarSubContent.displayName = MenubarPrimitive.SubContent.displayName;

const MenubarContent = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Content>
>(
  (
    { className, align = 'start', alignOffset = -4, sideOffset = 8, ...props },
    ref
  ) => (
    <MenubarPrimitive.Portal>
      <MenubarPrimitive.Content
        ref={ref}
        align={align}
        alignOffset={alignOffset}
        sideOffset={sideOffset}
        className={cn(
          'mxp-z-50 mxp-min-w-[12rem] mxp-overflow-hidden mxp-rounded-md mxp-border mxp-bg-popover mxp-p-1 mxp-text-popover-foreground mxp-shadow-md data-[state=open]:mxp-animate-in data-[state=closed]:mxp-fade-out-0 data-[state=open]:mxp-fade-in-0 data-[state=closed]:mxp-zoom-out-95 data-[state=open]:mxp-zoom-in-95 data-[side=bottom]:mxp-slide-in-from-top-2 data-[side=left]:mxp-slide-in-from-right-2 data-[side=right]:mxp-slide-in-from-left-2 data-[side=top]:mxp-slide-in-from-bottom-2',
          className
        )}
        {...props}
      />
    </MenubarPrimitive.Portal>
  )
);
MenubarContent.displayName = MenubarPrimitive.Content.displayName;

const MenubarItem = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Item> & {
    inset?: boolean;
  }
>(({ className, inset, ...props }, ref) => (
  <MenubarPrimitive.Item
    ref={ref}
    className={cn(
      'mxp-relative mxp-flex mxp-cursor-default mxp-select-none mxp-items-center mxp-rounded-sm mxp-px-2 mxp-py-1.5 mxp-text-sm mxp-outline-none focus:mxp-bg-accent focus:mxp-text-accent-foreground data-[disabled]:mxp-pointer-events-none data-[disabled]:mxp-opacity-50',
      inset && 'mxp-pl-8',
      className
    )}
    {...props}
  />
));
MenubarItem.displayName = MenubarPrimitive.Item.displayName;

const MenubarCheckboxItem = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.CheckboxItem>
>(({ className, children, checked, ...props }, ref) => (
  <MenubarPrimitive.CheckboxItem
    ref={ref}
    className={cn(
      'mxp-relative mxp-flex mxp-cursor-default mxp-select-none mxp-items-center mxp-rounded-sm mxp-py-1.5 mxp-pl-8 mxp-pr-2 mxp-text-sm mxp-outline-none focus:mxp-bg-accent focus:mxp-text-accent-foreground data-[disabled]:mxp-pointer-events-none data-[disabled]:mxp-opacity-50',
      className
    )}
    checked={checked}
    {...props}
  >
    <span className="mxp-absolute mxp-left-2 mxp-flex mxp-h-3.5 mxp-w-3.5 mxp-items-center mxp-justify-center">
      <MenubarPrimitive.ItemIndicator>
        <Check className="mxp-h-4 mxp-w-4" />
      </MenubarPrimitive.ItemIndicator>
    </span>
    {children}
  </MenubarPrimitive.CheckboxItem>
));
MenubarCheckboxItem.displayName = MenubarPrimitive.CheckboxItem.displayName;

const MenubarRadioItem = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.RadioItem>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.RadioItem>
>(({ className, children, ...props }, ref) => (
  <MenubarPrimitive.RadioItem
    ref={ref}
    className={cn(
      'mxp-relative mxp-flex mxp-cursor-default mxp-select-none mxp-items-center mxp-rounded-sm mxp-py-1.5 mxp-pl-8 mxp-pr-2 mxp-text-sm mxp-outline-none focus:mxp-bg-accent focus:mxp-text-accent-foreground data-[disabled]:mxp-pointer-events-none data-[disabled]:mxp-opacity-50',
      className
    )}
    {...props}
  >
    <span className="mxp-absolute mxp-left-2 mxp-flex mxp-h-3.5 mxp-w-3.5 mxp-items-center mxp-justify-center">
      <MenubarPrimitive.ItemIndicator>
        <Circle className="mxp-h-2 mxp-w-2 mxp-fill-current" />
      </MenubarPrimitive.ItemIndicator>
    </span>
    {children}
  </MenubarPrimitive.RadioItem>
));
MenubarRadioItem.displayName = MenubarPrimitive.RadioItem.displayName;

const MenubarLabel = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Label> & {
    inset?: boolean;
  }
>(({ className, inset, ...props }, ref) => (
  <MenubarPrimitive.Label
    ref={ref}
    className={cn(
      'mxp-px-2 mxp-py-1.5 mxp-text-sm mxp-font-semibold',
      inset && 'mxp-pl-8',
      className
    )}
    {...props}
  />
));
MenubarLabel.displayName = MenubarPrimitive.Label.displayName;

const MenubarSeparator = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <MenubarPrimitive.Separator
    ref={ref}
    className={cn('mxp--mx-1 mxp-my-1 mxp-h-px mxp-bg-muted', className)}
    {...props}
  />
));
MenubarSeparator.displayName = MenubarPrimitive.Separator.displayName;

const MenubarShortcut = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      className={cn(
        'mxp-ml-auto mxp-text-xs mxp-tracking-widest mxp-text-muted-foreground',
        className
      )}
      {...props}
    />
  );
};
MenubarShortcut.displayName = 'MenubarShortcut';

export {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
  MenubarSeparator,
  MenubarLabel,
  MenubarCheckboxItem,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarPortal,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarGroup,
  MenubarSub,
  MenubarShortcut,
};
