export type TNavigationData = {
  name: string;
  href: string;
  get current(): boolean;
}[];

export default function navigationData(currentPath?: string) {
  const data: TNavigationData = [
    {
      name: "Placeholder",
      href: "/dashboard",
      get current() {
        return this.href === currentPath;
      },
    },
    {
      name: "Navigation",
      href: "/page-2",
      get current() {
        return this.href === currentPath;
      },
    },
    {
      name: "Items",
      href: "/page-3",
      get current() {
        return this.href === currentPath;
      },
    },
  ];
  return data;
}
