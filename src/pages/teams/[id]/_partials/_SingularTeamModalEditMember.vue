<template>
  <ModalDialog
    v-if="singularUser && selectedRoleInEditTeamMember"
    name="team-edit-member"
    max-width="xl"
    :separate-buttons="true"
  >
    <div class="mb-4 flex flex-col">
      <div class="text-base font-semibold leading-6 text-stone-900">
        {{ usersStore.getUserFullNameById(singularUser.id) }}
      </div>
      <div class="truncate text-xs leading-5 text-stone-500/85">
        {{ singularUser.email }}
      </div>
    </div>

    <div class="mb-0 w-full text-left sm:w-1/2">
      <BaseListbox v-model="selectedRoleInEditTeamMember" :options="sortedUserRolesArray">
        <BaseListboxLabel>Role</BaseListboxLabel>
        <BaseListboxInput appearance="white" />
      </BaseListbox>
    </div>

    <template #illustration>
      <BaseAvatar :user="singularUser" size-class="size-full" />
    </template>
    <template #buttons>
      <ModalDialogButton appearance="primary" :close-modal="true">
        Apply changes
      </ModalDialogButton>
    </template>
    <template #options>
      <div class="py-1">
        <ModalDialogOption>Remove from team</ModalDialogOption>
      </div>
    </template>
  </ModalDialog>
</template>

<script setup lang="ts">
import { ref } from "vue";
import eventBus from "@scripts/general/eventBus";
import sortArrayByKey from "@scripts/helpers/sortArrayByKey";
import { useTeamsStore } from "@stores/teamsStore";
import { useUsersStore, userRoles, type TUser, type TSingularUserRole } from "@stores/usersStore";

import ModalDialog from "@components/ModalDialog/ModalDialog.vue";
import ModalDialogButton from "@components/ModalDialog/ModalDialogButton.vue";
import ModalDialogOption from "@components/ModalDialog/ModalDialogOption.vue";
import BaseAvatar from "@components/BaseAvatar/BaseAvatar.vue";
import BaseListbox from "@components/BaseListbox/BaseListbox.vue";
import BaseListboxLabel from "@components/BaseListbox/BaseListboxLabel.vue";
import BaseListboxInput from "@components/BaseListbox/BaseListboxInput.vue";

export type TSingularTeamModalEditMember = {
  userId: number;
  teamId: number;
};

const teamsStore = useTeamsStore();
const usersStore = useUsersStore();
const singularUser = ref({} as TUser);
const selectedRoleInEditTeamMember = ref({} as TSingularUserRole);
const sortedUserRolesArray = sortArrayByKey(Object.values(userRoles), "label");

eventBus.on("open-modal", (event: any) => {
  if (event.name !== "team-edit-member") return;

  selectedRoleInEditTeamMember.value = teamsStore.getUserRoleByUserId(
    event.data.userId,
    event.data.teamId,
  )!;
  singularUser.value = usersStore.getUserById(event.data.userId)!;
});
</script>
