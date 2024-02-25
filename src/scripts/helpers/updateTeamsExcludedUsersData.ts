import { computed } from "vue";
import { useStore } from "@nanostores/vue";
import { $multiStore, updateStore } from "@stores/componentStates.mjs";
import { type TTeam } from "@scripts/data/teamsData";

/**
 * Update Teams Excluded Users Data
 *
 * Update the `teams` store by changing the `excludedUsers` array for the current
 * team. Check if the user is already in the excluded array and if so, update the
 * `customDictionaryIds` array by adding or removing the `dictionaryId` value.
 *
 * If the user is not in the excluded array, add a new object with `id` equal to
 * `userId` and `customDictionaryIds` array with `dictionaryId` value.
 */

type TUpdateTeamsExcludedUsersData = {
  userId: number;
  dictionaryId: number;
  payload: boolean;
  teamId: number;
  dictionaryType: "custom" | "native";
};

export default function updateTeamsExcludedUsersData({
  userId,
  dictionaryId,
  payload,
  teamId,
  dictionaryType,
}: TUpdateTeamsExcludedUsersData) {
  const multiStore = useStore($multiStore);
  const teamsInStore = computed(() => multiStore.value["teams"] as TTeam[]);

  if (userId) {
    let staticTeams: TTeam[] = JSON.parse(JSON.stringify(teamsInStore.value));
    const teamIndex = staticTeams.findIndex((team) => team.id === teamId);
    let excludedUsers = staticTeams[teamIndex].excludedUsers;
    let userAccess = excludedUsers.find((item) => item.id === userId);

    if (userAccess) {
      if (payload) {
        if ((dictionaryType = "custom")) {
          userAccess.customDictionaryIds = userAccess.customDictionaryIds.filter(
            (item) => item !== dictionaryId,
          );
        }
        if ((dictionaryType = "native")) {
          userAccess.nativeDictionaryIds = userAccess.nativeDictionaryIds.filter(
            (item) => item !== dictionaryId,
          );
        }
      } else {
        if ((dictionaryType = "custom") && !userAccess.customDictionaryIds.includes(dictionaryId)) {
          userAccess.customDictionaryIds.push(dictionaryId);
        }
        if ((dictionaryType = "native") && !userAccess.nativeDictionaryIds.includes(dictionaryId)) {
          userAccess.nativeDictionaryIds.push(dictionaryId);
        }
      }
    } else {
      if ((dictionaryType = "native")) {
        excludedUsers.push({
          id: userId,
          customDictionaryIds: [dictionaryId],
          nativeDictionaryIds: [],
        });
      }
      if ((dictionaryType = "native")) {
        excludedUsers.push({
          id: userId,
          customDictionaryIds: [],
          nativeDictionaryIds: [dictionaryId],
        });
      }
    }

    updateStore("teams", staticTeams);
  }
}
