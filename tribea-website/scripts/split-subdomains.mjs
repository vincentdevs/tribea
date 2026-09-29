// Turns dist/{lang}/ into one self-contained site per subdomain:
// fr.tribea.ch serves dist/fr, de.tribea.ch serves dist/de, and so on.
// Copies the shared assets into each language and writes its robots.txt and sitemap.xml.
import { cpSync, existsSync, readdirSync, readFileSync, rmSync, statSync, writeFileSync } from "node:fs";
import { join, relative } from "node:path";

const LANGS = ["de", "fr", "it", "en"];
const DOMAIN = process.env.TRIBEA_DOMAIN ?? "tribea.ch";
const PROTOCOL = process.env.TRIBEA_PROTOCOL ?? "https";
const dist = new URL("../dist/", import.meta.url).pathname;
const shared = readdirSync(dist).filter((n) => !LANGS.includes(n));

// Path mode (TRIBEA_MODE=path): one host, the languages under /de/, /fr/, /it/, /en/.
// Nothing is split; one sitemap and robots.txt at the root, and a redirect map
// for the bare path in vercel.json, by Accept-Language, German by default.
if (process.env.TRIBEA_MODE === "path") {
  const BASE = (process.env.TRIBEA_BASE ?? "").replace(/\/$/, "");
  const origin = `${PROTOCOL}://${DOMAIN}${BASE}`;
  if (BASE) {
    // every root-relative address in the HTML (links, images, fonts, forms) moves under the base
    const walkHtml = (dir) =>
      readdirSync(dir).flatMap((n) => {
        const p = join(dir, n);
        return statSync(p).isDirectory() ? walkHtml(p) : n.endsWith(".html") ? [p] : [];
      });
    for (const file of walkHtml(dist)) {
      let html = readFileSync(file, "utf8");
      html = html
        .replace(/((?:href|src|action)=")\/(?!\/)/g, `$1${BASE}/`)
        .replace(/(srcset=")([^"]*)/g, (_, k, v) => k + v.replace(/(^|,\s*)\/(?!\/)/g, `$1${BASE}/`))
        .replace(/url\((['"]?)\/(?!\/)/g, `url($1${BASE}/`);
      writeFileSync(file, html);
    }
  }
  // GitHub Pages cannot redirect by Accept-Language, so the bare address carries a
  // small page that sends the browser to its language, German by default.
  writeFileSync(
    join(dist, "index.html"),
    `<!doctype html><html lang="de"><head><meta charset="utf-8"><title>Tribea</title><meta name="robots" content="noindex">` +
      `<meta http-equiv="refresh" content="1;url=${BASE}/de/">` +
      `<script>(function(){var l=(navigator.languages||[navigator.language||"de"]).join(",").toLowerCase();` +
      `var m=l.match(/\\b(de|fr|it|en)\\b/);location.replace("${BASE}/"+(m?m[1]:"de")+"/");})();</script>` +
      `</head><body><p><a href="${BASE}/de/">Deutsch</a> · <a href="${BASE}/fr/">Français</a> · <a href="${BASE}/it/">Italiano</a> · <a href="${BASE}/en/">English</a></p></body></html>\n`,
  );
  writeFileSync(join(dist, ".nojekyll"), "");
  const urls = LANGS.flatMap((lang) =>
    pages(join(dist, lang)).map((p) => "/" + relative(dist, p).replace(/index\.html$/, "")),
  ).sort();
  writeFileSync(
    join(dist, "sitemap.xml"),
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls
      .map((u) => `  <url><loc>${origin}${u}</loc></url>`)
      .join("\n")}\n</urlset>\n`,
  );
  writeFileSync(join(dist, "robots.txt"), `User-agent: *\nAllow: /\n\nSitemap: ${origin}/sitemap.xml\n`);
  const byLanguage = ["fr", "it", "en"].map((l) => ({
    source: "/",
    has: [{ type: "header", key: "accept-language", value: `${l}.*` }],
    destination: `/${l}/`,
    permanent: false,
  }));
  writeFileSync(
    join(dist, "vercel.json"),
    JSON.stringify(
      {
        trailingSlash: true,
        redirects: [...byLanguage, { source: "/", destination: "/de/", permanent: false }],
        headers: [
          {
            source: "/(.*)",
            headers: [
              { key: "Content-Security-Policy", value: "default-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; form-action 'self'" },
              { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
              { key: "X-Content-Type-Options", value: "nosniff" },
            ],
          },
        ],
      },
      null,
      2,
    ) + "\n",
  );
  console.log(`${DOMAIN} (path mode): ${urls.length} pages`);
  process.exit(0);
}

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
