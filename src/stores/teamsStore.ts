import { defineStore } from "pinia";
import { useUsersStore, userRoles, type TSingularUserRole } from "@stores/usersStore";

export type TTeam = {
  id: number;
  name: string;
  administratorUserIds: number[];
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
  role: TSingularUserRole;
  inviteAuthorId: number;
};
export type TUserInFilter = { id: number; value: string } | null;

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
type TRemoveUserFromTeam = { userId: number; teamId: number };
type TResolveUserInvite = { userId: number; teamId: number; acceptInvite: boolean };
type TEditUserRoleInTeam = { userId: number; teamId: number; role: TSingularUserRole };

const teams: TTeam[] = [
  {
    id: 1,
    name: "Alpha",
    administratorUserIds: [2, 16],
    memberUserIds: [4, 6, 12, 14],
    invitedUsers: [
      { id: 10, role: userRoles.administrator, inviteAuthorId: 2 },
      { id: 3, role: userRoles.member, inviteAuthorId: 2 },
    ],
    enabledCustomDictionaryIds: [1],
    disabledCustomDictionaryIds: [],
    enabledNativeDictionaryIds: [1, 2, 3, 5, 6, 7, 8, 17],
    excludedUsers: [
      { id: 2, customDictionaryIds: [1], nativeDictionaryIds: [3] },
      { id: 4, customDictionaryIds: [], nativeDictionaryIds: [3] },
      { id: 6, customDictionaryIds: [1], nativeDictionaryIds: [] },
      { id: 14, customDictionaryIds: [1], nativeDictionaryIds: [3] },
      { id: 16, customDictionaryIds: [1], nativeDictionaryIds: [3] },
    ],
  },
  {
    id: 2,
    name: "Beta",
    administratorUserIds: [2],
    memberUserIds: [],
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
    administratorUserIds: [1],
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
    administratorUserIds: [1],
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
    administratorUserIds: [8],
    memberUserIds: [],
    invitedUsers: [{ id: 2, role: userRoles.administrator, inviteAuthorId: 8 }],
    enabledCustomDictionaryIds: [],
    disabledCustomDictionaryIds: [],
    enabledNativeDictionaryIds: [
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
    ],
    excludedUsers: [],
  },
];

const userInFilter: TUserInFilter = null;

export const useTeamsStore = defineStore("teamsStore", {
  state: () => ({
    teams: teams,
    userInFilter: userInFilter,
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
          excludedUsers: [],
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
    },
    editUserRoleTeam({ userId, teamId, role }: TEditUserRoleInTeam) {
      this.removeUserFromTeam({ userId, teamId });
      this.addUserToTeam({ userId, teamId, role: role });
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
    setUserInFilter(user: any) {
      this.userInFilter = user;
    },
  },
  persist: true,
});
