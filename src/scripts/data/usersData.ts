export type TUser = {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  avatarUrl: string | undefined;
};

export default function teamsData() {
  const data: TUser[] = [
    {
      id: 1,
      email: "barbara.smith@example.com",
      firstName: "Barbara",
      lastName: "Smith",
      avatarUrl: undefined,
    },
    {
      id: 2,
      email: "david.jones@example.com",
      firstName: "David",
      lastName: "Jones",
      avatarUrl: "/images/avatars/admin.jpg",
    },
    {
      id: 3,
      email: "elizabeth.williams@example.com",
      firstName: "Elizabeth",
      lastName: "Williams",
      avatarUrl: undefined,
    },
    {
      id: 4,
      email: "james.brown@example.com",
      firstName: "James",
      lastName: "Brown",
      avatarUrl: undefined,
    },
    {
      id: 5,
      email: "jennifer.johnson@example.com",
      firstName: "Jennifer",
      lastName: "Johnson",
      avatarUrl: undefined,
    },
    {
      id: 6,
      email: "jessica.taylor@example.com",
      firstName: "Jessica",
      lastName: "Taylor",
      avatarUrl: undefined,
    },
    {
      id: 7,
      email: "john.davis@example.com",
      firstName: "John",
      lastName: "Davis",
      avatarUrl: undefined,
    },
    {
      id: 8,
      email: "joseph.miller@example.com",
      firstName: "Joseph",
      lastName: "Miller",
      avatarUrl: undefined,
    },
    {
      id: 9,
      email: "linda.wilson@example.com",
      firstName: "Linda",
      lastName: "Wilson",
      avatarUrl: undefined,
    },
    {
      id: 10,
      email: "mary.thompson@example.com",
      firstName: "Mary",
      lastName: "Thompson",
      avatarUrl: undefined,
    },
    {
      id: 11,
      email: "michael.thomas@example.com",
      firstName: "Michael",
      lastName: "Thomas",
      avatarUrl: undefined,
    },
    {
      id: 12,
      email: "patricia.anderson@example.com",
      firstName: "Patricia",
      lastName: "Anderson",
      avatarUrl: undefined,
    },
    {
      id: 13,
      email: "richard.white@example.com",
      firstName: "Richard",
      lastName: "White",
      avatarUrl: undefined,
    },
    {
      id: 14,
      email: "robert.martin@example.com",
      firstName: "Robert",
      lastName: "Martin",
      avatarUrl: undefined,
    },
    {
      id: 15,
      email: "susan.moore@example.com",
      firstName: "Susan",
      lastName: "Moore",
      avatarUrl: undefined,
    },
    {
      id: 16,
      email: "william.jackson@example.com",
      firstName: "William",
      lastName: "Jackson",
      avatarUrl: undefined,
    },
  ];
  return data;
}
