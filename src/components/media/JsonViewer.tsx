import React from 'react';
import { ChevronRight, ChevronDown, Copy, Check } from 'lucide-react';
import { cn } from '../../lib/cn';

export interface JsonViewerProps {
  /** JSON data to display. */
  data: unknown;
  /** Initial collapsed state. Default: true. */
  defaultCollapsed?: boolean;
  /** Max depth to auto-expand. Default: 1. */
  expandDepth?: number;
  /** Show copy button. Default: true. */
  copyable?: boolean;
  /** Additional CSS classes. */
  className?: string;
}

/**
 * Collapsible JSON tree viewer with syntax highlighting and copy support.
 *
 * @example
 * ```tsx
 * <JsonViewer data={document.metadata} expandDepth={2} />
 * ```
 */
export const JsonViewer: React.FC<JsonViewerProps> = ({
  data,
  defaultCollapsed = true,
  expandDepth = 1,
  copyable = true,
  className,
}) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = React.useCallback(() => {
    navigator.clipboard.writeText(JSON.stringify(data, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [data]);

  return (
    <div className={cn('mxp-relative mxp-rounded-lg mxp-bg-zinc-950 mxp-p-3 mxp-text-xs mxp-font-mono mxp-overflow-auto', className)}>
      {copyable && (
        <button
          onClick={handleCopy}
          className="mxp-absolute mxp-top-2 mxp-right-2 mxp-p-1 mxp-rounded mxp-text-zinc-400 hover:mxp-text-zinc-200 hover:mxp-bg-zinc-800 mxp-transition-colors"
          aria-label="Copy JSON"
        >
          {copied ? <Check className="mxp-h-3.5 mxp-w-3.5 mxp-text-green-400" /> : <Copy className="mxp-h-3.5 mxp-w-3.5" />}
        </button>
      )}
      <JsonNode value={data} depth={0} expandDepth={expandDepth} defaultCollapsed={defaultCollapsed} />
    </div>
  );
};

// Internal recursive renderer
interface JsonNodeProps {
  value: unknown;
  depth: number;
  expandDepth: number;
  defaultCollapsed: boolean;
  keyName?: string;
}

const JsonNode: React.FC<JsonNodeProps> = ({ value, depth, expandDepth, defaultCollapsed, keyName }) => {
  const isExpandable = value !== null && typeof value === 'object';
  const [collapsed, setCollapsed] = React.useState(defaultCollapsed && depth >= expandDepth);
  const indent = depth * 16;

  if (!isExpandable) {
    return (
      <div style={{ paddingLeft: indent }} className="mxp-leading-relaxed">
        {keyName !== undefined && <span className="mxp-text-purple-400">"{keyName}"</span>}
        {keyName !== undefined && <span className="mxp-text-zinc-500">: </span>}
        <ValueSpan value={value} />
      </div>
    );
  }

  const isArray = Array.isArray(value);
  const entries = isArray ? (value as unknown[]).map((v, i) => [String(i), v] as const) : Object.entries(value as Record<string, unknown>);
  const bracket = isArray ? ['[', ']'] : ['{', '}'];

  return (
    <div>
      <div
        style={{ paddingLeft: indent }}
        className="mxp-leading-relaxed mxp-cursor-pointer mxp-select-none hover:mxp-bg-zinc-900 mxp-rounded"
        onClick={() => setCollapsed(!collapsed)}
      >
        {collapsed ? (
          <ChevronRight className="mxp-inline mxp-h-3 mxp-w-3 mxp-text-zinc-500 mxp-mr-1" />
        ) : (
          <ChevronDown className="mxp-inline mxp-h-3 mxp-w-3 mxp-text-zinc-500 mxp-mr-1" />
        )}
        {keyName !== undefined && <span className="mxp-text-purple-400">"{keyName}"</span>}
        {keyName !== undefined && <span className="mxp-text-zinc-500">: </span>}
        <span className="mxp-text-zinc-300">{bracket[0]}</span>
        {collapsed && (
          <span className="mxp-text-zinc-500"> {entries.length} {isArray ? 'items' : 'keys'} {bracket[1]}</span>
        )}
      </div>
      {!collapsed && (
        <>
          {entries.map(([k, v]) => (
            <JsonNode
              key={k}
              keyName={isArray ? undefined : k}
              value={v}
              depth={depth + 1}
              expandDepth={expandDepth}
              defaultCollapsed={defaultCollapsed}
            />
          ))}
          <div style={{ paddingLeft: indent }} className="mxp-leading-relaxed mxp-text-zinc-300">
            {bracket[1]}
          </div>
        </>
      )}
    </div>
  );
};

const ValueSpan: React.FC<{ value: unknown }> = ({ value }) => {
  if (value === null) return <span className="mxp-text-zinc-500">null</span>;
  if (value === undefined) return <span className="mxp-text-zinc-500">undefined</span>;
  if (typeof value === 'boolean') return <span className="mxp-text-amber-400">{String(value)}</span>;
  if (typeof value === 'number') return <span className="mxp-text-cyan-400">{value}</span>;
  if (typeof value === 'string') {
    const truncated = value.length > 120 ? value.slice(0, 120) + '...' : value;
    return <span className="mxp-text-green-400">"{truncated}"</span>;
  }
  return <span className="mxp-text-zinc-400">{String(value)}</span>;
};
