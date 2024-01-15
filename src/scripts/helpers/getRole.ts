import { type AstroGlobal } from "astro";
import {
  DEMO_ONLY_ROLES,
  DEMO_ONLY_DEFAULT_ROLE,
} from "@scripts/data/constants";

// NB: Demo only, not to be used in production!
export default function getRole(Astro: AstroGlobal) {
  const role = Astro.url.searchParams.get("role");

  if (role && DEMO_ONLY_ROLES.includes(role)) {
    return role;
  } else {
    return DEMO_ONLY_DEFAULT_ROLE;
  }
}
