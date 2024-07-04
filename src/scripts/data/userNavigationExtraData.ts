import { type AstroGlobal } from "astro";
import getRole from "@scripts/helpers/getRole";
import getState from "@scripts/helpers/getState";

export type TUserNavigationExtraData = {
  name: string;
  href: string;
}[];

export default function userNavigationExtraData(astro: AstroGlobal) {
  const role = getRole(astro);
  const state = getState(astro);

  const data: TUserNavigationExtraData = [
    {
      name: "Sign out",
      href: "/",
    },
  ];

  // Everything below this comment is for demo only
  if (role === "user" || !role) {
    data.push({
      name: "View as Admin",
      href: "/demo-only/last-page-seen?role=admin",
    });
  }

  if (role === "admin" || !role) {
    data.push({
      name: "View as User",
      href: "/demo-only/last-page-seen?role=user",
    });
  }

  if (state === "empty" || !state) {
    data.push({
      name: "View filled state",
      href: "/demo-only/last-page-seen?state=filled",
    });
  }

  if (state === "filled" || !state) {
    data.push({
      name: "View empty state",
      href: "/demo-only/last-page-seen?state=empty",
    });
  }

  data.push({
    name: "Reset demo",
    href: "javascript:(function() { localStorage.removeItem('teamsStore'); localStorage.removeItem('teamsStore'); localStorage.removeItem('dictionariesStore'); location.reload(); })()",
  });

  return data;
}
