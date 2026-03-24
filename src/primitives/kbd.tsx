import * as React from 'react';

import { cn } from '../lib/cn';

function Kbd({ className, ...props }: React.ComponentProps<'kbd'>) {
  return (
    <kbd
      data-slot="kbd"
      className={cn(
        'mxp-pointer-events-none mxp-inline-flex mxp-h-5 mxp-select-none mxp-items-center mxp-justify-center mxp-gap-1 mxp-rounded mxp-border mxp-bg-muted mxp-px-1.5 mxp-font-mono mxp-text-[10px] mxp-font-medium mxp-text-muted-foreground',
        className
      )}
      {...props}
    />
  );
}
Kbd.displayName = 'Kbd';

function KbdGroup({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <kbd
      data-slot="kbd-group"
      className={cn('mxp-inline-flex mxp-items-center mxp-gap-0.5', className)}
      {...props}
    />
  );
}
KbdGroup.displayName = 'KbdGroup';

export { Kbd, KbdGroup };
