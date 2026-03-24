import React from 'react';
import { cn } from '../../lib/cn';

export interface MasonryGridProps {
  /** Number of columns. Default: 3. */
  columns?: number;
  /** Gap between items in pixels. Default: 8. */
  gap?: number;
  /** Additional CSS classes. */
  className?: string;
  /** Grid items. */
  children: React.ReactNode;
}

/**
 * CSS-columns based masonry layout for variable-height content (images, cards).
 *
 * @example
 * ```tsx
 * <MasonryGrid columns={4} gap={12}>
 *   {results.map((doc) => (
 *     <MasonryItem key={doc.document_id}>
 *       <img src={doc.image_url} alt="" />
 *     </MasonryItem>
 *   ))}
 * </MasonryGrid>
 * ```
 */
export const MasonryGrid: React.FC<MasonryGridProps> = ({
  columns = 3,
  gap = 8,
  className,
  children,
}) => {
  return (
    <div
      className={cn('mxp-w-full', className)}
      style={{
        columnCount: columns,
        columnGap: gap,
      }}
    >
      {children}
    </div>
  );
};

export interface MasonryItemProps {
  /** Additional CSS classes. */
  className?: string;
  /** Item content. */
  children: React.ReactNode;
}

/**
 * Single item inside a MasonryGrid. Prevents column breaks through the item.
 */
export const MasonryItem: React.FC<MasonryItemProps> = ({ className, children }) => {
  return (
    <div
      className={cn('mxp-break-inside-avoid mxp-mb-2', className)}
      style={{ breakInside: 'avoid' }}
    >
      {children}
    </div>
  );
};
