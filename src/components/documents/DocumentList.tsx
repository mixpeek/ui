import React from 'react';
import { Loader2 } from 'lucide-react';
import { Button } from '../../primitives/button';
import { useDocuments } from '../../hooks/useDocuments';
import { cn } from '../../lib/cn';
import type { MxpDocument } from '../../client/types';

export interface DocumentListProps {
  /** Collection ID to list documents from. */
  collectionId: string;
  /** Page size. Default: 20. */
  pageSize?: number;
  /** Custom render function for each document. */
  renderDocument?: (doc: MxpDocument, index: number) => React.ReactNode;
  /** Additional CSS classes. */
  className?: string;
}

/**
 * Paginated document list from a Mixpeek collection.
 *
 * @example
 * ```tsx
 * <DocumentList collectionId="col_abc" pageSize={10} />
 * ```
 */
export const DocumentList: React.FC<DocumentListProps> = ({
  collectionId,
  pageSize = 20,
  renderDocument,
  className,
}) => {
  const { documents, total, page, isLoading, error, fetchPage } = useDocuments({
    collectionId,
    pageSize,
  });

  if (isLoading && documents.length === 0) {
    return (
      <div className={cn('mxp-flex mxp-items-center mxp-justify-center mxp-py-8', className)}>
        <Loader2 className="mxp-h-5 mxp-w-5 mxp-animate-spin mxp-text-muted-foreground" />
      </div>
    );
  }

  if (error) {
    return (
      <div className={cn('mxp-text-sm mxp-text-destructive mxp-py-4', className)}>{error}</div>
    );
  }

  const totalPages = Math.ceil(total / pageSize);

  return (
    <div className={cn('mxp-space-y-4', className)}>
      <div className="mxp-space-y-2">
        {documents.map((doc, i) =>
          renderDocument ? (
            <React.Fragment key={doc.document_id || i}>{renderDocument(doc, i)}</React.Fragment>
          ) : (
            <div key={doc.document_id || i} className="mxp-rounded-lg mxp-border mxp-p-3 mxp-text-sm">
              <span className="mxp-font-mono mxp-text-xs">{doc.document_id}</span>
            </div>
          )
        )}
      </div>

      {totalPages > 1 && (
        <div className="mxp-flex mxp-items-center mxp-justify-between mxp-text-sm">
          <span className="mxp-text-muted-foreground">
            Page {page} of {totalPages} ({total} documents)
          </span>
          <div className="mxp-flex mxp-gap-2">
            <Button variant="outline" size="sm" onClick={() => fetchPage(page - 1)} disabled={page <= 1 || isLoading}>
              Previous
            </Button>
            <Button variant="outline" size="sm" onClick={() => fetchPage(page + 1)} disabled={page >= totalPages || isLoading}>
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
