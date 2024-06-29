<template>
  <ModalDialog
    name="teams-new-team"
    max-width="lg"
    enable-initial-focus="smAndUp"
    :separate-buttons="false"
  >
    <form
      id="newTeamForm"
      @submit.prevent="handleFormSubmit"
      class="mt-4 flex flex-col gap-x-4 gap-y-2.5 text-left"
    >
      <BaseInputText
        v-model="newTeamName"
        appearance="white"
        type="text"
        name="newTeamName"
        id="newTeamName"
        inputmode="text"
        pattern="[a-zA-Z0-9_\-\(\)][a-zA-Z0-9_\-\(\) ]{1,49}"
        autocomplete="off"
        title="2-50 letters, no special characters except _ - ( )"
        required
      />
    </form>

    <template #title>Give the team a name</template>
    <template #buttons>
      <ModalDialogButton appearance="primary" :close-modal="false" type="submit" form="newTeamForm">
        Continue
      </ModalDialogButton>
    </template>
  </ModalDialog>
</template>

<script setup lang="ts">
import { ref } from "vue";
import eventBus from "@scripts/general/eventBus";
import { useTeamsStore } from "@stores/teamsStore";

import { type AstroGlobal } from "astro";
import getRole from "@scripts/helpers/getRole";
import getUrlParams from "@scripts/helpers/getUrlParams";
import signedInUserData from "@scripts/data/signedInUserData";

import ModalDialog from "@components/ModalDialog/ModalDialog.vue";
import ModalDialogButton from "@components/ModalDialog/ModalDialogButton.vue";
import BaseInputText from "@components/BaseInputText/BaseInputText.vue";

type TProps = { astro: AstroGlobal };
const props = defineProps<TProps>();
const role = getRole(props.astro);
const signedInUser = signedInUserData(role);

const teamsStore = useTeamsStore();
const newTeamName = ref("");
const newTeamId = ref(teamsStore.getNewTeamId());

const handleFormSubmit = () => {
  teamsStore.addTeam({
    teamId: newTeamId.value,
    teamName: newTeamName.value,
    userId: signedInUser.id,
  });
  window.location.href = `/teams/${newTeamId.value}?` + getUrlParams(props.astro);
};

eventBus.on("open-modal", (event: any) => {
  if (event.name !== "teams-new-team") return;
});
</script>
