import React from 'react';
import { ChevronRight, ChevronDown, Tag } from 'lucide-react';
import { useTaxonomy } from '../../hooks/useTaxonomy';
import { useFeedback } from '../../feedback/useFeedback';
import { Skeleton } from '../../primitives/skeleton';
import { cn } from '../../lib/cn';
import type { TaxonomyNode } from '../../client/types';

export interface TaxonomyTreeProps {
  /** Called when a taxonomy node is selected. */
  onSelect?: (node: TaxonomyNode) => void;
  /** Additional CSS classes. */
  className?: string;
}

/**
 * Renders the namespace's taxonomy as a navigable tree.
 *
 * @example
 * ```tsx
 * <TaxonomyTree onSelect={(node) => filterByTaxonomy(node)} />
 * ```
 */
export const TaxonomyTree: React.FC<TaxonomyTreeProps> = ({ onSelect, className }) => {
  const { taxonomies, isLoading, error } = useTaxonomy();

  if (isLoading) {
    return (
      <div className={cn('mxp-space-y-2', className)}>
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="mxp-h-6 mxp-w-full" />
        ))}
      </div>
    );
  }

  if (error) {
    return <div className={cn('mxp-text-sm mxp-text-destructive', className)}>{error}</div>;
  }

  return (
    <div className={cn('mxp-space-y-1', className)}>
      {taxonomies.map((node) => (
        <TaxonomyNodeItem key={node.taxonomy_id} node={node} onSelect={onSelect} level={0} />
      ))}
    </div>
  );
};

const TaxonomyNodeItem: React.FC<{
  node: TaxonomyNode;
  onSelect?: (node: TaxonomyNode) => void;
  level: number;
}> = ({ node, onSelect, level }) => {
  const [isOpen, setIsOpen] = React.useState(level < 1);
  const { emitFeedback } = useFeedback();
  const hasChildren = node.children && node.children.length > 0;

  const handleSelect = () => {
    emitFeedback('TaxonomyTree', 'select', { taxonomyId: node.taxonomy_id, label: node.label });
    onSelect?.(node);
  };

  return (
    <div>
      <button
        className={cn(
          'mxp-flex mxp-items-center mxp-gap-1.5 mxp-w-full mxp-rounded-sm mxp-px-2 mxp-py-1 mxp-text-sm hover:mxp-bg-muted/50 mxp-text-left'
        )}
        style={{ paddingLeft: `${level * 16 + 8}px` }}
        onClick={() => {
          if (hasChildren) setIsOpen(!isOpen);
          handleSelect();
        }}
      >
        {hasChildren ? (
          isOpen ? <ChevronDown className="mxp-h-3 mxp-w-3 mxp-shrink-0" /> : <ChevronRight className="mxp-h-3 mxp-w-3 mxp-shrink-0" />
        ) : (
          <Tag className="mxp-h-3 mxp-w-3 mxp-shrink-0 mxp-text-muted-foreground" />
        )}
        <span className="mxp-truncate">{node.label}</span>
      </button>
      {isOpen && hasChildren && (
        <div>
          {node.children!.map((child) => (
            <TaxonomyNodeItem key={child.taxonomy_id} node={child} onSelect={onSelect} level={level + 1} />
          ))}
        </div>
      )}
    </div>
  );
};
