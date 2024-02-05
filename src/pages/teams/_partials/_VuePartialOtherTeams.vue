<template>
  <div class="mb-5 flex flex-wrap items-center justify-between gap-x-6 gap-y-5">
    <!---- Heading ---->
    <h3 class="text-base font-semibold leading-8 text-stone-900">
      Member role
    </h3>
  </div>

  <!---- Data ---->
  <div
    class="-mx-4 mb-12 overflow-hidden bg-white sm:mx-0 sm:rounded-lg sm:shadow"
  >
    <VuePartialOtherTeamsDataRow
      v-if="props.state === 'filled'"
      v-for="(team, index) in teamsFiltered"
      :team="team"
      :index="index"
    />

    <div v-if="props.state === 'empty'">
      <p class="px-4 py-4 text-center text-sm text-stone-500">
        No teams joined yet
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { type TRole, type TState } from "@lib/types";
import userData from "@scripts/data/userData";
import teamsData from "@scripts/data/teamsData";

import VuePartialOtherTeamsDataRow from "./_VuePartialOtherTeamsDataRow.vue";

// Define partial props
type TProps = { role?: TRole; state?: TState };
const props = defineProps<TProps>();

const user = userData(props.role);
const teams = teamsData();

// Filter teams where user is member by comparing `user.id` with users_member array
const teamsFiltered = teams.filter((obj) =>
  obj.users_member.some((id) => id === user.id),
);
</script>
