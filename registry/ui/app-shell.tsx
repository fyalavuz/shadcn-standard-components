"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
  useCallback,
  type ReactNode,
} from "react";
import { cn } from "@/lib/utils";
import gsap from "gsap";

// --- Context ---

interface AppShellContextValue {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  toggleSidebar: () => void;
  sidebarCollapsed: boolean;
  setSidebarCollapsed: (collapsed: boolean) => void;
}

const AppShellContext = createContext<AppShellContextValue | null>(null);

export function useAppShell() {
  const ctx = useContext(AppShellContext);
  if (!ctx) throw new Error("useAppShell must be used within AppShell");
  return ctx;
}

// --- AppShell ---

interface AppShellProps {
  children: ReactNode;
  className?: string;
  defaultSidebarOpen?: boolean;
}

export function AppShell({
  children,
  className,
  defaultSidebarOpen = false,
}: AppShellProps) {
  const [sidebarOpen, setSidebarOpen] = useState(defaultSidebarOpen);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const toggleSidebar = useCallback(() => setSidebarOpen((o) => !o), []);

  return (
    <AppShellContext.Provider
      value={{
        sidebarOpen,
        setSidebarOpen,
        toggleSidebar,
        sidebarCollapsed,
        setSidebarCollapsed,
      }}
    >
      <div className={cn("flex min-h-dvh flex-col relative", className)}>
        {children}
      </div>
    </AppShellContext.Provider>
  );
}

// --- Header ---

interface AppShellHeaderProps {
  children: ReactNode;
  className?: string;
  revealOnScroll?: boolean;
}

export function AppShellHeader({
  children,
  className,
  revealOnScroll = false,
}: AppShellHeaderProps) {
  const headerRef = useRef<HTMLElement>(null);
  const lastScrollY = useRef(0);
  const isHidden = useRef(false);

  useEffect(() => {
    if (!revealOnScroll || !headerRef.current) return;

    const header = headerRef.current;
    gsap.set(header, { y: 0 });

    const onScroll = () => {
      const currentY = window.scrollY;
      const direction = currentY > lastScrollY.current ? "down" : "up";
      lastScrollY.current = currentY;

      if (direction === "down" && currentY > 80 && !isHidden.current) {
        isHidden.current = true;
        gsap.to(header, {
          y: -header.offsetHeight,
          duration: 0.3,
          ease: "power2.out",
        });
      } else if (direction === "up" && isHidden.current) {
        isHidden.current = false;
        gsap.to(header, {
          y: 0,
          duration: 0.3,
          ease: "power2.out",
        });
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [revealOnScroll]);

  return (
    <header
      ref={headerRef}
      className={cn(
        "sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60",
        className,
      )}
    >
      {children}
    </header>
  );
}

// --- Sidebar ---

interface AppShellSidebarProps {
  children: ReactNode;
  className?: string;
  side?: "left" | "right";
  width?: string;
}

export function AppShellSidebar({
  children,
  className,
  side = "left",
  width = "280px",
}: AppShellSidebarProps) {
  const { sidebarOpen, setSidebarOpen } = useAppShell();
  const panelRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const isLeft = side === "left";

  // Escape key
  useEffect(() => {
    if (!sidebarOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSidebarOpen(false);
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [sidebarOpen, setSidebarOpen]);

  // Body scroll lock on mobile
  useEffect(() => {
    if (!sidebarOpen) return;
    const mq = window.matchMedia("(max-width: 767px)");
    if (!mq.matches) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [sidebarOpen]);

  // GSAP animation
  useEffect(() => {
    const panel = panelRef.current;
    const backdrop = backdropRef.current;
    if (!panel || !backdrop) return;

    const mq = window.matchMedia("(max-width: 767px)");
    if (!mq.matches) return; // Only animate on mobile

    if (sidebarOpen) {
      gsap.set(backdrop, { display: "block" });
      gsap.to(backdrop, { opacity: 1, duration: 0.25 });
      gsap.fromTo(
        panel,
        { x: isLeft ? "-100%" : "100%" },
        { x: "0%", duration: 0.35, ease: "power3.out" },
      );
    } else {
      gsap.to(panel, {
        x: isLeft ? "-100%" : "100%",
        duration: 0.25,
        ease: "power2.in",
      });
      gsap.to(backdrop, {
        opacity: 0,
        duration: 0.25,
        onComplete: () => gsap.set(backdrop, { display: "none" }),
      });
    }
  }, [sidebarOpen, isLeft]);

  return (
    <>
      {/* Mobile backdrop */}
      <div
        ref={backdropRef}
        className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
        style={{ display: "none", opacity: 0 }}
        onClick={() => setSidebarOpen(false)}
        aria-hidden="true"
      />

      {/* Sidebar panel */}
      <aside
        ref={panelRef}
        role="navigation"
        aria-label="Sidebar"
        style={{ width }}
        className={cn(
          // Mobile: fixed drawer
          "fixed top-0 z-50 h-full overflow-y-auto border-r border-border bg-background shadow-lg md:shadow-none",
          // Desktop: static
          "md:relative md:z-auto md:block md:translate-x-0",
          isLeft ? "left-0" : "right-0 border-l border-r-0",
          // Mobile: hidden by default (GSAP animates)
          !sidebarOpen && "max-md:-translate-x-full",
          !sidebarOpen && !isLeft && "max-md:translate-x-full",
          className,
        )}
      >
        {children}
      </aside>
    </>
  );
}

// --- Content ---

interface AppShellContentProps {
  children: ReactNode;
  className?: string;
}

export function AppShellContent({ children, className }: AppShellContentProps) {
  return (
    <main className={cn("flex-1 overflow-auto", className)}>{children}</main>
  );
}

// --- Footer ---

interface AppShellFooterProps {
  children: ReactNode;
  className?: string;
}

export function AppShellFooter({ children, className }: AppShellFooterProps) {
  return (
    <footer
      className={cn("border-t border-border bg-background", className)}
    >
      {children}
    </footer>
  );
}
