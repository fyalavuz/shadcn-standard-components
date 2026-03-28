import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-3.5rem)] px-6">
      <div className="max-w-2xl text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-border px-3 py-1 text-xs text-muted-foreground mb-6">
          Open Source Component Library
        </div>

        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
          Build your component library
        </h1>

        <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
          Beautifully designed components built with React and Tailwind CSS.
          Copy and paste into your apps. Open source. Customizable.
        </p>

        <div className="flex items-center justify-center gap-4">
          <Link
            to="/docs/installation"
            className="inline-flex items-center justify-center rounded-md bg-foreground text-background px-6 py-2.5 text-sm font-medium hover:bg-foreground/90 transition-colors"
          >
            Get Started
          </Link>
          <Link
            to="/docs/components"
            className="inline-flex items-center justify-center rounded-md border border-border px-6 py-2.5 text-sm font-medium hover:bg-accent transition-colors"
          >
            Components
          </Link>
        </div>

        <div className="mt-12 rounded-lg border border-border bg-muted/50 p-4">
          <code className="text-sm text-muted-foreground">
            npx ssc add price-filter
          </code>
        </div>
      </div>
    </div>
  );
}
