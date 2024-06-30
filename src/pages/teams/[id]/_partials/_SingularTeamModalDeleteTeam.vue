<template>
  <ModalDialog name="singular-team-delete-team" max-width="xl" :separate-buttons="true">
    <div v-if="numberOfUsersInTeam == 1">
      <p>
        You will loose access to team {{ singularTeam.name }} and all of it's materials. Write the
        team name below to confirm.
      </p>
      <form
        id="deleteTeamForm"
        @submit.prevent="handleFormSubmit"
        class="mt-4 flex flex-col text-left"
      >
        <BaseLabel for="deleteTeamName">Team name</BaseLabel>
        <BaseInputText
          v-model="deleteTeamName"
          appearance="white"
          type="text"
          name="deleteTeamName"
          id="deleteTeamName"
          inputmode="text"
          autocomplete="off"
          required
        />
      </form>
    </div>
    <div v-else>
      <p>
        <span v-if="numberOfUsersInTeam == 2">There is still 1 other member</span>
        <span v-else>
          There are still <strong>{{ numberOfUsersInTeam - 1 }} other members</strong>
        </span>
        in team {{ singularTeam.name }} besides you. A team can only be deleted if there are no
        other members.
      </p>
    </div>

    <template #title>
      <span v-if="numberOfUsersInTeam == 1">Do you really want to delete?</span>
      <span v-else>Unable to delete</span>
    </template>
    <template #illustration>
      <ModalDialogIllustration :icon-component="IconAlertCircle" appearance="danger" />
    </template>
    <template #buttons v-if="numberOfUsersInTeam == 1">
      <ModalDialogButton
        appearance="danger"
        :close-modal="false"
        type="submit"
        form="deleteTeamForm"
      >
        Yes, delete team
      </ModalDialogButton>
    </template>
  </ModalDialog>
</template>

<script setup lang="ts">
import { ref } from "vue";
import eventBus from "@scripts/general/eventBus";
import { useTeamsStore, type TTeam } from "@stores/teamsStore";

import { type AstroGlobal } from "astro";
import getUrlParams from "@scripts/helpers/getUrlParams";

import ModalDialog from "@components/ModalDialog/ModalDialog.vue";
import ModalDialogIllustration from "@components/ModalDialog/ModalDialogIllustration.vue";
import ModalDialogButton from "@components/ModalDialog/ModalDialogButton.vue";
import BaseLabel from "@components/BaseLabel/BaseLabel.vue";
import BaseInputText from "@components/BaseInputText/BaseInputText.vue";

import IconAlertCircle from "@components/icons/streamline/regular/IconAlertCircle.vue";

export type TSingularTeamModalDeleteTeam = {
  teamId: number;
};
type TProps = { astro: AstroGlobal };
const props = defineProps<TProps>();

const teamsStore = useTeamsStore();
const singularTeam = ref({} as TTeam);
const deleteTeamName = ref("");
const numberOfUsersInTeam = ref(0);

const handleFormSubmit = () => {
  // TODO: Actually check if the entered team name matches the team name
  teamsStore.deleteTeam({ teamId: singularTeam.value.id });
  deleteTeamName.value = "";
  window.location.href = `/teams/?` + getUrlParams(props.astro);
};

eventBus.on("open-modal", (event: any) => {
  if (event.name !== "singular-team-delete-team") return;
  let teamId: TSingularTeamModalDeleteTeam["teamId"] = event.data.teamId;

  singularTeam.value = teamsStore.getTeamById(teamId)!;
  numberOfUsersInTeam.value = teamsStore.getAllUserIdsInTeam(teamId)!.length;
});
</script>
