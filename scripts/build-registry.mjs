import { readFileSync, writeFileSync, mkdirSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");

const components = [
  {
    name: "app-shell",
    type: "registry:ui",
    description: "A responsive application shell with header, collapsible sidebar, content area, and footer. Uses GSAP for smooth animations.",
    dependencies: ["gsap"],
    devDependencies: [],
    registryDependencies: [],
    files: [
      {
        path: "ui/app-shell.tsx",
        type: "registry:ui",
        target: "components/ui/app-shell.tsx",
      },
    ],
  },
  {
    name: "price-filter",
    type: "registry:ui",
    description: "A dual range price filter with histogram distribution chart, slider thumbs, and currency input fields.",
    dependencies: [],
    devDependencies: [],
    registryDependencies: [],
    files: [
      {
        path: "ui/price-filter.tsx",
        type: "registry:ui",
        target: "components/ui/price-filter.tsx",
      },
    ],
  },
];

const outDir = resolve(ROOT, "public/r");
mkdirSync(outDir, { recursive: true });

// Build individual component JSON files
for (const component of components) {
  const built = { ...component };
  built.files = component.files.map((file) => {
    const content = readFileSync(resolve(ROOT, "registry", file.path), "utf-8");
    return { ...file, content };
  });

  writeFileSync(
    resolve(outDir, `${component.name}.json`),
    JSON.stringify(built, null, 2)
  );
  console.log(`Built: ${component.name}.json`);
}

// Build index
const index = components.map(({ name, type, description, dependencies, registryDependencies }) => ({
  name,
  type,
  description,
  dependencies,
  registryDependencies,
}));

writeFileSync(resolve(outDir, "index.json"), JSON.stringify(index, null, 2));
console.log("Built: index.json");
console.log(`Registry built: ${components.length} component(s)`);
