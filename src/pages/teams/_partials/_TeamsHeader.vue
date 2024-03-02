<template>
  <SettingsTitle>
    <SettingsTitleText>Teams</SettingsTitleText>
  </SettingsTitle>

  <div
    v-if="userTeamInvitationsInStore.length > 0 && state == 'filled'"
    class="-mt-4 mb-12 flex flex-col gap-y-4 sm:gap-y-2"
  >
    <SettingsNotification v-for="invite in userTeamInvitationsInStore">
      <SettingsNotificationText>
        {{ users.find((user) => user.id == invite.authorId)?.firstName }}
        {{ users.find((user) => user.id == invite.authorId)?.lastName }}
        invites you to join
        <span class="font-semibold">{{
          teams.find((team) => team.id == invite.teamId)?.name
        }}</span>
        as {{ invite.role }}
      </SettingsNotificationText>

      <template #buttons>
        <SettingsNotificationButton @click="rejectInvitation(invite.id)" :separator="true">
          Reject
        </SettingsNotificationButton>
        <SettingsNotificationButton
          @click="acceptInvitation(invite.id, invite.teamId, invite.role)"
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
import {
  $multiStore,
  updateStore,
  addArrayItemToStore,
  removeArrayItemFromStore,
} from "@stores/componentStates.mjs";

import { type AstroGlobal } from "astro";
import { type TTeam } from "@scripts/data/teamsData";
import { type TUserTeamInvitation } from "@scripts/data/userTeamInvitationsData";

import getRole from "@scripts/helpers/getRole";
import getState from "@scripts/helpers/getState";
import userTeamInvitationsData from "@scripts/data/userTeamInvitationsData";
import teamsData from "@scripts/data/teamsData";
import usersData from "@scripts/data/usersData";
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
const userTeamInvitations = userTeamInvitationsData();
const teams = teamsData();
const users = usersData();
const signedInUser = signedInUserData(role);

/**
 * Store
 *
 * Setup the multi-store.
 * Setup the sub-store inside multi-store with `storeKey` and initial value.
 * Reactively get team invitations from `userTeamInvitations` store.
 */

const multiStore = useStore($multiStore);
if (!multiStore.value["userTeamInvitations"])
  updateStore("userTeamInvitations", userTeamInvitations);

const userTeamInvitationsInStore = computed(
  () => multiStore.value["userTeamInvitations"] as TUserTeamInvitation[],
);

/**
 * Reject invitation
 *
 * Remove the invitation from the `userTeamInvitations` store which `id`
 * corresponds to the `inviteId`.
 */

const rejectInvitation = (inviteId: TUserTeamInvitation["id"]) => {
  removeArrayItemFromStore("userTeamInvitations", inviteId, "id");
};

/**
 * Accept invitation
 *
 * Retrieve current team data from the `teams` store for the team where the user
 * is invited to, based on the `inviteTeamId`.
 * Create a new team data object based on the current team data and merge
 * `signedInUser.id` to the `adminUserIds` or `memberUserIds` array correspondingly.
 * Replace the current team data with the new team data in the `teams` store.
 * Remove the invitation from the `userTeamInvitations` store which `id`
 * corresponds to the `inviteId`.
 */

const acceptInvitation = (
  inviteId: TUserTeamInvitation["id"],
  inviteTeamId: TUserTeamInvitation["teamId"],
  inviteRole: TUserTeamInvitation["role"],
) => {
  const currentTeamData = (multiStore.value["teams"] as TTeam[]).find(
    (team) => team.id == inviteTeamId,
  );

  if (currentTeamData) {
    let newTeamData = {};

    if (inviteRole == "Administrator") {
      newTeamData = {
        ...currentTeamData,
        adminUserIds: [...currentTeamData.adminUserIds, signedInUser.id],
      };
    }
    if (inviteRole == "Member") {
      newTeamData = {
        ...currentTeamData,
        memberUserIds: [...currentTeamData.memberUserIds, signedInUser.id],
      };
    }

    removeArrayItemFromStore("teams", inviteTeamId, "id");
    addArrayItemToStore("teams", newTeamData);
    removeArrayItemFromStore("userTeamInvitations", inviteId, "id");
  }
};
</script>
