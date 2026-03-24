import React, { useState, useCallback, useRef } from 'react';
import { Upload } from 'lucide-react';
import { useBucketUpload } from '../../hooks/useBucketUpload';
import { Progress } from '../../primitives/progress';
import { cn } from '../../lib/cn';

export interface DropZoneProps {
  /** Bucket ID to upload to. */
  bucketId: string;
  /** Accepted file types. */
  accept?: string;
  /** Called per successful upload. */
  onUpload?: (objectId: string, file: File) => void;
  /** Called on error. */
  onError?: (error: string) => void;
  /** Additional CSS classes. */
  className?: string;
  /** Custom children to render inside the zone. */
  children?: React.ReactNode;
}

/**
 * Drag-and-drop upload zone for Mixpeek bucket uploads.
 *
 * @example
 * ```tsx
 * <DropZone bucketId="bkt_abc" onUpload={(id) => console.log(id)}>
 *   Drop files here
 * </DropZone>
 * ```
 */
export const DropZone: React.FC<DropZoneProps> = ({
  bucketId,
  accept,
  onUpload,
  onError,
  className,
  children,
}) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const { isUploading, progress, upload } = useBucketUpload({ bucketId });
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrop = useCallback(
    async (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragOver(false);
      const files = Array.from(e.dataTransfer.files);
      for (const file of files) {
        const id = await upload(file);
        if (id) onUpload?.(id, file);
        else onError?.('Upload failed');
      }
    },
    [upload, onUpload, onError]
  );

  const handleFileSelect = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = Array.from(e.target.files ?? []);
      for (const file of files) {
        const id = await upload(file);
        if (id) onUpload?.(id, file);
        else onError?.('Upload failed');
      }
      if (inputRef.current) inputRef.current.value = '';
    },
    [upload, onUpload, onError]
  );

  return (
    <div
      className={cn(
        'mxp-relative mxp-flex mxp-flex-col mxp-items-center mxp-justify-center mxp-rounded-lg mxp-border-2 mxp-border-dashed mxp-p-8 mxp-transition-colors mxp-cursor-pointer',
        isDragOver
          ? 'mxp-border-primary mxp-bg-primary/5'
          : 'mxp-border-muted-foreground/25 hover:mxp-border-muted-foreground/50',
        isUploading && 'mxp-pointer-events-none mxp-opacity-60',
        className
      )}
      onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
      onDragLeave={() => setIsDragOver(false)}
      onDrop={handleDrop}
      onClick={() => inputRef.current?.click()}
    >
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple
        onChange={handleFileSelect}
        className="mxp-hidden"
      />
      {children ?? (
        <>
          <Upload className="mxp-h-8 mxp-w-8 mxp-text-muted-foreground mxp-mb-2" />
          <p className="mxp-text-sm mxp-text-muted-foreground">
            {isDragOver ? 'Drop files here' : 'Drag & drop or click to upload'}
          </p>
        </>
      )}
      {isUploading && <Progress value={progress} className="mxp-mt-4 mxp-h-2 mxp-w-full mxp-max-w-xs" />}
    </div>
  );
};
