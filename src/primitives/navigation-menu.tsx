import * as React from 'react';
import * as NavigationMenuPrimitive from '@radix-ui/react-navigation-menu';
import { cva } from 'class-variance-authority';
import { ChevronDown } from 'lucide-react';

import { cn } from '../lib/cn';

const NavigationMenu = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Root>
>(({ className, children, ...props }, ref) => (
  <NavigationMenuPrimitive.Root
    ref={ref}
    className={cn(
      'mxp-relative mxp-z-10 mxp-flex mxp-max-w-max mxp-flex-1 mxp-items-center mxp-justify-center',
      className
    )}
    {...props}
  >
    {children}
    <NavigationMenuViewport />
  </NavigationMenuPrimitive.Root>
));
NavigationMenu.displayName = NavigationMenuPrimitive.Root.displayName;

const NavigationMenuList = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.List>
>(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.List
    ref={ref}
    className={cn(
      'mxp-group mxp-flex mxp-flex-1 mxp-list-none mxp-items-center mxp-justify-center mxp-space-x-1',
      className
    )}
    {...props}
  />
));
NavigationMenuList.displayName = NavigationMenuPrimitive.List.displayName;

const NavigationMenuItem = NavigationMenuPrimitive.Item;

const navigationMenuTriggerStyle = cva(
  'mxp-group mxp-inline-flex mxp-h-10 mxp-w-max mxp-items-center mxp-justify-center mxp-rounded-md mxp-bg-background mxp-px-4 mxp-py-2 mxp-text-sm mxp-font-medium mxp-transition-colors hover:mxp-bg-accent hover:mxp-text-accent-foreground focus:mxp-bg-accent focus:mxp-text-accent-foreground focus:mxp-outline-none disabled:mxp-pointer-events-none disabled:mxp-opacity-50 data-[active]:mxp-bg-accent/50 data-[state=open]:mxp-bg-accent/50'
);

const NavigationMenuTrigger = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <NavigationMenuPrimitive.Trigger
    ref={ref}
    className={cn(navigationMenuTriggerStyle(), 'mxp-group', className)}
    {...props}
  >
    {children}{' '}
    <ChevronDown
      className="mxp-relative mxp-top-[1px] mxp-ml-1 mxp-h-3 mxp-w-3 mxp-transition mxp-duration-200 group-data-[state=open]:mxp-rotate-180"
      aria-hidden="true"
    />
  </NavigationMenuPrimitive.Trigger>
));
NavigationMenuTrigger.displayName = NavigationMenuPrimitive.Trigger.displayName;

const NavigationMenuContent = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Content>
>(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.Content
    ref={ref}
    className={cn(
      'mxp-left-0 mxp-top-0 mxp-w-full data-[motion^=from-]:mxp-animate-in data-[motion^=to-]:mxp-animate-out data-[motion^=from-]:mxp-fade-in data-[motion^=to-]:mxp-fade-out data-[motion=from-end]:mxp-slide-in-from-right-52 data-[motion=from-start]:mxp-slide-in-from-left-52 data-[motion=to-end]:mxp-slide-out-to-right-52 data-[motion=to-start]:mxp-slide-out-to-left-52 md:mxp-absolute md:mxp-w-auto',
      className
    )}
    {...props}
  />
));
NavigationMenuContent.displayName = NavigationMenuPrimitive.Content.displayName;

const NavigationMenuLink = NavigationMenuPrimitive.Link;

const NavigationMenuViewport = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Viewport>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Viewport>
>(({ className, ...props }, ref) => (
  <div className={cn('mxp-absolute mxp-left-0 mxp-top-full mxp-flex mxp-justify-center')}>
    <NavigationMenuPrimitive.Viewport
      className={cn(
        'mxp-origin-top-center mxp-relative mxp-mt-1.5 mxp-h-[var(--radix-navigation-menu-viewport-height)] mxp-w-full mxp-overflow-hidden mxp-rounded-md mxp-border mxp-bg-popover mxp-text-popover-foreground mxp-shadow-lg data-[state=open]:mxp-animate-in data-[state=closed]:mxp-animate-out data-[state=closed]:mxp-zoom-out-95 data-[state=open]:mxp-zoom-in-90 md:mxp-w-[var(--radix-navigation-menu-viewport-width)]',
        className
      )}
      ref={ref}
      {...props}
    />
  </div>
));
NavigationMenuViewport.displayName =
  NavigationMenuPrimitive.Viewport.displayName;

const NavigationMenuIndicator = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Indicator>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Indicator>
>(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.Indicator
    ref={ref}
    className={cn(
      'mxp-top-full mxp-z-[1] mxp-flex mxp-h-1.5 mxp-items-end mxp-justify-center mxp-overflow-hidden data-[state=visible]:mxp-animate-in data-[state=hidden]:mxp-animate-out data-[state=hidden]:mxp-fade-out data-[state=visible]:mxp-fade-in',
      className
    )}
    {...props}
  >
    <div className="mxp-relative mxp-top-[60%] mxp-h-2 mxp-w-2 mxp-rotate-45 mxp-rounded-tl-sm mxp-bg-border mxp-shadow-md" />
  </NavigationMenuPrimitive.Indicator>
));
NavigationMenuIndicator.displayName =
  NavigationMenuPrimitive.Indicator.displayName;

export {
  navigationMenuTriggerStyle,
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuContent,
  NavigationMenuTrigger,
  NavigationMenuLink,
  NavigationMenuIndicator,
  NavigationMenuViewport,
};
