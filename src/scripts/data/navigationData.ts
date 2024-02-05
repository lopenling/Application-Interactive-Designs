import {
  DEMO_ONLY_DEFAULT_ROLE,
  DEMO_ONLY_DEFAULT_STATE,
} from "@scripts/data/constants";
import { type TRole, type TState } from "@lib/types";

export type TNavigationData = {
  name: string;
  href: string;
  get current(): boolean;
}[];

export default function navigationData(
  path?: string,
  role?: TRole,
  state?: TState,
) {
  const data: TNavigationData = [
    {
      name: "Dashboard",
      href:
        "/dashboard" +
        `?role=${role || DEMO_ONLY_DEFAULT_ROLE}` +
        `&state=${state || DEMO_ONLY_DEFAULT_STATE}`,
      get current() {
        return this.href.split("?")[0] === path;
      },
    },
    {
      name: "Translate",
      href:
        "/translate" +
        `?role=${role || DEMO_ONLY_DEFAULT_ROLE}` +
        `&state=${state || DEMO_ONLY_DEFAULT_STATE}`,
      get current() {
        return this.href.split("?")[0] === path;
      },
    },
    {
      name: "Projects",
      href:
        "/projects" +
        `?role=${role || DEMO_ONLY_DEFAULT_ROLE}` +
        `&state=${state || DEMO_ONLY_DEFAULT_STATE}`,
      get current() {
        return this.href.split("?")[0] === path;
      },
    },
  ];
  return data;
}
