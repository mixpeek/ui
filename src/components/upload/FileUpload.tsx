import React, { useCallback, useRef } from 'react';
import { Upload, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '../../primitives/button';
import { Progress } from '../../primitives/progress';
import { useBucketUpload } from '../../hooks/useBucketUpload';
import { cn } from '../../lib/cn';

export interface FileUploadProps {
  /** Bucket ID to upload to. */
  bucketId: string;
  /** Accepted file types (e.g., "image/*,video/*"). */
  accept?: string;
  /** Called on successful upload with the object ID. */
  onUpload?: (objectId: string) => void;
  /** Called on upload error. */
  onError?: (error: string) => void;
  /** Additional CSS classes. */
  className?: string;
}

/**
 * File upload button with progress tracking. Uploads to a Mixpeek bucket via presigned URLs.
 *
 * @example
 * ```tsx
 * <FileUpload bucketId="bkt_abc" accept="video/*" onUpload={(id) => console.log(id)} />
 * ```
 */
export const FileUpload: React.FC<FileUploadProps> = ({
  bucketId,
  accept,
  onUpload,
  onError,
  className,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { isUploading, progress, error, objectId, upload, reset } = useBucketUpload({ bucketId });

  const handleChange = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;
      const id = await upload(file);
      if (id) onUpload?.(id);
      else if (error) onError?.(error);
      // Reset file input
      if (inputRef.current) inputRef.current.value = '';
    },
    [upload, onUpload, onError, error]
  );

  return (
    <div className={cn('mxp-space-y-2', className)}>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        onChange={handleChange}
        className="mxp-hidden"
        disabled={isUploading}
      />

      {objectId ? (
        <div className="mxp-flex mxp-items-center mxp-gap-2 mxp-text-sm mxp-text-green-600">
          <CheckCircle className="mxp-h-4 mxp-w-4" />
          <span>Uploaded: {objectId}</span>
          <Button variant="ghost" size="sm" onClick={reset}>
            Upload another
          </Button>
        </div>
      ) : error ? (
        <div className="mxp-flex mxp-items-center mxp-gap-2 mxp-text-sm mxp-text-destructive">
          <AlertCircle className="mxp-h-4 mxp-w-4" />
          <span>{error}</span>
          <Button variant="ghost" size="sm" onClick={reset}>
            Retry
          </Button>
        </div>
      ) : (
        <Button
          variant="outline"
          onClick={() => inputRef.current?.click()}
          disabled={isUploading}
        >
          {isUploading ? (
            <Loader2 className="mxp-h-4 mxp-w-4 mxp-animate-spin" />
          ) : (
            <Upload className="mxp-h-4 mxp-w-4" />
          )}
          {isUploading ? 'Uploading...' : 'Upload File'}
        </Button>
      )}

      {isUploading && <Progress value={progress} className="mxp-h-2" />}
    </div>
  );
};
