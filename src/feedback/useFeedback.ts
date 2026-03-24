import { useCallback } from 'react';
import { useFeedbackCollector } from './FeedbackContext';
import type { FeedbackContext } from './types';

/**
 * Hook to emit structured feedback events from any component.
 *
 * @example
 * ```tsx
 * const { emitFeedback } = useFeedback();
 * emitFeedback('SearchBox', 'search', { query: 'cats' }, { retrieverId: 'ret_123' });
 * ```
 */
export function useFeedback() {
  const collector = useFeedbackCollector();

  const emitFeedback = useCallback(
    (
      componentType: string,
      action: string,
      payload: Record<string, unknown> = {},
      context?: FeedbackContext
    ) => {
      collector?.emit(componentType, action, payload, context);
    },
    [collector]
  );

  return { emitFeedback, collector };
}
