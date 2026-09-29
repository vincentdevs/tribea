# Deployment

Each language is a separate static site on its own subdomain. The build writes one folder per language, and the server needs two rules: one virtual host per subdomain, and a redirect from the bare domain to the visitor's language.

| Address | Serves |
|---|---|
| `https://de.tribea.ch/` | `tribea-website/dist/de/` |
| `https://fr.tribea.ch/` | `tribea-website/dist/fr/` |
| `https://it.tribea.ch/` | `tribea-website/dist/it/` |
| `https://en.tribea.ch/` | `tribea-website/dist/en/` |
| `https://tribea.ch/` | 302 redirect to the language in the browser's `Accept-Language` header, German by default |

Each folder carries its own fonts, favicon, `robots.txt` and `sitemap.xml`, and every page links to its equivalents in the other languages with `hreflang`, so search engines index each language separately.

## Build

```bash
cd tribea-website
npm run build            # production addresses (https://{lang}.tribea.ch)
npm run preview          # local addresses (http://{lang}.localhost:4321) and a local server
```

The domain and protocol come from `TRIBEA_DOMAIN` and `TRIBEA_PROTOCOL`, and the default language for the redirect is `DEFAULT_LANG` in `src/i18n.ts` and in `scripts/serve.mjs`.

## Example: nginx

```nginx
map $http_accept_language $tribea_lang {
    default de;
    ~*^de de;
    ~*^fr fr;
    ~*^it it;
    ~*^en en;
}

server {
    server_name tribea.ch www.tribea.ch;
    add_header Vary Accept-Language;
    return 302 https://$tribea_lang.tribea.ch$request_uri;
}

server {
    server_name ~^(?<lang>de|fr|it|en)\.tribea\.ch$;
    root /var/www/tribea/tribea-website/dist/$lang;
    index index.html;
    try_files $uri $uri/ =404;
    add_header Content-Security-Policy "default-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; form-action 'self'";
    add_header Referrer-Policy strict-origin-when-cross-origin;
    add_header X-Content-Type-Options nosniff;
    gzip on;
    gzip_types text/css application/xml image/svg+xml;
}
```

The `Content-Security-Policy` header allows nothing from other domains, so the promise of zero third-party requests is enforced by the server as well as by the code. One wildcard certificate for `*.tribea.ch` plus `tribea.ch` covers the four subdomains and the bare domain.

## Preview on one host (path mode)

For a preview on a single host such as Vercel, where one site per subdomain is not available, build with `TRIBEA_MODE=path` and the host's domain:

```bash
cd tribea-website
TRIBEA_MODE=path TRIBEA_DOMAIN=tribea-seven.vercel.app npm run build
cd dist && vercel deploy --prod --yes
```

The four languages then live under `/de/`, `/fr/`, `/it/` and `/en/` of the same origin, every link and `hreflang` carries the language prefix, one `sitemap.xml` sits at the root, and the build writes a `vercel.json` into `dist/` with the bare-path redirect by `Accept-Language` (German by default) and the same security headers as the nginx example. Nothing is built on Vercel: the folder is uploaded as it is, so the font pipeline stays local. The live preview is at https://tribea-seven.vercel.app/. The production layout stays the subdomain one above.
