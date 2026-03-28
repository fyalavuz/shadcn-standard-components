export default function InstallPage() {
  return (
    <div className="max-w-3xl">
      <h1 className="text-3xl font-bold tracking-tight mb-2">Installation</h1>
      <p className="text-muted-foreground mb-8">
        Add components to your existing shadcn/ui project.
      </p>

      <div className="space-y-8">
        <section>
          <h2 className="text-xl font-semibold mb-3">Prerequisites</h2>
          <p className="text-sm text-muted-foreground mb-4">
            Your project should already have{" "}
            <strong>shadcn/ui</strong> set up with React, TypeScript, and
            Tailwind CSS. These components use the same CSS variables,{" "}
            <code className="text-xs bg-muted px-1.5 py-0.5 rounded">cn()</code>{" "}
            utility, and conventions as shadcn/ui.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Add a component</h2>
          <p className="text-sm text-muted-foreground mb-3">
            Use the CLI to add components directly to your project:
          </p>
          <div className="code-block">
            <code>npx ssc add price-filter</code>
          </div>
          <p className="text-sm text-muted-foreground mt-3">
            This will create the component file at{" "}
            <code className="text-xs bg-muted px-1.5 py-0.5 rounded">
              src/components/ui/price-filter.tsx
            </code>
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">List available components</h2>
          <div className="code-block">
            <code>npx ssc list</code>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">How it works</h2>
          <p className="text-sm text-muted-foreground mb-3">
            Just like shadcn/ui, components are copied into your project as
            source code. You own the code and can customize it freely.
          </p>
          <ul className="text-sm text-muted-foreground space-y-2 list-disc pl-5">
            <li>
              Uses the same{" "}
              <code className="text-xs bg-muted px-1.5 py-0.5 rounded">
                @/lib/utils
              </code>{" "}
              and{" "}
              <code className="text-xs bg-muted px-1.5 py-0.5 rounded">cn()</code>{" "}
              helper from shadcn/ui
            </li>
            <li>
              Uses the same CSS variable color system ({" "}
              <code className="text-xs bg-muted px-1.5 py-0.5 rounded">
                --primary
              </code>
              ,{" "}
              <code className="text-xs bg-muted px-1.5 py-0.5 rounded">
                --border
              </code>
              , etc.)
            </li>
            <li>Components are fully typed with TypeScript</li>
            <li>
              Supports{" "}
              <code className="text-xs bg-muted px-1.5 py-0.5 rounded">
                "use client"
              </code>{" "}
              for Next.js App Router
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Usage example</h2>
          <div className="code-block">
            <pre>
              <code>{`import { PriceFilter } from "@/components/ui/price-filter"

export function Filters() {
  const [range, setRange] = useState({ min: 100, max: 500 })

  return (
    <PriceFilter
      min={0}
      max={1000}
      defaultMin={100}
      defaultMax={500}
      currency="$"
      title="Price Range"
      onChange={setRange}
    />
  )
}`}</code>
            </pre>
          </div>
        </section>
      </div>
    </div>
  );
}
