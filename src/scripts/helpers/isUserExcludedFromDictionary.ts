import { computed } from "vue";
import { useStore } from "@nanostores/vue";
import { $multiStore } from "@stores/componentStates.mjs";
import { type TTeam } from "@scripts/data/teamsData";

/**
 * Is User Excluded From Dictionary
 *
 * Check if the team's `excludedUsers` array has an object with `id` equal to
 * `userId` and `customDictionaryIds` includes `dictionaryId`.
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
  const multiStore = useStore($multiStore);
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
