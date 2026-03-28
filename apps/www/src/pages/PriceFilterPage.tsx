import { useState } from "react";
import PriceFilter from "../registry-demos/PriceFilter";

export default function PriceFilterPage() {
  const [range, setRange] = useState({ min: 100, max: 500 });

  return (
    <div className="max-w-3xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Price Filter</h1>
        <p className="text-muted-foreground">
          A dual range price filter with histogram distribution, slider thumbs,
          and currency input fields.
        </p>
      </div>

      {/* Preview */}
      <div className="rounded-lg border border-border p-8 mb-8 bg-card">
        <PriceFilter
          min={0}
          max={1000}
          defaultMin={100}
          defaultMax={500}
          currency="$"
          title="Price Range"
          onChange={setRange}
        />
        <div className="mt-4 pt-4 border-t border-border">
          <p className="text-xs text-muted-foreground">
            Selected:{" "}
            <span className="text-foreground font-medium">${range.min}</span>{" "}
            &mdash;{" "}
            <span className="text-foreground font-medium">${range.max}</span>
          </p>
        </div>
      </div>

      {/* Installation */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">Installation</h2>
        <div className="code-block">
          <code>npx ssc add price-filter</code>
        </div>
      </section>

      {/* Usage */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">Usage</h2>
        <div className="code-block">
          <pre>
            <code>{`import PriceFilter from "@/components/ui/price-filter"

export function MyComponent() {
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

      {/* Props */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">Props</h2>
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
                <td className="p-3 font-mono text-xs">min</td>
                <td className="p-3 text-muted-foreground">number</td>
                <td className="p-3 text-muted-foreground">0</td>
                <td className="p-3 text-muted-foreground">
                  Minimum possible value
                </td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-xs">max</td>
                <td className="p-3 text-muted-foreground">number</td>
                <td className="p-3 text-muted-foreground">1000</td>
                <td className="p-3 text-muted-foreground">
                  Maximum possible value
                </td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-xs">step</td>
                <td className="p-3 text-muted-foreground">number</td>
                <td className="p-3 text-muted-foreground">1</td>
                <td className="p-3 text-muted-foreground">Step increment</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-xs">defaultMin</td>
                <td className="p-3 text-muted-foreground">number</td>
                <td className="p-3 text-muted-foreground">100</td>
                <td className="p-3 text-muted-foreground">Initial min value</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-xs">defaultMax</td>
                <td className="p-3 text-muted-foreground">number</td>
                <td className="p-3 text-muted-foreground">500</td>
                <td className="p-3 text-muted-foreground">Initial max value</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-xs">currency</td>
                <td className="p-3 text-muted-foreground">string</td>
                <td className="p-3 text-muted-foreground">"$"</td>
                <td className="p-3 text-muted-foreground">Currency symbol</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-xs">title</td>
                <td className="p-3 text-muted-foreground">string</td>
                <td className="p-3 text-muted-foreground">"Price Range"</td>
                <td className="p-3 text-muted-foreground">Section heading</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-xs">distribution</td>
                <td className="p-3 text-muted-foreground">number[]</td>
                <td className="p-3 text-muted-foreground">auto-generated</td>
                <td className="p-3 text-muted-foreground">
                  Histogram bar heights (0-1)
                </td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-xs">onChange</td>
                <td className="p-3 text-muted-foreground font-mono text-xs">
                  {"(range) => void"}
                </td>
                <td className="p-3 text-muted-foreground">-</td>
                <td className="p-3 text-muted-foreground">
                  Callback with {"{min, max}"}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Examples */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">Examples</h2>

        <h3 className="text-sm font-semibold mb-2 mt-6">With Turkish Lira</h3>
        <div className="rounded-lg border border-border p-8 mb-4 bg-card">
          <PriceFilter
            min={0}
            max={5000}
            defaultMin={500}
            defaultMax={2500}
            step={50}
            currency="₺"
            title="Fiyat Aralığı"
          />
        </div>

        <h3 className="text-sm font-semibold mb-2 mt-6">
          With Euro (fine step)
        </h3>
        <div className="rounded-lg border border-border p-8 bg-card">
          <PriceFilter
            min={0}
            max={2000}
            defaultMin={200}
            defaultMax={800}
            step={10}
            currency="€"
            title="Nightly Rate"
          />
        </div>
      </section>
    </div>
  );
}
