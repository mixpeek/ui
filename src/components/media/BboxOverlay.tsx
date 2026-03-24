import React from 'react';
import { cn } from '../../lib/cn';

export interface BoundingBox {
  /** X coordinate (0-1 normalized or pixel value). */
  x: number;
  /** Y coordinate (0-1 normalized or pixel value). */
  y: number;
  /** Width (0-1 normalized or pixel value). */
  width: number;
  /** Height (0-1 normalized or pixel value). */
  height: number;
  /** Optional label displayed above the box. */
  label?: string;
  /** Optional confidence score (0-1). */
  confidence?: number;
  /** Box color. Default: #22c55e (green). */
  color?: string;
}

export interface BboxOverlayProps {
  /** Image or video source URL. */
  src: string;
  /** Media type. Default: 'image'. */
  mediaType?: 'image' | 'video';
  /** Bounding boxes to draw. */
  boxes: BoundingBox[];
  /** Whether box coordinates are normalized (0-1). Default: true. */
  normalized?: boolean;
  /** Line width in pixels. Default: 2. */
  lineWidth?: number;
  /** Show labels above boxes. Default: true. */
  showLabels?: boolean;
  /** Called when a bounding box is clicked. */
  onBoxClick?: (box: BoundingBox, index: number) => void;
  /** Video poster image. */
  poster?: string;
  /** Additional CSS classes for the container. */
  className?: string;
}

/**
 * Renders an image or video with bounding box overlays drawn on a canvas layer.
 * Supports both normalized (0-1) and pixel coordinates.
 *
 * @example
 * ```tsx
 * <BboxOverlay
 *   src={frameUrl}
 *   boxes={[{ x: 0.2, y: 0.1, width: 0.3, height: 0.4, label: 'face', confidence: 0.95 }]}
 *   onBoxClick={(box) => console.log('Clicked:', box.label)}
 * />
 * ```
 */
export const BboxOverlay: React.FC<BboxOverlayProps> = ({
  src,
  mediaType = 'image',
  boxes,
  normalized = true,
  lineWidth = 2,
  showLabels = true,
  onBoxClick,
  poster,
  className,
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const mediaRef = React.useRef<HTMLImageElement | HTMLVideoElement>(null);
  const [dimensions, setDimensions] = React.useState({ width: 0, height: 0 });

  const updateDimensions = React.useCallback(() => {
    const el = mediaRef.current;
    if (!el) return;
    const w = el instanceof HTMLVideoElement ? el.videoWidth : el.naturalWidth;
    const h = el instanceof HTMLVideoElement ? el.videoHeight : el.naturalHeight;
    if (w && h) {
      setDimensions({ width: el.clientWidth, height: el.clientHeight });
    }
  }, []);

  // Redraw boxes when dimensions or boxes change
  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || dimensions.width === 0) return;

    canvas.width = dimensions.width;
    canvas.height = dimensions.height;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (const box of boxes) {
      const color = box.color || '#22c55e';
      const bx = normalized ? box.x * canvas.width : box.x;
      const by = normalized ? box.y * canvas.height : box.y;
      const bw = normalized ? box.width * canvas.width : box.width;
      const bh = normalized ? box.height * canvas.height : box.height;

      // Draw rectangle
      ctx.strokeStyle = color;
      ctx.lineWidth = lineWidth;
      ctx.strokeRect(bx, by, bw, bh);

      // Draw label
      if (showLabels && (box.label || box.confidence !== undefined)) {
        const labelParts: string[] = [];
        if (box.label) labelParts.push(box.label);
        if (box.confidence !== undefined) labelParts.push(`${Math.round(box.confidence * 100)}%`);
        const label = labelParts.join(' ');

        ctx.font = `bold ${Math.max(11, Math.min(14, canvas.width / 50))}px system-ui, sans-serif`;
        const metrics = ctx.measureText(label);
        const padding = 4;
        const labelH = 18;
        const labelY = Math.max(labelH, by);

        ctx.fillStyle = color;
        ctx.fillRect(bx, labelY - labelH, metrics.width + padding * 2, labelH);
        ctx.fillStyle = '#fff';
        ctx.fillText(label, bx + padding, labelY - 4);
      }
    }
  }, [boxes, dimensions, normalized, lineWidth, showLabels]);

  // Observe container resize
  React.useEffect(() => {
    const el = mediaRef.current;
    if (!el) return;
    const ro = new ResizeObserver(updateDimensions);
    ro.observe(el);
    return () => ro.disconnect();
  }, [updateDimensions]);

  const handleCanvasClick = React.useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      if (!onBoxClick || !canvasRef.current) return;
      const rect = canvasRef.current.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;
      const cw = canvasRef.current.width;
      const ch = canvasRef.current.height;

      for (let i = 0; i < boxes.length; i++) {
        const box = boxes[i];
        const bx = normalized ? box.x * cw : box.x;
        const by = normalized ? box.y * ch : box.y;
        const bw = normalized ? box.width * cw : box.width;
        const bh = normalized ? box.height * ch : box.height;
        if (mx >= bx && mx <= bx + bw && my >= by && my <= by + bh) {
          onBoxClick(box, i);
          return;
        }
      }
    },
    [boxes, normalized, onBoxClick]
  );

  return (
    <div ref={containerRef} className={cn('mxp-relative mxp-inline-block', className)}>
      {mediaType === 'image' ? (
        <img
          ref={mediaRef as React.RefObject<HTMLImageElement>}
          src={src}
          alt=""
          className="mxp-block mxp-w-full mxp-h-auto mxp-rounded-lg"
          onLoad={updateDimensions}
        />
      ) : (
        <video
          ref={mediaRef as React.RefObject<HTMLVideoElement>}
          src={src}
          poster={poster}
          controls
          className="mxp-block mxp-w-full mxp-h-auto mxp-rounded-lg"
          onLoadedMetadata={updateDimensions}
          preload="metadata"
        />
      )}
      <canvas
        ref={canvasRef}
        className="mxp-absolute mxp-top-0 mxp-left-0 mxp-w-full mxp-h-full mxp-pointer-events-auto"
        style={{ cursor: onBoxClick ? 'pointer' : 'default' }}
        onClick={handleCanvasClick}
      />
    </div>
  );
};
