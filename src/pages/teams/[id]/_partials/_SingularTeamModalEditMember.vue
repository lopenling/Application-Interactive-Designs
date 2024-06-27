<template>
  <ModalDialog name="team-edit-member" max-width="xl" :separate-buttons="true">
    <template #default="{ iconButtonsOverflowWidth }">
      <div class="mb-4 flex flex-col">
        <div class="min-w-0 text-base font-semibold leading-6 text-stone-900">
          <div
            v-if="iconButtonsOverflowWidth > 0"
            class="float-right ml-2.5 hidden h-2.5 sm:block"
            :style="`width: ${iconButtonsOverflowWidth}px;`"
          />
          <span
            v-if="teamsStore.isUserInvitePendingByUserId(singularUser.id, singularTeam.id)"
            class="block truncate"
          >
            {{ singularUser.email }}
          </span>
          <span v-else>
            {{ usersStore.getUserFullNameById(singularUser.id) }}
          </span>
        </div>
        <div class="text-xs leading-5 text-stone-500/85">
          <span v-if="teamsStore.isUserInvitePendingByUserId(singularUser.id, singularTeam.id)">
            Invitation pending
          </span>
          <span v-else class="block truncate">
            {{ singularUser.email }}
          </span>
        </div>
      </div>

      <div class="mb-0 w-full text-left sm:w-1/2">
        <BaseListbox v-model="selectedRoleInEditTeamMember" :options="sortedUserRolesArray">
          <BaseListboxLabel>Role</BaseListboxLabel>
          <BaseListboxInput appearance="white" />
        </BaseListbox>
      </div>
    </template>

    <template #illustration>
      <ModalDialogIllustration
        v-if="teamsStore.isUserInvitePendingByUserId(singularUser.id, singularTeam.id)"
        :icon-component="IconSingleNeutral"
        appearance="primary"
      />
      <BaseAvatar v-else :user="singularUser" size-class="size-full" />
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
import { useTeamsStore, type TTeam } from "@stores/teamsStore";
import { useUsersStore, userRoles, type TUser, type TSingularUserRole } from "@stores/usersStore";

import ModalDialog from "@components/ModalDialog/ModalDialog.vue";
import ModalDialogButton from "@components/ModalDialog/ModalDialogButton.vue";
import ModalDialogOption from "@components/ModalDialog/ModalDialogOption.vue";
import ModalDialogIllustration from "@components/ModalDialog/ModalDialogIllustration.vue";
import BaseAvatar from "@components/BaseAvatar/BaseAvatar.vue";
import BaseListbox from "@components/BaseListbox/BaseListbox.vue";
import BaseListboxLabel from "@components/BaseListbox/BaseListboxLabel.vue";
import BaseListboxInput from "@components/BaseListbox/BaseListboxInput.vue";

import IconSingleNeutral from "@components/icons/streamline/regular/IconSingleNeutral.vue";

export type TSingularTeamModalEditMember = {
  userId: number;
  teamId: number;
};

const teamsStore = useTeamsStore();
const singularTeam = ref({} as TTeam);
const usersStore = useUsersStore();
const singularUser = ref({} as TUser);
const selectedRoleInEditTeamMember = ref({} as TSingularUserRole);
const sortedUserRolesArray = sortArrayByKey(Object.values(userRoles), "label");

eventBus.on("open-modal", (event: any) => {
  if (event.name !== "team-edit-member") return;
  let userId: TSingularTeamModalEditMember["userId"] = event.data.userId;
  let teamId: TSingularTeamModalEditMember["teamId"] = event.data.teamId;

  selectedRoleInEditTeamMember.value = teamsStore.getUserRoleByUserId(userId, teamId)!;
  singularTeam.value = teamsStore.getTeamById(teamId)!;
  singularUser.value = usersStore.getUserById(userId)!;
});
</script>
