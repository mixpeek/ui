import React from 'react';
import { useFeedback } from '../../feedback/useFeedback';
import { cn } from '../../lib/cn';
import type { MxpDocument } from '../../client/types';

export interface ImageGalleryProps {
  /** Documents with image source blobs. */
  documents: MxpDocument[];
  /** Number of columns. Default: 3. */
  columns?: number;
  /** Called when an image is clicked. */
  onSelect?: (document: MxpDocument) => void;
  /** Additional CSS classes. */
  className?: string;
}

/**
 * Masonry-style image gallery from document results.
 *
 * @example
 * ```tsx
 * <ImageGallery documents={results} columns={4} onSelect={(doc) => openDetail(doc)} />
 * ```
 */
export const ImageGallery: React.FC<ImageGalleryProps> = ({
  documents,
  columns = 3,
  onSelect,
  className,
}) => {
  const { emitFeedback } = useFeedback();

  const images = documents.filter((doc) => {
    const blob = doc._internal?.source_blobs?.[0];
    return blob?.url && blob?.content_type?.startsWith('image/');
  });

  if (images.length === 0) {
    return (
      <div className={cn('mxp-text-center mxp-py-8 mxp-text-sm mxp-text-muted-foreground', className)}>
        No images to display.
      </div>
    );
  }

  return (
    <div
      className={cn('mxp-grid mxp-gap-2', className)}
      style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
    >
      {images.map((doc, i) => {
        const url = doc._internal!.source_blobs![0].url!;
        return (
          <div
            key={doc.document_id || i}
            className={cn(
              'mxp-overflow-hidden mxp-rounded-lg mxp-bg-muted',
              onSelect && 'mxp-cursor-pointer hover:mxp-opacity-80 mxp-transition-opacity'
            )}
            onClick={() => {
              emitFeedback('ImageGallery', 'click', { documentId: doc.document_id, position: i });
              onSelect?.(doc);
            }}
          >
            <img src={url} alt="" className="mxp-w-full mxp-h-auto mxp-object-cover" loading="lazy" />
          </div>
        );
      })}
    </div>
  );
};
