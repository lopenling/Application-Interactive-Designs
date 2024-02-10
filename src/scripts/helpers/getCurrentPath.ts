import { type AstroGlobal } from "astro";

// NB: Demo only, not to be used in production!
export default function getCurrentPath(Astro: AstroGlobal) {
  return Astro.url.pathname;
}
