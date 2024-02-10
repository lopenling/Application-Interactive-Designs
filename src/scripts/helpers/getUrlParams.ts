import { type AstroGlobal } from "astro";
import { type TRole, type TState } from "@lib/types";

import getRole from "@scripts/helpers/getRole";
import getState from "@scripts/helpers/getState";

// NB: Demo only, not to be used in production!
export default function getUrlParams(Astro: AstroGlobal) {
  const role: TRole = getRole(Astro);
  const state: TState = getState(Astro);

  return `role=${role}&state=${state}`;
}
