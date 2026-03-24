import React from 'react';
import { cn } from '../../lib/cn';

export interface LazyImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  /** Image source URL. */
  src: string;
  /** Alt text. */
  alt?: string;
  /** Placeholder content shown while loading. If omitted, uses a shimmer skeleton. */
  placeholder?: React.ReactNode;
  /** IntersectionObserver rootMargin. Default: '200px'. */
  rootMargin?: string;
  /** Additional CSS classes. */
  className?: string;
}

/**
 * Image with IntersectionObserver-based lazy loading and shimmer placeholder.
 *
 * @example
 * ```tsx
 * <LazyImage src={posterUrl} alt="Movie poster" className="mxp-rounded-lg" />
 * ```
 */
export const LazyImage: React.FC<LazyImageProps> = ({
  src,
  alt = '',
  placeholder,
  rootMargin = '200px',
  className,
  ...imgProps
}) => {
  const [isVisible, setIsVisible] = React.useState(false);
  const [isLoaded, setIsLoaded] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [rootMargin]);

  return (
    <div ref={ref} className={cn('mxp-relative mxp-overflow-hidden', className)}>
      {isVisible ? (
        <>
          <img
            src={src}
            alt={alt}
            className={cn(
              'mxp-w-full mxp-h-full mxp-object-cover mxp-transition-opacity mxp-duration-300',
              isLoaded ? 'mxp-opacity-100' : 'mxp-opacity-0'
            )}
            onLoad={() => setIsLoaded(true)}
            {...imgProps}
          />
          {!isLoaded && (
            <div className="mxp-absolute mxp-inset-0 mxp-bg-muted mxp-animate-pulse" />
          )}
        </>
      ) : (
        placeholder || <div className="mxp-w-full mxp-h-full mxp-bg-muted mxp-animate-pulse" />
      )}
    </div>
  );
};
