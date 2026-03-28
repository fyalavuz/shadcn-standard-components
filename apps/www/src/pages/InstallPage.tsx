export default function InstallPage() {
  return (
    <div className="max-w-3xl">
      <h1 className="text-3xl font-bold tracking-tight mb-2">Installation</h1>
      <p className="text-muted-foreground mb-8">
        How to install and configure ssc in your project.
      </p>

      <div className="space-y-8">
        <section>
          <h2 className="text-xl font-semibold mb-3">Prerequisites</h2>
          <p className="text-sm text-muted-foreground mb-4">
            Your project should have React, TypeScript, and Tailwind CSS
            configured.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">1. Initialize</h2>
          <p className="text-sm text-muted-foreground mb-3">
            Run the init command to set up the required utilities:
          </p>
          <div className="code-block">
            <code>npx ssc init</code>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">
            2. Install dependencies
          </h2>
          <p className="text-sm text-muted-foreground mb-3">
            Install the base dependencies:
          </p>
          <div className="code-block">
            <code>npm install clsx tailwind-merge</code>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">
            3. Configure Tailwind CSS
          </h2>
          <p className="text-sm text-muted-foreground mb-3">
            Add the shadcn-compatible CSS variables to your global CSS:
          </p>
          <div className="code-block">
            <pre>
              <code>{`@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 240 10% 3.9%;
    --card: 0 0% 100%;
    --card-foreground: 240 10% 3.9%;
    --primary: 221 83% 53%;
    --primary-foreground: 210 40% 98%;
    --muted: 240 4.8% 95.9%;
    --muted-foreground: 240 3.8% 46.1%;
    --border: 240 5.9% 90%;
    --ring: 221 83% 53%;
  }
}`}</code>
            </pre>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">
            4. Configure Tailwind theme
          </h2>
          <p className="text-sm text-muted-foreground mb-3">
            Extend your Tailwind config with the CSS variable colors:
          </p>
          <div className="code-block">
            <pre>
              <code>{`// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
    },
  },
}`}</code>
            </pre>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">5. Add components</h2>
          <p className="text-sm text-muted-foreground mb-3">
            Now you can add components to your project:
          </p>
          <div className="code-block">
            <code>npx ssc add price-filter</code>
          </div>
        </section>
      </div>
    </div>
  );
}
