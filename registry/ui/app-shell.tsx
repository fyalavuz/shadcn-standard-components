"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
  memo,
  Children,
  isValidElement,
  cloneElement,
  type ReactNode,
  type ReactElement,
} from "react";
import { cn } from "@/lib/utils";
import gsap from "gsap";

// ============================================================================
// Types
// ============================================================================

export type ScrollDirection = "up" | "down" | null;

export type AnimationSpeed = "slow" | "normal" | "fast";

export type HeaderBehavior =
  | "static"
  | "fixed"
  | "sticky"
  | "reveal-all"
  | "reveal-nav"
  | "reveal-context"
  | "reveal-search"
  | "reveal-nav-context"
  | "reveal-nav-search"
  | "reveal-context-search";

export type HeaderTheme = "light" | "primary" | "dark" | "none";

export type FooterVariant = "tab-bar" | "floating" | "mini";

export type FooterBehavior = "static" | "auto-hide";

export type FooterPosition = "center" | "left" | "right";

export type SafeAreaEdge = "top" | "bottom" | "left" | "right";

export type SidebarSide = "left" | "right";

export interface AppShellContextValue {
  headerVisible: boolean;
  footerVisible: boolean;
  scrollDirection: ScrollDirection;
  setHeaderVisible: (visible: boolean) => void;
  setFooterVisible: (visible: boolean) => void;
}

export interface AppShellProps {
  safeArea?: boolean;
  className?: string;
  children: ReactNode;
}

export interface AppShellHeaderProps {
  logo?: ReactNode;
  actions?: ReactNode;
  nav?: ReactNode;
  title?: ReactNode;
  subtitle?: ReactNode;
  searchContent?: ReactNode;
  theme?: HeaderTheme;
  behavior?: HeaderBehavior;
  speed?: AnimationSpeed;
  mobileMenu?: ReactNode;
  onVisibilityChange?: (visible: boolean) => void;
  forceSafeAreaTop?: boolean;
  className?: string;
}

export interface AppShellFooterProps {
  variant?: FooterVariant;
  behavior?: FooterBehavior;
  position?: FooterPosition;
  speed?: AnimationSpeed;
  className?: string;
  children: ReactNode;
}

export interface FooterItemProps {
  icon: ReactNode;
  label: string;
  active?: boolean;
  badge?: number;
  onClick?: () => void;
  className?: string;
}

export interface AppShellSidebarProps {
  open: boolean;
  onClose: () => void;
  side?: SidebarSide;
  className?: string;
  children: ReactNode;
}

export interface AppShellContentProps {
  className?: string;
  children: ReactNode;
}

export interface SafeAreaProps {
  edges?: SafeAreaEdge[];
  className?: string;
  children: ReactNode;
}

export interface NavGroupProps {
  title: string;
  icon?: ReactNode;
  defaultOpen?: boolean;
  className?: string;
  children: ReactNode;
}

export interface NavItemProps {
  href?: string;
  icon?: ReactNode;
  label: string;
  active?: boolean;
  badge?: ReactNode;
  onClick?: () => void;
  className?: string;
}

export interface HeaderNavProps {
  className?: string;
  children: ReactNode;
}

export interface HeaderNavItemProps {
  label: string;
  href?: string;
  active?: boolean;
  className?: string;
  children?: ReactNode;
}

export interface ScrollNavProps {
  className?: string;
  children: ReactNode;
}

export interface ScrollNavItemProps {
  label: string;
  active?: boolean;
  onClick?: () => void;
  className?: string;
}

// ============================================================================
// Context
// ============================================================================

const AppShellContext = createContext<AppShellContextValue | null>(null);

function AppShellProvider({ children }: { children: ReactNode }) {
  const [headerVisible, setHeaderVisible] = useState(true);
  const [footerVisible, setFooterVisible] = useState(true);
  const [scrollDirection] = useState<ScrollDirection>(null);

  const value = useMemo<AppShellContextValue>(
    () => ({
      headerVisible,
      footerVisible,
      scrollDirection,
      setHeaderVisible,
      setFooterVisible,
    }),
    [headerVisible, footerVisible, scrollDirection]
  );

  return (
    <AppShellContext.Provider value={value}>
      {children}
    </AppShellContext.Provider>
  );
}

export function useAppShell(): AppShellContextValue {
  const ctx = useContext(AppShellContext);
  if (!ctx) {
    throw new Error("useAppShell must be used within an <AppShell>");
  }
  return ctx;
}

// ============================================================================
// Header Context (theme propagation)
// ============================================================================

interface HeaderContextValue {
  theme: HeaderTheme;
}

const HeaderContext = createContext<HeaderContextValue>({ theme: "light" });

const HeaderProvider = HeaderContext.Provider;

function useHeaderTheme() {
  return useContext(HeaderContext).theme;
}

// ============================================================================
// useScrollDirection Hook
// ============================================================================

export function useScrollDirection(threshold = 10): ScrollDirection {
  const [direction, setDirection] = useState<ScrollDirection>(null);
  const lastY = useRef(0);
  const ticking = useRef(false);

  useEffect(() => {
    lastY.current = window.scrollY;

    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;

      requestAnimationFrame(() => {
        const currentY = window.scrollY;
        const diff = currentY - lastY.current;

        if (Math.abs(diff) >= threshold) {
          setDirection(diff > 0 ? "down" : "up");
          lastY.current = currentY;
        }

        ticking.current = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  return direction;
}

// ============================================================================
// SafeArea
// ============================================================================

const cssMap: Record<SafeAreaEdge, string> = {
  top: "padding-top: var(--sa-top, env(safe-area-inset-top, 0px))",
  bottom: "padding-bottom: var(--sa-bottom, env(safe-area-inset-bottom, 0px))",
  left: "padding-left: var(--sa-left, env(safe-area-inset-left, 0px))",
  right: "padding-right: var(--sa-right, env(safe-area-inset-right, 0px))",
};

const SafeArea = memo(function SafeArea({
  edges = ["top", "bottom", "left", "right"],
  className,
  children,
}: SafeAreaProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const css = edges.map((edge) => cssMap[edge]).join("; ");
    ref.current.setAttribute("style", css);
  }, [edges]);

  return (
    <div
      ref={ref}
      className={cn("flex-1", className)}
      data-safe-area-edges={edges.join(",")}
    >
      {children}
    </div>
  );
});

// ============================================================================
// AppShellHeader (GSAP-based, all behaviors)
// ============================================================================

const headerThemeStyles = {
  light: {
    wrapper: "bg-background text-foreground",
    nav: "bg-background/95 border-border",
    context: "bg-background/95 border-border",
    search: "bg-background/95 border-border",
    mobile: "bg-background text-foreground border-border",
  },
  primary: {
    wrapper: "bg-primary text-primary-foreground",
    nav: "bg-primary border-primary/80",
    context: "bg-primary border-primary/80",
    search: "bg-primary border-primary/80",
    mobile: "bg-primary text-primary-foreground border-primary/80",
  },
  dark: {
    wrapper: "bg-zinc-950 text-slate-50",
    nav: "bg-zinc-950 border-zinc-800",
    context: "bg-zinc-950 border-zinc-800",
    search: "bg-zinc-950 border-zinc-800",
    mobile: "bg-zinc-950 text-slate-50 border-zinc-800",
  },
  none: {
    wrapper: "",
    nav: "",
    context: "",
    search: "",
    mobile: "",
  },
} as const;

const speedMap: Record<AnimationSpeed, number> = {
  fast: 0.15,
  normal: 0.3,
  slow: 0.6,
};

export const AppShellHeader = memo(function AppShellHeader({
  logo,
  actions,
  nav,
  title,
  subtitle,
  searchContent,
  theme = "light",
  behavior = "fixed",
  speed = "normal",
  mobileMenu,
  onVisibilityChange,
  forceSafeAreaTop = false,
  className,
}: AppShellHeaderProps) {
  const scrollDirection = useScrollDirection();
  const t = headerThemeStyles[theme];
  const [mobileOpen, setMobileOpen] = useState(false);
  const duration = speedMap[speed];

  const ghostRef = useRef<HTMLElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const [threshold, setThreshold] = useState(0);
  const [overlayMounted, setOverlayMounted] = useState(false);
  const [mobileMenuMounted, setMobileMenuMounted] = useState(false);

  // Sync header height to CSS variable for sticky siblings
  useEffect(() => {
    const el = ghostRef.current;
    if (!el) return;

    const syncHeight = () => {
      const height = el.offsetHeight;
      document.documentElement.style.setProperty(
        "--header-height",
        `${height}px`
      );
    };

    syncHeight();
    const ro = new ResizeObserver(syncHeight);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Measure threshold for reveal behaviors
  useEffect(() => {
    const el = ghostRef.current;
    if (
      !el ||
      behavior === "static" ||
      behavior === "fixed" ||
      behavior === "sticky"
    )
      return;

    const measure = () => {
      const navEl = el.querySelector("[data-header-nav]");
      const ctxEl = el.querySelector("[data-header-context]");
      const navH = navEl ? (navEl as HTMLElement).offsetHeight : 0;
      const ctxH = ctxEl ? (ctxEl as HTMLElement).offsetHeight : 0;

      if (behavior === "reveal-all" || behavior === "reveal-nav") {
        setThreshold(0);
      } else if (
        behavior === "reveal-context" ||
        behavior === "reveal-nav-context"
      ) {
        setThreshold(navH);
      } else if (
        behavior === "reveal-search" ||
        behavior === "reveal-nav-search"
      ) {
        setThreshold(navH + ctxH);
      } else if (behavior === "reveal-context-search") {
        setThreshold(navH);
      }
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [behavior]);

  const [isPastThreshold, setIsPastThreshold] = useState(false);

  useEffect(() => {
    if (
      behavior === "static" ||
      behavior === "fixed" ||
      behavior === "sticky"
    )
      return;

    const onScroll = () => {
      setIsPastThreshold(window.scrollY > threshold + 10);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [behavior, threshold]);

  const hasRevealEffect = behavior.startsWith("reveal-");
  const isOverlayVisible =
    hasRevealEffect && scrollDirection === "up" && isPastThreshold;

  useEffect(() => {
    onVisibilityChange?.(
      behavior === "fixed" ||
        behavior === "sticky" ||
        !hasRevealEffect ||
        isOverlayVisible
    );
  }, [isOverlayVisible, behavior, hasRevealEffect, onVisibilityChange]);

  // GSAP overlay animation (replaces AnimatePresence + motion.div)
  useEffect(() => {
    if (isOverlayVisible) {
      setOverlayMounted(true);
    }
  }, [isOverlayVisible]);

  useEffect(() => {
    const el = overlayRef.current;
    if (!el) return;

    if (isOverlayVisible) {
      gsap.fromTo(
        el,
        { y: -8, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration,
          ease: "power3.out",
        }
      );
    } else if (overlayMounted) {
      gsap.to(el, {
        y: -8,
        opacity: 0,
        duration,
        ease: "power3.out",
        onComplete: () => setOverlayMounted(false),
      });
    }
  }, [isOverlayVisible, overlayMounted, duration]);

  // GSAP mobile menu animation
  useEffect(() => {
    if (mobileOpen) {
      setMobileMenuMounted(true);
    }
  }, [mobileOpen]);

  useEffect(() => {
    const el = mobileMenuRef.current;
    if (!el) return;

    if (mobileOpen) {
      gsap.fromTo(
        el,
        { height: 0, opacity: 0 },
        {
          height: "auto",
          opacity: 1,
          duration,
          ease: "power3.out",
        }
      );
    } else if (mobileMenuMounted) {
      gsap.to(el, {
        height: 0,
        opacity: 0,
        duration,
        ease: "power3.out",
        onComplete: () => setMobileMenuMounted(false),
      });
    }
  }, [mobileOpen, mobileMenuMounted, duration]);

  const shouldShowInOverlay = useCallback(
    (row: "nav" | "context" | "search") => {
      if (behavior === "reveal-all") return true;
      if (behavior === "reveal-nav" && row === "nav") return true;
      if (behavior === "reveal-context" && row === "context") return true;
      if (behavior === "reveal-search" && row === "search") return true;
      if (
        behavior === "reveal-nav-context" &&
        (row === "nav" || row === "context")
      )
        return true;
      if (
        behavior === "reveal-nav-search" &&
        (row === "nav" || row === "search")
      )
        return true;
      if (
        behavior === "reveal-context-search" &&
        (row === "context" || row === "search")
      )
        return true;
      return false;
    },
    [behavior]
  );

  const toggleMobile = useCallback(() => setMobileOpen((o) => !o), []);

  const menuIcon = (
    <svg
      className="size-6"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
      />
    </svg>
  );

  const closeIcon = (
    <svg
      className="size-6"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  );

  const renderNavRow = (isSticky = false) => (
    <nav
      data-header-nav
      className={cn(
        "w-full border-b backdrop-blur-xl",
        t.nav,
        isSticky && "sticky top-0 z-40"
      )}
    >
      <div className="mx-auto flex h-14 w-full max-w-7xl items-center px-4 sm:px-6">
        <div className="flex items-center gap-4 flex-1">
          <div className="flex items-center gap-3">
            {mobileMenu && (
              <button
                type="button"
                className="p-1 rounded-md hover:bg-accent/50 md:hidden transition-colors"
                onClick={toggleMobile}
                aria-label={mobileOpen ? "Close menu" : "Open menu"}
              >
                {mobileOpen ? closeIcon : menuIcon}
              </button>
            )}
            {logo}
          </div>
          {nav && (
            <div className="hidden md:flex items-center ml-4">{nav}</div>
          )}
        </div>
        <div className="flex items-center gap-2">{actions}</div>
      </div>
    </nav>
  );

  const renderContextRow = () =>
    title || subtitle ? (
      <div
        data-header-context
        className={cn(
          "w-full border-b backdrop-blur-xl relative z-30",
          t.context
        )}
      >
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 flex flex-col justify-center py-4">
          {title && (
            <h1 className="text-base md:text-2xl font-bold leading-tight text-balance">
              {title}
            </h1>
          )}
          {subtitle && <p className="mt-1 text-sm opacity-80">{subtitle}</p>}
        </div>
      </div>
    ) : null;

  const renderSearchRow = () =>
    searchContent ? (
      <div
        data-header-search
        className={cn(
          "w-full border-b backdrop-blur-sm relative z-20",
          t.search
        )}
      >
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 py-2">
          {searchContent}
        </div>
      </div>
    ) : null;

  const renderMobileMenuPanel = () => {
    if (!mobileMenu || (!mobileOpen && !mobileMenuMounted)) return null;
    return (
      <div
        ref={mobileMenuRef}
        className={cn("md:hidden overflow-hidden border-t w-full", t.mobile)}
        style={{ height: 0, opacity: 0 }}
      >
        <div className="px-4 pb-4 pt-2">{mobileMenu}</div>
      </div>
    );
  };

  const renderContent = () => (
    <HeaderProvider value={{ theme }}>
      {renderNavRow(
        behavior !== "static" &&
          behavior !== "fixed" &&
          behavior !== "sticky"
      )}
      {renderContextRow()}
      {renderSearchRow()}
      {renderMobileMenuPanel()}
    </HeaderProvider>
  );

  const isFixed = behavior === "fixed" || behavior === "sticky";

  if (isFixed) {
    return (
      <header
        ref={ghostRef}
        className={cn(
          "w-full sticky top-0 z-50 will-change-transform",
          t.wrapper,
          className
        )}
        style={{
          paddingTop: "var(--sa-top, env(safe-area-inset-top, 0px))",
        }}
      >
        <HeaderProvider value={{ theme }}>
          {renderNavRow()}
          {renderContextRow()}
          {renderSearchRow()}
          {renderMobileMenuPanel()}
        </HeaderProvider>
      </header>
    );
  }

  return (
    <>
      <header
        ref={ghostRef}
        className={cn("w-full relative z-50", t.wrapper, className)}
        style={{
          paddingTop: forceSafeAreaTop
            ? "var(--sa-top, env(safe-area-inset-top, 0px))"
            : undefined,
        }}
      >
        {renderContent()}
      </header>

      {hasRevealEffect && overlayMounted && (
        <div
          ref={overlayRef}
          aria-hidden
          className={cn(
            "fixed top-0 left-0 right-0 z-[60] shadow-lg will-change-transform",
            t.wrapper
          )}
          style={{
            paddingTop: "var(--sa-top, env(safe-area-inset-top, 0px))",
            opacity: 0,
          }}
        >
          <HeaderProvider value={{ theme }}>
            {shouldShowInOverlay("nav") && renderNavRow()}
            {shouldShowInOverlay("context") && renderContextRow()}
            {shouldShowInOverlay("search") && renderSearchRow()}
          </HeaderProvider>
        </div>
      )}
    </>
  );
});
AppShellHeader.displayName = "AppShellHeader";

// ============================================================================
// AppShellSidebar (GSAP animated drawer)
// ============================================================================

export const AppShellSidebar = memo(function AppShellSidebar({
  open,
  onClose,
  side = "left",
  className,
  children,
}: AppShellSidebarProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const isLeft = side === "left";

  // Close on Escape key
  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  // Lock body scroll when open
  useEffect(() => {
    if (!open) return;

    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [open]);

  // Mount/unmount with GSAP
  useEffect(() => {
    if (open) {
      setMounted(true);
    }
  }, [open]);

  useEffect(() => {
    const panel = panelRef.current;
    const backdrop = backdropRef.current;
    if (!panel || !backdrop) return;

    if (open) {
      gsap.fromTo(backdrop, { opacity: 0 }, { opacity: 1, duration: 0.2 });
      gsap.fromTo(
        panel,
        { x: isLeft ? "-100%" : "100%" },
        { x: "0%", duration: 0.25, ease: "power3.out" }
      );
    } else if (mounted) {
      gsap.to(panel, {
        x: isLeft ? "-100%" : "100%",
        duration: 0.25,
        ease: "power2.in",
      });
      gsap.to(backdrop, {
        opacity: 0,
        duration: 0.2,
        onComplete: () => setMounted(false),
      });
    }
  }, [open, mounted, isLeft]);

  if (!mounted) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        ref={backdropRef}
        className="fixed inset-0 z-[70] bg-black/50 backdrop-blur-sm"
        style={{ opacity: 0 }}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer panel */}
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        className={cn(
          "fixed top-0 z-[71] h-full w-80 max-w-[85vw] overflow-y-auto bg-background shadow-2xl will-change-transform",
          isLeft ? "left-0" : "right-0",
          className
        )}
        style={{ transform: isLeft ? "translateX(-100%)" : "translateX(100%)" }}
      >
        {children}
      </div>
    </>
  );
});

// ============================================================================
// AppShellContent
// ============================================================================

export const AppShellContent = memo(function AppShellContent({
  className,
  children,
}: AppShellContentProps) {
  return <main className={cn("flex-1", className)}>{children}</main>;
});

// ============================================================================
// AppShellFooter (GSAP animated, 3 variants)
// ============================================================================

export const FooterItem = memo(function FooterItem({
  icon,
  label,
  active = false,
  badge,
  onClick,
  className,
}: FooterItemProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      data-active={active || undefined}
      className={cn(
        "flex flex-1 flex-col items-center justify-center gap-0.5 py-1 transition-colors relative",
        active
          ? "text-primary"
          : "text-muted-foreground hover:text-foreground",
        className
      )}
    >
      <span className="relative">
        {icon}
        {badge != null && badge > 0 && (
          <span className="absolute -top-1.5 -right-2.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-destructive px-1 text-[10px] font-bold text-white">
            {badge > 99 ? "99+" : badge}
          </span>
        )}
      </span>
      <span className="text-[10px] font-medium leading-tight">{label}</span>
      {active && (
        <div className="absolute -bottom-0.5 h-0.5 w-4 rounded-full bg-primary" />
      )}
    </button>
  );
});

export const AppShellFooter = memo(function AppShellFooter({
  variant = "tab-bar",
  behavior = "static",
  position = "center",
  speed = "normal",
  className,
  children,
}: AppShellFooterProps) {
  const scrollDirection = useScrollDirection();
  const shouldHide = behavior === "auto-hide" && scrollDirection === "down";
  const duration = speedMap[speed];
  const footerRef = useRef<HTMLElement | HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(true);

  // GSAP show/hide for auto-hide behavior
  useEffect(() => {
    if (behavior !== "auto-hide") return;

    if (!shouldHide) {
      setMounted(true);
    }
  }, [shouldHide, behavior]);

  useEffect(() => {
    if (behavior !== "auto-hide") return;

    const el = variant === "floating" ? innerRef.current : footerRef.current;
    if (!el) return;

    const hideY = variant === "floating" ? 20 : variant === "mini" ? 48 : 80;

    if (shouldHide && mounted) {
      gsap.to(el, {
        y: hideY,
        opacity: variant === "floating" ? 0 : 1,
        duration,
        ease: "power3.out",
        onComplete: () => setMounted(false),
      });
    } else if (!shouldHide) {
      gsap.fromTo(
        el,
        {
          y: hideY,
          opacity: variant === "floating" ? 0 : 1,
        },
        {
          y: 0,
          opacity: 1,
          duration,
          ease: "power3.out",
        }
      );
    }
  }, [shouldHide, mounted, variant, duration, behavior]);

  if (behavior === "auto-hide" && !mounted && shouldHide) return null;

  if (variant === "floating") {
    const positionClass = {
      center: "justify-center",
      left: "justify-start pl-4",
      right: "justify-end pr-4",
    }[position];

    return (
      <div
        ref={footerRef as React.RefObject<HTMLDivElement>}
        data-footer-floating
        className={cn(
          "fixed bottom-0 left-0 right-0 z-50 flex pointer-events-none",
          positionClass,
          className
        )}
        style={{
          paddingBottom:
            "var(--sa-bottom, env(safe-area-inset-bottom, 0px))",
        }}
      >
        <div ref={innerRef} className="pointer-events-auto will-change-transform">
          {children}
        </div>
      </div>
    );
  }

  if (variant === "mini") {
    return (
      <footer
        ref={footerRef as React.RefObject<HTMLElement>}
        className={cn(
          "fixed bottom-0 left-0 right-0 z-50 min-h-12 border-t bg-background/95 backdrop-blur-xl will-change-transform",
          className
        )}
        style={{
          paddingBottom:
            "var(--sa-bottom, env(safe-area-inset-bottom, 0px))",
        }}
      >
        <div className="mx-auto flex h-12 max-w-7xl items-center px-4">
          {children}
        </div>
      </footer>
    );
  }

  // tab-bar (default)
  return (
    <footer
      ref={footerRef as React.RefObject<HTMLElement>}
      className={cn(
        "fixed bottom-0 left-0 right-0 z-50 border-t bg-background/95 backdrop-blur-xl will-change-transform",
        className
      )}
      style={{
        paddingBottom:
          "var(--sa-bottom, env(safe-area-inset-bottom, 0px))",
      }}
    >
      <div className="mx-auto flex max-w-lg items-stretch">{children}</div>
    </footer>
  );
});

// ============================================================================
// NavGroup
// ============================================================================

const ChevronIcon = () => (
  <svg
    className="size-4"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={2}
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M19.5 8.25l-7.5 7.5-7.5-7.5"
    />
  </svg>
);

export const NavGroup = memo(function NavGroup({
  title,
  icon,
  defaultOpen = false,
  className,
  children,
}: NavGroupProps) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className={cn("w-full", className)}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
      >
        {icon && <span className="shrink-0">{icon}</span>}
        <span className="flex-1 text-left">{title}</span>
        <span
          className={cn(
            "shrink-0 transition-transform duration-200",
            open && "rotate-180"
          )}
        >
          <ChevronIcon />
        </span>
      </button>

      <div
        className={cn(
          "transition-[max-height] duration-200 ease-out overflow-hidden",
          open ? "max-h-[500px]" : "max-h-0"
        )}
      >
        <div className="pl-4 py-1">{children}</div>
      </div>
    </div>
  );
});

// ============================================================================
// NavItem
// ============================================================================

export const NavItem = memo(function NavItem({
  href,
  icon,
  label,
  active = false,
  badge,
  onClick,
  className,
}: NavItemProps) {
  const classes = cn(
    "flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
    active
      ? "bg-accent text-accent-foreground"
      : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
    className
  );

  const content = (
    <>
      {icon && (
        <span className="shrink-0 opacity-70 group-data-[active=true]:opacity-100 transition-opacity">
          {icon}
        </span>
      )}
      <span className="flex-1 truncate text-left">{label}</span>
      {badge && <span className="shrink-0 ml-auto">{badge}</span>}
    </>
  );

  const commonProps = {
    className: classes,
    onClick,
    "data-active": active || undefined,
  };

  if (href) {
    return (
      <a href={href} {...commonProps}>
        {content}
      </a>
    );
  }

  return (
    <button type="button" {...commonProps}>
      {content}
    </button>
  );
});

// ============================================================================
// HeaderNav / HeaderNavItem
// ============================================================================

export const HeaderNav = memo(function HeaderNav({
  className,
  children,
}: HeaderNavProps) {
  return (
    <nav className={cn("flex items-center gap-1", className)}>{children}</nav>
  );
});

export const HeaderNavItem = memo(function HeaderNavItem({
  label,
  href,
  active = false,
  className,
  children,
}: HeaderNavItemProps) {
  const theme = useHeaderTheme();
  const [open, setOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const hasDropdown = children != null;

  const clearCloseTimer = useCallback(() => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  }, []);

  const handleMouseEnter = useCallback(() => {
    if (!hasDropdown) return;
    clearCloseTimer();
    setOpen(true);
  }, [hasDropdown, clearCloseTimer]);

  const handleMouseLeave = useCallback(() => {
    if (!hasDropdown) return;
    closeTimer.current = setTimeout(() => {
      setOpen(false);
    }, 150);
  }, [hasDropdown]);

  const handleClick = useCallback(() => {
    if (!hasDropdown) return;
    setOpen((prev) => !prev);
  }, [hasDropdown]);

  // Close on Escape key
  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  // Close on outside click
  useEffect(() => {
    if (!open) return;

    const handleMouseDown = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleMouseDown);
    return () => document.removeEventListener("mousedown", handleMouseDown);
  }, [open]);

  // Cleanup timer on unmount
  useEffect(() => {
    return () => clearCloseTimer();
  }, [clearCloseTimer]);

  const isActive = active || open;

  const getThemeClasses = () => {
    if (theme === "primary") {
      return isActive
        ? "bg-primary-foreground/20 text-primary-foreground"
        : "text-primary-foreground/70 hover:bg-primary-foreground/10 hover:text-primary-foreground";
    }
    if (theme === "dark") {
      return isActive
        ? "bg-primary-foreground/10 text-primary-foreground"
        : "text-primary-foreground/60 hover:bg-primary-foreground/10 hover:text-primary-foreground";
    }
    // light (default)
    return isActive
      ? "bg-accent text-accent-foreground"
      : "text-muted-foreground hover:bg-accent hover:text-accent-foreground";
  };

  const baseClasses = cn(
    "inline-flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
    getThemeClasses(),
    className
  );

  const commonProps = {
    className: baseClasses,
    "aria-current": active ? ("page" as const) : undefined,
    "data-active": active || undefined,
    "data-state": open ? ("open" as const) : ("closed" as const),
  };

  // Simple item without dropdown
  if (!hasDropdown) {
    if (href) {
      return (
        <a href={href} {...commonProps}>
          {label}
        </a>
      );
    }

    return (
      <button type="button" {...commonProps}>
        {label}
      </button>
    );
  }

  // Item with dropdown
  return (
    <div
      ref={containerRef}
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        type="button"
        {...commonProps}
        onClick={handleClick}
        aria-expanded={open}
        aria-haspopup="true"
      >
        {label}
        <svg
          className={cn(
            "size-4 transition-transform duration-200",
            open && "rotate-180"
          )}
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 8.25l-7.5 7.5-7.5-7.5"
          />
        </svg>
      </button>

      {open && (
        <div
          role="menu"
          className="absolute top-full left-0 mt-1 min-w-48 rounded-lg border border-border bg-popover p-1 shadow-md animate-in fade-in zoom-in-95 duration-200"
        >
          {children}
        </div>
      )}
    </div>
  );
});

// ============================================================================
// ScrollNav / ScrollNavItem
// ============================================================================

export const ScrollNav = memo(function ScrollNav({
  className,
  children,
}: ScrollNavProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-1.5 overflow-x-auto scrollbar-hide",
        className
      )}
    >
      {children}
    </div>
  );
});

export const ScrollNavItem = memo(function ScrollNavItem({
  label,
  active = false,
  onClick,
  className,
}: ScrollNavItemProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      data-active={active || undefined}
      className={cn(
        "shrink-0 rounded-full px-3.5 py-1.5 text-sm font-medium transition-all duration-200 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
        active
          ? "bg-foreground text-background shadow-sm"
          : "text-muted-foreground hover:text-foreground hover:bg-muted",
        className
      )}
    >
      {label}
    </button>
  );
});

// ============================================================================
// AppShell (Main Wrapper)
// ============================================================================

function AppShellInner({
  safeArea = false,
  className,
  children,
}: AppShellProps) {
  if (!safeArea) {
    return (
      <div className={cn("flex min-h-dvh flex-col relative", className)}>
        {children}
      </div>
    );
  }

  let header: ReactNode = null;
  let headerBehavior: string = "fixed";
  const otherChildren: ReactNode[] = [];

  Children.forEach(children, (child) => {
    if (isValidElement(child)) {
      const childType = child.type as { displayName?: string; name?: string };
      const isHeader =
        child.type === AppShellHeader ||
        childType.displayName === "AppShellHeader" ||
        childType.name === "AppShellHeader";

      if (isHeader) {
        header = child;
        headerBehavior =
          (child.props as AppShellHeaderProps).behavior || "fixed";
      } else {
        otherChildren.push(child);
      }
    }
  });

  const isStatic = headerBehavior === "static";

  if (isStatic) {
    return (
      <SafeArea
        edges={["top", "bottom"]}
        className={cn("flex min-h-dvh flex-col relative", className)}
      >
        {header}
        <div className="flex flex-col flex-1">{otherChildren}</div>
      </SafeArea>
    );
  }

  return (
    <div className={cn("flex min-h-dvh flex-col relative", className)}>
      {header && isValidElement(header)
        ? cloneElement(header as ReactElement<AppShellHeaderProps>, {
            forceSafeAreaTop: true,
          })
        : header}
      <SafeArea edges={["bottom"]} className="flex flex-col flex-1">
        {otherChildren}
      </SafeArea>
    </div>
  );
}

export const AppShell = memo(function AppShell(props: AppShellProps) {
  return (
    <AppShellProvider>
      <AppShellInner {...props} />
    </AppShellProvider>
  );
});

AppShell.displayName = "AppShell";
