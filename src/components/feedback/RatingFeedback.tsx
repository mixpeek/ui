import React, { useState } from 'react';
import { Star } from 'lucide-react';
import { useFeedback } from '../../feedback/useFeedback';
import { cn } from '../../lib/cn';

export interface RatingFeedbackProps {
  /** Document ID this feedback is about. */
  documentId?: string;
  /** Retriever context. */
  retrieverId?: string;
  /** Search query context. */
  query?: string;
  /** Max stars. Default: 5. */
  maxRating?: number;
  /** Called when user rates. */
  onRate?: (rating: number) => void;
  /** Additional CSS classes. */
  className?: string;
}

/**
 * Star rating feedback component. Emits structured events for result quality tracking.
 *
 * @example
 * ```tsx
 * <RatingFeedback documentId={doc.document_id} onRate={(r) => console.log(r)} />
 * ```
 */
export const RatingFeedback: React.FC<RatingFeedbackProps> = ({
  documentId,
  retrieverId,
  query,
  maxRating = 5,
  onRate,
  className,
}) => {
  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(0);
  const { emitFeedback } = useFeedback();

  const handleRate = (value: number) => {
    setRating(value);
    emitFeedback(
      'RatingFeedback',
      'rating',
      { documentId, rating: value, maxRating },
      { retrieverId, documentId, query }
    );
    onRate?.(value);
  };

  return (
    <div className={cn('mxp-flex mxp-items-center mxp-gap-0.5', className)}>
      {Array.from({ length: maxRating }, (_, i) => {
        const value = i + 1;
        const filled = value <= (hovered || rating);
        return (
          <button
            key={value}
            type="button"
            onClick={(e) => { e.stopPropagation(); handleRate(value); }}
            onMouseEnter={() => setHovered(value)}
            onMouseLeave={() => setHovered(0)}
            className="mxp-p-0.5 mxp-transition-colors"
          >
            <Star
              className={cn(
                'mxp-h-4 mxp-w-4',
                filled ? 'mxp-fill-yellow-400 mxp-text-yellow-400' : 'mxp-text-muted-foreground'
              )}
            />
          </button>
        );
      })}
    </div>
  );
};
