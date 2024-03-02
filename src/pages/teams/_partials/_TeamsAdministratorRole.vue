<template>
  <CardHeader>
    <CardHeaderHeading>Administrator role</CardHeaderHeading>

    <template #button>
      <CardHeaderButton
        @click="console.log('TODO: Open the team adding modal')"
        :iconComponent="IconAdd"
      >
        New team
      </CardHeaderButton>
    </template>
  </CardHeader>

  <SettingsCard>
    <SettingsCardRowRoute
      v-if="teamsUserIsAdmin.length > 0 && state == 'filled'"
      v-for="(team, index) in teamsUserIsAdmin"
      :url="`/teams/${team.id}?` + getUrlParams(props.astro)"
      :index="index"
    >
      {{ team.name }}
    </SettingsCardRowRoute>

    <SettingsCardRowMessage v-if="teamsUserIsAdmin.length === 0 || state == 'empty'">
      No teams created yet
    </SettingsCardRowMessage>
  </SettingsCard>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useStore } from "@nanostores/vue";
import { $multiStore, updateStore } from "@stores/componentStates.mjs";

import { type AstroGlobal } from "astro";
import { type TTeam } from "@scripts/data/teamsData";

import getRole from "@scripts/helpers/getRole";
import getState from "@scripts/helpers/getState";
import getUrlParams from "@scripts/helpers/getUrlParams";
import signedInUserData from "@scripts/data/signedInUserData";
import teamsData from "@scripts/data/teamsData";

import CardHeader from "@components/CardHeader/CardHeader.vue";
import CardHeaderHeading from "@components/CardHeader/CardHeaderHeading.vue";
import CardHeaderButton from "@components/CardHeader/CardHeaderButton.vue";
import SettingsCard from "@components/SettingsCard/SettingsCard.vue";
import SettingsCardRowMessage from "@components/SettingsCard/SettingsCardRowMessage.vue";
import SettingsCardRowRoute from "@components/SettingsCard/SettingsCardRowRoute.vue";
import IconAdd from "@components/icons/streamline/regular/IconAdd.vue";

type TProps = { astro: AstroGlobal };
const props = defineProps<TProps>();

const role = getRole(props.astro);
const state = getState(props.astro);
const signedInUser = signedInUserData(role);
const teams = teamsData();

/**
 * Store
 *
 * Setup the multi-store.
 * Setup the sub-store inside multi-store by assigning a `storeKey` and initial value.
 * Reactively get teams from `teams` store where `signedInUser.id` is included in
 * `adminUserIds` array and sort them by `name`.
 */

const multiStore = useStore($multiStore);
if (!multiStore.value["teams"]) updateStore("teams", teams);

const teamsUserIsAdmin = computed(() => {
  return (multiStore.value["teams"] as TTeam[])
    .filter((obj) => obj.adminUserIds.some((id) => id === signedInUser.id))
    .sort((a, b) => a.name.localeCompare(b.name));
});
</script>
