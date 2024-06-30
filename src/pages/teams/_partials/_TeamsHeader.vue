<template>
  <SettingsTitle>
    <SettingsTitleText>Teams</SettingsTitleText>
  </SettingsTitle>

  <div
    v-if="teamsWhereUserIsInvited.length > 0 && state == 'filled'"
    class="-mt-4 mb-12 flex flex-col gap-y-4 sm:gap-y-2"
  >
    <SettingsNotification v-for="team in teamsWhereUserIsInvited">
      <SettingsNotificationText>
        {{
          usersStore.getUserFullNameById(
            team.invitedUsers.find((obj) => obj.id == signedInUser.id)!.inviteAuthorId,
          )
        }}
        invites you to become a team <span class="font-semibold">{{ team.name }}</span>
        <span class="lowercase">
          {{ " " + team.invitedUsers.find((obj) => obj.id == signedInUser.id)!.role.label }}.
        </span>
      </SettingsNotificationText>

      <template #buttons>
        <SettingsNotificationButton
          @click="
            teamsStore.resolveUserInvite({
              userId: signedInUser.id,
              teamId: team.id,
              acceptInvite: false,
            })
          "
          :separator="true"
        >
          Reject
        </SettingsNotificationButton>
        <SettingsNotificationButton
          @click="
            teamsStore.resolveUserInvite({
              userId: signedInUser.id,
              teamId: team.id,
              acceptInvite: true,
            })
          "
        >
          Accept
        </SettingsNotificationButton>
      </template>
    </SettingsNotification>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useTeamsStore } from "@stores/teamsStore";
import { useUsersStore } from "@stores/usersStore";

import { type AstroGlobal } from "astro";
import getRole from "@scripts/helpers/getRole";
import getState from "@scripts/helpers/getState";
import signedInUserData from "@scripts/data/signedInUserData";

import SettingsTitle from "@components/SettingsTitle/SettingsTitle.vue";
import SettingsTitleText from "@components/SettingsTitle/SettingsTitleText.vue";
import SettingsNotification from "@components/SettingsNotification/SettingsNotification.vue";
import SettingsNotificationText from "@components/SettingsNotification/SettingsNotificationText.vue";
import SettingsNotificationButton from "@components/SettingsNotification/SettingsNotificationButton.vue";

type TProps = { astro: AstroGlobal };
const props = defineProps<TProps>();
const role = getRole(props.astro);
const state = getState(props.astro);
const signedInUser = signedInUserData(role);

const teamsStore = useTeamsStore();
const usersStore = useUsersStore();
const teamsWhereUserIsInvited = computed(() =>
  teamsStore.getTeamsWhereUserIsInvitedByUserId(signedInUser.id),
);
</script>
