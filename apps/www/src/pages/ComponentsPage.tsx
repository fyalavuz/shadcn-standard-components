import { useState } from "react";
import { Link } from "react-router-dom";
import { PriceFilter } from "../registry-demos/PriceFilter";
import {
  AppShell,
  AppShellHeader,
  AppShellSidebar,
  AppShellContent,
  AppShellFooter,
  NavGroup,
  NavItem,
} from "../registry-demos/AppShell";

// --- AppShell inline demo ---

function AppShellDemo() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="rounded-lg border border-border overflow-hidden h-[350px] relative">
      <AppShell className="h-full min-h-0">
        <AppShellHeader
          behavior="fixed"
          theme="dark"
          logo={
            <span className="text-sm font-semibold">My App</span>
          }
          nav={
            <div className="flex items-center gap-3 text-xs">
              <span className="opacity-70 hover:opacity-100 cursor-pointer">Home</span>
              <span className="opacity-70 hover:opacity-100 cursor-pointer">Projects</span>
            </div>
          }
          actions={
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-1.5 rounded-md hover:bg-accent/50 transition-colors md:hidden"
              aria-label="Toggle sidebar"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            </button>
          }
        />
        <div className="flex flex-1 min-h-0 overflow-hidden">
          <AppShellSidebar
            open={sidebarOpen}
            onClose={() => setSidebarOpen(false)}
            side="left"
          >
            <div className="p-3 text-xs">
              <NavGroup title="Menu" defaultOpen>
                <NavItem label="Dashboard" active />
                <NavItem label="Projects" />
                <NavItem label="Settings" />
              </NavGroup>
            </div>
          </AppShellSidebar>
          <AppShellContent className="p-4 text-sm text-muted-foreground overflow-auto">
            <p>Main content area. Sidebar is a drawer on mobile with GSAP animation.</p>
          </AppShellContent>
        </div>
        <AppShellFooter className="px-3 py-1.5 text-xs text-muted-foreground">
          Footer
        </AppShellFooter>
      </AppShell>
    </div>
  );
}

// --- PriceFilter inline demo ---

function PriceFilterDemo() {
  const [range, setRange] = useState({ min: 100, max: 500 });
  return (
    <div className="rounded-lg border border-border p-6 bg-card">
      <PriceFilter
        min={0}
        max={1000}
        defaultMin={100}
        defaultMax={500}
        currency="$"
        title="Price Range"
        onChange={setRange}
      />
      <p className="mt-3 pt-3 border-t border-border text-xs text-muted-foreground">
        Selected: <span className="text-foreground font-medium">${range.min}</span> — <span className="text-foreground font-medium">${range.max}</span>
      </p>
    </div>
  );
}

// --- Page ---

export default function ComponentsPage() {
  return (
    <div className="max-w-3xl">
      <h1 className="text-3xl font-bold tracking-tight mb-2">Components</h1>
      <p className="text-muted-foreground mb-8">
        Browse and install beautifully crafted UI components.
      </p>

      {/* App Shell */}
      <section className="mb-12">
        <div className="flex items-center gap-2 mb-1">
          <h2 className="text-xl font-semibold">App Shell</h2>
          <span className="text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded-full">Layout</span>
        </div>
        <p className="text-sm text-muted-foreground mb-4">
          A responsive application shell with header, collapsible sidebar, content area, and footer. Uses GSAP for smooth animations.
        </p>
        <AppShellDemo />
        <div className="flex items-center gap-3 mt-3">
          <div className="flex-1 rounded-md bg-muted px-3 py-1.5">
            <code className="text-xs text-muted-foreground">npx ssc add app-shell</code>
          </div>
          <Link to="/docs/components/app-shell" className="text-xs text-primary hover:underline shrink-0">
            View docs →
          </Link>
        </div>
      </section>

      {/* Price Filter */}
      <section className="mb-12">
        <div className="flex items-center gap-2 mb-1">
          <h2 className="text-xl font-semibold">Price Filter</h2>
          <span className="text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded-full">E-commerce</span>
        </div>
        <p className="text-sm text-muted-foreground mb-4">
          A dual range price filter with histogram distribution chart, slider thumbs, and currency input fields.
        </p>
        <PriceFilterDemo />
        <div className="flex items-center gap-3 mt-3">
          <div className="flex-1 rounded-md bg-muted px-3 py-1.5">
            <code className="text-xs text-muted-foreground">npx ssc add price-filter</code>
          </div>
          <Link to="/docs/components/price-filter" className="text-xs text-primary hover:underline shrink-0">
            View docs →
          </Link>
        </div>
      </section>
    </div>
  );
}
