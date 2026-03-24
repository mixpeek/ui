import * as React from 'react';
import { cn } from '../lib/cn';

function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('mxp-animate-pulse mxp-rounded-md mxp-bg-muted', className)}
      {...props}
    />
  );
}

export { Skeleton };
