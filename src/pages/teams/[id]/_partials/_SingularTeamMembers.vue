<template>
  <div v-if="singularTeam && role == 'admin'">
    <CardHeader>
      <CardHeaderHeading>Members</CardHeaderHeading>

      <template #button>
        <CardHeaderButton
          @click="console.log('TODO: Open the member adding modal')"
          :iconComponent="IconAdd"
        >
          New member
        </CardHeaderButton>
      </template>
    </CardHeader>

    <SettingsCard class="divide-y">
      <!-- Team members -->
      <SettingsCardRowPersonDetailsWithButtons
        v-if="state == 'filled'"
        v-for="(person, index) in sortedPeople"
        :person="person"
      >
        <template #extraData>
          {{ getUserRoleInTeamById(person.id, singularTeam.id) }}
        </template>
        <template #buttons>
          <SettingsCardSubtleButton @click="console.log('TODO: Open the member edit modal')">
            Edit
          </SettingsCardSubtleButton>
        </template>
      </SettingsCardRowPersonDetailsWithButtons>

      <!-- Invited people -->
      <SettingsCardRowPersonDetailsWithButtons
        v-if="state == 'filled'"
        v-for="(person, index) in sortedInvitedPeople"
        :person="person"
        :subdue-image="true"
      >
        <template #extraData>
          <div>
            <div>{{ getUserRoleInTeamById(person.id, singularTeam.id) }}</div>
            <div class="text-xs leading-5">Invitation pending</div>
          </div>
        </template>
        <template #buttons>
          <SettingsCardSubtleButton @click="console.log('TODO: Open the member edit modal')">
            Edit
          </SettingsCardSubtleButton>
        </template>
      </SettingsCardRowPersonDetailsWithButtons>

      <!-- No other members -->
      <SettingsCardRowPersonDetailsWithButtons
        v-if="state == 'empty'"
        :person="signedInUser"
        :hide-image="state == 'empty'"
      >
        <template #extraData>Administrator</template>
      </SettingsCardRowPersonDetailsWithButtons>
    </SettingsCard>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useStore } from "@nanostores/vue";
import { $multiStore, updateStore } from "@stores/componentStates.mjs";

import { type AstroGlobal } from "astro";
import { type TTeam } from "@scripts/data/teamsData";
import { type TUser } from "@scripts/data/usersData";

import signedInUserData from "@scripts/data/signedInUserData";
import usersData from "@scripts/data/usersData";
import teamsData from "@scripts/data/teamsData";

import getRole from "@scripts/helpers/getRole";
import getState from "@scripts/helpers/getState";
import getUserRoleInTeamById from "@scripts/helpers/getUserRoleInTeamById";

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
const singularTeamId = Number(params.id);

const role = getRole(props.astro);
const state = getState(props.astro);
const signedInUser = signedInUserData(role);
const users = usersData();
const teams = teamsData();

/**
 * Store
 *
 * Setup the multi-store.
 * Setup the sub-store inside multi-store by assigning a `storeKey` and initial value.
 * Reactively get data from stores
 * Sort the people by role (Administrators first) and also by first name (A-Z)
 */

const multiStore = useStore($multiStore);
if (!multiStore.value["users"]) updateStore("users", users);
if (!multiStore.value["teams"]) updateStore("teams", teams);

const usersInStore = computed(() => multiStore.value["users"] as TUser[]);
const teamsInStore = computed(() => multiStore.value["teams"] as TTeam[]);
const singularTeam = computed(
  () => teamsInStore.value.find((team) => team.id === singularTeamId) as TTeam,
);
const combinedUserIds = computed(() => [
  ...singularTeam.value.adminUserIds,
  ...singularTeam.value.memberUserIds,
]);

const people = computed(() =>
  usersInStore.value.filter((user) => combinedUserIds.value.includes(user.id)),
);
const sortedPeople = computed(() => {
  return people.value.slice().sort((a, b) => {
    const roleA = getUserRoleInTeamById(a.id, singularTeam.value.id);
    const roleB = getUserRoleInTeamById(b.id, singularTeam.value.id);

    if (roleA === "Administrator" && roleB !== "Administrator") return -1;
    if (roleA !== "Administrator" && roleB === "Administrator") return 1;

    if (a.firstName < b.firstName) return -1;
    if (a.firstName > b.firstName) return 1;

    return 0;
  });
});

const invitedPeople = computed(() => {
  if (singularTeam.value.invitedUsers) {
    const invitedUserIds = singularTeam.value.invitedUsers.map((user) => user.id);

    return usersInStore.value.filter((user) => invitedUserIds.includes(user.id));
  }
});
const sortedInvitedPeople = computed(() => {
  if (invitedPeople.value) {
    return invitedPeople.value.slice().sort((a, b) => {
      const roleA = getUserRoleInTeamById(a.id, singularTeam.value.id);
      const roleB = getUserRoleInTeamById(b.id, singularTeam.value.id);

      if (roleA === "Administrator" && roleB !== "Administrator") return -1;
      if (roleA !== "Administrator" && roleB === "Administrator") return 1;

      if (a.firstName < b.firstName) return -1;
      if (a.firstName > b.firstName) return 1;

      return 0;
    });
  }
});
</script>
