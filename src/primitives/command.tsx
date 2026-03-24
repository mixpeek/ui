import * as React from 'react';
import { type DialogProps } from '@radix-ui/react-dialog';
import { Command as CommandPrimitive } from 'cmdk';
import { Search } from 'lucide-react';

import { cn } from '../lib/cn';
import { Dialog, DialogContent } from './dialog';

const Command = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive>
>(({ className, ...props }, ref) => (
  <CommandPrimitive
    ref={ref}
    className={cn(
      'mxp-flex mxp-h-full mxp-w-full mxp-flex-col mxp-overflow-hidden mxp-rounded-md mxp-bg-popover mxp-text-popover-foreground',
      className
    )}
    {...props}
  />
));
Command.displayName = CommandPrimitive.displayName;

type CommandDialogProps = DialogProps;

const CommandDialog = ({ children, ...props }: CommandDialogProps) => {
  return (
    <Dialog {...props}>
      <DialogContent className="mxp-overflow-hidden mxp-p-0 mxp-shadow-lg">
        <Command className="[&_[cmdk-group-heading]]:mxp-px-2 [&_[cmdk-group-heading]]:mxp-font-medium [&_[cmdk-group-heading]]:mxp-text-muted-foreground [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:mxp-pt-0 [&_[cmdk-group]]:mxp-px-2 [&_[cmdk-input-wrapper]_svg]:mxp-h-5 [&_[cmdk-input-wrapper]_svg]:mxp-w-5 [&_[cmdk-input]]:mxp-h-12 [&_[cmdk-item]]:mxp-px-2 [&_[cmdk-item]]:mxp-py-3 [&_[cmdk-item]_svg]:mxp-h-5 [&_[cmdk-item]_svg]:mxp-w-5">
          {children}
        </Command>
      </DialogContent>
    </Dialog>
  );
};

const CommandInput = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Input>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Input>
>(({ className, ...props }, ref) => (
  <div className="mxp-flex mxp-items-center mxp-border-b mxp-px-3" cmdk-input-wrapper="">
    <Search className="mxp-mr-2 mxp-h-4 mxp-w-4 mxp-shrink-0 mxp-opacity-50" />
    <CommandPrimitive.Input
      ref={ref}
      className={cn(
        'mxp-flex mxp-h-11 mxp-w-full mxp-rounded-md mxp-bg-transparent mxp-py-3 mxp-text-sm mxp-outline-none placeholder:mxp-text-muted-foreground disabled:mxp-cursor-not-allowed disabled:mxp-opacity-50',
        className
      )}
      {...props}
    />
  </div>
));

CommandInput.displayName = CommandPrimitive.Input.displayName;

const CommandList = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.List>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.List
    ref={ref}
    className={cn('mxp-max-h-[300px] mxp-overflow-y-auto mxp-overflow-x-hidden', className)}
    {...props}
  />
));

CommandList.displayName = CommandPrimitive.List.displayName;

const CommandEmpty = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Empty>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Empty>
>((props, ref) => (
  <CommandPrimitive.Empty
    ref={ref}
    className="mxp-py-6 mxp-text-center mxp-text-sm"
    {...props}
  />
));

CommandEmpty.displayName = CommandPrimitive.Empty.displayName;

const CommandGroup = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Group>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Group>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Group
    ref={ref}
    className={cn(
      'mxp-overflow-hidden mxp-p-1 mxp-text-foreground [&_[cmdk-group-heading]]:mxp-px-2 [&_[cmdk-group-heading]]:mxp-py-1.5 [&_[cmdk-group-heading]]:mxp-text-xs [&_[cmdk-group-heading]]:mxp-font-medium [&_[cmdk-group-heading]]:mxp-text-muted-foreground',
      className
    )}
    {...props}
  />
));

CommandGroup.displayName = CommandPrimitive.Group.displayName;

const CommandSeparator = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Separator
    ref={ref}
    className={cn('mxp--mx-1 mxp-h-px mxp-bg-border', className)}
    {...props}
  />
));
CommandSeparator.displayName = CommandPrimitive.Separator.displayName;

const CommandItem = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Item>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Item
    ref={ref}
    className={cn(
      "mxp-relative mxp-flex mxp-cursor-default mxp-select-none mxp-items-center mxp-rounded-sm mxp-px-2 mxp-py-1.5 mxp-text-sm mxp-outline-none data-[disabled=true]:mxp-pointer-events-none data-[selected='true']:mxp-bg-accent data-[selected=true]:mxp-text-accent-foreground data-[disabled=true]:mxp-opacity-50",
      className
    )}
    {...props}
  />
));

CommandItem.displayName = CommandPrimitive.Item.displayName;

const CommandShortcut = ({
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
CommandShortcut.displayName = 'CommandShortcut';

export {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator,
};
