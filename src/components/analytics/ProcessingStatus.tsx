import React from 'react';
import { Loader2, CheckCircle, AlertCircle, Clock } from 'lucide-react';
import { Badge } from '../../primitives/badge';
import { useBatchStatus } from '../../hooks/useBatchStatus';
import { cn } from '../../lib/cn';

export interface ProcessingStatusProps {
  /** Batch ID to monitor. */
  batchId: string | null;
  /** Additional CSS classes. */
  className?: string;
}

/**
 * Compact inline status indicator for batch processing.
 *
 * @example
 * ```tsx
 * <ProcessingStatus batchId={batchId} />
 * ```
 */
export const ProcessingStatus: React.FC<ProcessingStatusProps> = ({ batchId, className }) => {
  const { status } = useBatchStatus({ batchId, pollIntervalMs: 5000 });

  if (!batchId || !status) return null;

  const config = {
    pending: { icon: Clock, color: 'secondary' as const, label: 'Pending' },
    processing: { icon: Loader2, color: 'default' as const, label: 'Processing' },
    completed: { icon: CheckCircle, color: 'outline' as const, label: 'Done' },
    failed: { icon: AlertCircle, color: 'destructive' as const, label: 'Failed' },
    partial: { icon: AlertCircle, color: 'outline' as const, label: 'Partial' },
  }[status.status];

  const Icon = config.icon;

  return (
    <Badge variant={config.color} className={cn('mxp-gap-1', className)}>
      <Icon className={cn('mxp-h-3 mxp-w-3', status.status === 'processing' && 'mxp-animate-spin')} />
      {config.label}
      {status.total_objects !== undefined && (
        <span className="mxp-opacity-70">
          {status.processed_objects ?? 0}/{status.total_objects}
        </span>
      )}
    </Badge>
  );
};
