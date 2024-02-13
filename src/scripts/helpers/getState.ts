import { type AstroGlobal } from "astro";
import { type TState } from "@lib/types";
import { DEMO_ONLY_STATES, DEMO_ONLY_DEFAULT_STATE } from "@scripts/data/constants";

// NB: Demo only, not to be used in production!
export default function getState(Astro: AstroGlobal): TState {
  const state = Astro.url.searchParams.get("state");

  if (state && DEMO_ONLY_STATES.includes(state as TState)) {
    return state as TState;
  } else {
    return DEMO_ONLY_DEFAULT_STATE;
  }
}
