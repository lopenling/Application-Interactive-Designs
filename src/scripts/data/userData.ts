import { DEMO_ONLY_DEFAULT_ROLE } from "@scripts/data/constants";
import { type TRole } from "@lib/types";

export type TUserData = {
  id: number;
  name: string;
  email: string;
  initials: string;
  imageUrl?: string;
};

export default function userData(role: TRole | undefined): TUserData {
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

  if (role === "admin" || role === "user") {
    return data[role];
  } else {
    return data[defaultRole];
  }
}
