import React from 'react';
import { cn } from '../../lib/cn';

export interface VideoPlayerProps {
  /** Video source URL. */
  src: string;
  /** Poster/thumbnail image URL. */
  poster?: string;
  /** Start time in seconds. */
  startTime?: number;
  /** Whether to autoplay. Default: false. */
  autoPlay?: boolean;
  /** Whether to loop. Default: false. */
  loop?: boolean;
  /** Whether to mute. Default: false. */
  muted?: boolean;
  /** Called when the video reaches a timestamp (fires on timeupdate). */
  onTimeUpdate?: (currentTime: number) => void;
  /** Called when playback ends. */
  onEnded?: () => void;
  /** Additional CSS classes. */
  className?: string;
  /** Ref forwarded to the underlying video element. */
  videoRef?: React.Ref<HTMLVideoElement>;
}

/**
 * HTML5 video player with poster, start-time seek, and event hooks.
 *
 * @example
 * ```tsx
 * <VideoPlayer
 *   src={videoUrl}
 *   poster={thumbnailUrl}
 *   startTime={12.5}
 *   onTimeUpdate={(t) => highlightFrame(t)}
 * />
 * ```
 */
export const VideoPlayer: React.FC<VideoPlayerProps> = ({
  src,
  poster,
  startTime,
  autoPlay = false,
  loop = false,
  muted = false,
  onTimeUpdate,
  onEnded,
  className,
  videoRef: externalRef,
}) => {
  const internalRef = React.useRef<HTMLVideoElement>(null);
  const ref = (externalRef as React.RefObject<HTMLVideoElement>) || internalRef;

  React.useEffect(() => {
    const el = (ref as React.RefObject<HTMLVideoElement>).current;
    if (el && startTime !== undefined) {
      const seek = () => { el.currentTime = startTime; };
      if (el.readyState >= 1) {
        seek();
      } else {
        el.addEventListener('loadedmetadata', seek, { once: true });
      }
    }
  }, [startTime, ref]);

  return (
    <video
      ref={ref as React.RefObject<HTMLVideoElement>}
      src={src}
      poster={poster}
      controls
      autoPlay={autoPlay}
      loop={loop}
      muted={muted}
      preload="metadata"
      className={cn('mxp-w-full mxp-rounded-lg', className)}
      onTimeUpdate={onTimeUpdate ? (e) => onTimeUpdate((e.target as HTMLVideoElement).currentTime) : undefined}
      onEnded={onEnded}
    />
  );
};
