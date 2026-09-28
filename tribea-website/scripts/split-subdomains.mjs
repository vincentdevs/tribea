// Turns dist/{lang}/ into one self-contained site per subdomain:
// fr.tribea.ch serves dist/fr, de.tribea.ch serves dist/de, and so on.
// Copies the shared assets into each language and writes its robots.txt and sitemap.xml.
import { cpSync, existsSync, readdirSync, rmSync, statSync, writeFileSync } from "node:fs";
import { join, relative } from "node:path";

const LANGS = ["fr", "de", "it", "en"];
const DOMAIN = process.env.TRIBEA_DOMAIN ?? "tribea.ch";
const PROTOCOL = process.env.TRIBEA_PROTOCOL ?? "https";
const dist = new URL("../dist/", import.meta.url).pathname;
const shared = readdirSync(dist).filter((n) => !LANGS.includes(n));

function pages(dir) {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) return pages(path);
    return name === "index.html" ? [path] : [];
  });
}

for (const lang of LANGS) {
  const root = join(dist, lang);
  for (const name of shared) cpSync(join(dist, name), join(root, name), { recursive: true });
  const origin = `${PROTOCOL}://${lang}.${DOMAIN}`;
  const urls = pages(root)
    .map((p) => "/" + relative(root, p).replace(/index\.html$/, ""))
    .sort();
  writeFileSync(
    join(root, "sitemap.xml"),
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls
      .map((u) => `  <url><loc>${origin}${u}</loc></url>`)
      .join("\n")}\n</urlset>\n`,
  );
  writeFileSync(join(root, "robots.txt"), `User-agent: *\nAllow: /\n\nSitemap: ${origin}/sitemap.xml\n`);
  console.log(`${lang}.${DOMAIN}: ${urls.length} pages`);
}

for (const name of shared) if (existsSync(join(dist, name))) rmSync(join(dist, name), { recursive: true });
