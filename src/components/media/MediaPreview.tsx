import React from 'react';
import { FileText, Film, Music, Image as ImageIcon } from 'lucide-react';
import { cn } from '../../lib/cn';
import type { MxpDocument } from '../../client/types';

export interface MediaPreviewProps {
  /** Document to preview. */
  document: MxpDocument;
  /** Width of the preview. */
  width?: string | number;
  /** Height of the preview. */
  height?: string | number;
  /** Additional CSS classes. */
  className?: string;
}

/**
 * Auto-detects media type from document metadata and renders appropriate preview.
 *
 * @example
 * ```tsx
 * <MediaPreview document={doc} width={400} height={300} />
 * ```
 */
export const MediaPreview: React.FC<MediaPreviewProps> = ({
  document,
  width,
  height,
  className,
}) => {
  const modality = document._internal?.modality;
  const mimeType = document._internal?.mime_type;
  const url = document._internal?.source_blobs?.[0]?.url;

  const style = { width, height };

  if (!url) {
    const Icon = getModalityIcon(modality);
    return (
      <div
        className={cn('mxp-flex mxp-items-center mxp-justify-center mxp-bg-muted mxp-rounded-lg', className)}
        style={style}
      >
        <Icon className="mxp-h-12 mxp-w-12 mxp-text-muted-foreground" />
      </div>
    );
  }

  if (modality === 'image' || mimeType?.startsWith('image/')) {
    return <img src={url} alt="" className={cn('mxp-object-cover mxp-rounded-lg', className)} style={style} loading="lazy" />;
  }

  if (modality === 'video' || mimeType?.startsWith('video/')) {
    return (
      <video
        src={url}
        controls
        className={cn('mxp-rounded-lg', className)}
        style={style}
        preload="metadata"
      />
    );
  }

  if (modality === 'audio' || mimeType?.startsWith('audio/')) {
    return (
      <div className={cn('mxp-flex mxp-items-center mxp-gap-2', className)} style={style}>
        <Music className="mxp-h-6 mxp-w-6 mxp-text-muted-foreground mxp-shrink-0" />
        <audio src={url} controls className="mxp-w-full" preload="metadata" />
      </div>
    );
  }

  // Fallback: link
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={cn('mxp-flex mxp-items-center mxp-gap-2 mxp-text-sm mxp-text-primary hover:mxp-underline', className)}
    >
      <FileText className="mxp-h-4 mxp-w-4" />
      View file
    </a>
  );
};

function getModalityIcon(modality?: string) {
  switch (modality) {
    case 'image': return ImageIcon;
    case 'video': return Film;
    case 'audio': return Music;
    default: return FileText;
  }
}
