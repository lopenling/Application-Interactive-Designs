import { computed } from "vue";
import { useStore } from "@nanostores/vue";
import { $multiStore, updateStore } from "@stores/componentStates.mjs";
import { type TTeam } from "@scripts/data/teamsData";
import teamsData from "@scripts/data/teamsData";

// NB: Demo only, not to be used in production!

/**
 * Is User Excluded From Dictionary
 *
 * Check if the team's `excludedUsers` array has an object with `id` equal to
 * `userId` and `customDictionaryIds`/`nativeDictionaryIds` includes `dictionaryId`.
 * Return `true` if both conditions are met.
 */

type TIsUserExcluded = {
  userId: number;
  dictionaryId: number;
  teamId: number;
  dictionaryType: "custom" | "native";
};

export default function isUserExcludedFromDictionary({
  userId,
  dictionaryId,
  teamId,
  dictionaryType,
}: TIsUserExcluded) {
  const teams = teamsData();

  const multiStore = useStore($multiStore);
  if (!multiStore.value["teams"]) updateStore("teams", teams);
  const teamsInStore = computed(() => multiStore.value["teams"] as TTeam[]);
  const singularTeam = computed(
    () => teamsInStore.value.find((team) => team.id === teamId) as TTeam,
  );

  if (dictionaryType === "custom") {
    return singularTeam.value.excludedUsers.some(
      (user) => user.id === userId && user.customDictionaryIds.includes(dictionaryId),
    );
  }
  if (dictionaryType === "native") {
    return singularTeam.value.excludedUsers.some(
      (user) => user.id === userId && user.nativeDictionaryIds.includes(dictionaryId),
    );
  }
}
