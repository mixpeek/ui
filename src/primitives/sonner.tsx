import * as React from 'react';
import { Toaster as Sonner } from 'sonner';

import { cn } from '../lib/cn';

type ToasterProps = React.ComponentProps<typeof Sonner> & {
  theme?: 'light' | 'dark' | 'system';
};

const Toaster = ({ theme = 'system', className, ...props }: ToasterProps) => {
  return (
    <Sonner
      theme={theme}
      className={cn('mxp-toaster mxp-group', className)}
      toastOptions={{
        classNames: {
          toast:
            'mxp-group mxp-toast group-[.mxp-toaster]:mxp-bg-background group-[.mxp-toaster]:mxp-text-foreground group-[.mxp-toaster]:mxp-border-border group-[.mxp-toaster]:mxp-shadow-lg',
          description: 'group-[.mxp-toast]:mxp-text-muted-foreground',
          actionButton:
            'group-[.mxp-toast]:mxp-bg-primary group-[.mxp-toast]:mxp-text-primary-foreground',
          cancelButton:
            'group-[.mxp-toast]:mxp-bg-muted group-[.mxp-toast]:mxp-text-muted-foreground',
        },
      }}
      {...props}
    />
  );
};
Toaster.displayName = 'Toaster';

export { Toaster };
export { toast } from 'sonner';
