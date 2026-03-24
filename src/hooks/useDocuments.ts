import { useState, useCallback, useEffect, useRef } from 'react';
import { useClient } from './useClient';
import type { MxpDocument } from '../client/types';

export interface UseDocumentsOptions {
  /** Collection ID to list documents from. */
  collectionId: string;
  /** Page size. Default: 20. */
  pageSize?: number;
  /** Whether to fetch on mount. Default: true. */
  autoFetch?: boolean;
}

export interface UseDocumentsReturn {
  documents: MxpDocument[];
  total: number;
  page: number;
  isLoading: boolean;
  error: string | null;
  fetchPage: (page: number) => Promise<void>;
  refresh: () => Promise<void>;
}

/**
 * Hook to list documents from a Mixpeek collection with pagination.
 *
 * @example
 * ```tsx
 * const { documents, isLoading, fetchPage } = useDocuments({ collectionId: 'col_abc' });
 * ```
 */
export function useDocuments(opts: UseDocumentsOptions): UseDocumentsReturn {
  const client = useClient();
  const [documents, setDocuments] = useState<MxpDocument[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const mountedRef = useRef(true);

  const fetchPage = useCallback(
    async (p: number) => {
      setIsLoading(true);
      setError(null);
      try {
        const resp = await client.listDocuments(opts.collectionId, {
          page: p,
          pageSize: opts.pageSize ?? 20,
        });
        if (mountedRef.current) {
          setDocuments(resp.results);
          setTotal(resp.total ?? resp.results.length);
          setPage(p);
        }
      } catch (err) {
        if (mountedRef.current) {
          setError(err instanceof Error ? err.message : 'Failed to fetch documents');
        }
      } finally {
        if (mountedRef.current) setIsLoading(false);
      }
    },
    [client, opts.collectionId, opts.pageSize]
  );

  const refresh = useCallback(() => fetchPage(page), [fetchPage, page]);

  useEffect(() => {
    mountedRef.current = true;
    if (opts.autoFetch !== false) {
      fetchPage(1);
    }
    return () => {
      mountedRef.current = false;
    };
  }, [opts.collectionId]);

  return { documents, total, page, isLoading, error, fetchPage, refresh };
}
