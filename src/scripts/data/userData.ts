export type TUserData = {
  id: number;
  name: string;
  email: string;
  initials: string;
  imageUrl?: string;
};

export default function userData(role?: "admin") {
  if (role === "admin") {
    const data: TUserData = {
      id: 2,
      name: "David Jones",
      email: "david.jones@example.com",
      initials: "DJ",
      imageUrl: "/images/avatars/admin.jpg",
    };
    return data;
  } else {
    const data: TUserData = {
      id: 3,
      name: "Elizabeth Williams",
      email: "elizabeth.williams@example.com",
      initials: "EW",
      imageUrl: undefined,
    };
    return data;
  }
}
