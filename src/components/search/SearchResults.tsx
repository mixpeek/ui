import React from 'react';
import { cn } from '../../lib/cn';
import { Skeleton } from '../../primitives/skeleton';
import type { MxpDocument } from '../../client/types';

export interface SearchResultsProps {
  /** Array of documents to display. */
  results: MxpDocument[];
  /** Loading state. */
  isLoading?: boolean;
  /** Custom render function for each result. */
  renderResult?: (doc: MxpDocument, index: number) => React.ReactNode;
  /** Empty state message. */
  emptyMessage?: string;
  /** Layout mode. */
  layout?: 'list' | 'grid';
  /** Number of grid columns. Default: 3. */
  columns?: number;
  /** Additional CSS classes. */
  className?: string;
}

/**
 * Renders a list or grid of search results from a retriever execution.
 *
 * @example
 * ```tsx
 * <SearchResults
 *   results={results}
 *   isLoading={isLoading}
 *   renderResult={(doc) => <ResultCard document={doc} />}
 * />
 * ```
 */
export const SearchResults: React.FC<SearchResultsProps> = ({
  results,
  isLoading = false,
  renderResult,
  emptyMessage = 'No results found.',
  layout = 'list',
  columns = 3,
  className,
}) => {
  if (isLoading) {
    return (
      <div className={cn('mxp-space-y-3', className)}>
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} className="mxp-h-24 mxp-w-full mxp-rounded-lg" />
        ))}
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <div className={cn('mxp-flex mxp-items-center mxp-justify-center mxp-py-12 mxp-text-muted-foreground mxp-text-sm', className)}>
        {emptyMessage}
      </div>
    );
  }

  const gridClasses =
    layout === 'grid'
      ? `mxp-grid mxp-gap-4`
      : 'mxp-flex mxp-flex-col mxp-gap-3';

  const gridStyle =
    layout === 'grid'
      ? { gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }
      : undefined;

  return (
    <div className={cn(gridClasses, className)} style={gridStyle}>
      {results.map((doc, index) =>
        renderResult ? (
          <React.Fragment key={doc.document_id || index}>{renderResult(doc, index)}</React.Fragment>
        ) : (
          <DefaultResultItem key={doc.document_id || index} document={doc} />
        )
      )}
    </div>
  );
};

const DefaultResultItem: React.FC<{ document: MxpDocument }> = ({ document }) => (
  <div className="mxp-rounded-lg mxp-border mxp-p-4 mxp-text-sm">
    <div className="mxp-font-medium">{document.document_id}</div>
    {document._internal?.modality && (
      <div className="mxp-text-xs mxp-text-muted-foreground mxp-mt-1">
        {document._internal.modality}
      </div>
    )}
  </div>
);
