export type TUsersData = {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatarUrl: string | undefined;
}[];

export default function teamsData() {
  const data: TUsersData = [
    {
      id: 1,
      email: "barbara.smith@example.com",
      first_name: "Barbara",
      last_name: "Smith",
      avatarUrl: undefined,
    },
    {
      id: 2,
      email: "david.jones@example.com",
      first_name: "David",
      last_name: "Jones",
      avatarUrl: "/images/avatars/admin.jpg",
    },
    {
      id: 3,
      email: "elizabeth.williams@example.com",
      first_name: "Elizabeth",
      last_name: "Williams",
      avatarUrl: undefined,
    },
    {
      id: 4,
      email: "james.brown@example.com",
      first_name: "James",
      last_name: "Brown",
      avatarUrl: undefined,
    },
    {
      id: 5,
      email: "jennifer.johnson@example.com",
      first_name: "Jennifer",
      last_name: "Johnson",
      avatarUrl: undefined,
    },
    {
      id: 6,
      email: "jessica.taylor@example.com",
      first_name: "Jessica",
      last_name: "Taylor",
      avatarUrl: undefined,
    },
    {
      id: 7,
      email: "john.davis@example.com",
      first_name: "John",
      last_name: "Davis",
      avatarUrl: undefined,
    },
    {
      id: 8,
      email: "joseph.miller@example.com",
      first_name: "Joseph",
      last_name: "Miller",
      avatarUrl: undefined,
    },
    {
      id: 9,
      email: "linda.wilson@example.com",
      first_name: "Linda",
      last_name: "Wilson",
      avatarUrl: undefined,
    },
    {
      id: 10,
      email: "mary.thompson@example.com",
      first_name: "Mary",
      last_name: "Thompson",
      avatarUrl: undefined,
    },
    {
      id: 11,
      email: "michael.thomas@example.com",
      first_name: "Michael",
      last_name: "Thomas",
      avatarUrl: undefined,
    },
    {
      id: 12,
      email: "patricia.anderson@example.com",
      first_name: "Patricia",
      last_name: "Anderson",
      avatarUrl: undefined,
    },
    {
      id: 13,
      email: "richard.white@example.com",
      first_name: "Richard",
      last_name: "White",
      avatarUrl: undefined,
    },
    {
      id: 14,
      email: "robert.martin@example.com",
      first_name: "Robert",
      last_name: "Martin",
      avatarUrl: undefined,
    },
    {
      id: 15,
      email: "susan.moore@example.com",
      first_name: "Susan",
      last_name: "Moore",
      avatarUrl: undefined,
    },
    {
      id: 16,
      email: "william.jackson@example.com",
      first_name: "William",
      last_name: "Jackson",
      avatarUrl: undefined,
    },
  ];
  return data;
}
