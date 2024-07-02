<template>
  <div v-if="singularTeam && role == 'admin'">
    <CardHeader>
      <CardHeaderHeading>Members</CardHeaderHeading>

      <template #button>
        <CardHeaderButton
          @click="
            openModalSingularTeamNewMember({
              teamId: singularTeam.id,
              currentUserId: signedInUser.id,
            })
          "
          :iconComponent="IconAdd"
        >
          New member
        </CardHeaderButton>
      </template>
    </CardHeader>

    <SettingsCard class="divide-y">
      <SettingsCardRowPersonDetailsWithButtons
        v-if="state == 'filled'"
        v-for="singularUser in sortedUsers"
        :user="singularUser"
        :user-id="singularUser.id"
        :team-id="singularTeam.id"
        :subdue-image="
          teamsStore.isUserInvitePendingByUserIdInTeam(singularUser.id, singularTeam.id)
        "
      >
        <template #extraData>
          {{ teamsStore.getUserRoleByUserIdInTeam(singularUser.id, singularTeam.id)!.label }}
        </template>
        <template #buttons>
          <SettingsCardSubtleButton
            @click="
              openModalSingularTeamEditMember({ userId: singularUser.id, teamId: singularTeam.id })
            "
          >
            Edit
          </SettingsCardSubtleButton>
        </template>
      </SettingsCardRowPersonDetailsWithButtons>
    </SettingsCard>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import eventBus from "@scripts/general/eventBus";
import { useTeamsStore, type TTeam, type TUserInFilter } from "@stores/teamsStore";
import { useUsersStore, userRoles, type TUser } from "@stores/usersStore";

import { type AstroGlobal } from "astro";
import getRole from "@scripts/helpers/getRole";
import getState from "@scripts/helpers/getState";
import signedInUserData from "@scripts/data/signedInUserData";

import { type TSingularTeamModalNewMember } from "./_SingularTeamModalNewMember.vue";
import { type TSingularTeamModalEditMember } from "./_SingularTeamModalEditMember.vue";

import CardHeader from "@components/CardHeader/CardHeader.vue";
import CardHeaderHeading from "@components/CardHeader/CardHeaderHeading.vue";
import CardHeaderButton from "@components/CardHeader/CardHeaderButton.vue";
import SettingsCard from "@components/SettingsCard/SettingsCard.vue";
import SettingsCardRowPersonDetailsWithButtons from "@components/SettingsCard/SettingsCardRowPersonDetailsWithButtons.vue";
import SettingsCardSubtleButton from "@components/SettingsCard/SettingsCardSubtleButton.vue";

import IconAdd from "@components/icons/streamline/regular/IconAdd.vue";

type TProps = { astro: AstroGlobal };
const props = defineProps<TProps>();
const params = props.astro.params;
const currentTeamId = Number(params.id);
const role = getRole(props.astro);
const state = getState(props.astro);
const signedInUser = signedInUserData(role);

const teamsStore = useTeamsStore();
const usersStore = useUsersStore();
const singularTeam = computed(() => teamsStore.getTeamById(currentTeamId) as TTeam);
const userInFilter = computed(() => teamsStore.userInFilter as TUserInFilter);

const users = computed(() => {
  const userIds = teamsStore.getAllUserIdsInTeam(singularTeam.value.id)!;
  return usersStore.getUsersByIds(userIds) as TUser[];
});

const sortedUsers = computed(() => {
  if (userInFilter.value?.id) return [usersStore.getUserById(userInFilter.value.id)!];

  return users.value.slice().sort((a, b) => {
    // First sort by invite status (pending invites last)
    const invitePendingA = teamsStore.isUserInvitePendingByUserIdInTeam(
      a.id,
      singularTeam.value.id,
    );
    const invitePendingB = teamsStore.isUserInvitePendingByUserIdInTeam(
      b.id,
      singularTeam.value.id,
    );
    if (!invitePendingA && invitePendingB) return -1;
    if (invitePendingA && !invitePendingB) return 1;

    // Then sort by role (administrators first)
    const roleA = teamsStore.getUserRoleByUserIdInTeam(a.id, singularTeam.value.id);
    const roleB = teamsStore.getUserRoleByUserIdInTeam(b.id, singularTeam.value.id);
    if (roleA === userRoles.administrator && roleB !== userRoles.administrator) return -1;
    if (roleA !== userRoles.administrator && roleB === userRoles.administrator) return 1;

    // Then sort by first name or fallback to email (a-z)
    const nameA = (a.firstName || a.email).toLowerCase();
    const nameB = (b.firstName || b.email).toLowerCase();
    if (nameA < nameB) return -1;
    if (nameA > nameB) return 1;

    return 0;
  });
});

const openModalSingularTeamNewMember = (data: TSingularTeamModalNewMember) => {
  eventBus.emit("open-modal", { name: "singular-team-new-member", data: data });
};
const openModalSingularTeamEditMember = (data: TSingularTeamModalEditMember) => {
  eventBus.emit("open-modal", { name: "singular-team-edit-member", data: data });
};
</script>
