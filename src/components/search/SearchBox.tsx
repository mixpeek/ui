import React, { useState, useCallback, useRef } from 'react';
import { Search, X, Loader2 } from 'lucide-react';
import { Input } from '../../primitives/input';
import { Button } from '../../primitives/button';
import { useRetriever } from '../../hooks/useRetriever';
import { useFeedback } from '../../feedback/useFeedback';
import { cn } from '../../lib/cn';
import type { MxpDocument, StageEvent } from '../../client/types';

export interface SearchBoxProps {
  /** Retriever ID to execute on search. */
  retrieverId: string;
  /** Placeholder text. */
  placeholder?: string;
  /** Max results to return. */
  limit?: number;
  /** Enable SSE streaming. Default: true. */
  stream?: boolean;
  /** Called when results arrive. */
  onResults?: (results: MxpDocument[]) => void;
  /** Called on each streaming stage event. */
  onStage?: (stage: StageEvent) => void;
  /** Called on error. */
  onError?: (error: string) => void;
  /** Additional CSS classes. */
  className?: string;
  /** Auto-focus the input. */
  autoFocus?: boolean;
}

/**
 * Search input that executes a Mixpeek retriever on submit.
 * Emits structured feedback for every search interaction.
 *
 * @example
 * ```tsx
 * <SearchBox
 *   retrieverId="ret_abc123"
 *   placeholder="Search videos..."
 *   onResults={(docs) => setResults(docs)}
 * />
 * ```
 */
export const SearchBox: React.FC<SearchBoxProps> = ({
  retrieverId,
  placeholder = 'Search...',
  limit = 20,
  stream = true,
  onResults,
  onStage,
  onError,
  className,
  autoFocus,
}) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const { emitFeedback } = useFeedback();

  const { results, isLoading, error, stages, execute } = useRetriever({
    retrieverId,
    stream,
    limit,
  });

  // Forward results/stages/errors to callbacks
  const prevResultsRef = useRef<MxpDocument[]>([]);
  if (results !== prevResultsRef.current) {
    prevResultsRef.current = results;
    onResults?.(results);
  }

  const prevStagesRef = useRef<StageEvent[]>([]);
  if (stages.length > prevStagesRef.current.length) {
    const newStages = stages.slice(prevStagesRef.current.length);
    newStages.forEach((s) => onStage?.(s));
    prevStagesRef.current = stages;
  }

  if (error) {
    onError?.(error);
  }

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (!query.trim()) return;
      execute(query.trim());
      emitFeedback(
        'SearchBox',
        'search',
        { query: query.trim(), retrieverId },
        { retrieverId, query: query.trim() }
      );
    },
    [query, execute, emitFeedback, retrieverId]
  );

  const handleClear = useCallback(() => {
    setQuery('');
    inputRef.current?.focus();
    emitFeedback('SearchBox', 'clear', { retrieverId }, { retrieverId });
  }, [emitFeedback, retrieverId]);

  return (
    <form onSubmit={handleSubmit} className={cn('mxp-flex mxp-gap-2', className)}>
      <div className="mxp-relative mxp-flex-1">
        <Search className="mxp-absolute mxp-left-3 mxp-top-1/2 mxp--translate-y-1/2 mxp-h-4 mxp-w-4 mxp-text-muted-foreground" />
        <Input
          ref={inputRef}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className="mxp-pl-9 mxp-pr-8"
          autoFocus={autoFocus}
          disabled={isLoading}
        />
        {query && (
          <button
            type="button"
            onClick={handleClear}
            className="mxp-absolute mxp-right-2 mxp-top-1/2 mxp--translate-y-1/2 mxp-rounded-sm mxp-p-1 mxp-text-muted-foreground hover:mxp-text-foreground"
          >
            <X className="mxp-h-3 mxp-w-3" />
          </button>
        )}
      </div>
      <Button type="submit" disabled={isLoading || !query.trim()}>
        {isLoading ? <Loader2 className="mxp-h-4 mxp-w-4 mxp-animate-spin" /> : 'Search'}
      </Button>
    </form>
  );
};
