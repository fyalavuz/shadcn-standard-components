#!/usr/bin/env node

const REGISTRY_URL = "https://fyalavuz.github.io/shadcn-standard-components/r";

const args = process.argv.slice(2);
const command = args[0];
const componentName = args[1];

const COLORS = {
  reset: "\x1b[0m",
  green: "\x1b[32m",
  cyan: "\x1b[36m",
  yellow: "\x1b[33m",
  red: "\x1b[31m",
  dim: "\x1b[2m",
  bold: "\x1b[1m",
};

function log(msg) {
  console.log(msg);
}

function success(msg) {
  log(`${COLORS.green}✓${COLORS.reset} ${msg}`);
}

function error(msg) {
  log(`${COLORS.red}✗${COLORS.reset} ${msg}`);
}

function info(msg) {
  log(`${COLORS.cyan}ℹ${COLORS.reset} ${msg}`);
}

async function fetchJSON(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch ${url}: ${res.status}`);
  return res.json();
}

async function listComponents() {
  const index = await fetchJSON(`${REGISTRY_URL}/index.json`);
  log(`\n${COLORS.bold}Available components:${COLORS.reset}\n`);
  for (const comp of index) {
    log(`  ${COLORS.cyan}${comp.name}${COLORS.reset} - ${comp.description}`);
  }
  log("");
}

async function addComponent(name) {
  if (!name) {
    error("Please specify a component name: ssc add <component>");
    process.exit(1);
  }

  info(`Fetching ${name} from registry...`);

  let component;
  try {
    component = await fetchJSON(`${REGISTRY_URL}/${name}.json`);
  } catch {
    error(`Component "${name}" not found in registry.`);
    info("Run 'ssc list' to see available components.");
    process.exit(1);
  }

  const { mkdirSync, writeFileSync, existsSync } = await import("fs");
  const { resolve, dirname } = await import("path");

  const srcDir = existsSync("src") ? "src" : ".";

  for (const file of component.files) {
    const targetPath = resolve(srcDir, file.target);
    mkdirSync(dirname(targetPath), { recursive: true });
    writeFileSync(targetPath, file.content);
    success(`Created ${COLORS.dim}${srcDir}/${file.target}${COLORS.reset}`);
  }

  if (component.dependencies?.length) {
    info(`\nInstall dependencies:\n  npm install ${component.dependencies.join(" ")}`);
  }

  log(`\n${COLORS.green}${COLORS.bold}${name}${COLORS.reset} added successfully!\n`);
}

async function init() {
  const { mkdirSync, writeFileSync, existsSync } = await import("fs");
  const { resolve } = await import("path");

  const srcDir = existsSync("src") ? "src" : ".";

  const utilsPath = resolve(srcDir, "lib/utils.ts");
  if (!existsSync(utilsPath)) {
    mkdirSync(resolve(srcDir, "lib"), { recursive: true });
    writeFileSync(
      utilsPath,
      `import { type ClassValue, clsx } from "clsx"\nimport { twMerge } from "tailwind-merge"\n\nexport function cn(...inputs: ClassValue[]) {\n  return twMerge(clsx(inputs))\n}\n`
    );
    success(`Created ${COLORS.dim}${srcDir}/lib/utils.ts${COLORS.reset}`);
  }

  info("\nInstall required dependencies:");
  log("  npm install clsx tailwind-merge");
  log(`\n${COLORS.green}${COLORS.bold}Initialized!${COLORS.reset} You can now add components with: ssc add <component>\n`);
}

function showHelp() {
  log(`
${COLORS.bold}ssc${COLORS.reset} - shadcn standard components

${COLORS.bold}Usage:${COLORS.reset}
  ssc ${COLORS.cyan}<command>${COLORS.reset} [options]

${COLORS.bold}Commands:${COLORS.reset}
  ${COLORS.cyan}init${COLORS.reset}            Initialize your project
  ${COLORS.cyan}add${COLORS.reset} <component>  Add a component to your project
  ${COLORS.cyan}list${COLORS.reset}            List all available components
  ${COLORS.cyan}help${COLORS.reset}            Show this help message

${COLORS.bold}Examples:${COLORS.reset}
  ${COLORS.dim}npx ssc init${COLORS.reset}
  ${COLORS.dim}npx ssc add price-filter${COLORS.reset}
  ${COLORS.dim}npx ssc list${COLORS.reset}
`);
}

async function main() {
  switch (command) {
    case "add":
      await addComponent(componentName);
      break;
    case "list":
      await listComponents();
      break;
    case "init":
      await init();
      break;
    case "help":
    case "--help":
    case "-h":
    case undefined:
      showHelp();
      break;
    default:
      error(`Unknown command: ${command}`);
      showHelp();
      process.exit(1);
  }
}

main().catch((err) => {
  error(err.message);
  process.exit(1);
});
