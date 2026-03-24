import { parseSSEStream } from '../lib/sse';
import type {
  ListResponse,
  MxpDocument,
  RetrieverResult,
  StageEvent,
  PresignedUploadResponse,
  BatchStatus,
  TaxonomyNode,
  NamespaceInfo,
} from './types';

/**
 * Lightweight API client for Mixpeek. Uses raw fetch (no axios dependency).
 * Handles auth headers, SSE streaming, and presigned uploads.
 */
export class MxpApiClient {
  private apiKey: string;
  private baseUrl: string;
  private namespace: string | undefined;

  constructor(apiKey: string, baseUrl: string, namespace?: string) {
    this.apiKey = apiKey;
    this.baseUrl = baseUrl.replace(/\/+$/, '');
    this.namespace = namespace;
  }

  private headers(extra?: Record<string, string>): Record<string, string> {
    const h: Record<string, string> = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.apiKey}`,
      ...extra,
    };
    if (this.namespace) {
      h['X-Namespace'] = this.namespace;
    }
    return h;
  }

  private async request<T>(
    method: string,
    path: string,
    body?: unknown,
    signal?: AbortSignal
  ): Promise<T> {
    const resp = await fetch(`${this.baseUrl}${path}`, {
      method,
      headers: this.headers(),
      body: body ? JSON.stringify(body) : undefined,
      signal,
    });
    if (!resp.ok) {
      const text = await resp.text().catch(() => '');
      throw new Error(`Mixpeek API ${method} ${path}: ${resp.status} ${text}`);
    }
    return resp.json();
  }

  // ── Retrievers ──────────────────────────────────────────────

  /** Execute a retriever and return the full result. */
  async executeRetriever(
    retrieverId: string,
    params: { query?: string; inputs?: Record<string, unknown>; limit?: number },
    signal?: AbortSignal
  ): Promise<RetrieverResult> {
    return this.request<RetrieverResult>(
      'POST',
      `/v1/retrievers/${encodeURIComponent(retrieverId)}/execute`,
      {
        inputs: params.inputs ?? (params.query ? { query: params.query } : {}),
        settings: { limit: params.limit ?? 20 },
      },
      signal
    );
  }

  /**
   * Execute a retriever with SSE streaming. Yields stage events as they arrive.
   * The final event typically has the merged results.
   */
  async *executeRetrieverStream(
    retrieverId: string,
    params: { query?: string; inputs?: Record<string, unknown>; limit?: number },
    signal?: AbortSignal
  ): AsyncGenerator<StageEvent> {
    const resp = await fetch(
      `${this.baseUrl}/v1/retrievers/${encodeURIComponent(retrieverId)}/execute`,
      {
        method: 'POST',
        headers: {
          ...this.headers(),
          Accept: 'text/event-stream',
        },
        body: JSON.stringify({
          inputs: params.inputs ?? (params.query ? { query: params.query } : {}),
          settings: { limit: params.limit ?? 20 },
          stream: true,
        }),
        signal,
      }
    );

    if (!resp.ok) {
      const text = await resp.text().catch(() => '');
      throw new Error(`Mixpeek stream: ${resp.status} ${text}`);
    }

    for await (const event of parseSSEStream<StageEvent>(resp)) {
      if (event.data && typeof event.data === 'object') {
        yield event.data;
      }
    }
  }

  // ── Documents ───────────────────────────────────────────────

  /** List documents in a collection. */
  async listDocuments(
    collectionId: string,
    opts?: { page?: number; pageSize?: number; filters?: Record<string, unknown> },
    signal?: AbortSignal
  ): Promise<ListResponse<MxpDocument>> {
    return this.request<ListResponse<MxpDocument>>(
      'POST',
      '/v1/documents/list',
      {
        collection_ids: [collectionId],
        page: opts?.page ?? 1,
        page_size: opts?.pageSize ?? 20,
        filters: opts?.filters,
      },
      signal
    );
  }

  /** Get a single document by ID. */
  async getDocument(documentId: string, signal?: AbortSignal): Promise<MxpDocument> {
    return this.request<MxpDocument>(
      'GET',
      `/v1/documents/${encodeURIComponent(documentId)}`,
      undefined,
      signal
    );
  }

  // ── Buckets / Uploads ───────────────────────────────────────

  /** Get a presigned URL for uploading a file to a bucket. */
  async getPresignedUploadUrl(
    bucketId: string,
    filename: string,
    contentType?: string,
    signal?: AbortSignal
  ): Promise<PresignedUploadResponse> {
    return this.request<PresignedUploadResponse>(
      'POST',
      `/v1/buckets/${encodeURIComponent(bucketId)}/upload`,
      { filename, content_type: contentType },
      signal
    );
  }

  /** Upload a file directly to a presigned URL. */
  async uploadToPresignedUrl(
    uploadUrl: string,
    file: File | Blob,
    fields?: Record<string, string>
  ): Promise<void> {
    if (fields) {
      // S3-style multipart upload
      const form = new FormData();
      for (const [k, v] of Object.entries(fields)) {
        form.append(k, v);
      }
      form.append('file', file);
      const resp = await fetch(uploadUrl, { method: 'POST', body: form });
      if (!resp.ok) throw new Error(`Upload failed: ${resp.status}`);
    } else {
      // Direct PUT
      const resp = await fetch(uploadUrl, {
        method: 'PUT',
        body: file,
        headers: { 'Content-Type': file.type || 'application/octet-stream' },
      });
      if (!resp.ok) throw new Error(`Upload failed: ${resp.status}`);
    }
  }

  // ── Batches ─────────────────────────────────────────────────

  /** Get batch processing status. */
  async getBatchStatus(batchId: string, signal?: AbortSignal): Promise<BatchStatus> {
    return this.request<BatchStatus>(
      'GET',
      `/v1/batches/${encodeURIComponent(batchId)}`,
      undefined,
      signal
    );
  }

  // ── Taxonomies ──────────────────────────────────────────────

  /** List taxonomies. */
  async listTaxonomies(signal?: AbortSignal): Promise<ListResponse<TaxonomyNode>> {
    return this.request<ListResponse<TaxonomyNode>>(
      'POST',
      '/v1/taxonomies/list',
      {},
      signal
    );
  }

  // ── Namespaces ──────────────────────────────────────────────

  /** Get namespace info. */
  async getNamespace(signal?: AbortSignal): Promise<NamespaceInfo> {
    return this.request<NamespaceInfo>(
      'GET',
      '/v1/namespaces/current',
      undefined,
      signal
    );
  }
}
