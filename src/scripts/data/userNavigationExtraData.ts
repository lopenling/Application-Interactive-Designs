export type TUserNavigationExtraData = {
  name: string;
  href: string;
}[];

export default function userNavigationExtraData() {
  const data: TUserNavigationExtraData = [
    {
      name: "Sign out",
      href: "/",
    },
  ];
  return data;
}
