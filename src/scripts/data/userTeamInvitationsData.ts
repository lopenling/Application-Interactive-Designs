export type TUserTeamInvitation = {
  id: number;
  teamId: number;
  authorId: number;
  role: "Administrator" | "Member";
};

export default function userTeamInvitationsData() {
  const data: TUserTeamInvitation[] = [
    {
      id: 1,
      teamId: 5,
      authorId: 8,
      role: "Administrator",
    },
  ];
  return data;
}
