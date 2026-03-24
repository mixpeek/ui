import * as React from 'react';
import {
  Legend,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

import { cn } from '../lib/cn';

// ── Types ──────────────────────────────────────────────────────

export type ChartConfig = Record<
  string,
  {
    label?: React.ReactNode;
    icon?: React.ComponentType;
    color?: string;
    theme?: Record<string, string>;
  }
>;

// ── Context ────────────────────────────────────────────────────

type ChartContextProps = {
  config: ChartConfig;
};

const ChartContext = React.createContext<ChartContextProps | null>(null);

function useChart() {
  const context = React.useContext(ChartContext);
  if (!context) {
    throw new Error('useChart must be used within a <ChartContainer />');
  }
  return context;
}

// ── ChartStyle ─────────────────────────────────────────────────

const ChartStyle = ({ id, config }: { id: string; config: ChartConfig }) => {
  const colorConfig = Object.entries(config).filter(
    ([, cfg]) => cfg.color || cfg.theme
  );

  if (!colorConfig.length) return null;

  return (
    <style
      dangerouslySetInnerHTML={{
        __html: Object.entries(
          colorConfig.reduce<Record<string, Record<string, string>>>(
            (acc, [key, cfg]) => {
              if (cfg.color) {
                acc[':root'] = acc[':root'] || {};
                acc[':root'][`--color-${key}`] = cfg.color;
              }
              if (cfg.theme) {
                for (const [theme, color] of Object.entries(cfg.theme)) {
                  const selector = theme === 'dark' ? '.dark' : ':root';
                  acc[selector] = acc[selector] || {};
                  acc[selector][`--color-${key}`] = color;
                }
              }
              return acc;
            },
            {}
          )
        )
          .map(
            ([selector, vars]) =>
              `${selector} { ${Object.entries(vars)
                .map(([k, v]) => `${k}: ${v}`)
                .join('; ')} }`
          )
          .join('\n'),
      }}
    />
  );
};

// ── ChartContainer ─────────────────────────────────────────────

const ChartContainer = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<'div'> & {
    config: ChartConfig;
    children: React.ComponentProps<typeof ResponsiveContainer>['children'];
  }
>(({ id, className, children, config, ...props }, ref) => {
  const uniqueId = React.useId();
  const chartId = `chart-${id || uniqueId.replace(/:/g, '')}`;

  return (
    <ChartContext.Provider value={{ config }}>
      <div
        data-chart={chartId}
        ref={ref}
        className={cn(
          'mxp-flex mxp-aspect-video mxp-justify-center mxp-text-xs [&_.recharts-cartesian-axis-tick_text]:mxp-fill-muted-foreground [&_.recharts-cartesian-grid_line[stroke=#ccc]]:mxp-stroke-border/50 [&_.recharts-curve.recharts-tooltip-cursor]:mxp-stroke-border [&_.recharts-polar-grid_[stroke=#ccc]]:mxp-stroke-border [&_.recharts-radial-bar-background-sector]:mxp-fill-muted [&_.recharts-rectangle.recharts-tooltip-cursor]:mxp-fill-muted [&_.recharts-reference-line_[stroke=#ccc]]:mxp-stroke-border',
          className
        )}
        {...props}
      >
        <ChartStyle id={chartId} config={config} />
        <ResponsiveContainer>{children}</ResponsiveContainer>
      </div>
    </ChartContext.Provider>
  );
});
ChartContainer.displayName = 'ChartContainer';

// ── ChartTooltip + Content ─────────────────────────────────────

const ChartTooltip = Tooltip;

interface ChartTooltipContentProps {
  hideLabel?: boolean;
  hideIndicator?: boolean;
  indicator?: 'line' | 'dot' | 'dashed';
  nameKey?: string;
  labelKey?: string;
  className?: string;
}

const ChartTooltipContent = React.forwardRef<
  HTMLDivElement,
  ChartTooltipContentProps & {
    active?: boolean;
    payload?: Array<{
      name: string;
      value: number;
      dataKey: string;
      color: string;
      payload: Record<string, unknown>;
    }>;
    label?: string;
  }
>(
  (
    {
      active,
      payload,
      className,
      indicator = 'dot',
      hideLabel = false,
      hideIndicator = false,
      label,
      labelKey,
      nameKey,
    },
    ref
  ) => {
    const { config } = useChart();

    if (!active || !payload?.length) return null;

    return (
      <div
        ref={ref}
        className={cn(
          'mxp-grid mxp-min-w-[8rem] mxp-items-start mxp-gap-1.5 mxp-rounded-lg mxp-border mxp-border-border/50 mxp-bg-background mxp-px-2.5 mxp-py-1.5 mxp-text-xs mxp-shadow-xl',
          className
        )}
      >
        {!hideLabel && label && (
          <div className="mxp-font-medium">{labelKey ? config[labelKey]?.label || label : label}</div>
        )}
        <div className="mxp-grid mxp-gap-1.5">
          {payload.map((item) => {
            const key = nameKey || (item.dataKey as string);
            const itemConfig = config[key];

            return (
              <div
                key={item.dataKey}
                className="mxp-flex mxp-items-center mxp-gap-2 [&>svg]:mxp-h-2.5 [&>svg]:mxp-w-2.5 [&>svg]:mxp-text-muted-foreground"
              >
                {!hideIndicator && (
                  <div
                    className={cn(
                      'mxp-shrink-0 mxp-rounded-[2px] mxp-border-[--color-border]',
                      indicator === 'dot' && 'mxp-h-2.5 mxp-w-2.5 mxp-rounded-full',
                      indicator === 'line' && 'mxp-h-0.5 mxp-w-3',
                      indicator === 'dashed' && 'mxp-h-0.5 mxp-w-3 mxp-border-dashed'
                    )}
                    style={{
                      backgroundColor: item.color,
                    }}
                  />
                )}
                <div className="mxp-flex mxp-flex-1 mxp-justify-between mxp-gap-2 mxp-leading-none">
                  <span className="mxp-text-muted-foreground">
                    {itemConfig?.label || item.name}
                  </span>
                  <span className="mxp-font-mono mxp-font-medium mxp-tabular-nums mxp-text-foreground">
                    {item.value?.toLocaleString()}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
);
ChartTooltipContent.displayName = 'ChartTooltipContent';

// ── ChartLegend + Content ──────────────────────────────────────

const ChartLegend = Legend;

const ChartLegendContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<'div'> & {
    payload?: Array<{
      value: string;
      type: string;
      id: string;
      color: string;
      dataKey?: string;
    }>;
    nameKey?: string;
    hideIcon?: boolean;
  }
>(({ className, payload, nameKey, hideIcon = false, ...props }, ref) => {
  const { config } = useChart();

  if (!payload?.length) return null;

  return (
    <div
      ref={ref}
      className={cn(
        'mxp-flex mxp-items-center mxp-justify-center mxp-gap-4',
        className
      )}
      {...props}
    >
      {payload.map((entry) => {
        const key = nameKey || entry.dataKey || entry.value;
        const itemConfig = config[key as string];

        return (
          <div
            key={entry.value}
            className="mxp-flex mxp-items-center mxp-gap-1.5 [&>svg]:mxp-h-3 [&>svg]:mxp-w-3 [&>svg]:mxp-text-muted-foreground"
          >
            {itemConfig?.icon && !hideIcon ? (
              <itemConfig.icon />
            ) : (
              <div
                className="mxp-h-2 mxp-w-2 mxp-shrink-0 mxp-rounded-[2px]"
                style={{ backgroundColor: entry.color }}
              />
            )}
            <span className="mxp-text-sm mxp-text-muted-foreground">
              {itemConfig?.label || entry.value}
            </span>
          </div>
        );
      })}
    </div>
  );
});
ChartLegendContent.displayName = 'ChartLegendContent';

export {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  ChartStyle,
  useChart,
};
