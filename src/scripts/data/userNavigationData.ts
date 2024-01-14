import { DEMO_ONLY_DEFAULT_ROLE } from "@scripts/data/constants";

export type TUserNavigationData = {
  name: string;
  href: string;
  get current(): boolean;
}[];

export default function userNavigationData(
  currentPath?: string,
  currentRole?: string | null,
) {
  const data: TUserNavigationData = [
    {
      name: "My account",
      href: "/my-account" + `?role=${currentRole || DEMO_ONLY_DEFAULT_ROLE}`,
      get current() {
        return this.href === currentPath;
      },
    },
    {
      name: "Organizations",
      href: "/organizations" + `?role=${currentRole || DEMO_ONLY_DEFAULT_ROLE}`,
      get current() {
        return this.href === currentPath;
      },
    },
    {
      name: "Glossary",
      href: "/glossary" + `?role=${currentRole || DEMO_ONLY_DEFAULT_ROLE}`,
      get current() {
        return this.href === currentPath;
      },
    },
  ];
  return data;
}
