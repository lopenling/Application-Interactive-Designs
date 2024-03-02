export type TTeam = {
  id: number;
  name: string;
  adminUserIds: number[];
  memberUserIds: number[];
  enabledCustomDictionaryIds: number[];
  disabledCustomDictionaryIds: number[];
  enabledNativeDictionaryIds: number[];
  excludedUsers: TTeamExcludedUser[];
  invitedUsers: TTeamInvitedUser[];
};

export type TTeamExcludedUser = {
  id: number;
  customDictionaryIds: number[];
  nativeDictionaryIds: number[];
};

export type TTeamInvitedUser = {
  id: number;
  role: "admin" | "member";
};

export default function teamsData() {
  const data: TTeam[] = [
    {
      id: 1,
      name: "Alpha",
      adminUserIds: [2, 16],
      memberUserIds: [4, 6, 12, 14],
      invitedUsers: [
        { id: 10, role: "admin" },
        { id: 8, role: "member" },
      ],
      enabledCustomDictionaryIds: [1],
      disabledCustomDictionaryIds: [],
      enabledNativeDictionaryIds: [1, 2, 3, 5, 6, 7, 8, 17],
      excludedUsers: [
        { id: 2, customDictionaryIds: [1], nativeDictionaryIds: [3] },
        { id: 4, customDictionaryIds: [], nativeDictionaryIds: [3] },
        { id: 6, customDictionaryIds: [1], nativeDictionaryIds: [] },
        { id: 8, customDictionaryIds: [], nativeDictionaryIds: [3] },
        { id: 14, customDictionaryIds: [1], nativeDictionaryIds: [3] },
        { id: 16, customDictionaryIds: [1], nativeDictionaryIds: [3] },
      ],
    },
    {
      id: 2,
      name: "Beta",
      adminUserIds: [2],
      memberUserIds: [1, 3, 4, 5],
      invitedUsers: [],
      enabledCustomDictionaryIds: [2],
      disabledCustomDictionaryIds: [],
      enabledNativeDictionaryIds: [
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
      ],
      excludedUsers: [],
    },
    {
      id: 3,
      name: "Gamma",
      adminUserIds: [1],
      memberUserIds: [2, 3],
      invitedUsers: [],
      enabledCustomDictionaryIds: [3],
      disabledCustomDictionaryIds: [30],
      enabledNativeDictionaryIds: [1, 2, 3],
      excludedUsers: [
        { id: 1, customDictionaryIds: [3], nativeDictionaryIds: [1] },
        { id: 3, customDictionaryIds: [3], nativeDictionaryIds: [1] },
      ],
    },
    {
      id: 4,
      name: "Delta",
      adminUserIds: [1],
      memberUserIds: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
      invitedUsers: [],
      enabledCustomDictionaryIds: [],
      disabledCustomDictionaryIds: [4],
      enabledNativeDictionaryIds: [],
      excludedUsers: [],
    },
    {
      id: 5,
      name: "Omega",
      adminUserIds: [8],
      memberUserIds: [],
      invitedUsers: [{ id: 2, role: "admin" }],
      enabledCustomDictionaryIds: [],
      disabledCustomDictionaryIds: [],
      enabledNativeDictionaryIds: [
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
      ],
      excludedUsers: [],
    },
  ];
  return data;
}
