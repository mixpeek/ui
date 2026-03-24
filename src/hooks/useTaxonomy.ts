import { useState, useEffect, useRef } from 'react';
import { useClient } from './useClient';
import type { TaxonomyNode } from '../client/types';

export interface UseTaxonomyReturn {
  taxonomies: TaxonomyNode[];
  isLoading: boolean;
  error: string | null;
}

/**
 * Hook to fetch the taxonomy tree from the current namespace.
 *
 * @example
 * ```tsx
 * const { taxonomies, isLoading } = useTaxonomy();
 * ```
 */
export function useTaxonomy(): UseTaxonomyReturn {
  const client = useClient();
  const [taxonomies, setTaxonomies] = useState<TaxonomyNode[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;
    setIsLoading(true);

    client
      .listTaxonomies()
      .then((resp) => {
        if (mountedRef.current) {
          setTaxonomies(resp.results);
          setError(null);
        }
      })
      .catch((err) => {
        if (mountedRef.current) {
          setError(err instanceof Error ? err.message : 'Failed to fetch taxonomies');
        }
      })
      .finally(() => {
        if (mountedRef.current) setIsLoading(false);
      });

    return () => {
      mountedRef.current = false;
    };
  }, [client]);

  return { taxonomies, isLoading, error };
}
