import * as React from 'react';
import * as AccordionPrimitive from '@radix-ui/react-accordion';
import { ChevronDown } from 'lucide-react';
import { cn } from '../lib/cn';

const Accordion = AccordionPrimitive.Root;

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item ref={ref} className={cn('mxp-border-b', className)} {...props} />
));
AccordionItem.displayName = 'AccordionItem';

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className="mxp-flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        'mxp-flex mxp-flex-1 mxp-items-center mxp-justify-between mxp-py-4 mxp-font-medium mxp-transition-all hover:mxp-underline [&[data-state=open]>svg]:mxp-rotate-180',
        className
      )}
      {...props}
    >
      {children}
      <ChevronDown className="mxp-h-4 mxp-w-4 mxp-shrink-0 mxp-transition-transform mxp-duration-200" />
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
));
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className="mxp-overflow-hidden mxp-text-sm mxp-transition-all data-[state=closed]:mxp-animate-accordion-up data-[state=open]:mxp-animate-accordion-down"
    {...props}
  >
    <div className={cn('mxp-pb-4 mxp-pt-0', className)}>{children}</div>
  </AccordionPrimitive.Content>
));
AccordionContent.displayName = AccordionPrimitive.Content.displayName;

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
