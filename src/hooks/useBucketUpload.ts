import { useState, useCallback } from 'react';
import { useClient } from './useClient';
import { useFeedback } from '../feedback/useFeedback';

export interface UseBucketUploadOptions {
  /** Target bucket ID. */
  bucketId: string;
}

export interface UploadState {
  isUploading: boolean;
  progress: number;
  error: string | null;
  objectId: string | null;
}

export interface UseBucketUploadReturn extends UploadState {
  /** Upload a file to the bucket. Returns the object ID on success. */
  upload: (file: File) => Promise<string | null>;
  /** Reset state for next upload. */
  reset: () => void;
}

/**
 * Hook to upload files to a Mixpeek bucket via presigned URLs.
 *
 * @example
 * ```tsx
 * const { upload, isUploading, progress } = useBucketUpload({ bucketId: 'bkt_abc' });
 * const objectId = await upload(file);
 * ```
 */
export function useBucketUpload(opts: UseBucketUploadOptions): UseBucketUploadReturn {
  const client = useClient();
  const { emitFeedback } = useFeedback();
  const [state, setState] = useState<UploadState>({
    isUploading: false,
    progress: 0,
    error: null,
    objectId: null,
  });

  const reset = useCallback(() => {
    setState({ isUploading: false, progress: 0, error: null, objectId: null });
  }, []);

  const upload = useCallback(
    async (file: File): Promise<string | null> => {
      setState({ isUploading: true, progress: 0, error: null, objectId: null });

      try {
        // Step 1: Get presigned URL
        setState((s) => ({ ...s, progress: 10 }));
        const presigned = await client.getPresignedUploadUrl(
          opts.bucketId,
          file.name,
          file.type
        );

        // Step 2: Upload to presigned URL
        setState((s) => ({ ...s, progress: 30 }));
        await client.uploadToPresignedUrl(presigned.upload_url, file, presigned.fields);

        setState({
          isUploading: false,
          progress: 100,
          error: null,
          objectId: presigned.object_id,
        });

        emitFeedback('useBucketUpload', 'upload', {
          bucketId: opts.bucketId,
          filename: file.name,
          size: file.size,
          contentType: file.type,
          objectId: presigned.object_id,
        });

        return presigned.object_id;
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Upload failed';
        setState({ isUploading: false, progress: 0, error: message, objectId: null });
        emitFeedback('useBucketUpload', 'error', {
          bucketId: opts.bucketId,
          filename: file.name,
          error: message,
        });
        return null;
      }
    },
    [client, opts.bucketId, emitFeedback]
  );

  return { ...state, upload, reset };
}
