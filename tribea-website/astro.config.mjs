// @ts-check
import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://tribea.ch",
  trailingSlash: "always",
  build: { format: "directory", inlineStylesheets: "always" },
});
