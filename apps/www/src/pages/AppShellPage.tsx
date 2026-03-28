import { useState } from "react";
import {
  AppShell,
  AppShellHeader,
  AppShellSidebar,
  AppShellContent,
  AppShellFooter,
  useAppShell,
} from "../registry-demos/AppShell";

function DemoToggleButton() {
  const { toggleSidebar } = useAppShell();
  return (
    <button
      onClick={toggleSidebar}
      className="inline-flex items-center justify-center rounded-md p-2 hover:bg-accent hover:text-accent-foreground transition-colors"
      aria-label="Toggle sidebar"
    >
      <svg
        className="w-5 h-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 12h18M3 6h18M3 18h18"
        />
      </svg>
    </button>
  );
}

function DemoSidebarContent() {
  const navItems = ["Dashboard", "Projects", "Settings", "Team", "Analytics"];
  return (
    <div className="p-4">
      <div className="text-sm font-semibold mb-4">Navigation</div>
      <ul className="space-y-1">
        {navItems.map((item) => (
          <li key={item}>
            <button className="w-full text-left text-sm px-3 py-2 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors text-muted-foreground">
              {item}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function AppShellDemo() {
  return (
    <AppShell defaultSidebarOpen={false} className="h-[400px] rounded-lg border border-border overflow-hidden">
      <AppShellHeader>
        <div className="flex items-center gap-3 px-4 h-12">
          <DemoToggleButton />
          <span className="font-semibold text-sm">My App</span>
          <div className="ml-auto text-xs text-muted-foreground">
            demo header
          </div>
        </div>
      </AppShellHeader>

      <div className="flex flex-1 overflow-hidden">
        <AppShellSidebar width="220px">
          <DemoSidebarContent />
        </AppShellSidebar>

        <AppShellContent className="p-6">
          <h2 className="text-lg font-semibold mb-2">Content Area</h2>
          <p className="text-sm text-muted-foreground mb-4">
            This is the main content area. On mobile, tap the hamburger menu to
            open the sidebar as a drawer overlay. On desktop, the sidebar is
            always visible.
          </p>
          <p className="text-sm text-muted-foreground">
            The header supports a <code className="text-xs bg-muted px-1 py-0.5 rounded">revealOnScroll</code> prop
            that hides it on scroll down and reveals it on scroll up, animated with GSAP.
          </p>
        </AppShellContent>
      </div>

      <AppShellFooter>
        <div className="px-4 py-3 text-xs text-muted-foreground">
          Footer content
        </div>
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
          A responsive application shell with a sticky header, collapsible
          sidebar (drawer on mobile, panel on desktop), content area, and footer.
          Uses GSAP for smooth animations.
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
  useAppShell,
} from "@/components/ui/app-shell"

function SidebarToggle() {
  const { toggleSidebar } = useAppShell()
  return <button onClick={toggleSidebar}>Menu</button>
}

export function MyLayout() {
  return (
    <AppShell defaultSidebarOpen={false}>
      <AppShellHeader revealOnScroll>
        <div className="flex items-center h-14 px-4">
          <SidebarToggle />
          <span className="ml-3 font-semibold">My App</span>
        </div>
      </AppShellHeader>

      <div className="flex flex-1">
        <AppShellSidebar side="left" width="260px">
          <nav className="p-4">
            <a href="/dashboard">Dashboard</a>
            <a href="/settings">Settings</a>
          </nav>
        </AppShellSidebar>

        <AppShellContent className="p-6">
          <h1>Welcome</h1>
        </AppShellContent>
      </div>

      <AppShellFooter>
        <p className="p-4 text-sm">Footer</p>
      </AppShellFooter>
    </AppShell>
  )
}`}</code>
          </pre>
        </div>
      </section>

      {/* Props: AppShell */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">AppShell Props</h2>
        <div className="rounded-lg border border-border overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="text-left p-3 font-medium">Prop</th>
                <th className="text-left p-3 font-medium">Type</th>
                <th className="text-left p-3 font-medium">Default</th>
                <th className="text-left p-3 font-medium">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              <tr>
                <td className="p-3 font-mono text-xs">children</td>
                <td className="p-3 text-muted-foreground">ReactNode</td>
                <td className="p-3 text-muted-foreground">-</td>
                <td className="p-3 text-muted-foreground">Shell content</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-xs">className</td>
                <td className="p-3 text-muted-foreground">string</td>
                <td className="p-3 text-muted-foreground">-</td>
                <td className="p-3 text-muted-foreground">Additional CSS classes</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-xs">defaultSidebarOpen</td>
                <td className="p-3 text-muted-foreground">boolean</td>
                <td className="p-3 text-muted-foreground">false</td>
                <td className="p-3 text-muted-foreground">
                  Whether the sidebar starts open
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Props: AppShellHeader */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">AppShellHeader Props</h2>
        <div className="rounded-lg border border-border overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="text-left p-3 font-medium">Prop</th>
                <th className="text-left p-3 font-medium">Type</th>
                <th className="text-left p-3 font-medium">Default</th>
                <th className="text-left p-3 font-medium">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              <tr>
                <td className="p-3 font-mono text-xs">children</td>
                <td className="p-3 text-muted-foreground">ReactNode</td>
                <td className="p-3 text-muted-foreground">-</td>
                <td className="p-3 text-muted-foreground">Header content</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-xs">className</td>
                <td className="p-3 text-muted-foreground">string</td>
                <td className="p-3 text-muted-foreground">-</td>
                <td className="p-3 text-muted-foreground">Additional CSS classes</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-xs">revealOnScroll</td>
                <td className="p-3 text-muted-foreground">boolean</td>
                <td className="p-3 text-muted-foreground">false</td>
                <td className="p-3 text-muted-foreground">
                  Hide header on scroll down, reveal on scroll up (GSAP animated)
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Props: AppShellSidebar */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">AppShellSidebar Props</h2>
        <div className="rounded-lg border border-border overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="text-left p-3 font-medium">Prop</th>
                <th className="text-left p-3 font-medium">Type</th>
                <th className="text-left p-3 font-medium">Default</th>
                <th className="text-left p-3 font-medium">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              <tr>
                <td className="p-3 font-mono text-xs">children</td>
                <td className="p-3 text-muted-foreground">ReactNode</td>
                <td className="p-3 text-muted-foreground">-</td>
                <td className="p-3 text-muted-foreground">Sidebar content</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-xs">className</td>
                <td className="p-3 text-muted-foreground">string</td>
                <td className="p-3 text-muted-foreground">-</td>
                <td className="p-3 text-muted-foreground">Additional CSS classes</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-xs">side</td>
                <td className="p-3 text-muted-foreground font-mono text-xs">"left" | "right"</td>
                <td className="p-3 text-muted-foreground">"left"</td>
                <td className="p-3 text-muted-foreground">
                  Which side the sidebar appears on
                </td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-xs">width</td>
                <td className="p-3 text-muted-foreground">string</td>
                <td className="p-3 text-muted-foreground">"280px"</td>
                <td className="p-3 text-muted-foreground">CSS width of the sidebar panel</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Props: AppShellContent */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">AppShellContent Props</h2>
        <div className="rounded-lg border border-border overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="text-left p-3 font-medium">Prop</th>
                <th className="text-left p-3 font-medium">Type</th>
                <th className="text-left p-3 font-medium">Default</th>
                <th className="text-left p-3 font-medium">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              <tr>
                <td className="p-3 font-mono text-xs">children</td>
                <td className="p-3 text-muted-foreground">ReactNode</td>
                <td className="p-3 text-muted-foreground">-</td>
                <td className="p-3 text-muted-foreground">Main content</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-xs">className</td>
                <td className="p-3 text-muted-foreground">string</td>
                <td className="p-3 text-muted-foreground">-</td>
                <td className="p-3 text-muted-foreground">Additional CSS classes</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Props: AppShellFooter */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">AppShellFooter Props</h2>
        <div className="rounded-lg border border-border overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="text-left p-3 font-medium">Prop</th>
                <th className="text-left p-3 font-medium">Type</th>
                <th className="text-left p-3 font-medium">Default</th>
                <th className="text-left p-3 font-medium">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              <tr>
                <td className="p-3 font-mono text-xs">children</td>
                <td className="p-3 text-muted-foreground">ReactNode</td>
                <td className="p-3 text-muted-foreground">-</td>
                <td className="p-3 text-muted-foreground">Footer content</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-xs">className</td>
                <td className="p-3 text-muted-foreground">string</td>
                <td className="p-3 text-muted-foreground">-</td>
                <td className="p-3 text-muted-foreground">Additional CSS classes</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Hook */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">useAppShell Hook</h2>
        <p className="text-sm text-muted-foreground mb-3">
          Access sidebar state from any child component within the AppShell.
        </p>
        <div className="code-block">
          <pre>
            <code>{`const {
  sidebarOpen,       // boolean
  setSidebarOpen,    // (open: boolean) => void
  toggleSidebar,     // () => void
  sidebarCollapsed,  // boolean
  setSidebarCollapsed, // (collapsed: boolean) => void
} = useAppShell()`}</code>
          </pre>
        </div>
      </section>
    </div>
  );
}
