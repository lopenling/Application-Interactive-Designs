export type TTeam = {
  id: number;
  name: string;
  users_admin: number[];
  users_member: number[];
};

export type TTeamsData = TTeam[];

export default function teamsData() {
  const data: TTeamsData = [
    {
      id: 1,
      name: "Alpha",
      users_admin: [2],
      users_member: [3],
    },
    {
      id: 2,
      name: "Beta",
      users_admin: [2],
      users_member: [3],
    },
    {
      id: 3,
      name: "Gamma",
      users_admin: [1],
      users_member: [2, 3],
    },
    {
      id: 4,
      name: "Delta",
      users_admin: [1],
      users_member: [2, 3],
    },
  ];
  return data;
}
