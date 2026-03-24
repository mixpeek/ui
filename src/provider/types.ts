import type { FeedbackEvent } from '../feedback/types';

/** Configuration for the MxpProvider context. */
export interface MxpConfig {
  /** Mixpeek API key (mxp_sk_... or ret_sk_...) */
  apiKey: string;
  /** Namespace ID (ns_...) */
  namespace?: string;
  /** API base URL. Defaults to https://api.mixpeek.com. Canvas apps use /_api. */
  baseUrl?: string;
  /** Feedback collection configuration. */
  feedback?: {
    /** Whether feedback collection is enabled. Default: true. */
    enabled?: boolean;
    /** Custom endpoint to POST feedback batches. Default: POST /v1/feedback/events */
    endpoint?: string;
    /** Number of events to buffer before flushing. Default: 10. */
    batchSize?: number;
    /** Max ms between auto-flushes. Default: 30000 (30s). */
    flushIntervalMs?: number;
    /** Custom flush handler — replaces HTTP POST. */
    onFlush?: (events: FeedbackEvent[]) => void | Promise<void>;
  };
}

export interface MxpContextValue {
  config: MxpConfig;
  apiKey: string;
  namespace: string | undefined;
  baseUrl: string;
}
