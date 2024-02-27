import { computed } from "vue";
import { useStore } from "@nanostores/vue";
import { $multiStore, updateStore } from "@stores/componentStates.mjs";
import { type TTeam } from "@scripts/data/teamsData";
import teamsData from "@scripts/data/teamsData";

// NB: Demo only, not to be used in production!

/**
 * updateTeamsCustomDictionariesData
 *
 * Update the `teams` store by moving `dictionaryId` value between
 * `enabledCustomDictionaryIds` and `disabledCustomDictionaryIds` arrays for the
 * current team.
 */

type TUpdateTeamsCustomDictionariesData = {
  dictionaryId: number;
  payload: boolean;
  teamId: number;
};

export default function updateTeamsCustomDictionariesData({
  dictionaryId,
  payload,
  teamId,
}: TUpdateTeamsCustomDictionariesData) {
  const teams = teamsData();

  const multiStore = useStore($multiStore);
  if (!multiStore.value["teams"]) updateStore("teams", teams);
  const teamsInStore = computed(() => multiStore.value["teams"] as TTeam[]);

  let staticTeams: TTeam[] = JSON.parse(JSON.stringify(teamsInStore.value));
  const teamIndex = staticTeams.findIndex((team) => team.id === teamId);
  const team = staticTeams[teamIndex];

  if (payload === true) {
    if (!team.enabledCustomDictionaryIds.includes(dictionaryId)) {
      team.enabledCustomDictionaryIds.push(dictionaryId);
    }
    team.disabledCustomDictionaryIds = team.disabledCustomDictionaryIds.filter(
      (item: number) => item !== dictionaryId,
    );
  } else {
    if (!team.disabledCustomDictionaryIds.includes(dictionaryId)) {
      team.disabledCustomDictionaryIds.push(dictionaryId);
    }
    team.enabledCustomDictionaryIds = team.enabledCustomDictionaryIds.filter(
      (item: number) => item !== dictionaryId,
    );
  }

  updateStore("teams", staticTeams);
}
