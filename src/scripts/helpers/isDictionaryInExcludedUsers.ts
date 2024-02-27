import { computed } from "vue";
import { useStore } from "@nanostores/vue";
import { $multiStore, updateStore } from "@stores/componentStates.mjs";
import { type TTeam } from "@scripts/data/teamsData";
import teamsData from "@scripts/data/teamsData";

// NB: Demo only, not to be used in production!

/**
 * Is Dictionary In Excluded Users
 *
 * Check if the team's `excludedUsers` array has an object with `customDictionaryIds`
 * that includes `dictionaryId`.
 */

type TIsDictionaryInExcludedUsers = {
  dictionaryId: number;
  teamId: number;
  dictionaryType: "custom" | "native";
};

export default function isDictionaryInExcludedUsers({
  dictionaryId,
  teamId,
  dictionaryType,
}: TIsDictionaryInExcludedUsers) {
  const teams = teamsData();

  const multiStore = useStore($multiStore);
  if (!multiStore.value["teams"]) updateStore("teams", teams);
  const teamsInStore = computed(() => multiStore.value["teams"] as TTeam[]);
  const singularTeam = computed(
    () => teamsInStore.value.find((team) => team.id === teamId) as TTeam,
  );

  if (dictionaryType === "custom") {
    return singularTeam.value.excludedUsers.some((user) =>
      user.customDictionaryIds.includes(dictionaryId),
    );
  }
  if (dictionaryType === "native") {
    return singularTeam.value.excludedUsers.some((user) =>
      user.nativeDictionaryIds.includes(dictionaryId),
    );
  }
}
