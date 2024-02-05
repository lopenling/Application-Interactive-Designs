<template>
  <div class="mb-5 flex flex-wrap items-center justify-between gap-x-6 gap-y-5">
    <!---- Heading ---->
    <h3 class="text-base font-semibold leading-8 text-stone-900">
      Administrator role
    </h3>

    <!---- Button ---->
    <button
      type="button"
      class="flex items-center gap-2 rounded-md bg-primary-600 px-2.5 py-1.5 text-left text-sm font-semibold text-white shadow-sm transition hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
    >
      <VueIcon
        :data="IconDataAdd"
        :attributes="{
          class: `h-3 w-3 flex-shrink-0 text-secondary-300/70`,
        }"
      />
      New team
    </button>
  </div>

  <!---- Data ---->
  <div
    class="-mx-4 mb-12 overflow-hidden bg-white sm:mx-0 sm:rounded-lg sm:shadow"
  >
    <VuePartialMyTeamsDataRow
      v-if="props.role === 'admin' && props.state === 'filled'"
      v-for="(team, index) in teamsFiltered"
      :team="team"
      :index="index"
    />

    <div v-if="props.role === 'user' || props.state === 'empty'">
      <p class="px-4 py-4 text-center text-sm text-stone-500">
        No teams created yet
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { type TRole, type TState } from "@lib/types";
import userData from "@scripts/data/userData";
import teamsData from "@scripts/data/teamsData";

import VueIcon from "@components/Icon/VueIcon.vue";
import { IconDataAdd } from "@scripts/icons/streamline/bold.mjs";

import VuePartialMyTeamsDataRow from "./_VuePartialMyTeamsDataRow.vue";

// Define partial props
type TProps = { role?: TRole; state?: TState };
const props = defineProps<TProps>();

const user = userData(props.role);
const teams = teamsData();

// Filter teams where user is admin by comparing `user.id` with users_admin array
const teamsFiltered = teams.filter((obj) =>
  obj.users_admin.some((id) => id === user.id),
);
</script>
