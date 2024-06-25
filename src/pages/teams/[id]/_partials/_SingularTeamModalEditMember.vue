<template>
  <ModalDialog v-if="hasData" name="team-edit-member" max-width="xl" :separate-buttons="true">
    <div class="mb-4 flex flex-col">
      <div class="text-base font-semibold leading-6 text-stone-900">
        {{ getUserFullNameById(data.user.id) }}
      </div>
      <div class="truncate text-xs leading-5 text-stone-500/85">
        {{ data.user.email }}
      </div>
    </div>

    <div class="mb-0 w-full text-left sm:w-1/2">
      <BaseListbox v-model="selectedRoleInEditTeamMember" :options="userRoles">
        <BaseListboxLabel>Role</BaseListboxLabel>
        <BaseListboxInput appearance="white" />
      </BaseListbox>
    </div>

    <template #illustration>
      <BaseAvatar :user="data.user" size-class="size-full" />
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
import { ref, watch, computed } from "vue";

import eventBus from "@scripts/general/eventBus";
import usersData, { type TUser } from "@scripts/data/usersData";
import getUserRoleInTeamById from "@scripts/helpers/getUserRoleInTeamById";
import getUserFullNameById from "@scripts/helpers/getUserFullNameById";

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

type TData = {
  user: TUser;
  teamId: number;
};

const users = usersData();
const data = ref({} as TData);
const hasData = ref(true);
const selectedRoleInEditTeamMember = ref(null);

eventBus.on("open-modal", (event: any) => {
  if (event.name !== "team-edit-member") return;
  const singularUser = users.find((user) => user.id === event.data.userId);

  if (!singularUser || !event.data.teamId) {
    hasData.value = false;
    return;
  }
  data.value.user = singularUser;
  data.value.teamId = event.data.teamId;
});

const userRoles = [
  { id: 1, value: "Administrator", selected: true },
  { id: 2, value: "Member" },
];
</script>
