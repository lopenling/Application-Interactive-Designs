<template>
  <CardHeader>
    <CardHeaderHeading>Member role</CardHeaderHeading>
  </CardHeader>

  <SettingsCard class="divide-y">
    <SettingsCardRowLabelAndButtons
      v-if="teamsWhereUserIsMember.length > 0 && state == 'filled'"
      v-for="team in teamsWhereUserIsMember"
    >
      {{ team.name }}

      <template #buttons>
        <SettingsCardSubtleButton
          @click="openModalTeamsLeaveTeam({ userId: signedInUser.id, teamId: team.id })"
        >
          Leave team
        </SettingsCardSubtleButton>
      </template>
    </SettingsCardRowLabelAndButtons>

    <SettingsCardRowMessage v-if="teamsWhereUserIsMember.length === 0 || state == 'empty'">
      No teams joined yet
    </SettingsCardRowMessage>
  </SettingsCard>
</template>

<script setup lang="ts">
import { computed } from "vue";
import eventBus from "@scripts/general/eventBus";

import { type AstroGlobal } from "astro";
import { type TTeamsModalLeaveTeam } from "./_TeamsModalLeaveTeam.vue";

import getRole from "@scripts/helpers/getRole";
import getState from "@scripts/helpers/getState";
import signedInUserData from "@scripts/data/signedInUserData";
import { useTeamsStore } from "@stores/teamsStore";

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
const signedInUser = signedInUserData(role);

const teamsStore = useTeamsStore();
const teamsWhereUserIsMember = computed(() =>
  teamsStore.getTeamsWhereUserIsMemberByUserId(signedInUser.id),
);

const openModalTeamsLeaveTeam = (data: TTeamsModalLeaveTeam) => {
  eventBus.emit("open-modal", { name: "teams-leave-team", data: data });
};
</script>
