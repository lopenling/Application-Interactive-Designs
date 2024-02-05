import {
  DEMO_ONLY_DEFAULT_ROLE,
  DEMO_ONLY_DEFAULT_STATE,
} from "@scripts/data/constants";
import { type TRole, type TState } from "@lib/types";

export type TUserNavigationData = {
  name: string;
  href: string;
  get current(): boolean;
}[];

export default function userNavigationData(
  path?: string,
  role?: TRole,
  state?: TState,
) {
  const data: TUserNavigationData = [
    {
      name: "My account",
      href:
        "/my-account" +
        `?role=${role || DEMO_ONLY_DEFAULT_ROLE}` +
        `&state=${state || DEMO_ONLY_DEFAULT_STATE}`,
      get current() {
        return this.href.split("?")[0] === path;
      },
    },
    {
      name: "Teams",
      href:
        "/teams" +
        `?role=${role || DEMO_ONLY_DEFAULT_ROLE}` +
        `&state=${state || DEMO_ONLY_DEFAULT_STATE}`,
      get current() {
        return this.href.split("?")[0] === path;
      },
    },
    {
      name: "Glossary",
      href:
        "/glossary" +
        `?role=${role || DEMO_ONLY_DEFAULT_ROLE}` +
        `&state=${state || DEMO_ONLY_DEFAULT_STATE}`,
      get current() {
        return this.href.split("?")[0] === path;
      },
    },
  ];
  return data;
}
