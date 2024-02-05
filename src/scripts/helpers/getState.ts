import { type AstroGlobal } from "astro";
import {
  DEMO_ONLY_STATES,
  DEMO_ONLY_DEFAULT_STATE,
} from "@scripts/data/constants";

// NB: Demo only, not to be used in production!
export default function getState(Astro: AstroGlobal) {
  const state = Astro.url.searchParams.get("state");

  if (state && DEMO_ONLY_STATES.includes(state)) {
    return state;
  } else {
    return DEMO_ONLY_DEFAULT_STATE;
  }
}
