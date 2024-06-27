<template>
  <ModalDialog name="team-new-member" max-width="2xl" :separate-buttons="true">
    <div class="mb-6 mt-6 flex flex-col gap-x-4 gap-y-2.5 text-left sm:mb-4 sm:flex-row">
      <div class="sm:basis-3/5">
        <BaseLabel for="email">Email address</BaseLabel>
        <BaseInput
          appearance="white"
          type="email"
          name="email"
          id="email"
          inputtype="email"
          required
        />
      </div>
      <div class="sm:basis-2/5">
        <BaseListbox v-model="selectedRoleInEditTeamMember" :options="sortedUserRolesArray">
          <BaseListboxLabel>Role</BaseListboxLabel>
          <BaseListboxInput appearance="white" placeholder=" " />
        </BaseListbox>
      </div>
    </div>

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
      <ModalDialogButton appearance="primary" :close-modal="true">Send invite</ModalDialogButton>
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
import BaseInput from "@components/BaseInput/BaseInput.vue";
import BaseListbox from "@components/BaseListbox/BaseListbox.vue";
import BaseListboxLabel from "@components/BaseListbox/BaseListboxLabel.vue";
import BaseListboxInput from "@components/BaseListbox/BaseListboxInput.vue";

import IconSingleNeutral from "@components/icons/streamline/regular/IconSingleNeutral.vue";

export type TSingularTeamModalNewMember = {
  teamId: number;
};

const teamsStore = useTeamsStore();
const singularTeam = ref({} as TTeam);
const selectedRoleInEditTeamMember = ref(userRoles.member as TSingularUserRole);
const sortedUserRolesArray = sortArrayByKey(Object.values(userRoles), "label");

eventBus.on("open-modal", (event: any) => {
  if (event.name !== "team-new-member") return;
  let teamId: TSingularTeamModalNewMember["teamId"] = event.data.teamId;

  singularTeam.value = teamsStore.getTeamById(teamId)!;
});
</script>
