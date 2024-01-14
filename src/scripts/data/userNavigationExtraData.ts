export type TUserNavigationExtraData = {
  name: string;
  href: string;
}[];

export default function userNavigationExtraData(currentRole?: string | null) {
  const data: TUserNavigationExtraData = [
    {
      name: "Sign out",
      href: "/",
    },
  ];

  if (currentRole === "user" || !currentRole) {
    data.push({
      name: "View as Admin",
      href: "/demo-only/last-page-seen?role=admin",
    });
  }

  if (currentRole === "admin" || !currentRole) {
    data.push({
      name: "View as User",
      href: "/demo-only/last-page-seen?role=user",
    });
  }

  return data;
}
