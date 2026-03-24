import * as React from 'react';
import * as TabsPrimitive from '@radix-ui/react-tabs';
import { cn } from '../lib/cn';

const Tabs = TabsPrimitive.Root;

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      'mxp-inline-flex mxp-h-10 mxp-items-center mxp-justify-center mxp-rounded-md mxp-bg-muted mxp-p-1 mxp-text-muted-foreground',
      className
    )}
    {...props}
  />
));
TabsList.displayName = TabsPrimitive.List.displayName;

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      'mxp-inline-flex mxp-items-center mxp-justify-center mxp-whitespace-nowrap mxp-rounded-sm mxp-px-3 mxp-py-1.5 mxp-text-sm mxp-font-medium mxp-ring-offset-background mxp-transition-all focus-visible:mxp-outline-none focus-visible:mxp-ring-2 focus-visible:mxp-ring-ring focus-visible:mxp-ring-offset-2 disabled:mxp-pointer-events-none disabled:mxp-opacity-50 data-[state=active]:mxp-bg-background data-[state=active]:mxp-text-foreground data-[state=active]:mxp-shadow-sm',
      className
    )}
    {...props}
  />
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      'mxp-mt-2 mxp-ring-offset-background focus-visible:mxp-outline-none focus-visible:mxp-ring-2 focus-visible:mxp-ring-ring focus-visible:mxp-ring-offset-2',
      className
    )}
    {...props}
  />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

export { Tabs, TabsList, TabsTrigger, TabsContent };
