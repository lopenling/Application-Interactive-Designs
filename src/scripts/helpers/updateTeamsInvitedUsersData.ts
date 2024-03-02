import { computed } from "vue";
import { useStore } from "@nanostores/vue";
import { $multiStore, updateStore } from "@stores/componentStates.mjs";
import { type TTeam } from "@scripts/data/teamsData";
import teamsData from "@scripts/data/teamsData";

// NB: Demo only, not to be used in production!

/**
 * Update Teams Invited Users Data
 *
 * Update the `teams` store by removing the user object from the `invitedUsers`
 * array and adding the `userId` to the `adminUserIds`/`memberUserIds` according
 * to the `role` and `payload` values for the current team.
 */

type TUpdateTeamsInvitedUsersData = {
  userId: number;
  role?: "admin" | "member";
  payload: boolean;
  teamId: number;
};

export default function updateTeamsInvitedUsersData({
  userId,
  role,
  payload,
  teamId,
}: TUpdateTeamsInvitedUsersData) {
  const teams = teamsData();

  const multiStore = useStore($multiStore);
  if (!multiStore.value["teams"]) updateStore("teams", teams);
  const teamsInStore = computed(() => multiStore.value["teams"] as TTeam[]);

  let staticTeams: TTeam[] = JSON.parse(JSON.stringify(teamsInStore.value));
  const teamIndex = staticTeams.findIndex((team) => team.id === teamId);
  const team = staticTeams[teamIndex];

  if (payload === true) {
    if (role === "admin") {
      if (!team.adminUserIds.includes(userId)) {
        team.adminUserIds.push(userId);
      }
    }
    if (role === "member") {
      if (!team.memberUserIds.includes(userId)) {
        team.memberUserIds.push(userId);
      }
    }
  }

  team.invitedUsers = team.invitedUsers.filter((obj) => obj.id !== userId);

  updateStore("teams", staticTeams);
}
