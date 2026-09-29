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

## Public preview on GitHub Pages (path mode)

The public repository publishes itself to https://vincentdevs.github.io/tribea/ on every push to `main`, through `.github/workflows/pages.yml`. The workflow installs Node, Python with `fonttools`, `brotli`, `numpy` and `pillow`, runs the normal build with three variables, and hands `tribea-website/dist` to GitHub Pages:

```bash
TRIBEA_MODE=path TRIBEA_BASE=/tribea TRIBEA_DOMAIN=vincentdevs.github.io npm run build
```

`TRIBEA_MODE=path` puts the four languages under `/de/`, `/fr/`, `/it/` and `/en/` of one origin instead of one subdomain each, and `TRIBEA_BASE` moves every link, image, font and form address under the repository's path. The bare address carries a small page that sends the browser to its language (German by default), since GitHub Pages cannot read `Accept-Language`; one `sitemap.xml` sits at the root. The production layout stays the subdomain one above, and the GitHub Pages copy is a preview, not the client's domain.
