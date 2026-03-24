/** A structured feedback event emitted by any API-bound component. */
export interface FeedbackEvent {
  /** Auto-generated event ID (uuid v4). */
  eventId: string;
  /** ISO-8601 timestamp. */
  timestamp: string;
  /** Component type that emitted this event. */
  componentType: string;
  /** Action name (search, click, upload, thumbs_up, thumbs_down, rating, dismiss, error, etc.). */
  action: string;
  /** Component-specific payload. */
  payload: Record<string, unknown>;
  /** Contextual identifiers for the event. */
  context?: FeedbackContext;
  /** Auto-populated environment metadata. */
  meta?: FeedbackMeta;
}

export interface FeedbackContext {
  retrieverId?: string;
  collectionId?: string;
  documentId?: string;
  query?: string;
  resultPosition?: number;
}

export interface FeedbackMeta {
  userAgent?: string;
  viewport?: { width: number; height: number };
  sessionId?: string;
  url?: string;
}
