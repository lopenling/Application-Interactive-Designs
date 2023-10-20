export type TOrganizationUsersData = {
  id: number;
  name: string;
  initials: string;
  email: string;
  imgUrl?: string;
}[];

export default function organizationUsersData() {
  const data: TOrganizationUsersData = [
    {
      id: 1,
      name: "Barbara Smith",
      initials: "BS",
      email: "barbara.smith@example.com",
      imgUrl: undefined,
    },
    {
      id: 2,
      name: "David Jones",
      initials: "DJ",
      email: "david.jones@example.com",
      imgUrl: "/images/avatars/admin.jpg",
    },
    {
      id: 3,
      name: "Elizabeth Williams",
      initials: "EW",
      email: "elizabeth.williams@example.com",
      imgUrl: undefined,
    },
    {
      id: 4,
      name: "James Brown",
      initials: "JB",
      email: "james.brown@example.com",
      imgUrl: undefined,
    },
    {
      id: 5,
      name: "Jennifer Johnson",
      initials: "JJ",
      email: "jennifer.johnson@example.com",
      imgUrl: undefined,
    },
    {
      id: 6,
      name: "Jessica Taylor",
      initials: "JT",
      email: "jessica.taylor@example.com",
      imgUrl: undefined,
    },
    {
      id: 7,
      name: "John Davis",
      initials: "JD",
      email: "john.davis@example.com",
      imgUrl: undefined,
    },
    {
      id: 8,
      name: "Joseph Miller",
      initials: "JM",
      email: "joseph.miller@example.com",
      imgUrl: undefined,
    },
    {
      id: 9,
      name: "Linda Wilson",
      initials: "LW",
      email: "linda.wilson@example.com",
      imgUrl: undefined,
    },
    {
      id: 10,
      name: "Mary Thompson",
      initials: "MT",
      email: "mary.thompson@example.com",
      imgUrl: undefined,
    },
    {
      id: 11,
      name: "Michael Thomas",
      initials: "MT",
      email: "michael.thomas@example.com",
      imgUrl: undefined,
    },
    {
      id: 12,
      name: "Patricia Anderson",
      initials: "PA",
      email: "patricia.anderson@example.com",
      imgUrl: undefined,
    },
    {
      id: 13,
      name: "Richard White",
      initials: "RW",
      email: "richard.white@example.com",
      imgUrl: undefined,
    },
    {
      id: 14,
      name: "Robert Martin",
      initials: "RM",
      email: "robert.martin@example.com",
      imgUrl: undefined,
    },
    {
      id: 15,
      name: "Susan Moore",
      initials: "SM",
      email: "susan.moore@example.com",
      imgUrl: undefined,
    },
    {
      id: 16,
      name: "William Jackson",
      initials: "WJ",
      email: "william.jackson@example.com",
      imgUrl: undefined,
    },
  ];
  return data;
}
