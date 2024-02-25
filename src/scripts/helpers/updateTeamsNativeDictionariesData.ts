import { computed } from "vue";
import { useStore } from "@nanostores/vue";
import { $multiStore, updateStore } from "@stores/componentStates.mjs";
import { type TTeam } from "@scripts/data/teamsData";

/**
 * Update Teams Native Dictionaries Data
 *
 * Update the `teams` store by moving `dictionaryId` value between
 * `enabledNativeDictionaryIds` and `disabledNativeDictionaryIds` arrays for the
 * current team.
 */

type TUpdateTeamsNativeDictionariesData = {
  dictionaryId: number;
  payload: boolean;
  teamId: number;
};

export default function updateTeamsNativeDictionariesData({
  dictionaryId,
  payload,
  teamId,
}: TUpdateTeamsNativeDictionariesData) {
  const multiStore = useStore($multiStore);
  const teamsInStore = computed(() => multiStore.value["teams"] as TTeam[]);

  let staticTeams: TTeam[] = JSON.parse(JSON.stringify(teamsInStore.value));
  const teamIndex = staticTeams.findIndex((team) => team.id === teamId);
  const team = staticTeams[teamIndex];

  if (payload) {
    if (!team.enabledNativeDictionaryIds.includes(dictionaryId)) {
      team.enabledNativeDictionaryIds.push(dictionaryId);
    }
  } else {
    team.enabledNativeDictionaryIds = team.enabledNativeDictionaryIds.filter(
      (item: number) => item !== dictionaryId,
    );
  }

  updateStore("teams", staticTeams);
}
