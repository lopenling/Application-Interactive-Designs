<template>
  <CardHeader>
    <CardHeaderHeading>Member role</CardHeaderHeading>
  </CardHeader>

  <SettingsCard>
    <SettingsCardRowLabelAndButtons
      v-if="teamsUserIsMemberReactive.length > 0 && state == 'filled'"
      v-for="(team, index) in teamsUserIsMemberReactive"
      :index="index"
    >
      {{ team.name }}

      <template #buttons>
        <SettingsCardSubtleButton @click="leaveTeam(team.id)">Leave team</SettingsCardSubtleButton>
      </template>
    </SettingsCardRowLabelAndButtons>

    <SettingsCardRowMessage v-if="teamsUserIsMemberReactive.length === 0 || state == 'empty'">
      No teams joined yet
    </SettingsCardRowMessage>
  </SettingsCard>
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

import getRole from "@scripts/helpers/getRole";
import getState from "@scripts/helpers/getState";
import userData from "@scripts/data/userData";
import teamsData from "@scripts/data/teamsData";

import CardHeader from "@components/CardHeader/CardHeader.vue";
import CardHeaderHeading from "@components/CardHeader/CardHeaderHeading.vue";
import SettingsCard from "@components/SettingsCard/SettingsCard.vue";
import SettingsCardRowMessage from "@components/SettingsCard/SettingsCardRowMessage.vue";
import SettingsCardRowLabelAndButtons from "@components/SettingsCard/SettingsCardRowLabelAndButtons.vue";
import SettingsCardSubtleButton from "@components/SettingsCard/SettingsCardSubtleButton.vue";

type TProps = { astro: AstroGlobal };
const props = defineProps<TProps>();

const role = getRole(props.astro);
const state = getState(props.astro);
const user = userData(role);
const teams = teamsData();

/**
 * Store
 *
 * Setup the multi-store.
 * Setup the sub-store inside multi-store by assigning a `storeKey` and initial value.
 * Reactively get teams from `teams` store where `user.id` is included in
 * `users_admin` array and sort them by `name`.
 */

const multiStore = useStore($multiStore);
updateStore("teams", teams);

const teamsUserIsMemberReactive = computed(() => {
  return (multiStore.value["teams"] as TTeam[])
    .filter((obj) => obj.memberUserIds.some((id) => id === user.id))
    .sort((a, b) => a.name.localeCompare(b.name));
});

/**
 * Leave team
 *
 * Retrieve current team data from the `teams` store for the team the user wants
 * to leave, based on the ID.
 * Create a new team data object based on the current team data and remove `user.id`
 * from `memberUserIds`.
 * Replace the current team data with the new team data in the `teams` store.
 */

const leaveTeam = (teamId: TTeam["id"]) => {
  const currentTeamData = (multiStore.value["teams"] as TTeam[]).find((team) => team.id == teamId);

  if (currentTeamData) {
    const newMemberUserIds = currentTeamData.memberUserIds.filter((id) => id !== user.id);
    const newTeamData = {
      ...currentTeamData,
      memberUserIds: newMemberUserIds,
    };

    removeArrayItemFromStore("teams", teamId, "id");
    addArrayItemToStore("teams", newTeamData);
  }
};
</script>
