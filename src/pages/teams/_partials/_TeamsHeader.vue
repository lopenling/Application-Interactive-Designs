<template>
  <SettingsTitle>
    <SettingsTitleText>Teams</SettingsTitleText>
  </SettingsTitle>

  <div
    v-if="teamsUserIsInvitedTo.length > 0 && state == 'filled'"
    class="-mt-4 mb-12 flex flex-col gap-y-4 sm:gap-y-2"
  >
    <SettingsNotification v-for="team in teamsUserIsInvitedTo">
      <SettingsNotificationText>
        {{
          getUserFullNameById(
            team.invitedUsers.find((obj) => obj.id == signedInUser.id)!.inviteAuthorId,
          )
        }}
        invites you to become
        {{ getUserRoleInTeamById(signedInUser.id, team.id) === "administrator" ? "an" : "" }}
        {{ getUserRoleInTeamById(signedInUser.id, team.id) === "member" ? "a" : "" }}
        {{ getUserRoleInTeamById(signedInUser.id, team.id) }}
        of <span class="font-semibold">{{ team.name }}</span> team.
      </SettingsNotificationText>

      <template #buttons>
        <SettingsNotificationButton
          @click="
            updateTeamsInvitedUsersData({
              userId: signedInUser.id,
              payload: false,
              teamId: team.id,
            })
          "
          :separator="true"
        >
          Reject
        </SettingsNotificationButton>
        <SettingsNotificationButton
          @click="
            updateTeamsInvitedUsersData({
              userId: signedInUser.id,
              role: team.invitedUsers.find((obj) => obj.id == signedInUser.id)!.role,
              payload: true,
              teamId: team.id,
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
import { useStore } from "@nanostores/vue";
import { $multiStore, updateStore } from "@stores/componentStates.mjs";

import { type AstroGlobal } from "astro";
import { type TTeam } from "@scripts/data/teamsData";

import getRole from "@scripts/helpers/getRole";
import getState from "@scripts/helpers/getState";
import getUserFullNameById from "@scripts/helpers/getUserFullNameById";
import getUserRoleInTeamById from "@scripts/helpers/getUserRoleInTeamById";
import updateTeamsInvitedUsersData from "@scripts/helpers/updateTeamsInvitedUsersData";

import teamsData from "@scripts/data/teamsData";
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
const teams = teamsData();
const signedInUser = signedInUserData(role);

/**
 * Store
 *
 * Setup the multi-store.
 * Setup the sub-store inside multi-store with `storeKey` and initial value.
 * Reactively get data from stores
 */

const multiStore = useStore($multiStore);
if (!multiStore.value["teams"]) updateStore("teams", teams);

const teamsUserIsInvitedTo = computed(() => {
  return (multiStore.value["teams"] as TTeam[]).filter((obj) =>
    obj.invitedUsers.some((invite) => invite.id === signedInUser.id),
  );
});
</script>
