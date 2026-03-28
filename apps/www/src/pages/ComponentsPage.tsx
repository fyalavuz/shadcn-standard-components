import { Link } from "react-router-dom";

const components = [
  {
    name: "Price Filter",
    description:
      "A dual range price filter with histogram distribution chart, slider thumbs, and currency input fields.",
    path: "/docs/components/price-filter",
    category: "E-commerce",
  },
];

export default function ComponentsPage() {
  return (
    <div className="max-w-3xl">
      <h1 className="text-3xl font-bold tracking-tight mb-2">Components</h1>
      <p className="text-muted-foreground mb-8">
        Browse and install beautifully crafted UI components.
      </p>

      <div className="grid gap-4">
        {components.map((comp) => (
          <Link
            key={comp.name}
            to={comp.path}
            className="group flex items-start gap-4 rounded-lg border border-border p-4 hover:bg-accent/50 transition-colors"
          >
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-semibold text-sm group-hover:text-foreground">
                  {comp.name}
                </h3>
                <span className="text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded-full">
                  {comp.category}
                </span>
              </div>
              <p className="text-sm text-muted-foreground">{comp.description}</p>
            </div>
            <svg
              className="w-4 h-4 text-muted-foreground group-hover:text-foreground mt-1 shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        ))}
      </div>
    </div>
  );
}
