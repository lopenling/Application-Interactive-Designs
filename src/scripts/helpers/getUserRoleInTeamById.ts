import { computed } from "vue";
import { useStore } from "@nanostores/vue";
import { $multiStore, updateStore } from "@stores/componentStates.mjs";
import { type TTeam } from "@scripts/data/teamsData";
import teamsData from "@scripts/data/teamsData";

// NB: Demo only, not to be used in production!

/**
 * Get User Role In Team By Id
 *
 * Check if the team's `adminUserIds` or `memberUserIds` includes `userId`.
 * Return "administrator" or "member" accordingly.
 * If the user is not found check if the user is in the team's `invitedUsers`
 * and return the role accordingly.
 */

export default function getUserRoleInTeamById(userId: number, teamId: number) {
  const teams = teamsData();

  const multiStore = useStore($multiStore);
  if (!multiStore.value["teams"]) updateStore("teams", teams);
  const teamsInStore = computed(() => multiStore.value["teams"] as TTeam[]);
  const singularTeam = computed(
    () => teamsInStore.value.find((team) => team.id === teamId) as TTeam,
  );

  if (singularTeam.value.adminUserIds.includes(userId)) return "administrator";
  if (singularTeam.value.memberUserIds.includes(userId)) return "member";

  const invitee = singularTeam.value.invitedUsers.find((user) => user.id === userId);
  if (invitee && invitee.role === "admin") return "administrator";
  if (invitee && invitee.role === "member") return "member";
}
