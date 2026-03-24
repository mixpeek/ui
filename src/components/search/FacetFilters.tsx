import React, { useState } from 'react';
import { Checkbox } from '../../primitives/checkbox';
import { Label } from '../../primitives/label';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '../../primitives/accordion';
import { useFeedback } from '../../feedback/useFeedback';
import { cn } from '../../lib/cn';

export interface FacetOption {
  value: string;
  label: string;
  count?: number;
}

export interface Facet {
  /** Field name to filter on. */
  field: string;
  /** Display label. */
  label: string;
  /** Available options. */
  options: FacetOption[];
}

export interface FacetFiltersProps {
  /** Facet definitions. */
  facets: Facet[];
  /** Currently selected values per facet field. */
  selected?: Record<string, string[]>;
  /** Called when selections change. */
  onChange?: (selected: Record<string, string[]>) => void;
  /** Additional CSS classes. */
  className?: string;
}

/**
 * Faceted filter panel for refining search results.
 * Emits feedback on every filter interaction.
 *
 * @example
 * ```tsx
 * <FacetFilters
 *   facets={[{ field: 'modality', label: 'Type', options: [...] }]}
 *   selected={filters}
 *   onChange={setFilters}
 * />
 * ```
 */
export const FacetFilters: React.FC<FacetFiltersProps> = ({
  facets,
  selected = {},
  onChange,
  className,
}) => {
  const { emitFeedback } = useFeedback();
  const [internal, setInternal] = useState<Record<string, string[]>>(selected);
  const current = onChange ? selected : internal;

  const toggle = (field: string, value: string) => {
    const prev = current[field] ?? [];
    const next = prev.includes(value)
      ? prev.filter((v) => v !== value)
      : [...prev, value];
    const updated = { ...current, [field]: next };

    if (onChange) {
      onChange(updated);
    } else {
      setInternal(updated);
    }

    emitFeedback('FacetFilters', prev.includes(value) ? 'deselect' : 'select', {
      field,
      value,
      selectedValues: next,
    });
  };

  return (
    <div className={cn('mxp-space-y-2', className)}>
      <Accordion type="multiple" defaultValue={facets.map((f) => f.field)}>
        {facets.map((facet) => (
          <AccordionItem key={facet.field} value={facet.field}>
            <AccordionTrigger className="mxp-text-sm mxp-py-2">{facet.label}</AccordionTrigger>
            <AccordionContent>
              <div className="mxp-space-y-2">
                {facet.options.map((opt) => {
                  const checked = (current[facet.field] ?? []).includes(opt.value);
                  return (
                    <div key={opt.value} className="mxp-flex mxp-items-center mxp-gap-2">
                      <Checkbox
                        id={`${facet.field}-${opt.value}`}
                        checked={checked}
                        onCheckedChange={() => toggle(facet.field, opt.value)}
                      />
                      <Label htmlFor={`${facet.field}-${opt.value}`} className="mxp-flex-1 mxp-text-sm mxp-font-normal mxp-cursor-pointer">
                        {opt.label}
                      </Label>
                      {opt.count !== undefined && (
                        <span className="mxp-text-xs mxp-text-muted-foreground">{opt.count}</span>
                      )}
                    </div>
                  );
                })}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};
