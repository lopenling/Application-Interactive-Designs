import { type TRole, type TState } from "@lib/types";

export type TUserNavigationExtraData = {
  name: string;
  href: string;
}[];

export default function userNavigationExtraData(role?: TRole, state?: TState) {
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

  return data;
}
