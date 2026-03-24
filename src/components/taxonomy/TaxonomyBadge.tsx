import React from 'react';
import { Badge } from '../../primitives/badge';
import { cn } from '../../lib/cn';

export interface TaxonomyBadgeProps {
  /** Taxonomy label text. */
  label: string;
  /** Confidence score (0-1). Displayed as percentage. */
  confidence?: number;
  /** Badge variant. */
  variant?: 'default' | 'secondary' | 'outline';
  /** Additional CSS classes. */
  className?: string;
}

/**
 * Displays an assigned taxonomy label with optional confidence score.
 *
 * @example
 * ```tsx
 * <TaxonomyBadge label="Sports > Basketball" confidence={0.92} />
 * ```
 */
export const TaxonomyBadge: React.FC<TaxonomyBadgeProps> = ({
  label,
  confidence,
  variant = 'secondary',
  className,
}) => (
  <Badge variant={variant} className={cn('mxp-gap-1', className)}>
    {label}
    {confidence !== undefined && (
      <span className="mxp-opacity-70">{Math.round(confidence * 100)}%</span>
    )}
  </Badge>
);
