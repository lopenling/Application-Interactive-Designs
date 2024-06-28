<template>
  <ModalDialog name="teams-new-team" max-width="md">
    <div class="mt-4 flex flex-col gap-x-4 gap-y-2.5 text-left">
      <form id="newTeamForm" action="/teams/1">
        <BaseInputText
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
    </div>

    <template #title>What is your team's name?</template>
    <template #buttons>
      <ModalDialogButton appearance="primary" :close-modal="false" type="submit" form="newTeamForm">
        Continue
      </ModalDialogButton>
    </template>
  </ModalDialog>
</template>

<script setup lang="ts">
import eventBus from "@scripts/general/eventBus";

import ModalDialog from "@components/ModalDialog/ModalDialog.vue";
import ModalDialogButton from "@components/ModalDialog/ModalDialogButton.vue";
import BaseInputText from "@components/BaseInputText/BaseInputText.vue";

eventBus.on("open-modal", (event: any) => {
  if (event.name !== "teams-new-team") return;
});
</script>
