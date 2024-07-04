<template>
  <ModalDialog
    name="singular-team-remove-member"
    :max-width="prohibitRemove || isInvitePending ? 'xl' : 'lg'"
  >
    <p v-if="prohibitRemove" class="text-pretty">
      There must be at least one team
      <span class="lowercase">{{ userRoles.administrator.label }}</span
      >. You can't remove the only one.
    </p>
    <p v-else class="text-pretty">
      <span v-if="isUserSelf">
        You will loose access to team {{ singularTeam.name }} and all of it's materials. The other
        <span class="lowercase">{{ userRoles.administrator.label }}(s)</span> will continue to
        manage the team.
      </span>
      <span v-else>
        {{
          isInvitePending
            ? `They won't be able to join team ${singularTeam.name}. Although the invitation email was already sent, the join link will become inactive.`
            : `${singularUser.firstName} will loose access to team ${singularTeam.name} and all of it's materials.`
        }}
      </span>
    </p>

    <template #title>
      <span v-if="prohibitRemove">Unable to remove the {{ userRoles.administrator.label }}</span>
      <span v-else class="break-words">
        Remove
        <span v-if="isUserSelf">yourself?</span>
        <span v-else>
          {{
            isInvitePending ? singularUser.email : usersStore.getUserFullNameById(singularUser.id)
          }}?
        </span>
      </span>
    </template>
    <template #illustration>
      <ModalDialogIllustration
        v-if="prohibitRemove && isUserSelf"
        :icon-component="IconAlertCircle"
        appearance="danger"
      />
      <ModalDialogIllustration
        v-else
        :icon-component="IconSingleNeutralActionsSubtract"
        icon-class="scale-110 translate-x-px"
        appearance="danger"
      />
    </template>
    <template #buttons v-if="!prohibitRemove">
      <ModalDialogButton appearance="danger" @click="removeMember">Yes, remove</ModalDialogButton>
    </template>
  </ModalDialog>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import eventBus from "@scripts/general/eventBus";
import { useTeamsStore, type TTeam } from "@stores/teamsStore";
import { useUsersStore, userRoles, type TUser } from "@stores/usersStore";

import { type AstroGlobal } from "astro";
import getRole from "@scripts/helpers/getRole";
import signedInUserData from "@scripts/data/signedInUserData";
import getUrlParams from "@scripts/helpers/getUrlParams";

import ModalDialog from "@components/ModalDialog/ModalDialog.vue";
import ModalDialogIllustration from "@components/ModalDialog/ModalDialogIllustration.vue";
import ModalDialogButton from "@components/ModalDialog/ModalDialogButton.vue";

import IconAlertCircle from "@components/icons/streamline/regular/IconAlertCircle.vue";
import IconSingleNeutralActionsSubtract from "@components/icons/streamline/regular/IconSingleNeutralActionsSubtract.vue";

export type TSingularTeamModalRemoveMember = {
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

const isUserSelf = computed(() => singularUser.value.id === signedInUser.id);
const isInvitePending = computed(() =>
  teamsStore.isUserInvitePendingByUserIdInTeam(singularUser.value.id, singularTeam.value.id),
);

const administratorIds = ref([] as number[]);
const prohibitRemove = computed(() => {
  if (
    administratorIds.value.length === 1 &&
    administratorIds.value.includes(singularUser.value.id)
  ) {
    return true;
  }
  return false;
});

const removeMember = () => {
  teamsStore.userInFilter = null;
  teamsStore.removeUserFromTeam({
    userId: singularUser.value.id,
    teamId: singularTeam.value.id,
  });
  if (singularUser.value.id === signedInUser.id) {
    window.location.href = `/teams/?` + getUrlParams(props.astro);
  }
  eventBus.emit("close-modal", { name: "singular-team-remove-member" });
};

eventBus.on("open-modal", (event: any) => {
  if (event.name !== "singular-team-remove-member") return;
  let userId: TSingularTeamModalRemoveMember["userId"] = event.data.userId;
  let teamId: TSingularTeamModalRemoveMember["teamId"] = event.data.teamId;

  singularUser.value = usersStore.getUserById(userId)!;
  singularTeam.value = teamsStore.getTeamById(teamId)!;
  administratorIds.value = teamsStore.getAdministratorIdsInTeam(teamId)!;
});
</script>
