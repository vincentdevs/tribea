// Builds web fonts from /fonts and copies the colour tokens into the site,
// so the site never drifts from docs/BRAND_GUIDELINES.md.
import { cpSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "../..");
const site = resolve(root, "tribea-website");

execFileSync("python3", [resolve(site, "scripts/build-fonts.py")], { stdio: "inherit" });
cpSync(resolve(root, "styles/tokens.css"), resolve(site, "src/styles/tokens.css"));
console.log("Brand fonts and tokens synced");
