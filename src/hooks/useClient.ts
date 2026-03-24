import { useMemo } from 'react';
import { useMxpContext } from '../provider/MxpContext';
import { MxpApiClient } from '../client/MxpApiClient';

/** Returns a memoized MxpApiClient from the provider context. */
export function useClient(): MxpApiClient {
  const { apiKey, baseUrl, namespace } = useMxpContext();
  return useMemo(
    () => new MxpApiClient(apiKey, baseUrl, namespace),
    [apiKey, baseUrl, namespace]
  );
}
