import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../primitives/card';
import { Badge } from '../../primitives/badge';
import { cn } from '../../lib/cn';
import type { MxpDocument } from '../../client/types';

export interface DocumentCardProps {
  /** Document to display. */
  document: MxpDocument;
  /** Title field name in the document. Default: 'title'. */
  titleField?: string;
  /** Description field name. Default: 'description'. */
  descriptionField?: string;
  /** Called when clicked. */
  onClick?: (doc: MxpDocument) => void;
  /** Additional CSS classes. */
  className?: string;
  /** Extra content. */
  children?: React.ReactNode;
}

/**
 * Summary card for a single document.
 *
 * @example
 * ```tsx
 * <DocumentCard document={doc} titleField="name" onClick={openDetail} />
 * ```
 */
export const DocumentCard: React.FC<DocumentCardProps> = ({
  document,
  titleField = 'title',
  descriptionField = 'description',
  onClick,
  className,
  children,
}) => {
  const title = (document[titleField] as string) ?? document.document_id;
  const description = document[descriptionField] as string | undefined;
  const modality = document._internal?.modality;

  return (
    <Card
      className={cn(onClick && 'mxp-cursor-pointer hover:mxp-shadow-md mxp-transition-shadow', className)}
      onClick={() => onClick?.(document)}
    >
      <CardHeader className="mxp-pb-2">
        <div className="mxp-flex mxp-items-start mxp-justify-between">
          <CardTitle className="mxp-text-sm mxp-font-medium mxp-line-clamp-1">{title}</CardTitle>
          {modality && <Badge variant="secondary" className="mxp-text-xs mxp-shrink-0">{modality}</Badge>}
        </div>
      </CardHeader>
      <CardContent>
        {description && (
          <p className="mxp-text-xs mxp-text-muted-foreground mxp-line-clamp-2">{description}</p>
        )}
        {children}
      </CardContent>
    </Card>
  );
};
