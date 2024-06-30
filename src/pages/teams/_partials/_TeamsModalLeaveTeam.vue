<template>
  <ModalDialog name="teams-leave-team" max-width="xl" :separate-buttons="true">
    <p>
      You will loose access to team {{ singularTeam.name }} and all of it's materials. Write the
      team name below to confirm.
    </p>
    <form
      id="leaveTeamForm"
      @submit.prevent="handleFormSubmit"
      class="mt-4 flex flex-col text-left"
    >
      <BaseLabel for="leaveTeamName">Team name</BaseLabel>
      <BaseInputText
        v-model="leaveTeamName"
        appearance="white"
        type="text"
        name="leaveTeamName"
        id="leaveTeamName"
        inputmode="text"
        autocomplete="off"
        required
      />
    </form>

    <template #title>Do you really want to leave?</template>
    <template #illustration>
      <ModalDialogIllustration :icon-component="IconAlertCircle" appearance="danger" />
    </template>
    <template #buttons>
      <ModalDialogButton
        appearance="danger"
        :close-modal="false"
        type="submit"
        form="leaveTeamForm"
      >
        Yes, leave team
      </ModalDialogButton>
    </template>
  </ModalDialog>
</template>

<script setup lang="ts">
import { ref } from "vue";
import eventBus from "@scripts/general/eventBus";
import { useTeamsStore, type TTeam } from "@stores/teamsStore";
import { useUsersStore, type TUser } from "@stores/usersStore";

import ModalDialog from "@components/ModalDialog/ModalDialog.vue";
import ModalDialogIllustration from "@components/ModalDialog/ModalDialogIllustration.vue";
import ModalDialogButton from "@components/ModalDialog/ModalDialogButton.vue";
import BaseLabel from "@components/BaseLabel/BaseLabel.vue";
import BaseInputText from "@components/BaseInputText/BaseInputText.vue";

import IconAlertCircle from "@components/icons/streamline/regular/IconAlertCircle.vue";

export type TTeamsModalLeaveTeam = {
  userId: number;
  teamId: number;
};

const teamsStore = useTeamsStore();
const singularTeam = ref({} as TTeam);
const usersStore = useUsersStore();
const singularUser = ref({} as TUser);
const leaveTeamName = ref("");

const handleFormSubmit = () => {
  // TODO: Actually check if the entered team name matches the team name
  teamsStore.removeUserFromTeamByUserId({
    userId: singularUser.value.id,
    teamId: singularTeam.value.id,
  });
  eventBus.emit("close-modal", { name: "teams-leave-team" });
  leaveTeamName.value = "";
};

eventBus.on("open-modal", (event: any) => {
  if (event.name !== "teams-leave-team") return;
  let userId: TTeamsModalLeaveTeam["userId"] = event.data.userId;
  let teamId: TTeamsModalLeaveTeam["teamId"] = event.data.teamId;

  singularTeam.value = teamsStore.getTeamById(teamId)!;
  singularUser.value = usersStore.getUserById(userId)!;
});
</script>
