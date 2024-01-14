import { DEMO_ONLY_DEFAULT_ROLE } from "@scripts/data/constants";

export type TRole = "admin" | "user";
export type TUserData = {
  id: number;
  name: string;
  email: string;
  initials: string;
  imageUrl?: string;
};

export default function userData(currentRole: TRole): TUserData {
  const defaultRole: TRole = DEMO_ONLY_DEFAULT_ROLE;
  const data: Record<TRole, TUserData> = {
    admin: {
      id: 2,
      name: "David Jones",
      email: "david.jones@example.com",
      initials: "DJ",
      imageUrl: "/images/avatars/admin.jpg",
    },
    user: {
      id: 3,
      name: "Elizabeth Williams",
      email: "elizabeth.williams@example.com",
      initials: "EW",
      imageUrl: undefined,
    },
  };

  if (currentRole === "admin" || currentRole === "user") {
    return data[currentRole];
  } else {
    return data[defaultRole];
  }
}
