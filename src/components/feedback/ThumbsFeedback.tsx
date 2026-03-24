import React, { useState } from 'react';
import { ThumbsUp, ThumbsDown } from 'lucide-react';
import { Button } from '../../primitives/button';
import { useFeedback } from '../../feedback/useFeedback';
import { cn } from '../../lib/cn';

export interface ThumbsFeedbackProps {
  /** Document ID this feedback is about. */
  documentId?: string;
  /** Retriever that produced the result. */
  retrieverId?: string;
  /** Search query context. */
  query?: string;
  /** Result position. */
  position?: number;
  /** Called when user gives feedback. */
  onFeedback?: (value: 'up' | 'down') => void;
  /** Additional CSS classes. */
  className?: string;
}

/**
 * Thumbs up/down feedback buttons. Emits structured feedback events
 * that an LLM can use to tune retriever quality.
 *
 * @example
 * ```tsx
 * <ThumbsFeedback documentId={doc.document_id} retrieverId="ret_abc" />
 * ```
 */
export const ThumbsFeedback: React.FC<ThumbsFeedbackProps> = ({
  documentId,
  retrieverId,
  query,
  position,
  onFeedback,
  className,
}) => {
  const [selected, setSelected] = useState<'up' | 'down' | null>(null);
  const { emitFeedback } = useFeedback();

  const handleClick = (value: 'up' | 'down') => {
    setSelected(value);
    emitFeedback(
      'ThumbsFeedback',
      value === 'up' ? 'thumbs_up' : 'thumbs_down',
      { documentId, value },
      { retrieverId, documentId, query, resultPosition: position }
    );
    onFeedback?.(value);
  };

  return (
    <div className={cn('mxp-flex mxp-items-center mxp-gap-1', className)}>
      <Button
        variant="ghost"
        size="icon"
        className={cn('mxp-h-7 mxp-w-7', selected === 'up' && 'mxp-text-green-600')}
        onClick={(e) => { e.stopPropagation(); handleClick('up'); }}
      >
        <ThumbsUp className="mxp-h-3.5 mxp-w-3.5" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className={cn('mxp-h-7 mxp-w-7', selected === 'down' && 'mxp-text-destructive')}
        onClick={(e) => { e.stopPropagation(); handleClick('down'); }}
      >
        <ThumbsDown className="mxp-h-3.5 mxp-w-3.5" />
      </Button>
    </div>
  );
};
