import * as React from 'react';
import { GripVertical } from 'lucide-react';
import * as ResizablePrimitive from 'react-resizable-panels';

import { cn } from '../lib/cn';

const ResizablePanelGroup = ({
  className,
  ...props
}: React.ComponentProps<typeof ResizablePrimitive.PanelGroup>) => (
  <ResizablePrimitive.PanelGroup
    className={cn(
      'mxp-flex mxp-h-full mxp-w-full data-[panel-group-direction=vertical]:mxp-flex-col',
      className
    )}
    {...props}
  />
);

const ResizablePanel = ResizablePrimitive.Panel;

const ResizableHandle = ({
  withHandle,
  className,
  ...props
}: React.ComponentProps<typeof ResizablePrimitive.PanelResizeHandle> & {
  withHandle?: boolean;
}) => (
  <ResizablePrimitive.PanelResizeHandle
    className={cn(
      'mxp-relative mxp-flex mxp-w-px mxp-items-center mxp-justify-center mxp-bg-border after:mxp-absolute after:mxp-inset-y-0 after:mxp-left-1/2 after:mxp-w-1 after:mxp--translate-x-1/2 focus-visible:mxp-outline-none focus-visible:mxp-ring-1 focus-visible:mxp-ring-ring focus-visible:mxp-ring-offset-1 data-[panel-group-direction=vertical]:mxp-h-px data-[panel-group-direction=vertical]:mxp-w-full data-[panel-group-direction=vertical]:after:mxp-left-0 data-[panel-group-direction=vertical]:after:mxp-h-1 data-[panel-group-direction=vertical]:after:mxp-w-full data-[panel-group-direction=vertical]:after:mxp--translate-y-1/2 data-[panel-group-direction=vertical]:after:mxp-translate-x-0 [&[data-panel-group-direction=vertical]>div]:mxp-rotate-90',
      className
    )}
    {...props}
  >
    {withHandle && (
      <div className="mxp-z-10 mxp-flex mxp-h-4 mxp-w-3 mxp-items-center mxp-justify-center mxp-rounded-sm mxp-border mxp-bg-border">
        <GripVertical className="mxp-h-2.5 mxp-w-2.5" />
      </div>
    )}
  </ResizablePrimitive.PanelResizeHandle>
);

export { ResizablePanelGroup, ResizablePanel, ResizableHandle };
