<template>
  <ModalDialog name="singular-team-remove-custom-dictionary" max-width="lg">
    <p class="text-pretty">
      You and everybody else in the team will loose access to the
      {{ singularCustomDictionary.name }} material.
    </p>

    <template #title>
      <span class="break-words">Delete {{ singularCustomDictionary.name }}?</span>
    </template>
    <template #illustration>
      <ModalDialogIllustration :icon-component="IconBin1" appearance="danger" />
    </template>
    <template #buttons>
      <ModalDialogButton appearance="danger" @click="removeCustomDictionary">
        Yes, delete
      </ModalDialogButton>
    </template>
  </ModalDialog>
</template>

<script setup lang="ts">
import { ref } from "vue";
import eventBus from "@scripts/general/eventBus";
import { useTeamsStore, type TTeam } from "@stores/teamsStore";
import { useDictionariesStore, type TCustomDictionary } from "@stores/dictionariesStore";
import { type TAlert } from "@components/Alert/Alert.vue";

import ModalDialog from "@components/ModalDialog/ModalDialog.vue";
import ModalDialogIllustration from "@components/ModalDialog/ModalDialogIllustration.vue";
import ModalDialogButton from "@components/ModalDialog/ModalDialogButton.vue";

import IconBin1 from "@components/icons/streamline/regular/IconBin1.vue";

export type TSingularTeamModalRemoveCustomDictionary = {
  dictionaryId: number;
  teamId: number;
};

const teamsStore = useTeamsStore();
const singularTeam = ref({} as TTeam);
const dictionariesStore = useDictionariesStore();
const singularCustomDictionary = ref({} as TCustomDictionary);

const removeCustomDictionary = () => {
  teamsStore.removeCustomDictionaryFromTeam({
    dictionaryId: singularCustomDictionary.value.id,
    teamId: singularTeam.value.id,
  });
  eventBus.emit("close-modal", { name: "singular-team-remove-custom-dictionary" });

  // TODO: Actually check the response and show appropriate alert
  eventBus.emit("open-alert", {
    data: {
      appearance: "success",
      message: "Custom dictionary deleted successfully.",
    } as TAlert,
  });
};

eventBus.on("open-modal", (event: any) => {
  if (event.name !== "singular-team-edit-custom-dictionary") return;
  let dictionaryId: TSingularTeamModalRemoveCustomDictionary["dictionaryId"] =
    event.data.dictionaryId;
  let teamId: TSingularTeamModalRemoveCustomDictionary["teamId"] = event.data.teamId;

  singularCustomDictionary.value = dictionariesStore.getCustomDictionaryById(dictionaryId)!;
  singularTeam.value = teamsStore.getTeamById(teamId)!;
});
</script>
