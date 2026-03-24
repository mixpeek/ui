/** Generic paginated list response from Mixpeek API. */
export interface ListResponse<T> {
  results: T[];
  total?: number;
  page?: number;
  page_size?: number;
}

/** A Mixpeek document (Qdrant point payload). */
export interface MxpDocument {
  document_id: string;
  collection_id?: string;
  [key: string]: unknown;
  _internal?: {
    document_id: string;
    namespace_id: string;
    collection_id: string;
    modality?: string;
    mime_type?: string;
    source_blobs?: Array<{
      url?: string;
      content_type?: string;
    }>;
    lineage?: Record<string, unknown>;
    created_at?: string;
    updated_at?: string;
    [key: string]: unknown;
  };
}

/** Retriever execution result with streaming stages. */
export interface RetrieverResult {
  results: MxpDocument[];
  total?: number;
  execution_id?: string;
}

/** A single SSE stage event during retriever execution. */
export interface StageEvent {
  stage_name?: string;
  stage_type?: string;
  status?: 'started' | 'completed' | 'error';
  results?: MxpDocument[];
  error?: string;
  metadata?: Record<string, unknown>;
}

/** Presigned URL response for bucket uploads. */
export interface PresignedUploadResponse {
  upload_url: string;
  object_id: string;
  fields?: Record<string, string>;
}

/** Batch status response. */
export interface BatchStatus {
  batch_id: string;
  status: 'pending' | 'processing' | 'completed' | 'failed' | 'partial';
  total_objects?: number;
  processed_objects?: number;
  failed_objects?: number;
  created_at?: string;
  completed_at?: string;
}

/** Taxonomy node in a tree. */
export interface TaxonomyNode {
  taxonomy_id: string;
  label: string;
  description?: string;
  parent_id?: string;
  children?: TaxonomyNode[];
  level?: number;
}

/** Namespace summary. */
export interface NamespaceInfo {
  namespace_id: string;
  name?: string;
  document_count?: number;
  created_at?: string;
}
