import { defineStore } from "pinia";
import { useUsersStore, userRoles, type TSingularUserRole } from "@stores/usersStore";

export type TTeam = {
  id: number;
  name: string;
  administratorUserIds: number[];
  memberUserIds: number[];
  invitedUsers: TTeamInvitedUser[];
  enabledCustomDictionaryIds: number[];
  disabledCustomDictionaryIds: number[];
  enabledNativeDictionaryIds: number[];
  customDictionaryExlcudedUsers: TTeamExcludedUser[];
  nativeDictionaryExlcudedUsers: TTeamExcludedUser[];
};
export type TTeamInvitedUser = {
  id: number;
  role: TSingularUserRole;
  inviteAuthorId: number;
};
export type TTeamExcludedUser = {
  userId?: number;
  dictionaryIds: number[];
};
export type TUserInFilter = { id: number; value: string } | null;
export type TShowDisabledDictionaries = boolean;

type TAddTeam = { teamId: number; teamName: string; userId: number };
type TRenameTeam = { teamId: number; teamName: string };
type TDeleteTeam = { teamId: number };
type TAddUserToTeam = { userId: number; teamId: number; role: TSingularUserRole };
type TAddNewInviteToTeam = {
  userEmail: string;
  teamId: number;
  role: TSingularUserRole;
  inviteAuthorId: number;
};
type TAddCustomDictionaryToTeam = { dictionaryId: number; teamId: number };
type TRemoveUserFromTeam = { userId: number; teamId: number };
type TEditUserRoleInTeam = { userId: number; teamId: number; role: TSingularUserRole };
type TEditInviteRoleInTeam = { userId: number; teamId: number; role: TSingularUserRole };
type TResolveUserInvite = { userId: number; teamId: number; acceptInvite: boolean };
type TToggleCustomDictionaryInTeam = { dictionaryId: number; teamId: number };
type TToggleNativeDictionaryInTeam = { dictionaryId: number; teamId: number };
type TRemoveCustomDictionaryFromTeam = { dictionaryId: number; teamId: number };
type TUpdateUserExcludedFromCustomDictionary = {
  userId: number;
  dictionaryId: number;
  value: boolean;
  teamId: number;
};
type TUpdateUserExcludedFromNativeDictionary = {
  userId: number;
  dictionaryId: number;
  value: boolean;
  teamId: number;
};

const teams: TTeam[] = [
  {
    id: 1,
    name: "Arctic Alligators",
    administratorUserIds: [2],
    memberUserIds: [4, 6, 12, 14],
    invitedUsers: [
      { id: 3, role: userRoles.member, inviteAuthorId: 2 },
      { id: 10, role: userRoles.administrator, inviteAuthorId: 2 },
    ],
    enabledCustomDictionaryIds: [1],
    disabledCustomDictionaryIds: [],
    enabledNativeDictionaryIds: [1, 2, 3, 5, 6, 7, 8, 17],
    customDictionaryExlcudedUsers: [
      { userId: 6, dictionaryIds: [1] },
      { userId: 14, dictionaryIds: [1] },
    ],
    nativeDictionaryExlcudedUsers: [
      { userId: 6, dictionaryIds: [3] },
      { userId: 14, dictionaryIds: [3] },
    ],
  },
  {
    id: 2,
    name: "Buff Brownies",
    administratorUserIds: [2],
    memberUserIds: [],
    invitedUsers: [],
    enabledCustomDictionaryIds: [],
    disabledCustomDictionaryIds: [],
    enabledNativeDictionaryIds: [
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
    ],
    customDictionaryExlcudedUsers: [],
    nativeDictionaryExlcudedUsers: [],
  },
  {
    id: 3,
    name: "Clever Cats",
    administratorUserIds: [1],
    memberUserIds: [2, 3],
    invitedUsers: [],
    enabledCustomDictionaryIds: [3],
    disabledCustomDictionaryIds: [30],
    enabledNativeDictionaryIds: [1, 2, 3],
    customDictionaryExlcudedUsers: [],
    nativeDictionaryExlcudedUsers: [],
  },
  {
    id: 4,
    name: "Dapper Ducks",
    administratorUserIds: [1],
    memberUserIds: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
    invitedUsers: [],
    enabledCustomDictionaryIds: [],
    disabledCustomDictionaryIds: [4],
    enabledNativeDictionaryIds: [],
    customDictionaryExlcudedUsers: [],
    nativeDictionaryExlcudedUsers: [],
  },
  {
    id: 5,
    name: "Olympic Owls",
    administratorUserIds: [8],
    memberUserIds: [],
    invitedUsers: [{ id: 2, role: userRoles.administrator, inviteAuthorId: 8 }],
    enabledCustomDictionaryIds: [5, 51],
    disabledCustomDictionaryIds: [52],
    enabledNativeDictionaryIds: [
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
    ],
    customDictionaryExlcudedUsers: [],
    nativeDictionaryExlcudedUsers: [],
  },
];

const userInFilter: TUserInFilter = null;
const showDisabledDictionaries: TShowDisabledDictionaries = false;

export const useTeamsStore = defineStore("teamsStore", {
  state: () => ({
    teams: teams,
    userInFilter: userInFilter,
    showDisabledDictionaries: showDisabledDictionaries,
  }),
  getters: {
    getTeamById: (state) => {
      return (teamId: number) => state.teams.find((obj) => obj.id == teamId);
    },
    getTeamIndexById: (state) => {
      return (teamId: number) => state.teams.findIndex((team) => team["id"] === teamId);
    },
    getNewTeamId: (state) => {
      return () => {
        const highestId = Math.max(...state.teams.map((team) => team.id));
        return highestId + 1;
      };
    },
    getTeamsWhereUserIsAdminByUserId: (state) => {
      return (userId: number) => {
        const teams = state.teams
          .filter((team) => team.administratorUserIds.some((id) => id === userId))
          .sort((a, b) => a.name.localeCompare(b.name));
        return teams;
      };
    },
    getTeamsWhereUserIsMemberByUserId: (state) => {
      return (userId: number) => {
        const teams = state.teams
          .filter((team) => team.memberUserIds.some((id) => id === userId))
          .sort((a, b) => a.name.localeCompare(b.name));
        return teams;
      };
    },
    getTeamsWhereUserIsInvitedByUserId: (state) => {
      return (userId: number) => {
        const teams = state.teams
          .filter((team) => team.invitedUsers.some((user) => user.id === userId))
          .sort((a, b) => a.name.localeCompare(b.name));
        return teams;
      };
    },
    getUserRoleByUserIdInTeam: (state) => {
      return (userId: number, teamId: number) => {
        const team = state.teams.find((obj) => obj.id == teamId);

        if (team?.administratorUserIds.includes(userId)) return userRoles.administrator;
        if (team?.memberUserIds.includes(userId)) return userRoles.member;

        const invitee = team?.invitedUsers.find((user) => user.id === userId);
        if (invitee && invitee.role.value === userRoles.administrator.value)
          return userRoles.administrator;
        if (invitee && invitee.role.value === userRoles.member.value) return userRoles.member;
      };
    },
    getAllUserIdsInTeam: (state) => {
      return (teamId: number) => {
        const team = state.teams.find((obj) => obj.id == teamId);
        return team?.administratorUserIds
          .concat(team?.memberUserIds)
          .concat(team?.invitedUsers.map((user) => user.id));
      };
    },
    getAdministratorIdsInTeam: (state) => {
      return (teamId: number) => {
        const team = state.teams.find((obj) => obj.id == teamId);
        return team?.administratorUserIds;
      };
    },
    getEnabledCustomDictionaryIdsInTeam: (state) => {
      return (teamId: number) => {
        const team = state.teams.find((obj) => obj.id == teamId);
        return team?.enabledCustomDictionaryIds;
      };
    },
    getAllCustomDictionaryIdsInTeam: (state) => {
      return (teamId: number) => {
        const team = state.teams.find((obj) => obj.id == teamId);
        return team?.enabledCustomDictionaryIds.concat(team?.disabledCustomDictionaryIds);
      };
    },
    isUserInvitePendingByUserIdInTeam: (state) => {
      return (userId: number, teamId: number) => {
        const team = state.teams.find((obj) => obj.id == teamId);

        const invitee = team?.invitedUsers.find((user) => user.id === userId);
        if (invitee) return true;
        return false;
      };
    },
    isCustomDictionaryEnabledByDictionaryIdInTeam: (state) => {
      return (dictionaryId: number, teamId: number) => {
        const team = state.teams.find((obj) => obj.id == teamId);
        return team?.enabledCustomDictionaryIds.includes(dictionaryId);
      };
    },
    isNativeDictionaryEnabledByDictionaryIdInTeam: (state) => {
      return (dictionaryId: number, teamId: number) => {
        const team = state.teams.find((obj) => obj.id == teamId);
        return team?.enabledNativeDictionaryIds.includes(dictionaryId);
      };
    },
    isUserExcludedFromCustomDictionary: (state) => {
      return (userId: number, dictionaryId: number, teamId: number) => {
        const team = state.teams.find((obj) => obj.id == teamId);
        return team?.customDictionaryExlcudedUsers.some(
          (item) => item.userId === userId && item.dictionaryIds?.includes(dictionaryId),
        );
      };
    },
    isUserExcludedFromNativeDictionary: (state) => {
      return (userId: number, dictionaryId: number, teamId: number) => {
        const team = state.teams.find((obj) => obj.id == teamId);
        return team?.nativeDictionaryExlcudedUsers.some(
          (item) => item.userId === userId && item.dictionaryIds?.includes(dictionaryId),
        );
      };
    },
    isDictionaryIdInCustomDictionaryExlcudedUsers: (state) => {
      return (dictionaryId: number, teamId: number) => {
        const team = state.teams.find((obj) => obj.id == teamId);
        return team?.customDictionaryExlcudedUsers.some((item) =>
          item.dictionaryIds?.includes(dictionaryId),
        );
      };
    },
    isDictionaryIdInNativeDictionaryExlcudedUsers: (state) => {
      return (dictionaryId: number, teamId: number) => {
        const team = state.teams.find((obj) => obj.id == teamId);
        return team?.nativeDictionaryExlcudedUsers.some((item) =>
          item.dictionaryIds?.includes(dictionaryId),
        );
      };
    },
  },
  actions: {
    addTeam({ teamId, teamName, userId }: TAddTeam) {
      this.$patch((state) => {
        state.teams.push({
          id: teamId,
          name: teamName,
          administratorUserIds: [userId],
          memberUserIds: [],
          invitedUsers: [],
          enabledCustomDictionaryIds: [],
          disabledCustomDictionaryIds: [],
          enabledNativeDictionaryIds: [
            1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
          ],
          customDictionaryExlcudedUsers: [],
          nativeDictionaryExlcudedUsers: [],
        });
      });
    },
    renameTeam({ teamId, teamName }: TRenameTeam) {
      const teamIndex = this.getTeamIndexById(teamId);
      this.$patch((state) => (state.teams[teamIndex].name = teamName));
    },
    deleteTeam({ teamId }: TDeleteTeam) {
      const teamIndex = this.getTeamIndexById(teamId);
      this.$patch((state) => state.teams.splice(teamIndex, 1));
    },
    addUserToTeam({ userId, teamId, role }: TAddUserToTeam) {
      const team = this.getTeamById(teamId);
      const teamIndex = this.getTeamIndexById(teamId);

      this.$patch((state) => {
        if (role.value === userRoles.administrator.value) {
          const updatedUserIds = team?.administratorUserIds.concat(userId);
          state.teams[teamIndex].administratorUserIds = updatedUserIds!;
        }
        if (role.value === userRoles.member.value) {
          const updatedUserIds = team?.memberUserIds.concat(userId);
          state.teams[teamIndex].memberUserIds = updatedUserIds!;
        }
      });
    },
    addNewInviteToTeam({ userEmail, teamId, role, inviteAuthorId }: TAddNewInviteToTeam) {
      const user = useUsersStore();
      const newUserId = user.getNewUserId();
      user.addUser({ userEmail: userEmail, userId: newUserId });

      const team = this.getTeamById(teamId);
      const teamIndex = this.getTeamIndexById(teamId);
      const updatedInvitedUsers = team?.invitedUsers.concat({
        id: newUserId,
        role: role,
        inviteAuthorId: inviteAuthorId,
      });
      this.$patch((state) => (state.teams[teamIndex].invitedUsers = updatedInvitedUsers!));
    },
    addCustomDictionaryToTeam({ dictionaryId, teamId }: TAddCustomDictionaryToTeam) {
      const team = this.getTeamById(teamId);
      const teamIndex = this.getTeamIndexById(teamId);

      this.$patch((state) => {
        const updatedIds = team?.enabledCustomDictionaryIds.concat(dictionaryId);
        state.teams[teamIndex].enabledCustomDictionaryIds = updatedIds!;
      });
    },
    editUserRoleInTeam({ userId, teamId, role }: TEditUserRoleInTeam) {
      this.removeUserFromTeam({ userId, teamId });
      this.addUserToTeam({ userId, teamId, role: role });
    },
    editInviteRoleInTeam({ userId, teamId, role }: TEditInviteRoleInTeam) {
      const team = this.getTeamById(teamId);
      const teamIndex = this.getTeamIndexById(teamId);
      let user = team?.invitedUsers.find((user) => user.id === userId);
      const userIndex = team?.invitedUsers.findIndex((user) => user.id === userId)!;

      if (user) {
        user.role = role;
        this.$patch((state) => (state.teams[teamIndex].invitedUsers[userIndex] = user));
      }
    },
    removeUserFromTeam({ userId, teamId }: TRemoveUserFromTeam) {
      const team = this.getTeamById(teamId);
      const teamIndex = this.getTeamIndexById(teamId);
      const role = this.getUserRoleByUserIdInTeam(userId, teamId);

      if (role!.value === userRoles.administrator.value) {
        const updatedUserIds = team?.administratorUserIds.filter((id) => id !== userId);
        this.$patch((state) => (state.teams[teamIndex].administratorUserIds = updatedUserIds!));
      }
      if (role!.value === userRoles.member.value) {
        const updatedUserIds = team?.memberUserIds.filter((id) => id !== userId);
        this.$patch((state) => (state.teams[teamIndex].memberUserIds = updatedUserIds!));
      }
      if (this.isUserInvitePendingByUserIdInTeam(userId, teamId)) {
        this.resolveUserInvite({ userId, teamId, acceptInvite: false });
      }
    },
    resolveUserInvite({ userId, teamId, acceptInvite }: TResolveUserInvite) {
      const team = this.getTeamById(teamId);
      const invite = team?.invitedUsers.find((user) => user.id === userId);
      if (!invite) return;

      const updatedInvitedUsers = team?.invitedUsers.filter((user) => user.id !== userId);
      const teamIndex = this.getTeamIndexById(teamId);

      this.$patch((state) => (state.teams[teamIndex].invitedUsers = updatedInvitedUsers!));
      if (acceptInvite) this.addUserToTeam({ userId, teamId, role: invite.role });
    },
    toggleCustomDictionaryInTeam({ dictionaryId, teamId }: TToggleCustomDictionaryInTeam) {
      const team = this.getTeamById(teamId);
      const teamIndex = this.getTeamIndexById(teamId);
      let updatedEnabledIds, updatedDisabledIds;

      if (this.isCustomDictionaryEnabledByDictionaryIdInTeam(dictionaryId, teamId)) {
        updatedEnabledIds = team?.enabledCustomDictionaryIds.filter((id) => id !== dictionaryId);
        updatedDisabledIds = team?.disabledCustomDictionaryIds.concat(dictionaryId);
      } else {
        updatedEnabledIds = team?.enabledCustomDictionaryIds.concat(dictionaryId);
        updatedDisabledIds = team?.disabledCustomDictionaryIds.filter((id) => id !== dictionaryId);
      }

      this.$patch((state) => {
        state.teams[teamIndex].enabledCustomDictionaryIds = updatedEnabledIds!;
        state.teams[teamIndex].disabledCustomDictionaryIds = updatedDisabledIds!;
      });
    },
    toggleNativeDictionaryInTeam({ dictionaryId, teamId }: TToggleNativeDictionaryInTeam) {
      const team = this.getTeamById(teamId);
      const teamIndex = this.getTeamIndexById(teamId);
      let updatedEnabledIds;

      if (this.isNativeDictionaryEnabledByDictionaryIdInTeam(dictionaryId, teamId)) {
        updatedEnabledIds = team?.enabledNativeDictionaryIds.filter((id) => id !== dictionaryId);
      } else {
        updatedEnabledIds = team?.enabledNativeDictionaryIds.concat(dictionaryId);
      }

      this.$patch((state) => {
        state.teams[teamIndex].enabledNativeDictionaryIds = updatedEnabledIds!;
      });
    },
    removeCustomDictionaryFromTeam({ dictionaryId, teamId }: TRemoveCustomDictionaryFromTeam) {
      const team = this.getTeamById(teamId);
      const teamIndex = this.getTeamIndexById(teamId);
      const updatedEnabledIds = team?.enabledCustomDictionaryIds.filter(
        (id) => id !== dictionaryId,
      );
      const updatedDisabledIds = team?.disabledCustomDictionaryIds.filter(
        (id) => id !== dictionaryId,
      );

      this.$patch((state) => {
        state.teams[teamIndex].enabledCustomDictionaryIds = updatedEnabledIds!;
        state.teams[teamIndex].disabledCustomDictionaryIds = updatedDisabledIds!;
      });
    },
    updateUserExcludedFromCustomDictionary({
      userId,
      dictionaryId,
      value,
      teamId,
    }: TUpdateUserExcludedFromCustomDictionary) {
      const team = this.getTeamById(teamId);
      const teamIndex = this.getTeamIndexById(teamId);
      const user = team?.customDictionaryExlcudedUsers.find((u) => u.userId === userId);
      const userIndex = team?.customDictionaryExlcudedUsers.findIndex(
        (item) => item["userId"] === userId,
      )!;

      this.$patch((state) => {
        if (user) {
          if (!value) {
            // Add dictionaryId to the user's dictionaryIds if it doesn't exist
            if (!user.dictionaryIds?.includes(dictionaryId)) {
              state.teams[teamIndex].customDictionaryExlcudedUsers[userIndex].dictionaryIds!.push(
                dictionaryId,
              );
            }
          } else {
            // Remove dictionaryId from the user's dictionaryIds if it exists
            let updatedDictionaryIds = user.dictionaryIds!.filter((id) => id !== dictionaryId);
            state.teams[teamIndex].customDictionaryExlcudedUsers[userIndex].dictionaryIds =
              updatedDictionaryIds;
          }
        } else if (!value) {
          // Add new user with the dictionaryId
          state.teams[teamIndex].customDictionaryExlcudedUsers.push({
            userId,
            dictionaryIds: [dictionaryId],
          });
        }
      });
    },
    updateUserExcludedFromNativeDictionary({
      userId,
      dictionaryId,
      value,
      teamId,
    }: TUpdateUserExcludedFromNativeDictionary) {
      const team = this.getTeamById(teamId);
      const teamIndex = this.getTeamIndexById(teamId);
      const user = team?.nativeDictionaryExlcudedUsers.find((u) => u.userId === userId);
      const userIndex = team?.nativeDictionaryExlcudedUsers.findIndex(
        (item) => item["userId"] === userId,
      )!;

      this.$patch((state) => {
        if (user) {
          if (!value) {
            // Add dictionaryId to the user's dictionaryIds if it doesn't exist
            if (!user.dictionaryIds?.includes(dictionaryId)) {
              state.teams[teamIndex].nativeDictionaryExlcudedUsers[userIndex].dictionaryIds!.push(
                dictionaryId,
              );
            }
          } else {
            // Remove dictionaryId from the user's dictionaryIds if it exists
            let updatedDictionaryIds = user.dictionaryIds!.filter((id) => id !== dictionaryId);
            state.teams[teamIndex].nativeDictionaryExlcudedUsers[userIndex].dictionaryIds =
              updatedDictionaryIds;
          }
        } else if (!value) {
          // Add new user with the dictionaryId
          state.teams[teamIndex].nativeDictionaryExlcudedUsers.push({
            userId,
            dictionaryIds: [dictionaryId],
          });
        }
      });
    },
    setUserInFilter(user: any) {
      this.userInFilter = user;
    },
    toggleShowDisabledDictionaries() {
      this.showDisabledDictionaries = !this.showDisabledDictionaries;
    },
  },
  persist: true,
});
