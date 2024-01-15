<template>
  <div class="mb-5 flex flex-wrap items-center justify-between gap-x-4 gap-y-3">
    <h3 class="text-base font-semibold leading-8 text-stone-900">
      Native dictionaries
      <span
        v-if="glossaryFilterUser && glossaryFilterUser.value"
        class="font-normal text-stone-500"
      >
        ({{ glossaryFilterUser.value }})
      </span>
    </h3>
  </div>

  <div class="-mx-4 overflow-hidden bg-white sm:mx-0 sm:rounded-lg sm:shadow">
    <!---- Role admin ---->
    <div v-if="props.role === 'admin'">
      <div v-if="glossaryFilterUser && glossaryFilterUser.value">
        <VuePartialDataRow
          v-for="(dictionary, index) in dictionaries.filter(
            (dictionary) => dictionary.enabled,
          )"
          :dictionary="dictionary"
          :index="index"
          toggleAppearance="secondary"
        />
      </div>
      <div v-else>
        <VuePartialDataRowExpandable
          v-for="(dictionary, index) in dictionaries"
          :dictionary="dictionary"
          :users="users"
          :index="index"
        />
      </div>
    </div>

    <!---- Role user ---->
    <div v-else>
      <VuePartialDataRow
        v-for="(dictionary, index) in dictionaries.filter(
          (dictionary) => dictionary.enabled,
        )"
        :dictionary="dictionary"
        :index="index"
        toggleAppearance="primary"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { type TRole } from "@lib/types";

import { computed } from "vue";
import { useStore } from "@nanostores/vue";
import { $multiStore } from "@stores/componentStates.mjs";

import VuePartialDataRow from "./_VuePartialDataRow.vue";
import VuePartialDataRowExpandable from "./_VuePartialDataRowExpandable.vue";

import dictionariesData from "@scripts/data/dictionariesData";
import organizationUsersData from "@scripts/data/organizationUsersData";

// Define partial props
type TProps = { role?: TRole };
const props = defineProps<TProps>();

// Get dictionaries and users data
const dictionaries = dictionariesData();
const users = organizationUsersData();

// Setup the store
const multiStore = useStore($multiStore);
const glossaryFilterUser = computed(
  () => multiStore.value["glossaryFilterUser"],
) as any;
</script>
