import { useState } from "react";
import {
  AppShell,
  AppShellHeader,
  AppShellSidebar,
  AppShellContent,
  AppShellFooter,
  FooterItem,
  NavGroup,
  NavItem,
  HeaderNav,
  HeaderNavItem,
  ScrollNav,
  ScrollNavItem,
  useAppShell,
} from "../registry-demos/AppShell";

function DemoSidebarContent() {
  const [activeItem, setActiveItem] = useState("Dashboard");

  const homeIcon = (
    <svg className="size-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955a1.126 1.126 0 011.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
    </svg>
  );

  const chartIcon = (
    <svg className="size-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
    </svg>
  );

  const folderIcon = (
    <svg className="size-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" />
    </svg>
  );

  const gearIcon = (
    <svg className="size-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );

  const usersIcon = (
    <svg className="size-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
    </svg>
  );

  return (
    <div className="p-3 space-y-1">
      <NavGroup title="Overview" icon={homeIcon} defaultOpen>
        <NavItem
          label="Dashboard"
          icon={homeIcon}
          active={activeItem === "Dashboard"}
          onClick={() => setActiveItem("Dashboard")}
        />
        <NavItem
          label="Analytics"
          icon={chartIcon}
          active={activeItem === "Analytics"}
          onClick={() => setActiveItem("Analytics")}
          badge={<span className="text-xs bg-primary/10 text-primary px-1.5 py-0.5 rounded-full">New</span>}
        />
      </NavGroup>
      <NavGroup title="Workspace" icon={folderIcon}>
        <NavItem
          label="Projects"
          icon={folderIcon}
          active={activeItem === "Projects"}
          onClick={() => setActiveItem("Projects")}
        />
        <NavItem
          label="Team"
          icon={usersIcon}
          active={activeItem === "Team"}
          onClick={() => setActiveItem("Team")}
        />
      </NavGroup>
      <NavItem
        label="Settings"
        icon={gearIcon}
        active={activeItem === "Settings"}
        onClick={() => setActiveItem("Settings")}
      />
    </div>
  );
}

function AppShellDemo() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeFooter, setActiveFooter] = useState("home");
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = ["All", "Recent", "Favorites", "Shared", "Archive"];

  return (
    <AppShell className="h-[500px] rounded-lg border border-border overflow-hidden">
      <AppShellHeader
        behavior="fixed"
        theme="light"
        logo={
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-primary rounded-lg flex items-center justify-center text-primary-foreground text-xs font-bold">
              A
            </div>
            <span className="font-semibold text-sm hidden sm:inline">Acme App</span>
          </div>
        }
        nav={
          <HeaderNav>
            <HeaderNavItem label="Home" active />
            <HeaderNavItem label="Products">
              <div className="py-1">
                <a href="#" className="block px-3 py-2 text-sm rounded-md hover:bg-accent">Electronics</a>
                <a href="#" className="block px-3 py-2 text-sm rounded-md hover:bg-accent">Clothing</a>
                <a href="#" className="block px-3 py-2 text-sm rounded-md hover:bg-accent">Books</a>
              </div>
            </HeaderNavItem>
            <HeaderNavItem label="About" />
          </HeaderNav>
        }
        actions={
          <button
            onClick={() => setSidebarOpen(true)}
            className="inline-flex items-center justify-center rounded-md p-2 hover:bg-accent hover:text-accent-foreground transition-colors"
            aria-label="Open sidebar"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 12h18M3 6h18M3 18h18" />
            </svg>
          </button>
        }
        title="Dashboard"
        subtitle="Welcome back, manage your projects and team."
        searchContent={
          <ScrollNav>
            {categories.map((cat) => (
              <ScrollNavItem
                key={cat}
                label={cat}
                active={activeCategory === cat}
                onClick={() => setActiveCategory(cat)}
              />
            ))}
          </ScrollNav>
        }
        mobileMenu={
          <div className="space-y-2">
            <a href="#" className="block px-3 py-2 text-sm rounded-md hover:bg-accent">Home</a>
            <a href="#" className="block px-3 py-2 text-sm rounded-md hover:bg-accent">Products</a>
            <a href="#" className="block px-3 py-2 text-sm rounded-md hover:bg-accent">About</a>
          </div>
        }
      />

      <AppShellSidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        side="right"
      >
        <div className="p-4 border-b border-border flex items-center justify-between">
          <span className="font-semibold text-sm">Navigation</span>
          <button
            onClick={() => setSidebarOpen(false)}
            className="p-1 rounded-md hover:bg-accent transition-colors"
            aria-label="Close sidebar"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <DemoSidebarContent />
      </AppShellSidebar>

      <AppShellContent className="p-6 overflow-y-auto">
        <h2 className="text-lg font-semibold mb-2">Content Area</h2>
        <p className="text-sm text-muted-foreground mb-4">
          This demo showcases the full AppShell with header (logo, nav, actions, title,
          subtitle, search row), sidebar drawer with NavGroup/NavItem, and a tab-bar footer
          with FooterItem badges.
        </p>
        <div className="grid grid-cols-2 gap-3">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="rounded-lg border border-border bg-card p-4">
              <div className="h-2 w-16 bg-muted rounded mb-2" />
              <div className="h-2 w-24 bg-muted/60 rounded" />
            </div>
          ))}
        </div>
      </AppShellContent>

      <AppShellFooter variant="tab-bar">
        <FooterItem
          icon={<svg className="size-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955a1.126 1.126 0 011.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" /></svg>}
          label="Home"
          active={activeFooter === "home"}
          onClick={() => setActiveFooter("home")}
        />
        <FooterItem
          icon={<svg className="size-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" /></svg>}
          label="Search"
          active={activeFooter === "search"}
          onClick={() => setActiveFooter("search")}
        />
        <FooterItem
          icon={<svg className="size-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" /></svg>}
          label="Alerts"
          badge={3}
          active={activeFooter === "alerts"}
          onClick={() => setActiveFooter("alerts")}
        />
        <FooterItem
          icon={<svg className="size-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" /></svg>}
          label="Profile"
          active={activeFooter === "profile"}
          onClick={() => setActiveFooter("profile")}
        />
      </AppShellFooter>
    </AppShell>
  );
}

export default function AppShellPage() {
  return (
    <div className="max-w-3xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2">App Shell</h1>
        <p className="text-muted-foreground">
          A full-featured responsive application shell with header (multiple behaviors
          and themes), GSAP-animated sidebar drawer, footer (tab-bar, floating, mini
          variants), and navigation components. Replaces framer-motion with GSAP.
        </p>
      </div>

      {/* Preview */}
      <div className="rounded-lg border border-border p-4 mb-8 bg-card">
        <AppShellDemo />
      </div>

      {/* Installation */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">Installation</h2>
        <div className="code-block">
          <code>npx ssc add app-shell</code>
        </div>
        <p className="text-sm text-muted-foreground mt-2">
          This component requires <code className="text-xs bg-muted px-1 py-0.5 rounded">gsap</code> as
          a peer dependency:
        </p>
        <div className="code-block mt-2">
          <code>npm install gsap</code>
        </div>
      </section>

      {/* Usage */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">Usage</h2>
        <div className="code-block">
          <pre>
            <code>{`import {
  AppShell,
  AppShellHeader,
  AppShellSidebar,
  AppShellContent,
  AppShellFooter,
  FooterItem,
  NavGroup,
  NavItem,
  HeaderNav,
  HeaderNavItem,
  ScrollNav,
  ScrollNavItem,
  useAppShell,
  useScrollDirection,
} from "@/components/ui/app-shell"

export function MyLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <AppShell>
      <AppShellHeader
        behavior="reveal-all"
        theme="light"
        logo={<span className="font-bold">Logo</span>}
        nav={
          <HeaderNav>
            <HeaderNavItem label="Home" active />
            <HeaderNavItem label="Docs" />
          </HeaderNav>
        }
        actions={
          <button onClick={() => setSidebarOpen(true)}>
            Menu
          </button>
        }
        title="Page Title"
        subtitle="Description here"
      />

      <AppShellSidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      >
        <NavGroup title="Main" defaultOpen>
          <NavItem label="Dashboard" active />
          <NavItem label="Settings" />
        </NavGroup>
      </AppShellSidebar>

      <AppShellContent className="p-6">
        <h1>Welcome</h1>
      </AppShellContent>

      <AppShellFooter variant="tab-bar">
        <FooterItem icon={<Icon />} label="Home" active />
        <FooterItem icon={<Icon />} label="Search" />
      </AppShellFooter>
    </AppShell>
  )
}`}</code>
          </pre>
        </div>
      </section>

      {/* Header Behaviors */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">Header Behaviors</h2>
        <div className="rounded-lg border border-border overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="text-left p-3 font-medium">Behavior</th>
                <th className="text-left p-3 font-medium">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {[
                ["static", "Scrolls with content"],
                ["fixed", "Always pinned at top (default)"],
                ["sticky", "Same as fixed"],
                ["reveal-all", "Reveals full header on scroll up"],
                ["reveal-nav", "Reveals only nav row"],
                ["reveal-context", "Reveals only context/title row"],
                ["reveal-search", "Reveals only search row"],
                ["reveal-nav-context", "Reveals nav + context rows"],
                ["reveal-nav-search", "Reveals nav + search rows"],
                ["reveal-context-search", "Reveals context + search rows"],
              ].map(([behavior, desc]) => (
                <tr key={behavior}>
                  <td className="p-3 font-mono text-xs">{behavior}</td>
                  <td className="p-3 text-muted-foreground">{desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Footer Variants */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">Footer Variants</h2>
        <div className="rounded-lg border border-border overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="text-left p-3 font-medium">Variant</th>
                <th className="text-left p-3 font-medium">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              <tr>
                <td className="p-3 font-mono text-xs">tab-bar</td>
                <td className="p-3 text-muted-foreground">Full-width tab bar with FooterItem icons (default)</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-xs">floating</td>
                <td className="p-3 text-muted-foreground">Floating pill positioned center/left/right</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-xs">mini</td>
                <td className="p-3 text-muted-foreground">Compact 48px bar at the bottom</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Components list */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">Exported Components</h2>
        <div className="space-y-2 text-sm text-muted-foreground">
          <p><code className="text-xs bg-muted px-1 py-0.5 rounded">AppShell</code> - Main wrapper with context provider and optional SafeArea</p>
          <p><code className="text-xs bg-muted px-1 py-0.5 rounded">AppShellHeader</code> - Full header with 10 behaviors, 4 themes, mobile menu</p>
          <p><code className="text-xs bg-muted px-1 py-0.5 rounded">AppShellSidebar</code> - GSAP-animated drawer (left/right), escape key, scroll lock</p>
          <p><code className="text-xs bg-muted px-1 py-0.5 rounded">AppShellContent</code> - Flex wrapper for main content</p>
          <p><code className="text-xs bg-muted px-1 py-0.5 rounded">AppShellFooter</code> - Three variants with auto-hide behavior</p>
          <p><code className="text-xs bg-muted px-1 py-0.5 rounded">FooterItem</code> - Tab bar item with icon, label, and badge</p>
          <p><code className="text-xs bg-muted px-1 py-0.5 rounded">NavGroup</code> - Collapsible navigation group with chevron</p>
          <p><code className="text-xs bg-muted px-1 py-0.5 rounded">NavItem</code> - Navigation item (link or button) with icon/badge</p>
          <p><code className="text-xs bg-muted px-1 py-0.5 rounded">HeaderNav</code> / <code className="text-xs bg-muted px-1 py-0.5 rounded">HeaderNavItem</code> - Header nav with dropdown support</p>
          <p><code className="text-xs bg-muted px-1 py-0.5 rounded">ScrollNav</code> / <code className="text-xs bg-muted px-1 py-0.5 rounded">ScrollNavItem</code> - Horizontal scrollable pill nav</p>
        </div>
      </section>

      {/* Hooks */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">Hooks</h2>
        <div className="code-block">
          <pre>
            <code>{`// Access shell context
const { headerVisible, footerVisible, scrollDirection } = useAppShell()

// Track scroll direction independently
const direction = useScrollDirection(threshold?)`}</code>
          </pre>
        </div>
      </section>
    </div>
  );
}
