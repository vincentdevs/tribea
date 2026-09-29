import en from "./content/en.json";
import fr from "./content/fr.json";
import de from "./content/de.json";
import it from "./content/it.json";

export const LANGS = ["de", "fr", "it", "en"] as const;
export type Lang = (typeof LANGS)[number];

export const content: Record<Lang, any> = { en, fr, de, it };

// Each page key has its own address in every language.
export const ROUTES: Record<string, Record<Lang, string>> = {
  home: { en: "", fr: "", de: "", it: "" },
  offer: { en: "offer", fr: "offre", de: "angebot", it: "offerta" },
  profile: { en: "offer/profile", fr: "offre/profil", de: "angebot/profil", it: "offerta/profilo" },
  campaign: { en: "offer/campaign", fr: "offre/campagne", de: "angebot/kampagne", it: "offerta/campagna" },
  trust: { en: "offer/trust", fr: "offre/confiance", de: "angebot/vertrauen", it: "offerta/fiducia" },
  publicSector: { en: "public-sector", fr: "secteur-public", de: "oeffentliche-hand", it: "settore-pubblico" },
  method: { en: "how-we-work", fr: "methode", de: "arbeitsweise", it: "metodo" },
  techPolicy: {
    en: "how-we-work/technology-policy",
    fr: "methode/politique-technologique",
    de: "arbeitsweise/technologie-richtlinie",
    it: "metodo/politica-tecnologica",
  },
  privacy: {
    en: "how-we-work/privacy",
    fr: "methode/donnees",
    de: "arbeitsweise/datenschutz",
    it: "metodo/protezione-dati",
  },
  analysis: { en: "analysis", fr: "analyses", de: "analysen", it: "analisi" },
  about: { en: "about", fr: "a-propos", de: "ueber-uns", it: "chi-siamo" },
  contact: { en: "contact", fr: "contact", de: "kontakt", it: "contatto" },
  legal: { en: "legal-notice", fr: "mentions-legales", de: "impressum", it: "note-legali" },
  privacyPolicy: {
    en: "privacy-policy",
    fr: "politique-de-confidentialite",
    de: "datenschutzerklaerung",
    it: "informativa-privacy",
  },
  accessibility: { en: "accessibility", fr: "accessibilite", de: "barrierefreiheit", it: "accessibilita" },
};

// Each language is served from its own subdomain: fr.tribea.ch, de.tribea.ch and so on.
// For a local preview, build with TRIBEA_DOMAIN=localhost:4321 TRIBEA_PROTOCOL=http.
export const DOMAIN = process.env.TRIBEA_DOMAIN ?? "tribea.ch";
export const PROTOCOL = process.env.TRIBEA_PROTOCOL ?? "https";
export const DEFAULT_LANG: Lang = "de";

// Two ways to serve the site. "subdomain" (the production layout): one site per
// language on its own subdomain. "path" (previews on a single host such as
// Vercel): the four languages under /de/, /fr/, /it/ and /en/ of one origin.
export const MODE: "subdomain" | "path" = process.env.TRIBEA_MODE === "path" ? "path" : "subdomain";

export function origin(lang: Lang): string {
  return MODE === "path" ? `${PROTOCOL}://${DOMAIN}` : `${PROTOCOL}://${lang}.${DOMAIN}`;
}

// Address of a page inside its own language site. In subdomain mode there is no
// language prefix; in path mode the language is the first segment.
export function href(lang: Lang, page: string): string {
  const slug = ROUTES[page]?.[lang];
  if (slug === undefined) throw new Error(`Unknown page key "${page}"`);
  const prefix = MODE === "path" ? `/${lang}` : "";
  return `${prefix}/${slug ? slug + "/" : ""}`;
}

export function articleHref(lang: Lang, index: number): string {
  const a = content[lang].articles[index];
  return `${href(lang, "analysis")}${a.slug}/`;
}

// Full address, used for language switching, canonical and hreflang links.
export function absolute(lang: Lang, path: string): string {
  return origin(lang) + path;
}

// The page keys that sit one level below another page, for breadcrumbs.
export const PARENT: Record<string, string> = {
  profile: "offer",
  campaign: "offer",
  trust: "offer",
  publicSector: "offer",
  techPolicy: "method",
  privacy: "method",
  privacyPolicy: "method",
  accessibility: "method",
};

// Which top-level navigation item a page belongs to.
export function section(page: string): string {
  return PARENT[page] ?? page;
}

export function formatDate(lang: Lang, iso: string): string {
  return new Intl.DateTimeFormat(content[lang].locale, {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(iso + "T12:00:00"));
}
