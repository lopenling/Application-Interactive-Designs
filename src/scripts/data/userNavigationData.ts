export type TUserNavigationData = {
  name: string;
  href: string;
  get current(): boolean;
}[];

export default function userNavigationData(currentPath?: string) {
  const data: TUserNavigationData = [
    {
      name: "Glossary",
      href: "/glossary",
      get current() {
        return this.href === currentPath;
      },
    },
    {
      name: "Sign out",
      href: "/sign-in",
      get current() {
        return this.href === currentPath;
      },
    },
  ];
  return data;
}
