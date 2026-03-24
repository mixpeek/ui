import React from 'react';
import { BarChart3 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../primitives/card';
import { Progress } from '../../primitives/progress';
import { useNamespace } from '../../hooks/useNamespace';
import { cn } from '../../lib/cn';

export interface UsageMeterProps {
  /** Max documents for the progress bar. */
  maxDocuments?: number;
  /** Additional CSS classes. */
  className?: string;
}

/**
 * Displays namespace usage summary with document count.
 *
 * @example
 * ```tsx
 * <UsageMeter maxDocuments={100000} />
 * ```
 */
export const UsageMeter: React.FC<UsageMeterProps> = ({ maxDocuments = 100000, className }) => {
  const { namespace, isLoading } = useNamespace();

  const count = namespace?.document_count ?? 0;
  const pct = Math.min(Math.round((count / maxDocuments) * 100), 100);

  return (
    <Card className={className}>
      <CardHeader className="mxp-pb-2">
        <CardTitle className="mxp-text-sm mxp-font-medium mxp-flex mxp-items-center mxp-gap-2">
          <BarChart3 className="mxp-h-4 mxp-w-4" />
          Namespace Usage
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="mxp-h-8 mxp-animate-pulse mxp-bg-muted mxp-rounded" />
        ) : (
          <div className="mxp-space-y-2">
            <Progress value={pct} className="mxp-h-2" />
            <div className="mxp-flex mxp-justify-between mxp-text-xs mxp-text-muted-foreground">
              <span>{count.toLocaleString()} documents</span>
              <span>{pct}% of {maxDocuments.toLocaleString()}</span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
