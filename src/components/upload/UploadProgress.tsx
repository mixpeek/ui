import React from 'react';
import { Loader2, CheckCircle, AlertCircle, Clock } from 'lucide-react';
import { Card, CardContent } from '../../primitives/card';
import { Progress } from '../../primitives/progress';
import { Badge } from '../../primitives/badge';
import { useBatchStatus } from '../../hooks/useBatchStatus';
import { cn } from '../../lib/cn';

export interface UploadProgressProps {
  /** Batch ID to monitor. */
  batchId: string | null;
  /** Polling interval in ms. Default: 3000. */
  pollIntervalMs?: number;
  /** Additional CSS classes. */
  className?: string;
}

/**
 * Displays real-time batch processing status after upload.
 *
 * @example
 * ```tsx
 * <UploadProgress batchId={batchId} />
 * ```
 */
export const UploadProgress: React.FC<UploadProgressProps> = ({
  batchId,
  pollIntervalMs,
  className,
}) => {
  const { status, isPolling } = useBatchStatus({ batchId, pollIntervalMs });

  if (!batchId || !status) return null;

  const pct = status.total_objects
    ? Math.round(((status.processed_objects ?? 0) / status.total_objects) * 100)
    : 0;

  const StatusIcon = {
    pending: Clock,
    processing: Loader2,
    completed: CheckCircle,
    failed: AlertCircle,
    partial: AlertCircle,
  }[status.status];

  const statusColor = {
    pending: 'secondary',
    processing: 'default',
    completed: 'default',
    failed: 'destructive',
    partial: 'outline',
  }[status.status] as 'default' | 'secondary' | 'destructive' | 'outline';

  return (
    <Card className={cn('mxp-overflow-hidden', className)}>
      <CardContent className="mxp-p-4 mxp-space-y-3">
        <div className="mxp-flex mxp-items-center mxp-justify-between">
          <div className="mxp-flex mxp-items-center mxp-gap-2">
            <StatusIcon className={cn('mxp-h-4 mxp-w-4', status.status === 'processing' && 'mxp-animate-spin')} />
            <span className="mxp-text-sm mxp-font-medium">Batch {status.batch_id}</span>
          </div>
          <Badge variant={statusColor}>{status.status}</Badge>
        </div>

        {status.total_objects !== undefined && (
          <>
            <Progress value={pct} className="mxp-h-2" />
            <div className="mxp-flex mxp-justify-between mxp-text-xs mxp-text-muted-foreground">
              <span>{status.processed_objects ?? 0} / {status.total_objects} processed</span>
              {status.failed_objects ? <span className="mxp-text-destructive">{status.failed_objects} failed</span> : null}
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};
