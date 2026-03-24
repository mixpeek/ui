import React from 'react';
import { Card, CardContent } from '../../primitives/card';
import { Badge } from '../../primitives/badge';
import { useFeedback } from '../../feedback/useFeedback';
import { cn } from '../../lib/cn';
import type { MxpDocument } from '../../client/types';

export interface ResultCardProps {
  /** The document to display. */
  document: MxpDocument;
  /** Position in the results list (for feedback tracking). */
  position?: number;
  /** Retriever ID (for feedback context). */
  retrieverId?: string;
  /** Query that produced this result (for feedback context). */
  query?: string;
  /** Fields to display as key-value pairs. If omitted, shows all non-internal fields. */
  fields?: string[];
  /** Called when the card is clicked. */
  onClick?: (document: MxpDocument) => void;
  /** Additional CSS classes. */
  className?: string;
  /** Extra content to render inside the card (e.g., ThumbsFeedback). */
  children?: React.ReactNode;
}

/**
 * Card displaying a single search result document.
 * Emits click feedback automatically.
 *
 * @example
 * ```tsx
 * <ResultCard
 *   document={doc}
 *   position={0}
 *   onClick={(doc) => openDetail(doc)}
 * >
 *   <ThumbsFeedback documentId={doc.document_id} />
 * </ResultCard>
 * ```
 */
export const ResultCard: React.FC<ResultCardProps> = ({
  document,
  position,
  retrieverId,
  query,
  fields,
  onClick,
  className,
  children,
}) => {
  const { emitFeedback } = useFeedback();

  const handleClick = () => {
    emitFeedback(
      'ResultCard',
      'click',
      { documentId: document.document_id, position },
      { retrieverId, query, documentId: document.document_id, resultPosition: position }
    );
    onClick?.(document);
  };

  // Extract displayable fields
  const displayFields = getDisplayFields(document, fields);
  const modality = document._internal?.modality;
  const thumbnail = getThumbUrl(document);

  return (
    <Card
      className={cn(
        'mxp-overflow-hidden mxp-transition-shadow hover:mxp-shadow-md',
        onClick && 'mxp-cursor-pointer',
        className
      )}
      onClick={onClick ? handleClick : undefined}
    >
      {thumbnail && (
        <div className="mxp-aspect-video mxp-w-full mxp-overflow-hidden mxp-bg-muted">
          <img
            src={thumbnail}
            alt={document.document_id}
            className="mxp-h-full mxp-w-full mxp-object-cover"
            loading="lazy"
          />
        </div>
      )}
      <CardContent className="mxp-p-4">
        <div className="mxp-flex mxp-items-start mxp-justify-between mxp-gap-2">
          <div className="mxp-min-w-0 mxp-flex-1">
            {displayFields.map(([key, value]) => (
              <div key={key} className="mxp-mb-1">
                <span className="mxp-text-xs mxp-text-muted-foreground">{key}: </span>
                <span className="mxp-text-sm">{String(value)}</span>
              </div>
            ))}
          </div>
          {modality && (
            <Badge variant="secondary" className="mxp-shrink-0 mxp-text-xs">
              {modality}
            </Badge>
          )}
        </div>
        {children}
      </CardContent>
    </Card>
  );
};

function getDisplayFields(
  doc: MxpDocument,
  fields?: string[]
): [string, unknown][] {
  if (fields) {
    return fields.map((f): [string, unknown] => [f, doc[f]]).filter(([, v]) => v !== undefined);
  }
  return Object.entries(doc).filter(
    ([k]) => k !== '_internal' && k !== 'document_id' && k !== 'collection_id'
  ) as [string, unknown][];
}

function getThumbUrl(doc: MxpDocument): string | undefined {
  const blobs = doc._internal?.source_blobs;
  if (!blobs?.length) return undefined;
  const blob = blobs[0];
  if (blob.content_type?.startsWith('image/')) {
    return blob.url;
  }
  return undefined;
}
