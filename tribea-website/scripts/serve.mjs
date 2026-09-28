// Local preview of the subdomain setup, without any dependency.
//   http://fr.localhost:4321/  serves dist/fr, and likewise for de, it, en
//   http://localhost:4321/     redirects to the visitor's browser language
// The production server applies the same two rules (see docs/DEPLOYMENT.md).
import { createServer } from "node:http";
import { createReadStream, existsSync, statSync } from "node:fs";
import { extname, join, normalize } from "node:path";

const LANGS = ["fr", "de", "it", "en"];
const DEFAULT_LANG = "fr";
const PORT = Number(process.env.PORT ?? 4321);
const dist = new URL("../dist/", import.meta.url).pathname;
const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css",
  ".js": "text/javascript",
  ".svg": "image/svg+xml",
  ".woff2": "font/woff2",
  ".xml": "application/xml",
  ".txt": "text/plain; charset=utf-8",
};

function negotiate(header = "") {
  const wanted = header
    .split(",")
    .map((part) => {
      const [tag, q] = part.trim().split(";q=");
      return { lang: tag.slice(0, 2).toLowerCase(), q: q ? Number(q) : 1 };
    })
    .sort((a, b) => b.q - a.q);
  return wanted.find((w) => LANGS.includes(w.lang))?.lang ?? DEFAULT_LANG;
}

createServer((req, res) => {
  const host = (req.headers.host ?? "").split(":")[0];
  const sub = host.split(".")[0];
  if (!LANGS.includes(sub)) {
    const lang = negotiate(req.headers["accept-language"]);
    res.writeHead(302, { Location: `http://${lang}.localhost:${PORT}/`, Vary: "Accept-Language" });
    return res.end();
  }
  const url = decodeURIComponent(new URL(req.url, "http://x").pathname);
  let file = normalize(join(dist, sub, url));
  if (!file.startsWith(join(dist, sub))) return res.writeHead(403).end();
  if (existsSync(file) && statSync(file).isDirectory()) file = join(file, "index.html");
  if (!existsSync(file)) {
    res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    return res.end("Not found");
  }
  res.writeHead(200, { "Content-Type": TYPES[extname(file)] ?? "application/octet-stream" });
  createReadStream(file).pipe(res);
}).listen(PORT, () => console.log(`Preview: http://localhost:${PORT}/ (redirects to http://fr.localhost:${PORT}/ and siblings)`));
