<template>
  <ModalDialog name="singular-team-rename-team" max-width="md" enable-initial-focus="smAndUp">
    <form
      id="teamNameForm"
      @submit.prevent="handleFormSubmit"
      class="mt-4 flex flex-col gap-x-4 gap-y-2.5 text-left"
    >
      <BaseInputText
        v-model="teamName"
        appearance="white"
        type="text"
        name="teamName"
        id="teamName"
        inputmode="text"
        pattern="[a-zA-Z0-9_\-\(\)][a-zA-Z0-9_\-\(\) ]{1,49}"
        autocomplete="off"
        title="2-50 letters, no special characters except _ - ( )"
        required
      />
    </form>

    <template #title>Rename the Team</template>
    <template #buttons>
      <ModalDialogButton
        appearance="primary"
        :close-modal="false"
        type="submit"
        form="teamNameForm"
      >
        Apply new name
      </ModalDialogButton>
    </template>
  </ModalDialog>
</template>

<script setup lang="ts">
import { ref } from "vue";
import eventBus from "@scripts/general/eventBus";
import { useTeamsStore, type TTeam } from "@stores/teamsStore";
import { type TAlert } from "@components/Alert/Alert.vue";

import ModalDialog from "@components/ModalDialog/ModalDialog.vue";
import ModalDialogButton from "@components/ModalDialog/ModalDialogButton.vue";
import BaseInputText from "@components/BaseInputText/BaseInputText.vue";

export type TSingularTeamModalRenameTeam = {
  teamId: number;
};

const teamsStore = useTeamsStore();
const singularTeam = ref({} as TTeam);
const teamName = ref("");

const handleFormSubmit = () => {
  teamsStore.renameTeam({
    teamId: singularTeam.value.id,
    teamName: teamName.value,
  });
  eventBus.emit("close-modal", { name: "singular-team-rename-team" });

  // TODO: Actually check the response and show appropriate alert
  eventBus.emit("open-alert", {
    data: {
      appearance: "success",
      message: "Team name changed successfully.",
    } as TAlert,
  });
};

eventBus.on("open-modal", (event: any) => {
  if (event.name !== "singular-team-rename-team") return;
  let teamId: TSingularTeamModalRenameTeam["teamId"] = event.data.teamId;

  singularTeam.value = teamsStore.getTeamById(teamId)!;
  teamName.value = singularTeam.value.name;
});
</script>
