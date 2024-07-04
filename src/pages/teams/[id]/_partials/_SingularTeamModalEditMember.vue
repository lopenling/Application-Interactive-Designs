<template>
  <ModalDialog name="singular-team-edit-member" max-width="xl" :separate-buttons="true">
    <template #default="{ iconButtonsOverflowWidth }">
      <div class="mb-4 flex flex-col">
        <div class="min-w-0 text-base font-semibold leading-6 text-stone-900">
          <div
            v-if="iconButtonsOverflowWidth > 0"
            class="float-right ml-2.5 hidden h-2.5 sm:block"
            :style="`width: ${iconButtonsOverflowWidth}px;`"
          />
          <span
            v-if="teamsStore.isUserInvitePendingByUserIdInTeam(singularUser.id, singularTeam.id)"
            class="block truncate"
          >
            {{ singularUser.email }}
          </span>
          <span v-else>
            {{ usersStore.getUserFullNameById(singularUser.id) }}
          </span>
        </div>
        <div class="text-xs leading-5 text-stone-500/85">
          <span
            v-if="teamsStore.isUserInvitePendingByUserIdInTeam(singularUser.id, singularTeam.id)"
          >
            Invitation pending
          </span>
          <span v-else class="block truncate">
            {{ singularUser.email }}
          </span>
        </div>
      </div>

      <form id="editTeamMemberForm" @submit.prevent="handleFormSubmit">
        <div class="mb-0 w-full text-left sm:w-1/2">
          <BaseListbox v-model="selectedRoleInEditTeamMember" :options="sortedUserRolesArray">
            <BaseListboxLabel>Role</BaseListboxLabel>
            <BaseListboxInput appearance="white" />
          </BaseListbox>
        </div>
      </form>
    </template>

    <template #illustration>
      <ModalDialogIllustration
        v-if="teamsStore.isUserInvitePendingByUserIdInTeam(singularUser.id, singularTeam.id)"
        :icon-component="IconSingleNeutral"
        appearance="primary"
      />
      <BaseAvatar v-else :user-id="singularUser.id" size-class="size-full" />
    </template>
    <template #buttons>
      <ModalDialogButton
        appearance="primary"
        :close-modal="false"
        type="submit"
        form="editTeamMemberForm"
      >
        Apply changes
      </ModalDialogButton>
    </template>
    <template #options>
      <div class="py-1">
        <ModalDialogOption @click="removeUserFromTeam">Remove from team</ModalDialogOption>
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

import { type AstroGlobal } from "astro";
import getRole from "@scripts/helpers/getRole";
import signedInUserData from "@scripts/data/signedInUserData";

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
type TProps = { astro: AstroGlobal };
const props = defineProps<TProps>();
const role = getRole(props.astro);
const signedInUser = signedInUserData(role);

const teamsStore = useTeamsStore();
const singularTeam = ref({} as TTeam);
const usersStore = useUsersStore();
const singularUser = ref({} as TUser);
const selectedRoleInEditTeamMember = ref({} as TSingularUserRole);
const sortedUserRolesArray = sortArrayByKey(Object.values(userRoles), "label");

const handleFormSubmit = () => {
  if (singularUser.value.id === signedInUser.id) {
    eventBus.emit("close-modal", { name: "singular-team-edit-member" });
    eventBus.emit("open-modal", {
      name: "singular-team-self-downgrade",
      data: {
        teamId: singularTeam.value.id,
        userId: singularUser.value.id,
        role: selectedRoleInEditTeamMember.value,
      },
    });
  } else {
    if (
      teamsStore.isUserInvitePendingByUserIdInTeam(singularUser.value.id, singularTeam.value.id)
    ) {
      teamsStore.editInviteRoleInTeam({
        userId: singularUser.value.id,
        teamId: singularTeam.value.id,
        role: selectedRoleInEditTeamMember.value,
      });
    } else {
      teamsStore.editUserRoleInTeam({
        userId: singularUser.value.id,
        teamId: singularTeam.value.id,
        role: selectedRoleInEditTeamMember.value,
      });
    }
    eventBus.emit("close-modal", { name: "singular-team-edit-member" });
  }
};

const removeUserFromTeam = () => {
  eventBus.emit("close-modal", { name: "singular-team-edit-member" });
  eventBus.emit("open-modal", {
    name: "singular-team-remove-member",
    data: { teamId: singularTeam.value.id, userId: singularUser.value.id },
  });
};

eventBus.on("open-modal", (event: any) => {
  if (event.name !== "singular-team-edit-member") return;
  let userId: TSingularTeamModalEditMember["userId"] = event.data.userId;
  let teamId: TSingularTeamModalEditMember["teamId"] = event.data.teamId;

  selectedRoleInEditTeamMember.value = teamsStore.getUserRoleByUserIdInTeam(userId, teamId)!;
  singularTeam.value = teamsStore.getTeamById(teamId)!;
  singularUser.value = usersStore.getUserById(userId)!;
});
</script>
