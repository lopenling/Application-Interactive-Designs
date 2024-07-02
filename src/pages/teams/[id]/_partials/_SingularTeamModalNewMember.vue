<template>
  <ModalDialog
    name="singular-team-new-member"
    max-width="2xl"
    :separate-buttons="true"
    enable-initial-focus="smAndUp"
  >
    <form
      id="newTeamMemberForm"
      @submit.prevent="handleFormSubmit"
      class="mb-6 mt-6 flex flex-col gap-x-4 gap-y-2.5 text-left sm:mb-4 sm:flex-row"
    >
      <div class="sm:basis-3/5">
        <BaseLabel for="email">Email address</BaseLabel>
        <BaseInputText
          v-model="newMemberEmail"
          appearance="white"
          type="email"
          name="email"
          id="email"
          inputmode="email"
          required
        />
      </div>
      <div class="sm:basis-2/5">
        <BaseListbox v-model="newMemberRole" :options="sortedUserRolesArray">
          <BaseListboxLabel>Role</BaseListboxLabel>
          <BaseListboxInput appearance="white" />
        </BaseListbox>
      </div>
    </form>

    <p class="max-w-prose text-left text-stone-500">
      An invite link to join team {{ teamsStore.getTeamById(singularTeam.id)?.name }} will be
      emailed to this person. If they don't have an account, they'll be prompted to create one.
    </p>

    <template #title>Add a new member</template>
    <template #illustration>
      <ModalDialogIllustration
        :icon-component="IconSingleNeutral"
        :icon-expand-by="1"
        appearance="primary"
      />
    </template>
    <template #buttons>
      <ModalDialogButton
        appearance="primary"
        :close-modal="false"
        type="submit"
        form="newTeamMemberForm"
      >
        Send invite
      </ModalDialogButton>
    </template>
  </ModalDialog>
</template>

<script setup lang="ts">
import { ref } from "vue";
import eventBus from "@scripts/general/eventBus";
import sortArrayByKey from "@scripts/helpers/sortArrayByKey";
import { useTeamsStore, type TTeam } from "@stores/teamsStore";
import { userRoles, type TSingularUserRole } from "@stores/usersStore";

import ModalDialog from "@components/ModalDialog/ModalDialog.vue";
import ModalDialogButton from "@components/ModalDialog/ModalDialogButton.vue";
import ModalDialogIllustration from "@components/ModalDialog/ModalDialogIllustration.vue";
import BaseLabel from "@components/BaseLabel/BaseLabel.vue";
import BaseInputText from "@components/BaseInputText/BaseInputText.vue";
import BaseListbox from "@components/BaseListbox/BaseListbox.vue";
import BaseListboxLabel from "@components/BaseListbox/BaseListboxLabel.vue";
import BaseListboxInput from "@components/BaseListbox/BaseListboxInput.vue";

import IconSingleNeutral from "@components/icons/streamline/regular/IconSingleNeutral.vue";

export type TSingularTeamModalNewMember = {
  teamId: number;
  currentUserId: number;
};

const teamsStore = useTeamsStore();
const singularTeam = ref({} as TTeam);
const inviteAuthorId = ref(-1);
const newMemberEmail = ref("");
const newMemberRole = ref(userRoles.member as TSingularUserRole);
const sortedUserRolesArray = sortArrayByKey(Object.values(userRoles), "label");

const handleFormSubmit = () => {
  // TODO: Check if user is already invited or a member
  teamsStore.addNewInviteToTeam({
    userEmail: newMemberEmail.value,
    teamId: singularTeam.value.id,
    role: newMemberRole.value,
    inviteAuthorId: 2,
  });
  newMemberEmail.value = "";
  eventBus.emit("close-modal", { name: "singular-team-new-member" });
};

eventBus.on("open-modal", (event: any) => {
  if (event.name !== "singular-team-new-member") return;
  let teamId: TSingularTeamModalNewMember["teamId"] = event.data.teamId;
  let currentUserId: TSingularTeamModalNewMember["currentUserId"] = event.data.currentUserId;

  singularTeam.value = teamsStore.getTeamById(teamId)!;
  inviteAuthorId.value = currentUserId;
});
</script>
