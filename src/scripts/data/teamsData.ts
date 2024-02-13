export type TTeam = {
  id: number;
  name: string;
  adminUserIds: number[];
  memberUserIds: number[];
};

export default function teamsData() {
  const data: TTeam[] = [
    {
      id: 1,
      name: "Alpha",
      adminUserIds: [2],
      memberUserIds: [3],
    },
    {
      id: 2,
      name: "Beta",
      adminUserIds: [2],
      memberUserIds: [3],
    },
    {
      id: 3,
      name: "Gamma",
      adminUserIds: [1],
      memberUserIds: [2, 3],
    },
    {
      id: 4,
      name: "Delta",
      adminUserIds: [1],
      memberUserIds: [2, 3],
    },
    {
      id: 5,
      name: "Omega",
      adminUserIds: [8],
      memberUserIds: [],
    },
  ];
  return data;
}
