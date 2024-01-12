export type TUserNavigationData = {
  name: string;
  href: string;
  get current(): boolean;
}[];

export default function userNavigationData(currentPath?: string) {
  const data: TUserNavigationData = [
    {
      name: "My account",
      href: "/my-account",
      get current() {
        return this.href === currentPath;
      },
    },
    {
      name: "Organizations",
      href: "/organizations",
      get current() {
        return this.href === currentPath;
      },
    },
    {
      name: "Glossary",
      href: "/glossary",
      get current() {
        return this.href === currentPath;
      },
    },
  ];
  return data;
}
