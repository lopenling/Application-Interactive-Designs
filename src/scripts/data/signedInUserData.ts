import { DEMO_ONLY_ROLES, DEMO_ONLY_DEFAULT_ROLE } from "@scripts/data/constants";
import { type TRole } from "@lib/types";
import usersData from "@scripts/data/usersData";

export default function signedInUserData(role: TRole) {
  const defaultRole: TRole = DEMO_ONLY_DEFAULT_ROLE;
  const users = usersData();
  const data = {
    admin: users[1],
    user: users[2],
  };

  if (role && DEMO_ONLY_ROLES.includes(role)) {
    return data[role];
  } else {
    return data[defaultRole];
  }
}
