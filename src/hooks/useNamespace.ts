import { useState, useEffect, useRef } from 'react';
import { useClient } from './useClient';
import type { NamespaceInfo } from '../client/types';

export interface UseNamespaceReturn {
  namespace: NamespaceInfo | null;
  isLoading: boolean;
  error: string | null;
}

/**
 * Hook to fetch info about the current namespace.
 *
 * @example
 * ```tsx
 * const { namespace, isLoading } = useNamespace();
 * ```
 */
export function useNamespace(): UseNamespaceReturn {
  const client = useClient();
  const [namespace, setNamespace] = useState<NamespaceInfo | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;
    setIsLoading(true);

    client
      .getNamespace()
      .then((info) => {
        if (mountedRef.current) {
          setNamespace(info);
          setError(null);
        }
      })
      .catch((err) => {
        if (mountedRef.current) {
          setError(err instanceof Error ? err.message : 'Failed to fetch namespace');
        }
      })
      .finally(() => {
        if (mountedRef.current) setIsLoading(false);
      });

    return () => {
      mountedRef.current = false;
    };
  }, [client]);

  return { namespace, isLoading, error };
}
