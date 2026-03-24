import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { PanelLeft } from 'lucide-react';

import { cn } from '../lib/cn';
import { Button } from './button';
import { Input } from './input';
import { Separator } from './separator';
import { Sheet, SheetContent } from './sheet';
import { Skeleton } from './skeleton';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './tooltip';

// ── Constants ──────────────────────────────────────────────────

const SIDEBAR_COOKIE_NAME = 'sidebar:state';
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7;
const SIDEBAR_WIDTH = '16rem';
const SIDEBAR_WIDTH_MOBILE = '18rem';
const SIDEBAR_WIDTH_ICON = '3rem';
const SIDEBAR_KEYBOARD_SHORTCUT = 'b';

// ── Context ────────────────────────────────────────────────────

type SidebarContext = {
  state: 'expanded' | 'collapsed';
  open: boolean;
  setOpen: (open: boolean) => void;
  openMobile: boolean;
  setOpenMobile: (open: boolean) => void;
  isMobile: boolean;
  toggleSidebar: () => void;
};

const SidebarContext = React.createContext<SidebarContext | null>(null);

function useSidebar() {
  const context = React.useContext(SidebarContext);
  if (!context) {
    throw new Error('useSidebar must be used within a SidebarProvider.');
  }
  return context;
}

// ── useIsMobile (inline) ───────────────────────────────────────

function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);
    const onChange = () => setIsMobile(mql.matches);
    mql.addEventListener('change', onChange);
    setIsMobile(mql.matches);
    return () => mql.removeEventListener('change', onChange);
  }, [breakpoint]);

  return isMobile;
}

// ── SidebarProvider ────────────────────────────────────────────

interface SidebarProviderProps extends React.HTMLAttributes<HTMLDivElement> {
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const SidebarProvider = React.forwardRef<HTMLDivElement, SidebarProviderProps>(
  (
    {
      defaultOpen = true,
      open: openProp,
      onOpenChange: setOpenProp,
      className,
      style,
      children,
      ...props
    },
    ref
  ) => {
    const isMobile = useIsMobile();
    const [openMobile, setOpenMobile] = React.useState(false);

    const [_open, _setOpen] = React.useState(defaultOpen);
    const open = openProp ?? _open;
    const setOpen = React.useCallback(
      (value: boolean | ((value: boolean) => boolean)) => {
        const openState = typeof value === 'function' ? value(open) : value;
        if (setOpenProp) {
          setOpenProp(openState);
        } else {
          _setOpen(openState);
        }
        document.cookie = `${SIDEBAR_COOKIE_NAME}=${openState}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`;
      },
      [setOpenProp, open]
    );

    const toggleSidebar = React.useCallback(() => {
      return isMobile
        ? setOpenMobile((open) => !open)
        : setOpen((open) => !open);
    }, [isMobile, setOpen, setOpenMobile]);

    React.useEffect(() => {
      const handleKeyDown = (event: KeyboardEvent) => {
        if (
          event.key === SIDEBAR_KEYBOARD_SHORTCUT &&
          (event.metaKey || event.ctrlKey)
        ) {
          event.preventDefault();
          toggleSidebar();
        }
      };

      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }, [toggleSidebar]);

    const state = open ? 'expanded' : 'collapsed';

    const contextValue = React.useMemo<SidebarContext>(
      () => ({
        state,
        open,
        setOpen,
        isMobile,
        openMobile,
        setOpenMobile,
        toggleSidebar,
      }),
      [state, open, setOpen, isMobile, openMobile, setOpenMobile, toggleSidebar]
    );

    return (
      <SidebarContext.Provider value={contextValue}>
        <TooltipProvider delayDuration={0}>
          <div
            ref={ref}
            style={
              {
                '--sidebar-width': SIDEBAR_WIDTH,
                '--sidebar-width-icon': SIDEBAR_WIDTH_ICON,
                ...style,
              } as React.CSSProperties
            }
            className={cn(
              'mxp-group/sidebar-wrapper mxp-flex mxp-min-h-svh mxp-w-full has-[[data-variant=inset]]:mxp-bg-sidebar',
              className
            )}
            {...props}
          >
            {children}
          </div>
        </TooltipProvider>
      </SidebarContext.Provider>
    );
  }
);
SidebarProvider.displayName = 'SidebarProvider';

// ── Sidebar ────────────────────────────────────────────────────

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  side?: 'left' | 'right';
  variant?: 'sidebar' | 'floating' | 'inset';
  collapsible?: 'offcanvas' | 'icon' | 'none';
}

const Sidebar = React.forwardRef<HTMLDivElement, SidebarProps>(
  (
    {
      side = 'left',
      variant = 'sidebar',
      collapsible = 'offcanvas',
      className,
      children,
      ...props
    },
    ref
  ) => {
    const { isMobile, state, openMobile, setOpenMobile } = useSidebar();

    if (collapsible === 'none') {
      return (
        <div
          ref={ref}
          className={cn(
            'mxp-flex mxp-h-full mxp-w-[--sidebar-width] mxp-flex-col mxp-bg-sidebar mxp-text-sidebar-foreground',
            className
          )}
          {...props}
        >
          {children}
        </div>
      );
    }

    if (isMobile) {
      return (
        <Sheet open={openMobile} onOpenChange={setOpenMobile} {...props}>
          <SheetContent
            data-sidebar="sidebar"
            data-mobile="true"
            className="mxp-w-[--sidebar-width] mxp-bg-sidebar mxp-p-0 mxp-text-sidebar-foreground [&>button]:mxp-hidden"
            style={
              {
                '--sidebar-width': SIDEBAR_WIDTH_MOBILE,
              } as React.CSSProperties
            }
            side={side}
          >
            <div className="mxp-flex mxp-h-full mxp-w-full mxp-flex-col">
              {children}
            </div>
          </SheetContent>
        </Sheet>
      );
    }

    return (
      <div
        ref={ref}
        className="mxp-group mxp-peer mxp-hidden md:mxp-block mxp-text-sidebar-foreground"
        data-state={state}
        data-collapsible={state === 'collapsed' ? collapsible : ''}
        data-variant={variant}
        data-side={side}
      >
        <div
          className={cn(
            'mxp-duration-200 mxp-relative mxp-h-svh mxp-w-[--sidebar-width] mxp-bg-transparent mxp-transition-[width] mxp-ease-linear',
            'group-data-[collapsible=offcanvas]:mxp-w-0',
            'group-data-[collapsible=icon]:mxp-w-[--sidebar-width-icon]'
          )}
        />
        <div
          className={cn(
            'mxp-duration-200 mxp-fixed mxp-inset-y-0 mxp-z-10 mxp-hidden mxp-h-svh mxp-w-[--sidebar-width] mxp-transition-[left,right,width] mxp-ease-linear md:mxp-flex',
            side === 'left'
              ? 'mxp-left-0 group-data-[collapsible=offcanvas]:mxp-left-[calc(var(--sidebar-width)*-1)]'
              : 'mxp-right-0 group-data-[collapsible=offcanvas]:mxp-right-[calc(var(--sidebar-width)*-1)]',
            'group-data-[collapsible=icon]:mxp-w-[--sidebar-width-icon] group-data-[collapsible=icon]:mxp-overflow-hidden',
            variant === 'floating' || variant === 'inset'
              ? 'mxp-p-2 group-data-[collapsible=icon]:mxp-w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4))]'
              : 'group-data-[collapsible=icon]:mxp-w-[--sidebar-width-icon] group-data-[side=left]:mxp-border-r group-data-[side=right]:mxp-border-l',
            className
          )}
          {...props}
        >
          <div
            data-sidebar="sidebar"
            className={cn(
              'mxp-flex mxp-h-full mxp-w-full mxp-flex-col mxp-bg-sidebar group-data-[variant=floating]:mxp-rounded-lg group-data-[variant=floating]:mxp-border group-data-[variant=floating]:mxp-shadow'
            )}
          >
            {children}
          </div>
        </div>
      </div>
    );
  }
);
Sidebar.displayName = 'Sidebar';

// ── SidebarTrigger ─────────────────────────────────────────────

const SidebarTrigger = React.forwardRef<
  React.ElementRef<typeof Button>,
  React.ComponentProps<typeof Button>
>(({ className, onClick, ...props }, ref) => {
  const { toggleSidebar } = useSidebar();

  return (
    <Button
      ref={ref}
      data-sidebar="trigger"
      variant="ghost"
      size="icon"
      className={cn('mxp-h-7 mxp-w-7', className)}
      onClick={(event) => {
        onClick?.(event);
        toggleSidebar();
      }}
      {...props}
    >
      <PanelLeft />
      <span className="mxp-sr-only">Toggle Sidebar</span>
    </Button>
  );
});
SidebarTrigger.displayName = 'SidebarTrigger';

// ── SidebarRail ────────────────────────────────────────────────

const SidebarRail = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<'button'>
>(({ className, ...props }, ref) => {
  const { toggleSidebar } = useSidebar();

  return (
    <button
      ref={ref}
      data-sidebar="rail"
      aria-label="Toggle Sidebar"
      tabIndex={-1}
      onClick={toggleSidebar}
      title="Toggle Sidebar"
      className={cn(
        'mxp-absolute mxp-inset-y-0 mxp-z-20 mxp-hidden mxp-w-4 mxp--translate-x-1/2 mxp-transition-all mxp-ease-linear after:mxp-absolute after:mxp-inset-y-0 after:mxp-left-1/2 after:mxp-w-[2px] hover:after:mxp-bg-sidebar-border group-data-[side=left]:mxp--right-4 group-data-[side=right]:mxp-left-0 sm:mxp-flex',
        className
      )}
      {...props}
    />
  );
});
SidebarRail.displayName = 'SidebarRail';

// ── SidebarInset ───────────────────────────────────────────────

const SidebarInset = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<'main'>
>(({ className, ...props }, ref) => (
  <main
    ref={ref}
    className={cn(
      'mxp-relative mxp-flex mxp-min-h-svh mxp-flex-1 mxp-flex-col mxp-bg-background',
      'peer-data-[variant=inset]:mxp-min-h-[calc(100svh-theme(spacing.4))] md:peer-data-[variant=inset]:mxp-m-2 md:peer-data-[state=collapsed]:peer-data-[variant=inset]:mxp-ml-2 md:peer-data-[variant=inset]:mxp-ml-0 md:peer-data-[variant=inset]:mxp-rounded-xl md:peer-data-[variant=inset]:mxp-shadow',
      className
    )}
    {...props}
  />
));
SidebarInset.displayName = 'SidebarInset';

// ── SidebarInput ───────────────────────────────────────────────

const SidebarInput = React.forwardRef<
  React.ElementRef<typeof Input>,
  React.ComponentProps<typeof Input>
>(({ className, ...props }, ref) => (
  <Input
    ref={ref}
    data-sidebar="input"
    className={cn(
      'mxp-h-8 mxp-w-full mxp-bg-background mxp-shadow-none focus-visible:mxp-ring-2 focus-visible:mxp-ring-sidebar-ring',
      className
    )}
    {...props}
  />
));
SidebarInput.displayName = 'SidebarInput';

// ── Section components ─────────────────────────────────────────

const SidebarHeader = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<'div'>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    data-sidebar="header"
    className={cn('mxp-flex mxp-flex-col mxp-gap-2 mxp-p-2', className)}
    {...props}
  />
));
SidebarHeader.displayName = 'SidebarHeader';

const SidebarFooter = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<'div'>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    data-sidebar="footer"
    className={cn('mxp-flex mxp-flex-col mxp-gap-2 mxp-p-2', className)}
    {...props}
  />
));
SidebarFooter.displayName = 'SidebarFooter';

const SidebarContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<'div'>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    data-sidebar="content"
    className={cn(
      'mxp-flex mxp-min-h-0 mxp-flex-1 mxp-flex-col mxp-gap-2 mxp-overflow-auto group-data-[collapsible=icon]:mxp-overflow-hidden',
      className
    )}
    {...props}
  />
));
SidebarContent.displayName = 'SidebarContent';

const SidebarSeparator = React.forwardRef<
  React.ElementRef<typeof Separator>,
  React.ComponentProps<typeof Separator>
>(({ className, ...props }, ref) => (
  <Separator
    ref={ref}
    data-sidebar="separator"
    className={cn('mxp-mx-2 mxp-w-auto', className)}
    {...props}
  />
));
SidebarSeparator.displayName = 'SidebarSeparator';

// ── Group ──────────────────────────────────────────────────────

const SidebarGroup = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<'div'>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    data-sidebar="group"
    className={cn('mxp-relative mxp-flex mxp-w-full mxp-min-w-0 mxp-flex-col mxp-p-2', className)}
    {...props}
  />
));
SidebarGroup.displayName = 'SidebarGroup';

const SidebarGroupLabel = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<'div'>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    data-sidebar="group-label"
    className={cn(
      'mxp-duration-200 mxp-flex mxp-h-8 mxp-shrink-0 mxp-items-center mxp-rounded-md mxp-px-2 mxp-text-xs mxp-font-medium mxp-text-sidebar-foreground/70 mxp-outline-none mxp-ring-sidebar-ring mxp-transition-[margin,opa] mxp-ease-linear focus-visible:mxp-ring-2 [&>svg]:mxp-size-4 [&>svg]:mxp-shrink-0',
      'group-data-[collapsible=icon]:mxp--mt-8 group-data-[collapsible=icon]:mxp-opacity-0',
      className
    )}
    {...props}
  />
));
SidebarGroupLabel.displayName = 'SidebarGroupLabel';

const SidebarGroupAction = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<'button'>
>(({ className, ...props }, ref) => (
  <button
    ref={ref}
    data-sidebar="group-action"
    className={cn(
      'mxp-absolute mxp-right-3 mxp-top-3.5 mxp-flex mxp-aspect-square mxp-w-5 mxp-items-center mxp-justify-center mxp-rounded-md mxp-p-0 mxp-text-sidebar-foreground mxp-outline-none mxp-ring-sidebar-ring mxp-transition-transform hover:mxp-bg-sidebar-accent hover:mxp-text-sidebar-accent-foreground focus-visible:mxp-ring-2 [&>svg]:mxp-size-4 [&>svg]:mxp-shrink-0',
      'after:mxp-absolute after:mxp--inset-2 after:md:mxp-hidden',
      'group-data-[collapsible=icon]:mxp-hidden',
      className
    )}
    {...props}
  />
));
SidebarGroupAction.displayName = 'SidebarGroupAction';

const SidebarGroupContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<'div'>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    data-sidebar="group-content"
    className={cn('mxp-w-full mxp-text-sm', className)}
    {...props}
  />
));
SidebarGroupContent.displayName = 'SidebarGroupContent';

// ── Menu ───────────────────────────────────────────────────────

const SidebarMenu = React.forwardRef<
  HTMLUListElement,
  React.ComponentProps<'ul'>
>(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    data-sidebar="menu"
    className={cn('mxp-flex mxp-w-full mxp-min-w-0 mxp-flex-col mxp-gap-1', className)}
    {...props}
  />
));
SidebarMenu.displayName = 'SidebarMenu';

const SidebarMenuItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentProps<'li'>
>(({ className, ...props }, ref) => (
  <li
    ref={ref}
    data-sidebar="menu-item"
    className={cn('mxp-group/menu-item mxp-relative', className)}
    {...props}
  />
));
SidebarMenuItem.displayName = 'SidebarMenuItem';

const sidebarMenuButtonVariants = cva(
  'mxp-peer/menu-button mxp-flex mxp-w-full mxp-items-center mxp-gap-2 mxp-overflow-hidden mxp-rounded-md mxp-p-2 mxp-text-left mxp-text-sm mxp-outline-none mxp-ring-sidebar-ring mxp-transition-[width,height,padding] hover:mxp-bg-sidebar-accent hover:mxp-text-sidebar-accent-foreground focus-visible:mxp-ring-2 active:mxp-bg-sidebar-accent active:mxp-text-sidebar-accent-foreground disabled:mxp-pointer-events-none disabled:mxp-opacity-50 group-has-[[data-sidebar=menu-action]]/menu-item:mxp-pr-8 aria-disabled:mxp-pointer-events-none aria-disabled:mxp-opacity-50 data-[active=true]:mxp-bg-sidebar-accent data-[active=true]:mxp-font-medium data-[active=true]:mxp-text-sidebar-accent-foreground data-[state=open]:hover:mxp-bg-sidebar-accent data-[state=open]:hover:mxp-text-sidebar-accent-foreground group-data-[collapsible=icon]:mxp-!size-8 group-data-[collapsible=icon]:mxp-!p-2 [&>span:last-child]:mxp-truncate [&>svg]:mxp-size-4 [&>svg]:mxp-shrink-0',
  {
    variants: {
      variant: {
        default: 'hover:mxp-bg-sidebar-accent hover:mxp-text-sidebar-accent-foreground',
        outline:
          'mxp-bg-background mxp-shadow-[0_0_0_1px_hsl(var(--mxp-sidebar-border))] hover:mxp-bg-sidebar-accent hover:mxp-text-sidebar-accent-foreground hover:mxp-shadow-[0_0_0_1px_hsl(var(--mxp-sidebar-accent))]',
      },
      size: {
        default: 'mxp-h-8 mxp-text-sm',
        sm: 'mxp-h-7 mxp-text-xs',
        lg: 'mxp-h-12 mxp-text-sm group-data-[collapsible=icon]:mxp-!p-0',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

const SidebarMenuButton = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<'button'> & {
    asChild?: boolean;
    isActive?: boolean;
    tooltip?: string | React.ComponentProps<typeof TooltipContent>;
  } & VariantProps<typeof sidebarMenuButtonVariants>
>(
  (
    {
      asChild = false,
      isActive = false,
      variant = 'default',
      size = 'default',
      tooltip,
      className,
      ...props
    },
    ref
  ) => {
    const { isMobile, state } = useSidebar();

    const button = (
      <button
        ref={ref}
        data-sidebar="menu-button"
        data-size={size}
        data-active={isActive}
        className={cn(sidebarMenuButtonVariants({ variant, size }), className)}
        {...props}
      />
    );

    if (!tooltip) return button;

    const tooltipProps =
      typeof tooltip === 'string' ? { children: tooltip } : tooltip;

    return (
      <Tooltip>
        <TooltipTrigger asChild>{button}</TooltipTrigger>
        <TooltipContent
          side="right"
          align="center"
          hidden={state !== 'collapsed' || isMobile}
          {...tooltipProps}
        />
      </Tooltip>
    );
  }
);
SidebarMenuButton.displayName = 'SidebarMenuButton';

const SidebarMenuAction = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<'button'> & { showOnHover?: boolean }
>(({ className, showOnHover = false, ...props }, ref) => (
  <button
    ref={ref}
    data-sidebar="menu-action"
    className={cn(
      'mxp-absolute mxp-right-1 mxp-top-1.5 mxp-flex mxp-aspect-square mxp-w-5 mxp-items-center mxp-justify-center mxp-rounded-md mxp-p-0 mxp-text-sidebar-foreground mxp-outline-none mxp-ring-sidebar-ring mxp-transition-transform hover:mxp-bg-sidebar-accent hover:mxp-text-sidebar-accent-foreground focus-visible:mxp-ring-2 peer-hover/menu-button:mxp-text-sidebar-accent-foreground [&>svg]:mxp-size-4 [&>svg]:mxp-shrink-0',
      'after:mxp-absolute after:mxp--inset-2 after:md:mxp-hidden',
      'group-data-[collapsible=icon]:mxp-hidden',
      showOnHover &&
        'mxp-group-focus-within/menu-item:mxp-opacity-100 mxp-group-hover/menu-item:mxp-opacity-100 data-[state=open]:mxp-opacity-100 peer-data-[active=true]/menu-button:mxp-text-sidebar-accent-foreground md:mxp-opacity-0',
      className
    )}
    {...props}
  />
));
SidebarMenuAction.displayName = 'SidebarMenuAction';

const SidebarMenuBadge = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<'div'>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    data-sidebar="menu-badge"
    className={cn(
      'mxp-absolute mxp-right-1 mxp-flex mxp-h-5 mxp-min-w-5 mxp-items-center mxp-justify-center mxp-rounded-md mxp-px-1 mxp-text-xs mxp-font-medium mxp-tabular-nums mxp-text-sidebar-foreground mxp-select-none mxp-pointer-events-none',
      'peer-hover/menu-button:mxp-text-sidebar-accent-foreground peer-data-[active=true]/menu-button:mxp-text-sidebar-accent-foreground',
      'group-data-[collapsible=icon]:mxp-hidden',
      className
    )}
    {...props}
  />
));
SidebarMenuBadge.displayName = 'SidebarMenuBadge';

const SidebarMenuSkeleton = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<'div'> & { showIcon?: boolean }
>(({ className, showIcon = false, ...props }, ref) => {
  const width = React.useMemo(() => `${Math.floor(Math.random() * 40) + 50}%`, []);

  return (
    <div
      ref={ref}
      data-sidebar="menu-skeleton"
      className={cn('mxp-flex mxp-h-8 mxp-items-center mxp-gap-2 mxp-rounded-md mxp-px-2', className)}
      {...props}
    >
      {showIcon && (
        <Skeleton className="mxp-size-4 mxp-rounded-md" data-sidebar="menu-skeleton-icon" />
      )}
      <Skeleton
        className="mxp-h-4 mxp-max-w-[--skeleton-width] mxp-flex-1"
        data-sidebar="menu-skeleton-text"
        style={{ '--skeleton-width': width } as React.CSSProperties}
      />
    </div>
  );
});
SidebarMenuSkeleton.displayName = 'SidebarMenuSkeleton';

// ── Sub Menu ───────────────────────────────────────────────────

const SidebarMenuSub = React.forwardRef<
  HTMLUListElement,
  React.ComponentProps<'ul'>
>(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    data-sidebar="menu-sub"
    className={cn(
      'mxp-mx-3.5 mxp-flex mxp-min-w-0 mxp-translate-x-px mxp-flex-col mxp-gap-1 mxp-border-l mxp-border-sidebar-border mxp-px-2.5 mxp-py-0.5',
      'group-data-[collapsible=icon]:mxp-hidden',
      className
    )}
    {...props}
  />
));
SidebarMenuSub.displayName = 'SidebarMenuSub';

const SidebarMenuSubItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentProps<'li'>
>(({ ...props }, ref) => <li ref={ref} {...props} />);
SidebarMenuSubItem.displayName = 'SidebarMenuSubItem';

const SidebarMenuSubButton = React.forwardRef<
  HTMLAnchorElement,
  React.ComponentProps<'a'> & {
    asChild?: boolean;
    size?: 'sm' | 'md';
    isActive?: boolean;
  }
>(({ asChild = false, size = 'md', isActive, className, ...props }, ref) => (
  <a
    ref={ref}
    data-sidebar="menu-sub-button"
    data-size={size}
    data-active={isActive}
    className={cn(
      'mxp-flex mxp-h-7 mxp-min-w-0 mxp--translate-x-px mxp-items-center mxp-gap-2 mxp-overflow-hidden mxp-rounded-md mxp-px-2 mxp-text-sidebar-foreground mxp-outline-none mxp-ring-sidebar-ring hover:mxp-bg-sidebar-accent hover:mxp-text-sidebar-accent-foreground focus-visible:mxp-ring-2 active:mxp-bg-sidebar-accent active:mxp-text-sidebar-accent-foreground disabled:mxp-pointer-events-none disabled:mxp-opacity-50 aria-disabled:mxp-pointer-events-none aria-disabled:mxp-opacity-50 [&>span:last-child]:mxp-truncate [&>svg]:mxp-size-4 [&>svg]:mxp-shrink-0 [&>svg]:mxp-text-sidebar-accent-foreground',
      'data-[active=true]:mxp-bg-sidebar-accent data-[active=true]:mxp-text-sidebar-accent-foreground',
      size === 'sm' && 'mxp-text-xs',
      size === 'md' && 'mxp-text-sm',
      'group-data-[collapsible=icon]:mxp-hidden',
      className
    )}
    {...props}
  />
));
SidebarMenuSubButton.displayName = 'SidebarMenuSubButton';

export {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarInset,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
  useSidebar,
};
