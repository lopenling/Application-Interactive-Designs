<template>
  <ModalDialog name="singular-team-self-downgrade" :max-width="prohibitDowngrade ? 'xl' : 'lg'">
    <p v-if="prohibitDowngrade" class="text-pretty">
      There must be at least one team
      <span class="lowercase">{{ userRoles.administrator.label }}</span
      >. You can't step down to a <span class="lowercase">{{ userRoles.member.label }}</span> if
      none remain.
    </p>
    <p v-else class="text-pretty">
      You will still be part of team {{ singularTeam.name }}, but will no longer be able to access
      this page and manage the team.
    </p>

    <template #title>
      <span v-if="prohibitDowngrade">Unable to step down to member</span>
      <span v-else>Step down to member?</span>
    </template>
    <template #illustration>
      <ModalDialogIllustration
        v-if="prohibitDowngrade"
        :icon-component="IconAlertCircle"
        appearance="danger"
      />
      <ModalDialogIllustration v-else :icon-component="IconStairsDescend" appearance="primary" />
    </template>
    <template #buttons v-if="!prohibitDowngrade">
      <ModalDialogButton appearance="primary" @click="changeRole">
        Yes, change my role
      </ModalDialogButton>
    </template>
  </ModalDialog>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import eventBus from "@scripts/general/eventBus";
import { useTeamsStore, type TTeam } from "@stores/teamsStore";
import { useUsersStore, userRoles, type TUser, type TSingularUserRole } from "@stores/usersStore";

import { type AstroGlobal } from "astro";
import getRole from "@scripts/helpers/getRole";
import signedInUserData from "@scripts/data/signedInUserData";
import getUrlParams from "@scripts/helpers/getUrlParams";

import ModalDialog from "@components/ModalDialog/ModalDialog.vue";
import ModalDialogIllustration from "@components/ModalDialog/ModalDialogIllustration.vue";
import ModalDialogButton from "@components/ModalDialog/ModalDialogButton.vue";

import IconStairsDescend from "@components/icons/streamline/regular/IconStairsDescend.vue";
import IconAlertCircle from "@components/icons/streamline/regular/IconAlertCircle.vue";

export type TSingularTeamModalSelfDowngrade = {
  userId: number;
  teamId: number;
  role: TSingularUserRole;
};

type TProps = { astro: AstroGlobal };
const props = defineProps<TProps>();
const role = getRole(props.astro);
const signedInUser = signedInUserData(role);

const teamsStore = useTeamsStore();
const singularTeam = ref({} as TTeam);
const usersStore = useUsersStore();
const singularUser = ref({} as TUser);
const administratorIds = ref([] as number[]);
const newRole = ref({} as TSingularUserRole);

const prohibitDowngrade = computed(() => {
  if (
    administratorIds.value.length === 1 &&
    administratorIds.value.includes(singularUser.value.id)
  ) {
    return true;
  }
  return false;
});

const changeRole = () => {
  teamsStore.editUserRoleInTeam({
    userId: singularUser.value.id,
    teamId: singularTeam.value.id,
    role: newRole.value,
  });
  if (singularUser.value.id === signedInUser.id) {
    window.location.href = `/teams/?` + getUrlParams(props.astro);
  }
  eventBus.emit("close-modal", { name: "singular-team-self-downgrade" });
};

eventBus.on("open-modal", (event: any) => {
  if (event.name !== "singular-team-self-downgrade") return;
  let userId: TSingularTeamModalSelfDowngrade["userId"] = event.data.userId;
  let teamId: TSingularTeamModalSelfDowngrade["teamId"] = event.data.teamId;
  let role: TSingularTeamModalSelfDowngrade["role"] = event.data.role;

  singularUser.value = usersStore.getUserById(userId)!;
  singularTeam.value = teamsStore.getTeamById(teamId)!;
  newRole.value = role;
  administratorIds.value = teamsStore.getAdministratorIdsInTeam(teamId)!;
});
</script>
