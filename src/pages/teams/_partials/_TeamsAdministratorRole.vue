<template>
  <CardHeader>
    <CardHeaderHeading>Administrator role</CardHeaderHeading>

    <template #button>
      <CardHeaderButton @click="openModalTeamsNewTeam()" :iconComponent="IconAdd">
        New team
      </CardHeaderButton>
    </template>
  </CardHeader>

  <SettingsCard class="divide-y">
    <SettingsCardRowRoute
      v-if="teamsWhereUserIsAdmin.length > 0 && state == 'filled'"
      v-for="team in teamsWhereUserIsAdmin"
      :url="`/teams/${team.id}?` + getUrlParams(props.astro)"
    >
      {{ team.name }}
    </SettingsCardRowRoute>

    <SettingsCardRowMessage v-if="teamsWhereUserIsAdmin.length === 0 || state == 'empty'">
      No teams created yet
    </SettingsCardRowMessage>
  </SettingsCard>
</template>

<script setup lang="ts">
import eventBus from "@scripts/general/eventBus";
import { useTeamsStore } from "@stores/teamsStore";

import { type AstroGlobal } from "astro";
import getRole from "@scripts/helpers/getRole";
import getState from "@scripts/helpers/getState";
import getUrlParams from "@scripts/helpers/getUrlParams";
import signedInUserData from "@scripts/data/signedInUserData";

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

const teamsStore = useTeamsStore();
const teamsWhereUserIsAdmin = teamsStore.getTeamsWhereUserIsAdminByUserId(signedInUser.id);

const openModalTeamsNewTeam = () => {
  eventBus.emit("open-modal", { name: "teams-new-team" });
};
</script>
