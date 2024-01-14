import { DEMO_ONLY_DEFAULT_ROLE } from "@scripts/data/constants";

export type TNavigationData = {
  name: string;
  href: string;
  get current(): boolean;
}[];

export default function navigationData(
  currentPath?: string,
  currentRole?: string | null,
) {
  const data: TNavigationData = [
    {
      name: "Placeholder",
      href: "/dashboard" + `?role=${currentRole || DEMO_ONLY_DEFAULT_ROLE}`,
      get current() {
        return this.href === currentPath;
      },
    },
    {
      name: "Navigation",
      href: "/page-2" + `?role=${currentRole || DEMO_ONLY_DEFAULT_ROLE}`,
      get current() {
        return this.href === currentPath;
      },
    },
    {
      name: "Items",
      href: "/page-3" + `?role=${currentRole || DEMO_ONLY_DEFAULT_ROLE}`,
      get current() {
        return this.href === currentPath;
      },
    },
  ];
  return data;
}
