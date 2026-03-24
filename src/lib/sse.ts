/** Parse a Server-Sent Events stream into typed events. */
export interface SSEEvent<T = unknown> {
  event?: string;
  data: T;
  id?: string;
  retry?: number;
}

/**
 * Reads an SSE stream from a fetch Response and yields parsed events.
 * Handles `data:` lines, multi-line data, and named events.
 */
export async function* parseSSEStream<T = unknown>(
  response: Response
): AsyncGenerator<SSEEvent<T>> {
  const reader = response.body?.getReader();
  if (!reader) return;

  const decoder = new TextDecoder();
  let buffer = '';
  let currentEvent: string | undefined;
  let dataLines: string[] = [];

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split('\n');
      buffer = lines.pop() ?? '';

      for (const line of lines) {
        if (line.startsWith('event:')) {
          currentEvent = line.slice(6).trim();
        } else if (line.startsWith('data:')) {
          dataLines.push(line.slice(5).trim());
        } else if (line === '') {
          // Empty line = event boundary
          if (dataLines.length > 0) {
            const raw = dataLines.join('\n');
            try {
              const data = JSON.parse(raw) as T;
              yield { event: currentEvent, data };
            } catch {
              yield { event: currentEvent, data: raw as unknown as T };
            }
          }
          currentEvent = undefined;
          dataLines = [];
        }
      }
    }

    // Flush remaining
    if (dataLines.length > 0) {
      const raw = dataLines.join('\n');
      try {
        const data = JSON.parse(raw) as T;
        yield { event: currentEvent, data };
      } catch {
        yield { event: currentEvent, data: raw as unknown as T };
      }
    }
  } finally {
    reader.releaseLock();
  }
}
