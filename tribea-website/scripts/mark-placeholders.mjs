// Wraps every [PLACEHOLDER] in visible page text in <mark class="ph">,
// so content still to be supplied is obvious in a review and impossible to ship unnoticed.
// Attributes and structured data are left untouched.
import { readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const dist = new URL("../dist/", import.meta.url).pathname;
let total = 0;

function walk(dir) {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) walk(path);
    else if (name.endsWith(".html")) mark(path);
  }
}

function mark(path) {
  const html = readFileSync(path, "utf8");
  const parts = html.split(/(<script[\s\S]*?<\/script>|<head>[\s\S]*?<\/head>)/);
  const out = parts
    .map((part, i) =>
      i % 2 === 1
        ? part
        : part.replace(/>([^<]*)/g, (_, text) =>
            ">" + text.replace(/\[[^\]<>]{2,}\]/g, (m) => (total++, `<mark class="ph">${m}</mark>`)),
          ),
    )
    .join("");
  writeFileSync(path, out);
}

walk(dist);
console.log(`Placeholders marked: ${total}`);
