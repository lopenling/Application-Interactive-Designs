import { computed } from "vue";
import { useStore } from "@nanostores/vue";
import { $multiStore } from "@stores/componentStates.mjs";
import { type TTeam } from "@scripts/data/teamsData";

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
  const multiStore = useStore($multiStore);
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
