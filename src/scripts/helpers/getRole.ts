import { type AstroGlobal } from "astro";
import { type TRole } from "@lib/types";
import { DEMO_ONLY_ROLES, DEMO_ONLY_DEFAULT_ROLE } from "@scripts/data/constants";

// NB: Demo only, not to be used in production!
export default function getRole(Astro: AstroGlobal): TRole {
  const role = Astro.url.searchParams.get("role");

  if (role && DEMO_ONLY_ROLES.includes(role as TRole)) {
    return role as TRole;
  } else {
    return DEMO_ONLY_DEFAULT_ROLE;
  }
}
