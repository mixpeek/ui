import { useState, useCallback, useEffect, useRef } from 'react';
import { useClient } from './useClient';
import type { BatchStatus } from '../client/types';

export interface UseBatchStatusOptions {
  /** Batch ID to monitor. */
  batchId: string | null;
  /** Polling interval in ms. Default: 3000. */
  pollIntervalMs?: number;
  /** Whether to start polling immediately. Default: true if batchId is set. */
  enabled?: boolean;
}

export interface UseBatchStatusReturn {
  status: BatchStatus | null;
  isPolling: boolean;
  error: string | null;
  /** Manually refresh the status. */
  refresh: () => Promise<void>;
}

/**
 * Hook to poll batch processing status until completion.
 *
 * @example
 * ```tsx
 * const { status, isPolling } = useBatchStatus({ batchId: 'batch_abc' });
 * // status.status === 'completed' when done
 * ```
 */
export function useBatchStatus(opts: UseBatchStatusOptions): UseBatchStatusReturn {
  const client = useClient();
  const [status, setStatus] = useState<BatchStatus | null>(null);
  const [isPolling, setIsPolling] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const refresh = useCallback(async () => {
    if (!opts.batchId) return;
    try {
      const s = await client.getBatchStatus(opts.batchId);
      setStatus(s);
      setError(null);

      // Stop polling on terminal states
      if (s.status === 'completed' || s.status === 'failed') {
        if (timerRef.current) {
          clearInterval(timerRef.current);
          timerRef.current = null;
          setIsPolling(false);
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to get batch status');
    }
  }, [client, opts.batchId]);

  useEffect(() => {
    if (!opts.batchId || opts.enabled === false) return;

    setIsPolling(true);
    refresh();

    timerRef.current = setInterval(refresh, opts.pollIntervalMs ?? 3000);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      setIsPolling(false);
    };
  }, [opts.batchId, opts.enabled, opts.pollIntervalMs, refresh]);

  return { status, isPolling, error, refresh };
}
