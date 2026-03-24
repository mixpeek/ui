import type { FeedbackEvent, FeedbackContext, FeedbackMeta } from './types';

function uuid(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export interface FeedbackCollectorConfig {
  enabled: boolean;
  batchSize: number;
  flushIntervalMs: number;
  /** HTTP endpoint to POST batches to. */
  endpoint?: string;
  /** Custom handler — overrides HTTP POST. */
  onFlush?: (events: FeedbackEvent[]) => void | Promise<void>;
  /** API key for Authorization header when POSTing. */
  apiKey?: string;
  /** Namespace header. */
  namespace?: string;
}

/**
 * Collects structured feedback events, batches them, and flushes
 * either via HTTP POST or a custom callback.
 *
 * Each component emits events via `emit()`. The collector batches
 * them and flushes when batchSize is reached or flushIntervalMs elapses.
 *
 * This enables autonomous feedback loops: an LLM can read the flushed
 * events, analyze patterns (low-rated results, frequent errors, abandoned
 * searches), and deterministically improve component config or retriever
 * tuning.
 */
export class FeedbackCollector {
  private buffer: FeedbackEvent[] = [];
  private timer: ReturnType<typeof setInterval> | null = null;
  private config: FeedbackCollectorConfig;
  private sessionId: string;
  private meta: FeedbackMeta;

  constructor(config: FeedbackCollectorConfig) {
    this.config = config;
    this.sessionId = uuid();
    this.meta = {
      sessionId: this.sessionId,
      userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : undefined,
      viewport:
        typeof window !== 'undefined'
          ? { width: window.innerWidth, height: window.innerHeight }
          : undefined,
      url: typeof window !== 'undefined' ? window.location.href : undefined,
    };

    if (config.enabled && config.flushIntervalMs > 0) {
      this.timer = setInterval(() => this.flush(), config.flushIntervalMs);
    }
  }

  /** Emit a feedback event. Auto-populates eventId, timestamp, and meta. */
  emit(
    componentType: string,
    action: string,
    payload: Record<string, unknown> = {},
    context?: FeedbackContext
  ): void {
    if (!this.config.enabled) return;

    const event: FeedbackEvent = {
      eventId: uuid(),
      timestamp: new Date().toISOString(),
      componentType,
      action,
      payload,
      context,
      meta: { ...this.meta },
    };

    this.buffer.push(event);

    if (this.buffer.length >= this.config.batchSize) {
      this.flush();
    }
  }

  /** Flush buffered events. */
  async flush(): Promise<void> {
    if (this.buffer.length === 0) return;

    const batch = this.buffer.splice(0);

    try {
      if (this.config.onFlush) {
        await this.config.onFlush(batch);
      } else if (this.config.endpoint) {
        const headers: Record<string, string> = {
          'Content-Type': 'application/json',
        };
        if (this.config.apiKey) {
          headers['Authorization'] = `Bearer ${this.config.apiKey}`;
        }
        if (this.config.namespace) {
          headers['X-Namespace'] = this.config.namespace;
        }

        await fetch(this.config.endpoint, {
          method: 'POST',
          headers,
          body: JSON.stringify({ events: batch }),
        }).catch(() => {
          // Silently fail — feedback is best-effort
        });
      }
    } catch {
      // Best-effort: don't break the app for feedback failures
    }
  }

  /** Stop the auto-flush timer and flush remaining events. */
  destroy(): void {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
    this.flush();
  }
}
