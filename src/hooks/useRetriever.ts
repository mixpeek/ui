import { useState, useCallback, useRef } from 'react';
import { useClient } from './useClient';
import { useFeedback } from '../feedback/useFeedback';
import type { MxpDocument, StageEvent } from '../client/types';

export interface UseRetrieverOptions {
  /** Retriever ID to execute. */
  retrieverId: string;
  /** Enable SSE streaming (progressive results). Default: true. */
  stream?: boolean;
  /** Max results. Default: 20. */
  limit?: number;
}

export interface UseRetrieverReturn {
  /** Current results. */
  results: MxpDocument[];
  /** Loading state. */
  isLoading: boolean;
  /** Error message if execution failed. */
  error: string | null;
  /** Stage events received during streaming. */
  stages: StageEvent[];
  /** Execute the retriever with a query. */
  execute: (query: string, inputs?: Record<string, unknown>) => Promise<void>;
  /** Cancel the current execution. */
  cancel: () => void;
}

/**
 * Hook to execute a Mixpeek retriever with optional SSE streaming.
 *
 * @example
 * ```tsx
 * const { results, isLoading, execute } = useRetriever({ retrieverId: 'ret_abc' });
 * execute('search query');
 * ```
 */
export function useRetriever(opts: UseRetrieverOptions): UseRetrieverReturn {
  const client = useClient();
  const { emitFeedback } = useFeedback();
  const [results, setResults] = useState<MxpDocument[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [stages, setStages] = useState<StageEvent[]>([]);
  const abortRef = useRef<AbortController | null>(null);

  const cancel = useCallback(() => {
    abortRef.current?.abort();
    abortRef.current = null;
  }, []);

  const execute = useCallback(
    async (query: string, inputs?: Record<string, unknown>) => {
      cancel();
      const ac = new AbortController();
      abortRef.current = ac;

      setIsLoading(true);
      setError(null);
      setResults([]);
      setStages([]);

      const startTime = Date.now();

      try {
        const params = {
          query,
          inputs: inputs ?? { query },
          limit: opts.limit ?? 20,
        };

        if (opts.stream !== false) {
          // SSE streaming
          const gen = client.executeRetrieverStream(
            opts.retrieverId,
            params,
            ac.signal
          );
          for await (const event of gen) {
            setStages((prev) => [...prev, event]);
            if (event.results) {
              setResults(event.results);
            }
          }
        } else {
          // Single response
          const result = await client.executeRetriever(
            opts.retrieverId,
            params,
            ac.signal
          );
          setResults(result.results);
        }

        const durationMs = Date.now() - startTime;
        emitFeedback(
          'useRetriever',
          'search',
          { query, durationMs, resultCount: results.length },
          { retrieverId: opts.retrieverId, query }
        );
      } catch (err) {
        if ((err as Error).name !== 'AbortError') {
          const message = err instanceof Error ? err.message : 'Retriever execution failed';
          setError(message);
          emitFeedback(
            'useRetriever',
            'error',
            { query, error: message },
            { retrieverId: opts.retrieverId, query }
          );
        }
      } finally {
        setIsLoading(false);
      }
    },
    [client, opts.retrieverId, opts.stream, opts.limit, cancel, emitFeedback]
  );

  return { results, isLoading, error, stages, execute, cancel };
}
