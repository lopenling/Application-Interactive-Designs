<template>
  <div class="mb-6 sm:flex sm:items-end sm:justify-between">
    <h3 class="text-base font-semibold leading-6 text-stone-900">
      <span v-if="subStore">
        Native dictionaries
        <span class="font-normal">({{ subStore.value }})</span>
      </span>
      <span v-else>Native dictionaries</span>
    </h3>
    <div class="mt-3 sm:ml-4 sm:mt-0"></div>
  </div>

  <div class="-mx-4 overflow-hidden bg-white sm:mx-0 sm:rounded-lg sm:shadow">
    <div v-if="!subStore">
      <LocalVueCardDisclosureRow
        v-for="(dictionary, index) in dictionaries"
        :dictionary="dictionary"
        :users="users"
        :index="index"
      />
    </div>
    <div v-else>
      <LocalVueCardRow
        v-for="(dictionary, index) in dictionaries"
        :dictionary="dictionary"
        :index="index"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useStore } from "@nanostores/vue";
import { $multiStore } from "@stores/componentStates.mjs";

import LocalVueCardDisclosureRow from "./VueCardDisclosureRow.vue";
import LocalVueCardRow from "./VueCardRow.vue";

import dictionariesData from "@scripts/data/dictionariesData";
import organizationUsersData from "@scripts/data/organizationUsersData";

const dictionaries = dictionariesData();
const users = organizationUsersData();

// Store setup
const storeKey = "glossaryFilterUsers";

const multiStore = useStore($multiStore);
const subStore = ref(null); // Define subStore as a reactive variable

onMounted(() => {
  $multiStore.subscribe(() => {
    subStore.value = multiStore.value[storeKey]; // Update subStore
  });
});
</script>
