<template>
  <ModalDialog name="teams-leave-team" max-width="lg">
    <p class="text-pretty">
      You will loose access to team {{ singularTeam.name }} and all of it's materials.
    </p>

    <template #title>Do You Really Want to Leave the Team?</template>
    <template #illustration>
      <ModalDialogIllustration
        :icon-component="IconLogout1"
        icon-class="translate-x-0.5"
        appearance="danger"
      />
    </template>
    <template #buttons>
      <ModalDialogButton @click="leaveTeam" appearance="danger" :close-modal="false">
        Yes, leave the team
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

import IconLogout1 from "@components/icons/streamline/regular/IconLogout1.vue";

export type TTeamsModalLeaveTeam = {
  userId: number;
  teamId: number;
};

const teamsStore = useTeamsStore();
const singularTeam = ref({} as TTeam);
const usersStore = useUsersStore();
const singularUser = ref({} as TUser);

const leaveTeam = () => {
  teamsStore.removeUserFromTeam({
    userId: singularUser.value.id,
    teamId: singularTeam.value.id,
  });
  eventBus.emit("close-modal", { name: "teams-leave-team" });
};

eventBus.on("open-modal", (event: any) => {
  if (event.name !== "teams-leave-team") return;
  let userId: TTeamsModalLeaveTeam["userId"] = event.data.userId;
  let teamId: TTeamsModalLeaveTeam["teamId"] = event.data.teamId;

  singularTeam.value = teamsStore.getTeamById(teamId)!;
  singularUser.value = usersStore.getUserById(userId)!;
});
</script>
