import React, { useMemo, useEffect, useRef } from 'react';
import { MxpContext } from './MxpContext';
import type { MxpConfig, MxpContextValue } from './types';
import { FeedbackCollector } from '../feedback/FeedbackCollector';
import { FeedbackProvider } from '../feedback/FeedbackContext';

const DEFAULT_BASE_URL = 'https://api.mixpeek.com';

/**
 * Root provider for @mixpeek/ui. Wraps your app with API config and feedback collection.
 *
 * @example
 * ```tsx
 * <MxpProvider apiKey="mxp_sk_..." namespace="ns_abc123">
 *   <App />
 * </MxpProvider>
 * ```
 *
 * @example Canvas app with server-injected credentials:
 * ```tsx
 * <MxpProvider apiKey={window.__MIXPEEK__?.apiKey} namespace="ns_..." baseUrl="/_api">
 *   <App />
 * </MxpProvider>
 * ```
 */
export const MxpProvider: React.FC<MxpConfig & { children: React.ReactNode }> = ({
  apiKey,
  namespace,
  baseUrl,
  feedback,
  children,
}) => {
  const resolvedBaseUrl = baseUrl ?? DEFAULT_BASE_URL;

  const ctxValue = useMemo<MxpContextValue>(
    () => ({
      config: { apiKey, namespace, baseUrl: resolvedBaseUrl, feedback },
      apiKey,
      namespace,
      baseUrl: resolvedBaseUrl,
    }),
    [apiKey, namespace, resolvedBaseUrl, feedback]
  );

  // Feedback collector lifecycle
  const collectorRef = useRef<FeedbackCollector | null>(null);

  const collector = useMemo(() => {
    const enabled = feedback?.enabled !== false;
    if (!enabled) return null;

    return new FeedbackCollector({
      enabled: true,
      batchSize: feedback?.batchSize ?? 10,
      flushIntervalMs: feedback?.flushIntervalMs ?? 30000,
      endpoint: feedback?.endpoint ?? `${resolvedBaseUrl}/v1/feedback/events`,
      onFlush: feedback?.onFlush,
      apiKey,
      namespace,
    });
  }, [apiKey, namespace, resolvedBaseUrl, feedback]);

  // Cleanup previous collector on re-create
  useEffect(() => {
    const prev = collectorRef.current;
    collectorRef.current = collector;
    return () => {
      prev?.destroy();
    };
  }, [collector]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      collectorRef.current?.destroy();
    };
  }, []);

  return React.createElement(
    MxpContext.Provider,
    { value: ctxValue },
    React.createElement(FeedbackProvider, { collector, children })
  );
};
